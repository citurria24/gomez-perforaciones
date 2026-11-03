// Validación compartida entre el formulario (cliente) y la API (servidor).

export type ContactInput = {
  name: string
  email: string
  phone: string
  message: string
  website?: string // honeypot: debe llegar vacío
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

export const LIMITS = { name: 100, email: 160, phone: 30, message: 3000 } as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/

export function normalize(input: Partial<ContactInput>): ContactInput {
  const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  return {
    name: s(input.name),
    email: s(input.email).toLowerCase(),
    phone: s(input.phone),
    message: s(input.message),
    website: s(input.website),
  }
}

export function validateContact(data: ContactInput): ContactErrors {
  const errors: ContactErrors = {}

  if (data.name.length < 2) errors.name = 'Ingresá tu nombre y apellido.'
  else if (data.name.length > LIMITS.name) errors.name = `Máximo ${LIMITS.name} caracteres.`

  if (!data.email) errors.email = 'Ingresá tu correo electrónico.'
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = 'Revisá el formato del correo, por ejemplo nombre@correo.com.'

  if (data.phone && (data.phone.length > LIMITS.phone || !PHONE_RE.test(data.phone)))
    errors.phone = 'Revisá el teléfono: solo números, espacios y el signo +.'

  if (data.message.length < 10) errors.message = 'Contanos un poco más sobre el trabajo (mínimo 10 caracteres).'
  else if (data.message.length > LIMITS.message) errors.message = `Máximo ${LIMITS.message} caracteres.`

  return errors
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
