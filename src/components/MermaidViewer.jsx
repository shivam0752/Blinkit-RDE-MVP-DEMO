import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Initialize Mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
})

export default function MermaidViewer({ code }) {
  const containerRef = useRef(null)
  const [error, setError] = useState(null)
  const [svgContent, setSvgContent] = useState('')
  const renderIdRef = useRef(0)

  useEffect(() => {
    let isMounted = true

    async function renderDiagram() {
      if (!code.trim()) {
        setSvgContent('')
        setError(null)
        return
      }

      try {
        renderIdRef.current += 1
        const uniqueId = `mermaid-svg-${renderIdRef.current}`

        // Validate syntax first
        const valid = await mermaid.parse(code).catch((err) => {
          throw err
        })

        if (valid) {
          const { svg } = await mermaid.render(uniqueId, code)
          if (isMounted) {
            setSvgContent(svg)
            setError(null)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.str ?? err?.message ?? 'Syntax error in Mermaid diagram')
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [code])

  return (
    <div className="w-full h-full flex flex-col relative bg-surface rounded-[12px] border border-line overflow-hidden p-4">
      {error && (
        <div className="mb-3 p-3 bg-accent-red-tint border border-accent-red/30 rounded-[8px] text-[12px] text-accent-red flex items-start gap-2">
          <span className="font-bold flex-shrink-0">⚠️ Syntax Warning:</span>
          <span className="font-mono text-[11px] leading-tight flex-1 overflow-x-auto">{error}</span>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex-1 w-full overflow-auto flex items-center justify-center min-h-[420px] p-2 bg-white rounded-[8px] scrollbar-hide"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  )
}
