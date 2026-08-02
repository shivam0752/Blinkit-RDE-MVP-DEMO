import { useState } from 'react'
import { Layers, Workflow } from 'lucide-react'
import MermaidViewer from './MermaidViewer.jsx'

const DECISION_FLOW_MERMAID = `flowchart TD
    A["Search or checkout event"] --> B["Match query to occasion"]
    B --> C["Filter: zero-history only"]
    C --> D{"Items survive?"}
    D -- yes --> E["Show items<br/><sup>+ trust reason</sup>"]
    D -- no --> F["Check fallback category"]
    F --> G{"Fallback survives?"}
    G -- yes --> H["Show fallback<br/><sup>+ trust reason</sup>"]
    G -- no --> I["Show 'Running low on this?'<br/><sup>Restock habitual • Excluded from metrics</sup>"]

    classDef trigger fill:#383838,stroke:#262626,color:#ffffff,font-weight:bold
    classDef process fill:#1b4985,stroke:#0f2b54,color:#ffffff,font-weight:bold
    classDef decision fill:#6d3e07,stroke:#452703,color:#fef08a,font-weight:bold
    classDef shown fill:#1b5816,stroke:#10380d,color:#ffffff,font-weight:bold
    classDef restock fill:#78350f,stroke:#451a03,color:#fef08a,font-weight:bold

    class A trigger
    class B,C,F process
    class D,G decision
    class E,H shown
    class I restock`

