import type { VercelRequest, VercelResponse } from '@vercel/node'
import { escapeHtml, normalize, validateContact } from '../src/lib/validation.js'

// Límite básico por IP (por instancia). Para tráfico alto, migrar a un store compartido (p. ej. Upstash).
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Método no permitido.' })
  }

  const allowed = process.env.ALLOWED_ORIGIN
  if (allowed && req.headers.origin && req.headers.origin !== allowed) {
    return res.status(403).json({ ok: false, error: 'Origen no permitido.' })
  }

  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Demasiados envíos. Probá de nuevo en unos minutos o escribinos por WhatsApp.' })
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body
  const data = normalize(body ?? {})

  // Honeypot: los bots completan el campo oculto. Respondemos 200 sin enviar nada.
  if (data.website) return res.status(200).json({ ok: true })

  const errors = validateContact(data)
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('[contact] Faltan variables de entorno de Resend')
    return res.status(500).json({ ok: false, error: 'El formulario no está configurado. Escribinos por WhatsApp.' })
  }

  const html = `
    <h2>Nueva consulta desde la web</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(data.phone || '—')}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
        reply_to: data.email,
        subject: `Consulta web — ${data.name.slice(0, 60)}`,
        html,
      }),
    })
    if (!r.ok) {
      console.error('[contact] Resend respondió', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Error de red', err)
    return res.status(502).json({ ok: false, error: 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.' })
  }
}

function safeJson(s: string) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
