import { about } from '../data/site'
import { container } from './ui/SectionHeading'

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="py-16 sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <h2 id="nosotros-title" className="text-[1.75rem] font-bold sm:text-[2.125rem]">
            {about.title}
          </h2>
          <p className="mt-4 text-lg text-slate">{about.lead}</p>
          <a href="#contacto" className="mt-6 inline-flex min-h-11 items-center font-semibold text-water-ink underline decoration-water/40 underline-offset-4 hover:decoration-water">
            Hacer una consulta
          </a>
        </div>

        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {about.points.map((p) => (
            <div key={p.title} className="border-t-2 border-navy pt-4">
              <dt className="text-lg font-semibold text-navy">{p.title}</dt>
              <dd className="mt-2 text-slate">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
