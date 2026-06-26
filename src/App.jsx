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

const markdownImports = import.meta.glob('../docs_spiata/*.md', { as: 'raw' })
const imageImports = import.meta.glob('../docs_spiata/img_spiata/*', { as: 'url', eager: true })

function App() {
  // Estado para controlar qué documento de docs_spiata estamos visualizando
  const [seccionActiva, setSeccionActiva] = useState('01_resumen_spiata')
  const [markdown, setMarkdown] = useState('Cargando...')

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
    { id: '09_prompts_spiata', label: '09. Prompts de IA Utilizados', icon: MessageSquare },
  ]

  const documentoActivo = documentos.find((doc) => doc.id === seccionActiva) || documentos[0]
  const contenidoMarkdown = markdown.trim().length === 0 ? 'El archivo está vacío.' : markdown

  const markdownHtml = useMemo(() => {
    const resolveImageUrl = (src) => {
      const normalized = src.replace(/^\.\//, '')
      const key = normalized.startsWith('img_spiata/') ? `../docs_spiata/${normalized}` : normalized
      return imageImports[key] || normalized
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

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (/^#{1,6}\s+/.test(trimmed)) {
        if (inList) {
          htmlLines.push('</ul>')
          inList = false
        }
        const level = trimmed.match(/^#{1,6}/)[0].length
        const content = trimmed.slice(level).trim()
        htmlLines.push(`<h${level} class="mt-6 mb-3 markdown-heading">${renderInline(content)}</h${level}>
`)
        return
      }

      if (/^[-*]\s+/.test(trimmed)) {
        if (!inList) {
          htmlLines.push('<ul class="markdown-list">')
          inList = true
        }
        const content = trimmed.replace(/^[-*]\s+/, '')
        htmlLines.push(`<li class="markdown-list-item">${renderInline(content)}</li>`) 
        return
      }

      if (inList) {
        htmlLines.push('</ul>')
        inList = false
      }

      if (/^---+$/.test(trimmed)) {
        htmlLines.push('<hr class="markdown-hr" />')
        return
      }

      if (trimmed.length === 0) {
        htmlLines.push('')
        return
      }

      htmlLines.push(`<p class="markdown-paragraph">${renderInline(trimmed)}</p>`)
    })

    if (inList) {
      htmlLines.push('</ul>')
    }

    return htmlLines.join('\n')
  }, [contenidoMarkdown])

  useEffect(() => {
    const importPath = `../docs_spiata/${seccionActiva}.md`
    const importFile = markdownImports[importPath]
    if (!importFile) {
      setMarkdown('No se encontró el archivo solicitado.')
      return
    }

    importFile()
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown('Error al cargar el archivo.'))
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
              Visualizando archivo: docs_spiata/{seccionActiva}.md
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