import { describe, expect, it } from 'vitest'
import { escapeHtml, normalize, validateContact } from './validation'

const valid = { name: 'Ana Pérez', email: 'ana@correo.com', phone: '+598 99 123 456', message: 'Necesito un pozo para el campo.' }

describe('validateContact', () => {
  it('acepta datos válidos', () => {
    expect(validateContact(normalize(valid))).toEqual({})
  })

  it('el teléfono es opcional', () => {
    expect(validateContact(normalize({ ...valid, phone: '' }))).toEqual({})
  })

  it('marca campos obligatorios vacíos', () => {
    const e = validateContact(normalize({}))
    expect(Object.keys(e).sort()).toEqual(['email', 'message', 'name'])
  })

  it('rechaza correo y teléfono con formato inválido', () => {
    const e = validateContact(normalize({ ...valid, email: 'ana@', phone: 'abc' }))
    expect(e.email).toBeDefined()
    expect(e.phone).toBeDefined()
  })

  it('rechaza mensajes demasiado largos', () => {
    expect(validateContact(normalize({ ...valid, message: 'a'.repeat(3001) })).message).toBeDefined()
  })

  it('normaliza espacios y mayúsculas del correo', () => {
    expect(normalize({ ...valid, email: '  ANA@Correo.com ' }).email).toBe('ana@correo.com')
  })
})

describe('escapeHtml', () => {
  it('escapa caracteres HTML', () => {
    expect(escapeHtml('<b>"x" & \'y\'</b>')).toBe('&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;')
  })
})
