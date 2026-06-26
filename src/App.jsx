import { useEffect, useMemo, useState } from 'react'
import { 
  Shield, 
  FileText, 
  Database, 
  Code, 
  Terminal, 
  Layers, 
  Grid, 
  CheckSquare, 
  RefreshCw, 
  MessageSquare 
} from 'lucide-react'

import resumenMd from '../docs_spiata/01_resumen_spiata.md?raw'
import sqliMd from '../docs_spiata/02_sqli_spiata.md?raw'
import xssMd from '../docs_spiata/03_xss_spiata.md?raw'
import comandosMd from '../docs_spiata/04_comandos_spiata.md?raw'
import activosMd from '../docs_spiata/05_activos_spiata.md?raw'
import matrizMd from '../docs_spiata/06_matriz_spiata.md?raw'
import controlesMd from '../docs_spiata/07_controles_spiata.md?raw'
import recuperacionMd from '../docs_spiata/08_recuperacion_spiata.md?raw'


import sqliImageUrl from '../docs_spiata/img_spiata/sqli_spiata.jpeg?url'
import xssImageUrl from '../docs_spiata/img_spiata/xss_spiata.jpeg?url'
import comandosImageUrl from '../docs_spiata/img_spiata/comandos_spiata.jpeg?url'

const markdownFiles = {
  '01_resumen_spiata': resumenMd,
  '02_sqli_spiata': sqliMd,
  '03_xss_spiata': xssMd,
  '04_comandos_spiata': comandosMd,
  '05_activos_spiata': activosMd,
  '06_matriz_spiata': matrizMd,
  '07_controles_spiata': controlesMd,
  '08_recuperacion_spiata': recuperacionMd,
}

const imageUrls = {
  'img_spiata/sqli_spiata.jpeg': sqliImageUrl,
  'img_spiata/xss_spiata.jpeg': xssImageUrl,
  'img_spiata/comandos_spiata.jpeg': comandosImageUrl,
}

