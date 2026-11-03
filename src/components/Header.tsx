import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from './Logo'
import { company, nav } from '../data/site'
import { WhatsAppIcon } from './ui/BrandIcons'
import { container } from './ui/SectionHeading'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 ${
        scrolled || open ? 'border-line shadow-[0_6px_20px_-12px_rgb(18_62_115/0.25)]' : 'border-transparent'
      }`}
    >
      <div className={`${container} flex h-[4.5rem] items-center justify-between gap-6`}>
        <a href="#inicio" className="shrink-0" aria-label="Gómez Perforaciones, ir al inicio">
          <Logo className="h-11 w-auto sm:h-12" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-mist hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="hidden min-h-11 items-center rounded-lg bg-navy px-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-navy-deep sm:inline-flex"
          >
            Pedir presupuesto
          </a>
          <a
            href={company.whatsappBudget}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-11 items-center justify-center rounded-lg bg-wa text-white transition-colors hover:bg-wa-hover lg:hidden"
            aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
          >
            <WhatsAppIcon />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú móvil"
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ul className={`${container} flex flex-col py-3`}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line/70 text-lg font-medium text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 grid gap-3 pb-2 sm:grid-cols-2">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-navy font-semibold text-white"
                >
                  Pedir presupuesto
                </a>
                <a
                  href={company.phones[0].href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line font-semibold text-navy"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {company.phones[0].label}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
