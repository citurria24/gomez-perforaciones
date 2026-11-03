// Contenido comercial tomado de la web original. No agregar cifras ni datos no verificados.

export const company = {
  name: 'Gómez Perforaciones',
  tagline: 'Perforación de pozos de agua.',
  phones: [
    { label: '+598 96 116 454', href: 'tel:+59896116454' },
    { label: '+598 99 243 610', href: 'tel:+59899243610' },
  ],
  whatsapp: 'https://wa.me/59896116454',
  whatsappBudget:
    'https://wa.me/59896116454?text=' +
    encodeURIComponent('Hola, quisiera solicitar un presupuesto para un pozo de agua.'),
  social: [
    { name: 'TikTok', handle: '@ros.gomez.perfora', href: 'https://www.tiktok.com/@ros.gomez.perfora' },
    { name: 'Instagram', handle: '@gomezperforacionesuy', href: 'https://www.instagram.com/gomezperforacionesuy' },
    { name: 'Facebook', handle: 'Gómez Perforaciones', href: 'https://www.facebook.com/profile.php?id=61596075454844' },
  ] as const,
  credit: { name: 'Carlos Iturria', href: 'https://www.linkedin.com/in/carlos-iturria/' },
}

export const nav = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Contacto', href: '#contacto' },
]

export const hero = {
  title: 'Perforación de pozos de agua',
  description:
    'Soluciones de agua subterránea para establecimientos rurales, empresas y hogares. Cada trabajo comienza con una evaluación de las necesidades y del terreno.',
}

export const about = {
  title: 'Más de seis años perforando pozos de agua en todo Uruguay',
  lead: 'Trabajamos para hogares, establecimientos rurales y empresas.',
  points: [
    {
      title: 'Qué hacemos',
      text: 'Perforación de pozos de agua, instalación de bombas, automatización, detección de napas, tanques y bebederos.',
    },
    {
      title: 'Para quién',
      text: 'Hogares, establecimientos rurales y empresas de todo el país.',
    },
    {
      title: 'Cómo empezamos',
      text: 'Cada proyecto comienza con la ubicación del lugar y la necesidad de agua del cliente, para definir el punto de perforación y el equipo adecuado.',
    },
    {
      title: 'Cómo terminamos',
      text: 'Entubado, filtros colocados según la normativa, limpieza del pozo y pruebas de bombeo antes de entregar.',
    },
  ],
}

export const services = [
  {
    icon: 'drill',
    title: 'Perforación de pozos de agua',
    text: 'Trabajos de perforación para la captación de agua subterránea, definidos según el terreno y el uso previsto.',
  },
  {
    icon: 'gauge',
    title: 'Instalación de bombas',
    text: 'Colocación de bombas e instalaciones adaptadas a las necesidades de cada pozo.',
  },
  {
    icon: 'cpu',
    title: 'Automatización de pozos',
    text: 'Sistemas de automatización para facilitar el funcionamiento y control de la instalación.',
  },
  {
    icon: 'radar',
    title: 'Detección de napas acuíferas',
    text: 'Búsqueda y evaluación del punto adecuado para realizar la perforación.',
  },
  {
    icon: 'container',
    title: 'Tanques y bebederos',
    text: 'Suministro e instalación de tanques y bebederos para establecimientos rurales y otros usos.',
  },
] as const

export const equipment = {
  title: 'Maquinaria e infraestructura para perforación',
  lead: 'Trabajamos con maquinaria de rotación y compresores de aire.',
  steps: [
    { title: 'Perforación', text: 'Maquinaria de rotación con compresores de aire.' },
    { title: 'Entubado', text: 'Luego de perforar, se entuba el pozo.' },
    { title: 'Filtros', text: 'Se colocan los filtros según la normativa.' },
    { title: 'Limpieza', text: 'Se realiza la limpieza del pozo.' },
    { title: 'Pruebas de bombeo', text: 'Se completan las pruebas de bombeo.' },
  ],
}