export default function ScoutDecisionFlow() {
  const [viewMode, setViewMode] = useState('visual') // 'visual' | 'mermaid'

  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-[16px] border border-line p-4 md:p-6 shadow-sm">
      {/* Header controls for diagram mode toggle */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <Workflow size={18} className="text-brand-green" />
          <span className="text-[13px] font-bold text-ink">Decision Flow Diagram</span>
        </div>
        <div className="flex items-center gap-1 bg-[#f6f3f2] p-1 rounded-[10px] border border-line">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-3 py-1 rounded-[7px] text-[11.5px] font-bold transition-all ${
              viewMode === 'visual'
                ? 'bg-white text-ink shadow-xs border border-line/60'
                : 'text-ink-mid hover:text-ink'
            }`}
          >
            Visual Diagram
          </button>
          <button
            onClick={() => setViewMode('mermaid')}
            className={`px-3 py-1 rounded-[7px] text-[11.5px] font-bold transition-all ${
              viewMode === 'mermaid'
                ? 'bg-white text-ink shadow-xs border border-line/60'
                : 'text-ink-mid hover:text-ink'
            }`}
          >
            Mermaid SVG
          </button>
        </div>
      </div>

      {viewMode === 'mermaid' ? (
        <div className="w-full min-h-[460px]">
          <MermaidViewer code={DECISION_FLOW_MERMAID} />
        </div>
      ) : (
        /* Visual High-Definition Diagram matching the specification image */
        <div className="w-full flex flex-col items-center gap-6 py-2 overflow-x-auto">
          <div className="w-full max-w-[620px] min-w-[500px] flex flex-col items-center select-none font-sans">
            {/* SVG Diagram Canvas */}
            <svg
              viewBox="0 0 580 540"
              className="w-full h-auto max-h-[600px] drop-shadow-xs"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Arrowhead marker */}
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#888888" />
                </marker>
              </defs>

              {/* 1. TRIGGER: Search or checkout event */}
              <g transform="translate(140, 10)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="44"
                  rx="7"
                  fill="#3a3a3a"
                  stroke="#262626"
                  strokeWidth="1.5"
                />
                <text
                  x="110"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Search or checkout event
                </text>
              </g>

              {/* Arrow 1 -> Match query */}
              <line
                x1="250"
                y1="54"
                x2="250"
                y2="78"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              {/* 2. PROCESS: Match query to occasion */}
              <g transform="translate(140, 80)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="44"
                  rx="7"
                  fill="#0e4884"
                  stroke="#08315c"
                  strokeWidth="1.5"
                />
                <text
                  x="110"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Match query to occasion
                </text>
              </g>

              {/* Arrow 2 -> Filter: zero-history only */}
              <line
                x1="250"
                y1="124"
                x2="250"
                y2="148"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              {/* 3. PROCESS: Filter: zero-history only */}
              <g transform="translate(140, 150)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="44"
                  rx="7"
                  fill="#0e4884"
                  stroke="#08315c"
                  strokeWidth="1.5"
                />
                <text
                  x="110"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Filter: zero-history only
                </text>
              </g>

              {/* Arrow 3 -> Items survive? */}
              <line
                x1="250"
                y1="194"
                x2="250"
                y2="218"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              {/* 4. DECISION: Items survive? */}
              <g transform="translate(250, 245)">
                <polygon
                  points="0,-25 70,0 0,25 -70,0"
                  fill="#693b04"
                  stroke="#472600"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#eab308"
                  fontSize="12"
                  fontWeight="700"
                >
                  Items survive?
                </text>
              </g>

              {/* Right Branch (YES) -> Show items */}
              <line
                x1="320"
                y1="245"
                x2="418"
                y2="245"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <text x="350" y="240" fill="#999999" fontSize="11" fontWeight="600">
                yes
              </text>

              {/* SHOWN BLOCK 1: Show items */}
              <g transform="translate(420, 220)">
                <rect
                  x="0"
                  y="0"
                  width="145"
                  height="50"
                  rx="7"
                  fill="#1b5816"
                  stroke="#10380d"
                  strokeWidth="1.5"
                />
                <text
                  x="72"
                  y="22"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Show items
                </text>
                <text
                  x="72"
                  y="38"
                  textAnchor="middle"
                  fill="#86efac"
                  fontSize="11"
                  fontWeight="500"
                >
                  + trust reason
                </text>
              </g>

              {/* Down Branch (NO) -> Check fallback category */}
              <line
                x1="250"
                y1="270"
                x2="250"
                y2="313"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <text x="256" y="295" fill="#999999" fontSize="11" fontWeight="600">
                no
              </text>

              {/* 5. PROCESS: Check fallback category */}
              <g transform="translate(140, 315)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="44"
                  rx="7"
                  fill="#0e4884"
                  stroke="#08315c"
                  strokeWidth="1.5"
                />
                <text
                  x="110"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Check fallback category
                </text>
              </g>

              {/* Arrow -> Fallback survives? */}
              <line
                x1="250"
                y1="359"
                x2="250"
                y2="383"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              {/* 6. DECISION: Fallback survives? */}
              <g transform="translate(250, 410)">
                <polygon
                  points="0,-25 70,0 0,25 -70,0"
                  fill="#693b04"
                  stroke="#472600"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#eab308"
                  fontSize="11.5"
                  fontWeight="700"
                >
                  Fallback survives?
                </text>
              </g>

              {/* Right Branch (YES) -> Show fallback */}
              <line
                x1="320"
                y1="410"
                x2="418"
                y2="410"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <text x="350" y="405" fill="#999999" fontSize="11" fontWeight="600">
                yes
              </text>

              {/* SHOWN BLOCK 2: Show fallback */}
              <g transform="translate(420, 385)">
                <rect
                  x="0"
                  y="0"
                  width="145"
                  height="50"
                  rx="7"
                  fill="#1b5816"
                  stroke="#10380d"
                  strokeWidth="1.5"
                />
                <text
                  x="72"
                  y="22"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                >
                  Show fallback
                </text>
                <text
                  x="72"
                  y="38"
                  textAnchor="middle"
                  fill="#86efac"
                  fontSize="11"
                  fontWeight="500"
                >
                  + trust reason
                </text>
              </g>

              {/* Down Branch (NO) -> Show nothing */}
              <line
                x1="250"
                y1="435"
                x2="250"
                y2="478"
                stroke="#888888"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <text x="256" y="460" fill="#999999" fontSize="11" fontWeight="600">
                no
              </text>

              {/* 7. HABITUAL RESTOCK FALLBACK: Show "Running low on this?" */}
              <g transform="translate(130, 480)">
                <rect
                  x="0"
                  y="0"
                  width="240"
                  height="50"
                  rx="7"
                  fill="#78350f"
                  stroke="#451a03"
                  strokeWidth="1.5"
                />
                <text
                  x="120"
                  y="22"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12.5"
                  fontWeight="700"
                >
                  Show "Running low on this?"
                </text>
                <text
                  x="120"
                  y="38"
                  textAnchor="middle"
                  fill="#fef08a"
                  fontSize="10.5"
                  fontWeight="500"
                >
                  Restock habitual • Excluded from metrics
                </text>
              </g>
            </svg>

            {/* Footnote text directly below diagram */}
            <p className="text-[11.5px] text-ink-soft text-center leading-relaxed mt-4 max-w-[540px]">
              Every shown suggestion is split across search and checkout, and marks its category
              instantly once purchased — if both occasion and Section 2a fallback pools produce no zero-history items, Scout surfaces a "Running low on this?" habitual restock card (excluded from discovery metrics).
            </p>

            {/* Color Legend Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-line/60 w-full text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#3a3a3a] inline-block" />
                <span className="font-semibold text-ink-mid text-[11px]">Trigger</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0e4884] inline-block" />
                <span className="font-semibold text-ink-mid text-[11px]">Process</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#693b04] inline-block" />
                <span className="font-semibold text-ink-mid text-[11px]">Decision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#1b5816] inline-block" />
                <span className="font-semibold text-ink-mid text-[11px]">Shown</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#78350f] inline-block" />
                <span className="font-semibold text-ink-mid text-[11px]">Habitual restock</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
