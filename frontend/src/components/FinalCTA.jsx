import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLeadForm } from "@/components/LeadFormProvider";
import { FORGE_URL } from "@/lib/constants";

export default function FinalCTA() {
    const { open } = useLeadForm();
    return (
        <section
            data-testid="final-cta-section"
            className="relative overflow-hidden border-t border-white/5 bg-[#0A0A0A] py-24 md:py-32"
        >
            <div
                aria-hidden="true"
                className="copper-glow-soft absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full"
            />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12">
                <div className="reveal lg:col-span-7">
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                        / 08 — Closing the door
                    </p>
                    <h2 className="font-display mt-5 text-4xl font-800 leading-[1.02] tracking-[-0.02em] text-white md:text-[72px]">
                        You don&apos;t need
                        <br />
                        another vendor.
                        <br />
                        <span className="text-[#CC5500]">
                            You need the outcome.
                        </span>
                    </h2>
                    <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/65 md:text-base">
                        Book the $997 Revenue Extraction Audit. If the plan we
                        deliver isn&apos;t worth at least 10× the fee on paper,
                        you don&apos;t pay. If you&apos;d rather see the
                        underlying weaponry first, step into The Forge.
                    </p>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => open("audit")}
                            data-testid="final-cta-book-audit"
                            className="btn-copper inline-flex items-center justify-center gap-3 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] md:text-[13px]"
                        >
                            Book the $997 Audit
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <a
                            href={FORGE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="final-cta-forge"
                            className="btn-ghost-line group inline-flex items-center justify-center gap-3 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] md:text-[13px]"
                        >
                            Enter The Forge
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>

                <aside
                    className="reveal lg:col-span-5"
                    style={{ transitionDelay: "120ms" }}
                >
                    <div className="brushed-steel relative h-full border border-white/10 bg-[#0E0E0E] p-8">
                        <div className="font-mono-plex flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/45">
                            <span>Slot Index</span>
                            <span className="text-[#E6843A]">
                                Live · 4 / month
                            </span>
                        </div>
                        <div className="etched-line my-5"></div>
                        <ul className="space-y-4">
                            {[
                                ["Diagnostic delivered", "≤ 72 business hours"],
                                ["Audit fee", "$997 (credited 1:1)"],
                                ["Engagement minimum", "$48,000"],
                                ["Operator level", "Senior only"],
                                ["Refund window", "5 business days"],
                            ].map(([k, v]) => (
                                <li
                                    key={k}
                                    className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 last:border-b-0"
                                >
                                    <span className="font-mono-plex text-[10px] uppercase tracking-[0.24em] text-white/55">
                                        {k}
                                    </span>
                                    <span className="font-display text-sm font-700 text-white">
                                        {v}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
}
