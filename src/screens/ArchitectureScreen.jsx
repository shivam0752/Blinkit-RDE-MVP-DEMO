import { motion } from 'framer-motion'
import { Cpu, CheckCircle2, AlertCircle, Rocket, Layers, ShieldCheck, Database, RefreshCw, Zap, Award, Sparkles } from 'lucide-react'
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
        </div>

        {/* ── 2. Block 1: Architecture — How It Works ── */}
        <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Cpu size={20} className="text-brand-green" />
            <h2 className="text-[16px] font-bold text-ink">Architecture — How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* Blinkit Production Systems */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <Database size={15} className="text-brand-green" />
                <span>Blinkit Production Systems</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                The engine draws from three real sources: Order History DB (actual transaction data), Product Catalog DB (live inventory), and classified barrier data from our AI Discovery Engine (Part 1's pipeline output).
              </p>
            </div>

            {/* Offline Batch Layer */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <RefreshCw size={15} className="text-brand-yellow-deep" />
                <span>Offline Batch Layer</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Runs weekly, scoped only to users active that week — this keeps the reasoning step cheap and fast, since it never runs live against every request.
              </p>
            </div>

            {/* Live Serving Layer */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <Zap size={15} className="text-accent-blue" />
                <span>Live Serving Layer</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                When a user searches or reaches checkout, the app does a fast lookup against the precomputed results — no live AI call sits in this path, which is what keeps response times near-instant.
              </p>
            </div>

            {/* Reassurance & Fallback Logic */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <ShieldCheck size={15} className="text-brand-green" />
                <span>Reassurance & Fallback Logic</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Every suggested item carries a reassurance line grounded in real classified barrier data for that category (trust, price, or authenticity) — never a generic or invented claim. If no genuinely relevant suggestion exists for a search, the system shows nothing rather than an unrelated item.
              </p>
            </div>

            {/* App Layer */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <Layers size={15} className="text-brand-green" />
                <span>App Layer</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Search results, product detail, cart review, and order confirmation all read from the same lookup service — these are Blinkit's actual production surfaces, not a separate demo environment.
              </p>
            </div>

            {/* Guardrails */}
            <div className="bg-[#f6f3f2] p-3.5 rounded-[12px] border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-ink font-bold text-[13px]">
                <Award size={15} className="text-accent-orange" />
                <span>Guardrails</span>
              </div>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Latency, return rate, and search relevance are monitored continuously to make sure the mechanism never degrades the core shopping experience.
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
          {/* Current Version (Phase 1) */}
          <div className="bg-surface rounded-[16px] border border-line p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <CheckCircle2 size={18} className="text-brand-green" />
              <h2 className="text-[15px] font-bold text-ink">Current Version (Phase 1)</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Two trigger points: search-results insertion and checkout-completion nudging</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Occasion-based matching across curated example categories, with a fallback rule for anything else</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Reassurance lines grounded in real classified barrier data, never generic or fabricated</span>
              </li>
              <li className="flex items-start gap-2 text-[12px] text-ink-mid leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                <span>Runs entirely against real Blinkit systems — order history, product catalog, and the existing AI classification pipeline</span>
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
                <span>No feedback-loop retraining — the reasoning logic doesn't yet learn from accept/ignore signals over time</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div className="bg-accent-blue-tint/40 p-3.5 rounded-[12px] border border-accent-blue/20 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-accent-blue uppercase tracking-wider">Phase 2</span>
              <p className="text-[12.5px] text-ink font-bold leading-tight">Life-Event & Pattern-Change Detection</p>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                The engine proactively surfaces relevant categories around real behavior shifts, not just active searches.
              </p>
            </div>

            <div className="bg-brand-green-tint/40 p-3.5 rounded-[12px] border border-brand-green/20 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-brand-green uppercase tracking-wider">Phase 3</span>
              <p className="text-[12.5px] text-ink font-bold leading-tight">Feedback-Loop Tuning</p>
              <p className="text-[11.5px] text-ink-mid leading-relaxed">
                Accept/ignore/purchase signals continuously refine which suggestions actually convert per user segment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
