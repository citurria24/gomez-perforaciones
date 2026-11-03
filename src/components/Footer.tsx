import { company, nav } from '../data/site'
import { Logo } from './Logo'
import { SocialIcon, WhatsAppIcon } from './ui/BrandIcons'
import { container } from './ui/SectionHeading'

export function Footer() {
  const year = new Date().getFullYear()
  const link = 'text-white/75 transition-colors hover:text-white'

  return (
    <footer className="bg-navy-deep text-white">
      <div className={`${container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <Logo variant="light" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-white/70">{company.tagline} Hogares, establecimientos rurales y empresas en todo Uruguay.</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-sm font-semibold text-white">Secciones</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-4 space-y-2.5">
            {company.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className={link}>{p.label}</a>
              </li>
            ))}
            <li>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </li>
            {company.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                  <SocialIcon name={s.name} className="size-4" /> {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${container} flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between`}>
        <p>© {year} {company.name}. Uruguay.</p>
        <p>
          Diseño y desarrollo web por{' '}
          <a href={company.credit.href} target="_blank" rel="noopener noreferrer" className="text-white/85 underline-offset-4 hover:text-white hover:underline">
            {company.credit.name}
          </a>
        </p>
      </div>
    </footer>
  )
}