function App() {
  // Estado para controlar qué documento de docs_spiata estamos visualizando
  const [seccionActiva, setSeccionActiva] = useState('01_resumen_spiata')
  const [markdown, setMarkdown] = useState(markdownFiles['01_resumen_spiata'] || 'Cargando...')

  // Mapeo de los archivos que vemos en image_9d9f3d.png
  const documentos = [
    { id: '01_resumen_spiata', label: '01. Resumen Ejecutivo', icon: FileText },
    { id: '02_sqli_spiata', label: '02. Vulnerabilidad SQLi', icon: Database },
    { id: '03_xss_spiata', label: '03. Vulnerabilidad XSS', icon: Code },
    { id: '04_comandos_spiata', label: '04. Comandos Utilizados', icon: Terminal },
    { id: '05_activos_spiata', label: '05. Inventario de Activos', icon: Layers },
    { id: '06_matriz_spiata', label: '06. Matriz de Riesgos', icon: Grid },
    { id: '07_controles_spiata', label: '07. Controles de Seguridad', icon: CheckSquare },
    { id: '08_recuperacion_spiata', label: '08. Plan de Recuperación', icon: RefreshCw },
  ]

  const documentoActivo = documentos.find((doc) => doc.id === seccionActiva) || documentos[0]
  const contenidoMarkdown = markdown.trim().length === 0 ? 'El archivo está vacío.' : markdown

  const markdownHtml = useMemo(() => {
    const resolveImageUrl = (src) => {
      const normalized = src.replace(/^\.\//, '')
      return imageUrls[normalized] || normalized
    }

    const renderInline = (text) => {
      return text
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
          const url = resolveImageUrl(src)
          return `<img src="${url}" alt="${alt}" class="markdown-image" />`
        })
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="markdown-code">$1</code>')
    }

    const lines = contenidoMarkdown.split('\n')
    let htmlLines = []
    let inList = false
    let inTable = false // NUEVO: Estado para saber si estamos procesando un cuadro

    lines.forEach((line) => {
      const trimmed = line.trim()

      // Si la línea empieza con una cabecera de Markdown
      if (/^#{1,6}\s+/.test(trimmed)) {
        if (inList) { htmlLines.push('</ul>'); inList = false; }
        if (inTable) { htmlLines.push('</tbody></table></div>'); inTable = false; } // Cerrar tabla si corresponde
        
        const level = trimmed.match(/^#{1,6}/)[0].length
        const content = trimmed.slice(level).trim()
        htmlLines.push(`<h${level} class="mt-6 mb-3 markdown-heading">${renderInline(content)}</h${level}>`)
        return
      }

      // Si la línea es un elemento de lista
      if (/^[-*]\s+/.test(trimmed)) {
        if (inTable) { htmlLines.push('</tbody></table></div>'); inTable = false; }
        if (!inList) {
          htmlLines.push('<ul class="markdown-list">')
          inList = true
        }
        const content = trimmed.replace(/^[-*]\s+/, '')
        htmlLines.push(`<li class="markdown-list-item">${renderInline(content)}</li>`) 
        return
      }

      // Si venía una lista y ya no hay guiones, la cerramos
      if (inList) {
        htmlLines.push('</ul>')
        inList = false
      }

      // NUEVO: Lógica para detectar y estructurar Cuadros / Tablas
      if (/^\|.+/.test(trimmed)) {
        // Ignorar la línea divisoria del Markdown (|---|---|...)
        if (/^\|[:\s-|-]+$/.test(trimmed)) {
          return; 
        }

        const cells = trimmed.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);

        if (!inTable) {
          // Es la primera fila, por ende la convertimos en la cabecera (thead) del cuadro
          inTable = true;
          htmlLines.push('<div class="overflow-x-auto my-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><table class="w-full text-left border-collapse bg-slate-800 text-white"><thead><tr class="bg-zinc-700 border-b-2 border-black">');
          cells.forEach(cell => {
            htmlLines.push(`<th class="p-3 font-black uppercase tracking-wider border-r-2 border-black text-xs">${renderInline(cell)}</th>`);
          });
          htmlLines.push('</tr></thead><tbody>');
        } else {
          // Son filas normales de contenido (tbody)
          htmlLines.push('<tr class="border-b border-zinc-700 hover:bg-slate-700/50">');
          cells.forEach(cell => {
            htmlLines.push(`<td class="p-3 border-r border-zinc-700 text-xs">${renderInline(cell)}</td>`);
          });
          htmlLines.push('</tr>');
        }
        return;
      }

      // Si venía un cuadro y la línea actual ya no tiene tuberías "|", cerramos la estructura
      if (inTable) {
        htmlLines.push('</tbody></table></div>');
        inTable = false;
      }

      // Línea horizontal
      if (/^---+$/.test(trimmed)) {
        htmlLines.push('<hr class="markdown-hr" />')
        return
      }

      // Línea vacía
      if (trimmed.length === 0) {
        htmlLines.push('')
        return
      }

      // Párrafo estándar
      htmlLines.push(`<p class="markdown-paragraph">${renderInline(trimmed)}</p>`)
    })

    // Asegurar cierres al final del archivo
    if (inList) htmlLines.push('</ul>');
    if (inTable) htmlLines.push('</tbody></table></div>');

    return htmlLines.join('\n')
  }, [contenidoMarkdown])
  
  useEffect(() => {
    setMarkdown(markdownFiles[seccionActiva] || 'No se encontró el archivo solicitado.')
  }, [seccionActiva])

  return (
    <div className="min-h-screen bg-app-bg flex flex-col p-4 md:p-8 font-mono text-app-text">
      
      {/* HEADER */}
      <header className="bg-app-accent border-4 border-app p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-app-inverted text-app-accent p-3 border-2 border-app shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Shield size={44} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
              Auditoría de Seguridad - Unidad 3
            </h1>
            <p className="font-bold bg-white/60 inline-block px-2 py-0.5 mt-2 border border-black text-sm">
              TI3034 - Fundamentos de Seguridad de la Información
            </p>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL EN DOS COLUMNAS (Estilo Brutalista) */}
      <main className="flex-1 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* COLUMNA IZQUIERDA: Menú de viñetas interactivas (docs_spiata) */}
        <section className="md:col-span-1 bg-app-panel border-4 border-app p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
          <h2 className="text-xl font-black uppercase tracking-wide mb-4 border-b-4 border-app pb-2 bg-app-panel-alt px-2 py-1">
            📂 docs_spiata
          </h2>
          <ul className="space-y-3">
            {documentos.map((doc) => {
              const IconComponent = doc.icon
              const esActivo = seccionActiva === doc.id
              return (
                <li key={doc.id}>
                  <button
                    onClick={() => setSeccionActiva(doc.id)}
                    className={`w-full text-left font-bold text-sm p-2 border-2 border-black flex items-center gap-3 transition-all cursor-pointer
                      ${esActivo 
                        ? 'bg-app-accent translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-app-panel hover:bg-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px]'
                      }`}
                  >
                    <IconComponent size={18} strokeWidth={2.5} className={esActivo ? 'text-black' : 'text-slate-700'} />
                    <span className="truncate">{doc.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* COLUMNA DERECHA: Visualizador del documento seleccionado */}
        <section className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-app-inverted text-app-inverted border-4 border-app p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 min-h-[300px]">
            <div className="text-app-accent font-bold text-xs uppercase mb-2 border-b border-zinc-700 pb-2">
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-black text-white uppercase mb-4">
                {documentoActivo.label}
              </h3>

              <div
                className="markdown-content mt-4 max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: markdownHtml }}
              />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-app-panel-alt border-4 border-app py-4 px-6 max-w-5xl mx-auto w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold mb-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-center sm:text-left text-sm">
          <span className="bg-white px-2 py-1 border border-black">
            Estudiante: Atalía Anaís Spielmann Flores
          </span>
          <span className="bg-black text-white px-2 py-1">
            Docente: Rubén Schnettler - INACAP Valparaíso
          </span>
        </div>
      </footer>

    </div>
  )
}

export default App