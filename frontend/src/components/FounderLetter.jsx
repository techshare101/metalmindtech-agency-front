const PORTRAIT =
    "https://images.unsplash.com/photo-1717023281538-296e93299e3a?crop=entropy&cs=srgb&fm=jpg&w=1400&q=80";

export default function FounderLetter() {
    return (
        <section
            id="letter"
            data-testid="founder-letter-section"
            className="relative border-t border-white/5 bg-[#0B0B0B] py-24 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Portrait + meta — asymmetrical */}
                    <div className="reveal lg:col-span-5">
                        <div className="relative">
                            <img
                                src={PORTRAIT}
                                alt="Portrait of the MetalMindTech founder"
                                data-testid="founder-portrait"
                                className="h-auto w-full max-w-md grayscale"
                                loading="lazy"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border border-[#CC5500]/40"
                            ></div>
                        </div>
                        <div className="mt-8 space-y-2">
                            <p className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-white/45">
                                Memorandum / Day 1
                            </p>
                            <p className="font-display text-xl font-700 text-white">
                                A. Voss
                            </p>
                            <p className="text-[13px] text-white/55">
                                Founder, MetalMindTech · ex–PE operator
                            </p>
                        </div>
                    </div>

                    {/* Letter copy */}
                    <article className="reveal lg:col-span-7">
                        <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                            / 06 — Founder&apos;s Letter
                        </p>
                        <h2 className="font-display mt-5 text-3xl font-800 leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
                            We are still on Day 1.
                        </h2>
                        <div className="prose-letter mt-8 space-y-5 text-[15px] leading-[1.85] text-white/70 md:text-base">
                            <p>
                                MetalMindTech exists because the AI consulting
                                market broke before it was ever built. Every
                                week, a new firm with a deck and a discount sells
                                a CEO a pile of theory that will never reach
                                production. The operator is left holding the
                                invoice and the backlog.
                            </p>
                            <p>
                                We chose a different posture. We treat every
                                engagement the way an acquirer treats a
                                diligence call:{" "}
                                <span className="text-white">
                                    where is the money trapped, and what is the
                                    fastest legal path to releasing it?
                                </span>{" "}
                                The audit is the report. The agents are the
                                wrench. The 72-hour guarantee is our way of
                                refusing to be paid for theatre.
                            </p>
                            <p>
                                We are small on purpose. Senior operators only.
                                No juniors, no offshoring, no &quot;customer
                                success&quot; layer between you and the person
                                building your system. We turn down most of who
                                asks. We owe the ones we accept an undeniable
                                outcome.
                            </p>
                            <p>
                                If you are a CEO or Founder running between $5M
                                and $250M, and you have already paid for AI
                                advice you can&apos;t deploy — the Audit is for
                                you. If we&apos;re not the right partner, we
                                will tell you in writing on day three and refund
                                the fee. That is the only kind of relationship
                                we know how to begin.
                            </p>
                            <p className="text-white">
                                We are still, and always, on Day 1.
                            </p>
                        </div>

                        <div className="font-mono-plex mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
                            <span className="inline-block h-px w-10 bg-white/30" />
                            Signed in obsidian, not in ink.
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
