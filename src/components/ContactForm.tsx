import { useState, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { LIMITS, normalize, validateContact, type ContactErrors } from '../lib/validation'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

const fieldBase =
  'mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-3 text-base text-ink placeholder:text-slate/60 transition-colors focus:border-water focus:outline-none focus:ring-3 focus:ring-water/20'

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = normalize(Object.fromEntries(new FormData(form)) as Record<string, string>)
    const found = validateContact(data)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; errors?: ContactErrors } | null
      if (res.ok && json?.ok) {
        form.reset()
        setStatus({ kind: 'sent' })
        return
      }
      if (json?.errors) setErrors(json.errors)
      setStatus({ kind: 'error', message: json?.error ?? 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.' })
    } catch {
      setStatus({ kind: 'error', message: 'No hay conexión con el servidor. Probá de nuevo o escribinos por WhatsApp.' })
    }
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-xl border border-wa/30 bg-white p-6 sm:p-8">
        <CircleCheck className="size-8 text-wa" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Consulta enviada</h3>
        <p className="text-slate">Recibimos tu mensaje. Te respondemos a la brevedad por correo o teléfono.</p>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="mt-1 min-h-11 font-semibold text-water-ink underline underline-offset-4">
          Enviar otra consulta
        </button>
      </div>
    )
  }

  const field = (name: keyof ContactErrors) => ({
    name,
    id: `f-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
    className: `${fieldBase} ${errors[name] ? 'border-red-600' : 'border-line'}`,
  })

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-xl border border-line bg-white p-6 sm:p-8" aria-labelledby="form-title">
      <h3 id="form-title" className="text-xl font-semibold">Envianos tu consulta</h3>
      <p className="mt-1 text-sm text-slate">Los campos marcados con * son obligatorios.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="f-name" className="text-sm font-semibold text-navy">Nombre y apellido *</label>
          <input {...field('name')} type="text" autoComplete="name" maxLength={LIMITS.name} required />
          <FieldError name="name" errors={errors} />
        </div>
        <div>
          <label htmlFor="f-email" className="text-sm font-semibold text-navy">Correo electrónico *</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} required />
          <FieldError name="email" errors={errors} />
        </div>
        <div>
          <label htmlFor="f-phone" className="text-sm font-semibold text-navy">Teléfono</label>
          <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone} />
          <FieldError name="phone" errors={errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className="text-sm font-semibold text-navy">Mensaje *</label>
          <textarea
            {...field('message')}
            rows={5}
            maxLength={LIMITS.message}
            placeholder="Dónde se realizará el trabajo y qué tipo de proyecto tenés en mente."
            required
          />
          <FieldError name="message" errors={errors} />
        </div>
        {/* Honeypot anti-spam: oculto para personas */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="f-website">No completar</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.kind === 'sending'}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-70 sm:w-auto"
      >
        {status.kind === 'sending' ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Enviando…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" /> Enviar consulta
          </>
        )}
      </button>
    </form>
  )
}

function FieldError({ name, errors }: { name: keyof ContactErrors; errors: ContactErrors }) {
  if (!errors[name]) return null
  return (
    <p id={`f-${name}-error`} className="mt-1.5 text-sm text-red-700">
      {errors[name]}
    </p>
  )
}
