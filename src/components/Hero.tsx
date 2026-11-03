import { ArrowDown, Phone } from 'lucide-react'
import { company, hero } from '../data/site'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'
import { container } from './ui/SectionHeading'

// Datos reales de la web original, sin cifras agregadas.
const facts = [
  { title: 'Más de seis años de trabajo', text: 'Perforación de pozos de agua en todo Uruguay.' },
  { title: 'Para cada tipo de cliente', text: 'Hogares, establecimientos rurales y empresas.' },
  { title: 'Evaluación previa', text: 'Definimos el punto de perforación y el equipo según el terreno y la necesidad de agua.' },
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="border-b border-line bg-gradient-to-b from-white to-mist">
      <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-20`}>
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

        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
          {facts.map((f) => (
            <div key={f.title} className="bg-white px-6 py-5">
              <dt className="text-lg font-semibold text-navy">{f.title}</dt>
              <dd className="mt-1 text-slate">{f.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
