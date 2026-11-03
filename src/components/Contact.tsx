import { Phone } from 'lucide-react'
import { company } from '../data/site'
import { ContactForm } from './ContactForm'
import { TikTokIcon, WhatsAppIcon } from './ui/BrandIcons'
import { ButtonLink } from './ui/Button'
import { container } from './ui/SectionHeading'

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-navy py-16 text-white sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>
        <div>
          <h2 id="contacto-title" className="text-[1.75rem] font-bold text-white sm:text-[2.125rem]">
            Pedí tu presupuesto
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/80">
            Contanos dónde se realizará el trabajo y qué tipo de proyecto tenés en mente.
          </p>

          <ButtonLink href={company.whatsappBudget} external variant="whatsapp" icon={<WhatsAppIcon />} className="mt-8 w-full sm:w-auto">
            Escribinos por WhatsApp
          </ButtonLink>

          <div className="mt-10 border-t border-white/15 pt-8">
            <h3 className="text-sm font-semibold text-white/70">Teléfonos</h3>
            <ul className="mt-3 space-y-2">
              {company.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="inline-flex min-h-11 items-center gap-3 text-xl font-semibold text-white hover:text-[#9fd0f0]">
                    <Phone className="size-5 text-[#9fd0f0]" aria-hidden="true" />
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold text-white/70">Redes sociales</h3>
            <ul className="mt-3">
              {company.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 font-medium text-white hover:text-[#9fd0f0]">
                    <TikTokIcon />
                    {s.name} {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-ink">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
