import { motion } from 'framer-motion'
import { Cpu, CheckCircle2, AlertCircle, Rocket, Layers, ShieldCheck, Database, RefreshCw, Zap, Award, Sparkles, Server, Filter, Activity } from 'lucide-react'
import { DEFAULT_MERMAID_CODE } from '../data/mermaidCode.js'
import MermaidViewer from '../components/MermaidViewer.jsx'

export default function ArchitectureScreen() {
  return (
    <div className="flex-1 w-full min-h-screen bg-[#f6f3f2] p-4 lg:p-6 overflow-y-auto scrollbar-hide">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-6 pb-12">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface p-5 rounded-[16px] border border-line shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-green-tint text-brand-green text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Section 2
              </span>
              <h1 className="text-xl font-extrabold text-ink">System Architecture & Roadmap</h1>
            </div>
            <p className="text-[12.5px] text-ink-soft mt-1">
              Complete End-to-End System Design, Current Capabilities, Out-of-Scope Boundaries, and Future Roadmap
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-accent-blue-tint text-accent-blue text-[11.5px] font-bold px-3 py-1 rounded-[8px] border border-accent-blue/20">
              Interactive System Flowchart
            </span>
          </div>
        </div>

        {/* ── 1. Full-Width Rendered Mermaid Flowchart Diagram ── */}
        <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-brand-green" />
              <h2 className="text-[15px] font-bold text-ink">System Architecture Diagram</h2>
            </div>
            <span className="text-[11px] font-bold text-ink-soft">Dynamic SVG Renderer</span>
          </div>

          <div className="w-full min-h-[460px] bg-white rounded-[12px] p-2 overflow-hidden">
            <MermaidViewer code={DEFAULT_MERMAID_CODE} />
          </div>

          {/* Color Key / Legend Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-line/60 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#1b4985] inline-block" />
              <span className="font-semibold text-ink-mid">Data & batch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#07593e] inline-block" />
              <span className="font-semibold text-ink-mid">Live serving</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#7c2d12] inline-block" />
              <span className="font-semibold text-ink-mid">Guardrail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#3c3689] inline-block" />
              <span className="font-semibold text-ink-mid">App surfaces</span>
            </div>
          </div>
        </div>

        {/* ── 2. Block 1: Architecture — How It Works ── */}
        <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Cpu size={20} className="text-brand-green" />
            <h2 className="text-[16px] font-bold text-ink">Architecture — How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Data Sources (blue) */}
            <div className="bg-[#f0f4f9] p-3.5 rounded-[12px] border border-[#1b4985]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#1b4985]">
                <Database size={15} />
                <span>Data Sources</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Three real Blinkit systems feed the engine — the Order History DB (actual transaction data), the Product Catalog DB (live inventory), and classified barrier data from the AI Discovery Engine (Part 1 pipeline).
              </p>
            </div>

            {/* 2. Occasion & Adjacency Reasoning Job (blue) */}
            <div className="bg-[#f0f4f9] p-3.5 rounded-[12px] border border-[#1b4985]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#1b4985]">
                <RefreshCw size={15} />
                <span>Occasion & Adjacency Job</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Runs weekly, offline, scoped only to users active that week. This is where actual AI reasoning happens — matching user habits to one relevant, unexplored category using occasion-based logic, not random swaps.
              </p>
            </div>

            {/* 3. Precomputed Store (blue) */}
            <div className="bg-[#f0f4f9] p-3.5 rounded-[12px] border border-[#1b4985]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#1b4985]">
                <Server size={15} />
                <span>Precomputed Store</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                The output of that weekly job — a ready-made suggestion sitting in wait for each eligible user, so nothing needs to be calculated live during shopping sessions.
              </p>
            </div>

            {/* 4. Lookup Service (teal) */}
            <div className="bg-[#edf7f3] p-3.5 rounded-[12px] border border-[#07593e]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#07593e]">
                <Zap size={15} />
                <span>Lookup Service</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                The only part of the system that runs live. When a real user searches or reaches checkout, this simply retrieves the already-computed suggestion — a fast database read, keeping response time near-instant.
              </p>
            </div>

            {/* 5. Reassurance Lines (teal) */}
            <div className="bg-[#edf7f3] p-3.5 rounded-[12px] border border-[#07593e]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#07593e]">
                <ShieldCheck size={15} />
                <span>Reassurance Lines</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Paired with every retrieved suggestion — a line grounded in real classified barrier data about that category's actual blocker (trust, price, or authenticity), never invented.
              </p>
            </div>

            {/* 6. Fallback Logic (teal) */}
            <div className="bg-[#edf7f3] p-3.5 rounded-[12px] border border-[#07593e]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#07593e]">
                <Filter size={15} />
                <span>Fallback Logic</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                If nothing genuinely relevant was precomputed for a user, this decides the outcome — surface something coherent from a related category, or show nothing at all. An incoherent suggestion is never allowed.
              </p>
            </div>

            {/* 7. Guardrails (coral) */}
            <div className="bg-[#fdf2ee] p-3.5 rounded-[12px] border border-[#7c2d12]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#7c2d12]">
                <Activity size={15} />
                <span>Guardrails</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Monitor the Lookup Service continuously — latency, return rate, and search relevance must stay within bounds, so the mechanism never costs more than it earns.
              </p>
            </div>

            {/* 8. App Surfaces (purple) */}
            <div className="bg-[#f1f0fb] p-3.5 rounded-[12px] border border-[#3c3689]/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-[13px] text-[#3c3689]">
                <Layers size={15} />
                <span>App Surfaces</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                The Lookup Service serves exactly two entry points — Search Results and Cart Review — which lead into Product Detail and Order Confirmation respectively, both converging at Order Confirmation once a purchase completes.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. Block 2: Why Our Solution Will Work ── */}
        <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Sparkles size={20} className="text-brand-yellow-deep" />
            <h2 className="text-[16px] font-bold text-ink">Why Our Solution Will Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">No Live AI Calls in Request Path</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    Search and checkout only do a fast, near-free lookup against precomputed results, so cost never scales with live traffic volume.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">Batch Reasoning Scoped to Active Users</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    Runs weekly, scoped only to users active that week — not the full 16.9M MAU every cycle, so compute cost tracks actual engagement, not total user base size.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">Latency Stays Under 50ms</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    Since the AI reasoning already happened offline, the app's core 10-minute-delivery speed is never at risk from this feature.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">Effort is Incremental, Not a Rebuild</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    RDE reuses the same classification infrastructure already built for the AI Discovery Engine (Part 1), so it's an extension of existing work, not a new system from scratch.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">Targets a Validated Root Cause</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    Three independent research methods (AI engine, survey, interviews) converged on the same blocker, so the mechanism is built to fix something proven, not assumed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  6
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">Works With Existing Behavior</p>
                  <p className="text-[11.5px] text-ink-mid leading-relaxed mt-1">
                    Occasion-based suggestions ride moments users are already in (searching, checking out), so adoption doesn't require teaching anyone a new habit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Block 3: Current Version (Phase 1) & Out-of-Scope ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Version (Phase 1 — as built in this MVP) */}
          <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <CheckCircle2 size={18} className="text-brand-green" />
              <h2 className="text-[15px] font-bold text-ink">Current Version (Phase 1 — as built in this MVP)</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Two trigger points: search-results insertion and checkout-completion nudging</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Occasion-based matching across four curated example searches, with category-level fallback for anything else</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Fallback shows nothing rather than an incoherent suggestion — a wrong suggestion is worse than none</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Three selectable personas demonstrate how the mechanism adapts to different purchase histories</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>"Why you're seeing this" panel shows two grounded reasons — a cohort pattern and a real category trust stat — plus a one-tap opt-out</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Every search screen shows 5-6 real product results alongside 2-3 RDE suggestions, so the app feels fully populated</span>
              </li>
            </ul>
          </div>

          {/* What This Version Does Not Cover */}
          <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <AlertCircle size={18} className="text-accent-red" />
              <h2 className="text-[15px] font-bold text-ink">What This Version Does Not Cover</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 flex-shrink-0" />
                <span>No life-event or behavior-change detection (e.g., recognizing a first-time baby product order as a signal on its own)</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 flex-shrink-0" />
                <span>No feedback-loop retraining — suggestions don't yet learn from accept/ignore signals over time</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 flex-shrink-0" />
                <span>No real backend integration — purchase history and product data are mocked for this demo; the architecture above shows how that connection would work in production</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 flex-shrink-0" />
                <span>No monetary incentives (discounts, refunds, samples) anywhere in the mechanism, by design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── 5. Block 4: Future Scope ── */}
        <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Rocket size={18} className="text-accent-blue" />
            <h2 className="text-[15px] font-bold text-ink">Future Scope</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            <div className="bg-accent-blue-tint/40 p-3.5 rounded-[12px] border border-accent-blue/20 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-accent-blue uppercase tracking-wider">Phase 2</span>
              <p className="text-[12.5px] text-ink font-bold leading-tight">Life-Event & Pattern-Change Detection</p>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Recognizing first-time signals around major life events and behavior shifts.
              </p>
            </div>

            <div className="bg-brand-green-tint/40 p-3.5 rounded-[12px] border border-brand-green/20 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-brand-green uppercase tracking-wider">Phase 3</span>
              <p className="text-[12.5px] text-ink font-bold leading-tight">Feedback-Loop Tuning</p>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Continuously tuning suggestions based on real-time accept/ignore signals over time.
              </p>
            </div>

            <div className="bg-brand-yellow-tint/40 p-3.5 rounded-[12px] border border-brand-yellow-deep/20 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-brand-yellow-deep uppercase tracking-wider">Production</span>
              <p className="text-[12.5px] text-ink font-bold leading-tight">Full Production Integration</p>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Replacing mocked data structures with live, production Blinkit databases and serving systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

