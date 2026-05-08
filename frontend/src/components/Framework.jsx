const steps = [
    {
        n: "01",
        title: "Diagnose the Leak",
        body: "Three days. Twelve systems. Every dollar of trapped revenue mapped against the cost of inaction.",
        kpi: "Day 0 — 3",
    },
    {
        n: "02",
        title: "Engineer the Agents",
        body: "We design the 3 highest-leverage AI agents your operation needs — and how they integrate with the people you already have.",
        kpi: "Day 4 — 21",
    },
    {
        n: "03",
        title: "Recover the First Dollar",
        body: "Within 72 hours of deployment, you see real revenue movement on a metric you already track. If you don't — you don't pay.",
        kpi: "Day 22 — 25",
    },
    {
        n: "04",
        title: "Compound the Outcome",
        body: "We hand the system to your team with documentation, governance and a 90-day compounding plan. We exit on schedule.",
        kpi: "Day 26 — 90",
    },
];

export default function Framework() {
    return (
        <section
            id="method"
            data-testid="framework-section"
            className="relative border-t border-white/5 bg-[#0B0B0B] py-24 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="reveal max-w-3xl">
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                        / 04 — Method
                    </p>
                    <h2 className="font-display mt-5 text-4xl font-800 leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                        The Undeniable
                        <br />
                        Outcome Method.
                    </h2>
                    <p className="mt-7 text-[15px] leading-relaxed text-white/65 md:text-base">
                        Most AI agencies sell ambiguity. We sell a four-step
                        operating sequence with a dollar number attached to
                        every gate. If we miss a gate, you stop paying. That
                        simple.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((s, i) => (
                        <article
                            key={s.n}
                            data-testid={`framework-step-${i}`}
                            className="reveal group relative flex flex-col bg-[#0E0E0E] p-8 transition-colors duration-300 hover:bg-[#121212]"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <span className="font-display absolute right-6 top-6 text-[40px] font-800 leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-[#CC5500]/30 md:text-[64px]">
                                {s.n}
                            </span>

                            <div className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-[#E6843A]">
                                {s.kpi}
                            </div>
                            <h3 className="font-display mt-4 text-2xl font-700 leading-tight text-white md:text-[26px]">
                                {s.title}
                            </h3>
                            <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/60">
                                {s.body}
                            </p>

                            <div
                                aria-hidden="true"
                                className="mt-8 h-px w-12 bg-[#CC5500] transition-all duration-300 group-hover:w-24"
                            ></div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
