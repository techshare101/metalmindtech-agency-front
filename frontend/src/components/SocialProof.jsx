const logos = [
    "NORTHWIND",
    "OBSIDIAN&CO",
    "VECTORHAUS",
    "ATLAS LABS",
    "MERIDIAN",
    "QUANTA HEALTH",
    "PRIMA / NYC",
    "IRON COUNCIL",
    "BLACKWELL",
    "FORTRESS AI",
];

const outcomes = [
    {
        kpi: "+$2.4M",
        unit: "ARR · 11 weeks",
        ctx: "PE-backed SaaS, churn → expansion engine",
    },
    {
        kpi: "+38%",
        unit: "Gross margin",
        ctx: "AI-rebuilt service ops, 220-person agency",
    },
    {
        kpi: "−71%",
        unit: "CAC",
        ctx: "Full-funnel agentic rebuild, DTC at $48M",
    },
    {
        kpi: "$840K",
        unit: "Recovered in 72h",
        ctx: "Stalled pipeline, healthtech Series B",
    },
];

export default function SocialProof() {
    const trail = [...logos, ...logos];
    return (
        <section
            data-testid="social-proof-section"
            className="border-y border-white/5 bg-[#0A0A0A] py-16 md:py-20"
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="mb-10 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                        / 02 — Operators behind closed doors
                    </p>
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/30">
                        Names withheld where required by NDA
                    </p>
                </div>

                {/* Marquee logo strip */}
                <div className="reveal relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent"
                    />
                    <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap py-4">
                        {trail.map((name, i) => (
                            <span
                                key={`${name}-${i}`}
                                data-testid={`logo-${i}`}
                                className="font-mono-plex select-none text-[12px] font-500 uppercase tracking-[0.32em] text-white/35 transition-colors duration-200 hover:text-white/85 md:text-[13px]"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Outcome grid */}
                <div className="reveal mt-14 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
                    {outcomes.map((o, i) => (
                        <div
                            key={i}
                            data-testid={`outcome-card-${i}`}
                            className="group relative bg-[#0E0E0E] p-7 transition-colors duration-300 hover:bg-[#121212]"
                        >
                            <span className="font-mono-plex absolute right-5 top-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                                0{i + 1}
                            </span>
                            <div className="font-display text-4xl font-800 tracking-tight text-white md:text-5xl">
                                {o.kpi}
                            </div>
                            <div className="font-mono-plex mt-2 text-[11px] uppercase tracking-[0.22em] text-[#E6843A]">
                                {o.unit}
                            </div>
                            <p className="mt-5 max-w-[26ch] text-[13px] leading-relaxed text-white/55">
                                {o.ctx}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
