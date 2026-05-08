import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";

export default function Guarantee() {
    return (
        <section
            id="guarantee"
            data-testid="guarantee-section"
            className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
        >
            {/* Soft copper halo */}
            <div
                aria-hidden="true"
                className="copper-glow-soft absolute left-1/2 top-1/2 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
            />

            <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10">
                <div className="reveal grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                            / 05 — Risk reversal
                        </p>
                        <h2 className="font-display mt-5 text-4xl font-800 leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                            72-Hour
                            <br />
                            Revenue Recovery
                            <br />
                            <span className="text-[#CC5500]">Guarantee.</span>
                        </h2>
                        <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/65">
                            Within 72 hours of going live with MetalMindTech,
                            you will see measurable revenue movement on a metric
                            you already track. If you don&apos;t — every dollar
                            paid is refunded. No clauses. No mediation. No
                            advisory hours billed.
                        </p>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="guarantee-stamp brushed-steel relative border border-[#CC5500]/30 bg-[#0E0E0E]/95 p-8 md:p-10">
                            <div className="font-mono-plex flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/55">
                                <span>Document / MMT-G1</span>
                                <span className="text-[#E6843A]">
                                    Co-signed by the Founder
                                </span>
                            </div>
                            <div className="etched-line my-6"></div>

                            <ul className="space-y-7">
                                <Pillar
                                    icon={
                                        <Clock
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    }
                                    title="72-Hour Window"
                                    body="The clock starts the moment your first MetalMindTech agent goes live in production. Not at kickoff. Not at signature."
                                />
                                <Pillar
                                    icon={
                                        <ShieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    }
                                    title="Your Metric, Not Ours"
                                    body="We accept the metric you already report to your board. We do not get to invent a vanity number."
                                />
                                <Pillar
                                    icon={
                                        <BadgeCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    }
                                    title="100% Refund, Zero Friction"
                                    body="If we miss the window, you receive a written refund within 5 business days — and you keep every artifact we built."
                                />
                            </ul>

                            <div className="etched-line my-7"></div>
                            <p className="font-mono-plex text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/45">
                                We&apos;ve invoked this clause twice in 11
                                quarters. Both times, we paid in full and the
                                companies kept the systems we shipped.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Pillar({ icon, title, body }) {
    return (
        <li className="flex gap-5">
            <span className="copper-glow inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#CC5500]/40 bg-[#0A0A0A] text-[#E6843A]">
                {icon}
            </span>
            <div>
                <h3 className="font-display text-lg font-700 text-white">
                    {title}
                </h3>
                <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-white/65">
                    {body}
                </p>
            </div>
        </li>
    );
}
