import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { company } from '../data/site'
import { trabajos } from '../data/trabajos'
import { TikTokIcon } from './ui/BrandIcons'
import { ButtonLink } from './ui/Button'
import { SectionHeading, container } from './ui/SectionHeading'

export function Works() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const tiktok = company.social[0]

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (d: number) => setIndex((i) => (i + d + trabajos.length) % trabajos.length)
  const current = trabajos[index]

  return (
    <section id="trabajos" aria-labelledby="trabajos-title" className="bg-mist py-16 sm:py-24">
      <div className={container}>
        <SectionHeading id="trabajos-title" title="Trabajos realizados">
          {trabajos.length
            ? 'Algunas fotografías de pozos e instalaciones realizadas.'
            : 'Mostramos el avance de nuestros trabajos en TikTok mientras preparamos esta galería.'}
        </SectionHeading>

        {trabajos.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {trabajos.map((t, i) => (
              <li key={t.src}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-line"
                  aria-label={`Ampliar foto: ${t.alt}`}
                >
                  <img
                    src={t.src}
                    alt={t.alt}
                    width={t.width}
                    height={t.height}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-2 bottom-2 rounded-md bg-navy/80 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ZoomIn className="size-4" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-5 rounded-xl border border-dashed border-navy/25 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-lg text-slate">
              Videos de perforaciones, entubado e instalaciones en <strong className="font-semibold text-navy">{tiktok.handle}</strong>.
            </p>
            <ButtonLink href={tiktok.href} external variant="primary" icon={<TikTokIcon />}>
              Ver trabajos en TikTok
            </ButtonLink>
          </div>
        )}
      </div>

      {trabajos.length > 0 && (
        <dialog
          ref={dialogRef}
          className="lightbox m-auto max-h-[92vh] w-[min(92vw,1100px)] bg-transparent p-0"
          aria-label="Foto ampliada"
          onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
          }}
        >
          {current && (
            <figure className="relative">
              <img src={current.src} alt={current.alt} className="mx-auto max-h-[82vh] w-auto rounded-lg object-contain" />
              <figcaption className="mt-3 text-center text-white/85">{current.alt}</figcaption>
            </figure>
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            {trabajos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="rounded-md bg-white/90 p-2.5 text-navy" aria-label="Foto anterior">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} className="rounded-md bg-white/90 p-2.5 text-navy" aria-label="Foto siguiente">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
            <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-md bg-white/90 p-2.5 text-navy" aria-label="Cerrar" autoFocus>
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </dialog>
      )}
    </section>
  )
}
