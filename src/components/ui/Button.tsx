import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'whatsapp' | 'outline' | 'ghost-light'

const styles: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  whatsapp: 'bg-wa text-white hover:bg-wa-hover',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.04]',
  'ghost-light': 'border border-white/30 text-white hover:bg-white/10',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  icon?: ReactNode
  external?: boolean
}

export function ButtonLink({ variant = 'primary', icon, external, className = '', children, ...rest }: Props) {
  return (
    <a
      {...rest}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg px-5 text-[0.98rem] font-semibold transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {icon}
      {children}
    </a>
  )
}
