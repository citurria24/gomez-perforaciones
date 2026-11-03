// Galería de trabajos realizados.
// Para agregar fotos: copiarlas a public/images/trabajos/ (idealmente .webp, ~1600px de lado mayor)
// y sumar una entrada por foto. Usar solo fotografías reales de trabajos de la empresa.
// `alt` debe describir lo que se ve, sin inventar ubicaciones ni nombres de proyectos.

export type Trabajo = {
  src: string
  alt: string
  width: number
  height: number
}

export const trabajos: Trabajo[] = [
  // { src: '/images/trabajos/pozo-01.webp', alt: 'Equipo de perforación trabajando en un campo', width: 1600, height: 1200 },
]
