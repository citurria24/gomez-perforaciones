import { Container, Cpu, Drill, Gauge, Radar, type LucideIcon } from 'lucide-react'
import { services } from '../data/site'
import { SectionHeading, container } from './ui/SectionHeading'

const icons: Record<(typeof services)[number]['icon'], LucideIcon> = {
  drill: Drill,
  gauge: Gauge,
  cpu: Cpu,
  radar: Radar,
  container: Container,
}

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-mist py-16 sm:py-24">
      <div className={container}>
        <SectionHeading id="servicios-title" title="Servicios">
          Desde la búsqueda del punto de perforación hasta la instalación que lleva el agua a donde se necesita.
        </SectionHeading>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            const featured = i === 0
            return (
              <li
                key={s.title}
                className={`rounded-xl border p-6 transition-shadow duration-200 hover:shadow-[0_12px_30px_-18px_rgb(18_62_115/0.4)] ${
                  featured ? 'border-navy bg-navy text-white sm:col-span-2 lg:p-8' : 'border-line bg-white'
                }`}
              >
                <span
                  className={`inline-flex size-11 items-center justify-center rounded-lg ${featured ? 'bg-white/10 text-white' : 'bg-water-soft text-water-ink'}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className={`mt-4 text-xl font-semibold ${featured ? 'text-white lg:text-2xl' : ''}`}>{s.title}</h3>
                <p className={`mt-2 ${featured ? 'max-w-md text-white/80' : 'text-slate'}`}>{s.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
