// Esquema ilustrativo de un pozo de agua (sin escala ni medidas): muestra las etapas
// que la empresa describe — perforación, entubado, filtros en la napa y bomba.

const label = 'fill-navy text-[15px] font-semibold'
const note = 'fill-slate text-[13px]'

export function WellDiagram({ className = '' }: { className?: string }) {
  return (
    <figure className={className}>
      <svg viewBox="0 0 440 400" className="h-auto w-full" role="img" aria-labelledby="well-title well-desc">
        <title id="well-title">Esquema de un pozo de agua</title>
        <desc id="well-desc">
          Corte del terreno con el pozo entubado, los filtros a la altura de la napa acuífera y la bomba sumergida que eleva el agua a la superficie.
        </desc>

        {/* Estratos */}
        <rect x="0" y="92" width="440" height="58" fill="#e9eef3" />
        <rect x="0" y="150" width="440" height="80" fill="#dfe6ed" />
        <rect x="0" y="230" width="440" height="104" fill="#d6e9f7" />
        <rect x="0" y="334" width="440" height="66" fill="#cbd5df" />
        <g stroke="#1284ce" strokeOpacity=".28" strokeWidth="1.5" fill="none">
          {[252, 274, 296, 318].map((y) => (
            <path key={y} d={`M0 ${y} q 18 -5 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0 M268 ${y} q 18 -5 36 0 t 36 0 t 36 0 t 36 0 t 36 0`} />
          ))}
        </g>
        <line x1="0" y1="92" x2="440" y2="92" stroke="#123e73" strokeWidth="2" />

        {/* Pozo */}
        <rect x="194" y="92" width="52" height="262" fill="#ffffff" />
        <rect x="200" y="210" width="40" height="144" fill="#9fd0f0" />
        <g stroke="#123e73" strokeWidth="3">
          <line x1="200" y1="70" x2="200" y2="244" />
          <line x1="240" y1="70" x2="240" y2="244" />
        </g>
        {/* Filtros (ranurado) */}
        <g stroke="#123e73" strokeWidth="3" strokeDasharray="6 5">
          <line x1="200" y1="244" x2="200" y2="330" />
          <line x1="240" y1="244" x2="240" y2="330" />
        </g>
        <line x1="198" y1="330" x2="242" y2="330" stroke="#123e73" strokeWidth="3" />

        {/* Bomba y cañería */}
        <line x1="220" y1="64" x2="220" y2="282" stroke="#4b5c71" strokeWidth="4" />
        <rect x="210" y="282" width="20" height="38" rx="4" fill="#123e73" />
        <rect x="186" y="54" width="68" height="16" rx="3" fill="#123e73" />
        <path d="M254 62 h46 v-22 h40" stroke="#4b5c71" strokeWidth="4" fill="none" />
        <rect x="340" y="14" width="56" height="44" rx="5" fill="#ffffff" stroke="#123e73" strokeWidth="2.5" />
        <rect x="343" y="32" width="50" height="23" rx="2" fill="#9fd0f0" />

        {/* Rótulos */}
        <g>
          <line x1="250" y1="160" x2="300" y2="160" stroke="#123e73" strokeWidth="1" />
          <text x="306" y="164" className={label}>Entubado</text>
          <line x1="250" y1="292" x2="300" y2="292" stroke="#123e73" strokeWidth="1" />
          <text x="306" y="288" className={label}>Filtros</text>
          <text x="306" y="305" className={note}>según normativa</text>
          <line x1="140" y1="300" x2="208" y2="300" stroke="#123e73" strokeWidth="1" />
          <text x="18" y="296" className={label}>Bomba</text>
          <text x="18" y="313" className={note}>sumergida</text>
          <text x="18" y="252" className={label}>Napa acuífera</text>
          <text x="340" y="76" className={note}>Tanque</text>
          <text x="18" y="84" className={note}>Superficie</text>
        </g>
      </svg>
      <figcaption className="sr-only">Esquema ilustrativo, sin escala.</figcaption>
    </figure>
  )
}
