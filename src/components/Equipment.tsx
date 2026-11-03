import { equipment } from '../data/site'
import { container } from './ui/SectionHeading'

export function Equipment() {
  return (
    <section id="equipo" aria-labelledby="equipo-title" className="py-16 sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <h2 id="equipo-title" className="text-[1.75rem] font-bold sm:text-[2.125rem]">
            {equipment.title}
          </h2>
          <p className="mt-4 text-lg text-slate">{equipment.lead}</p>
          <p className="mt-3 text-slate">Así avanza cada trabajo, de la perforación a la entrega del pozo funcionando.</p>
        </div>

        <ol className="relative">
          {equipment.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[1.5rem_1fr] gap-4 pb-7 last:pb-0">
              {i < equipment.steps.length - 1 && (
                <span className="absolute top-6 bottom-0 left-[0.6875rem] w-0.5 bg-line" aria-hidden="true" />
              )}
              <span className="relative mt-1 size-6 rounded-full border-[3px] border-water bg-white" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-slate">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
