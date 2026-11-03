import { ArrowDown, Phone } from 'lucide-react'
import { company, hero } from '../data/site'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'
import { container } from './ui/SectionHeading'
import { WellDiagram } from './WellDiagram'

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="border-b border-line bg-gradient-to-b from-white to-mist">
      <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20`}>
        <div>
          <h1 id="hero-title" className="text-[2.25rem] font-bold sm:text-[2.75rem] lg:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate sm:text-xl sm:leading-relaxed">{hero.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={company.whatsappBudget} external variant="whatsapp" icon={<WhatsAppIcon />}>
              Pedir presupuesto por WhatsApp
            </ButtonLink>
            <ButtonLink href="#servicios" variant="outline" icon={<ArrowDown className="size-4" aria-hidden="true" />}>
              Ver servicios
            </ButtonLink>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-slate">
            <Phone className="size-4 text-water" aria-hidden="true" />
            También podés llamarnos:
            {company.phones.map((p, i) => (
              <span key={p.href}>
                <a href={p.href} className="font-semibold text-navy underline-offset-4 hover:underline">
                  {p.label}
                </a>
                {i < company.phones.length - 1 && <span aria-hidden="true"> /</span>}
              </span>
            ))}
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_20px_50px_-30px_rgb(18_62_115/0.45)] sm:p-6">
          <WellDiagram />
        </div>
      </div>
    </section>
  )
}
