import type { ReactNode } from 'react'

type Props = { id: string; title: string; children?: ReactNode; light?: boolean }

export function SectionHeading({ id, title, children, light }: Props) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className={`text-[1.75rem] font-bold sm:text-[2.125rem] ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      {children && <p className={`mt-3 text-lg ${light ? 'text-white/80' : 'text-slate'}`}>{children}</p>}
    </div>
  )
}

export const container = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
