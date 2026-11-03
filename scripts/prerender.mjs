// Prerenderizado estático: inserta el HTML de React en dist/index.html para que
// el contenido esté presente sin JavaScript (SEO) y luego se hidrate en el cliente.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist/index.html')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const template = await readFile(htmlPath, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Falta el marcador <!--app-html--> en index.html')
await writeFile(htmlPath, template.replace('<!--app-html-->', render()))
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('✓ Prerender: dist/index.html')
