import { useId } from 'react'

type Props = { className?: string; variant?: 'color' | 'light' }

// Logotipo vectorial reconstruido a partir del logo de la empresa (gota + ondas + logotipo).
// Si se dispone del SVG original, reemplazar este componente por <img src="/brand/logo.svg">.
export function Logo({ className, variant = 'color' }: Props) {
  const id = useId().replace(/:/g, '')
  const text = variant === 'light' ? '#ffffff' : '#123e73'
  const sub = variant === 'light' ? '#b9cde3' : '#6b7a8c'

  return (
    <svg viewBox="0 0 272 80" className={className} role="img" aria-label="Gómez Perforaciones — Pozos de agua">
      <defs>
        <linearGradient id={`drop-${id}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#6cc6f7" />
          <stop offset="0.55" stopColor="#1284ce" />
          <stop offset="1" stopColor="#0b4f94" />
        </linearGradient>
      </defs>
      <path d="M44 4C44 4 27 25 27 38a17 17 0 0 0 34 0C61 25 44 4 44 4Z" fill={`url(#drop-${id})`} />
      <path d="M35 37a9 9 0 0 0 5 9" stroke="#fff" strokeOpacity=".75" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 62c14-9 30-9 44-3s28 6 38-2c-8 12-26 15-40 9S20 56 8 62Z" fill="#1284ce" />
      <path d="M14 70c14-6 28-5 40 0s24 4 32-4c-6 10-20 13-32 9s-26-8-40-5Z" fill={variant === 'light' ? '#7fb8e6' : '#123e73'} />
      <path d="M52 69c12 4 26 3 36-7-3 9-16 15-30 12Z" fill="#3fa34d" />

      <text x="102" y="36" fill={text} fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="31" textLength="104" lengthAdjust="spacingAndGlyphs">
        GÓMEZ
      </text>
      <text x="102" y="55" fill={text} fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" textLength="166" lengthAdjust="spacing">
        PERFORACIONES
      </text>
      <rect x="102" y="61" width="168" height="1.6" fill="#1284ce" />
      <text x="102" y="74" fill={sub} fontFamily="Arial, Helvetica, sans-serif" fontSize="8.5" textLength="70" lengthAdjust="spacing">
        POZOS DE AGUA
      </text>
    </svg>
  )
}
