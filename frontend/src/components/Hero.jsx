import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLeadForm } from "@/components/LeadFormProvider";
import { FORGE_URL } from "@/lib/constants";

const HERO_BG =
    "https://images.unsplash.com/photo-1604591263412-b6d3ea4e2aac?crop=entropy&cs=srgb&fm=jpg&w=2400&q=80";

export default function Hero() {
    const { open } = useLeadForm();

    return (
        <section
            data-testid="hero-section"
            className="relative isolate overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32"
        >
            {/* Background image with heavy overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${HERO_BG})` }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/85 to-[#0A0A0A]"
            />
            {/* Soft copper glow off-axis */}
            <div
                aria-hidden="true"
                className="copper-glow-soft absolute -right-32 top-20 -z-10 h-[420px] w-[420px] rounded-full"
            />

            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
                    <div className="reveal lg:col-span-8">
                        {/* Eyebrow */}
                        <div
                            className="font-mono-plex mb-7 inline-flex items-center gap-3 border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-white/65"
                            data-testid="hero-eyebrow"
                        >
                            <span className="inline-block h-1.5 w-1.5 bg-[#CC5500]"></span>
                            For CEOs &amp; Founders / Year XII
                            <span className="hidden text-white/30 sm:inline">
                                ·
                            </span>
                            <span className="hidden sm:inline">
                                The Undeniable Outcome Co.
                            </span>
                        </div>

                        <h1
                            data-testid="hero-headline"
                            className="font-display text-[44px] font-800 leading-[0.98] tracking-[-0.025em] text-white sm:text-[56px] md:text-[72px] lg:text-[88px]"
                        >
                            We extract the revenue
                            <br />
                            <span className="text-white/55">
                                trapped inside your
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-white">
                                    operation.
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-1 -z-0 h-[10px] bg-[#CC5500]/55 md:bottom-2 md:h-[14px]"
                                ></span>
                            </span>
                        </h1>

                        <p
                            data-testid="hero-subheadline"
                            className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
                        >
                            MetalMindTech is the AI deployment partner for
                            companies between{" "}
                            <span className="text-white">$5M and $250M</span> in
                            revenue. We don&apos;t sell software, decks, or
                            advisory hours. We deliver one thing:{" "}
                            <span className="text-white">
                                the Undeniable Outcome
                            </span>
                            &nbsp;— measurable revenue your business was already
                            owed.
                        </p>

                        {/* Dual CTAs */}
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={() => open("audit")}
                                data-testid="hero-cta-book-audit"
                                className="btn-copper inline-flex items-center justify-center gap-3 px-6 py-4 text-[12px] font-medium uppercase tracking-[0.22em] sm:text-[13px]"
                            >
                                Book the $997 Revenue Audit
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <a
                                href={FORGE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="hero-cta-forge"
                                className="btn-ghost-line group inline-flex items-center justify-center gap-3 px-6 py-4 text-[12px] font-medium uppercase tracking-[0.22em] sm:text-[13px]"
                            >
                                <span>
                                    Enter The Forge{" "}
                                    <span className="text-white/45">
                                        / ark.metalmindtech.com
                                    </span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>

                        {/* Risk-reversal micro line */}
                        <p
                            className="font-mono-plex mt-6 max-w-xl text-[11px] uppercase tracking-[0.22em] text-white/45"
                            data-testid="hero-risk-line"
                        >
                            72-Hour Revenue Recovery Guarantee · No advisory
                            hours · No theory · Outcome or refund.
                        </p>
                    </div>

                    {/* Right: Index card / proof block */}
                    <aside
                        data-testid="hero-proof-card"
                        className="reveal relative lg:col-span-4"
                        style={{ transitionDelay: "120ms" }}
                    >
                        <div className="brushed-steel relative h-full border border-white/10 bg-[#0E0E0E] p-7">
                            <div className="font-mono-plex flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/45">
                                <span>Index / 01</span>
                                <span>Live</span>
                            </div>
                            <div className="etched-line my-5"></div>
                            <ul className="space-y-5">
                                <Stat
                                    label="Avg. revenue recovered / engagement"
                                    value="$1.84M"
                                />
                                <Stat
                                    label="Median time-to-first-dollar"
                                    value="71h 22m"
                                />
                                <Stat
                                    label="Operators in our deployment bench"
                                    value="34"
                                />
                                <Stat
                                    label="Companies on the waitlist"
                                    value="116"
                                />
                            </ul>
                            <div className="etched-line my-6"></div>
                            <p className="font-mono-plex text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/45">
                                We turn down 7 of every 10 inbound founders.
                                The Audit is how we decide.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

function Stat({ label, value }) {
    return (
        <li className="flex items-baseline justify-between gap-6">
            <span className="font-mono-plex text-[10px] uppercase leading-tight tracking-[0.22em] text-white/55">
                {label}
            </span>
            <span className="font-display text-2xl font-700 tracking-tight text-white">
                {value}
            </span>
        </li>
    );
}
