import { Check, ArrowRight, Lock } from "lucide-react";
import { useLeadForm } from "@/components/LeadFormProvider";

const stack = [
    {
        label: "Revenue Leak Forensics",
        value: "$3,400",
        desc: "12-system audit across pipeline, ops, retention & pricing — every leak quantified in dollars.",
    },
    {
        label: "Agentic Opportunity Map",
        value: "$2,800",
        desc: "We identify the 3 highest-leverage AI agents your business can deploy in <30 days.",
    },
    {
        label: "Cash Recovery Plan (90-Day)",
        value: "$4,500",
        desc: "Sequenced 90-day plan with explicit dollar targets for each phase. Built for operators, not theorists.",
    },
    {
        label: "Founder/CEO Closed-Door Session",
        value: "$2,000",
        desc: "90-minute working session with a senior MetalMindTech operator (no juniors, ever).",
    },
    {
        label: "Recorded Walkthrough + Loom Library",
        value: "$600",
        desc: "Every finding annotated on video so your leadership team can act without you in the room.",
    },
    {
        label: "30-Day Async Q&A With the Operator",
        value: "$1,200",
        desc: "Direct line to the senior operator who built your plan. No tickets. No CSMs.",
    },
];

const STACK_TOTAL = stack.reduce(
    (a, b) => a + Number(b.value.replace(/[^0-9]/g, "")),
    0,
);

export default function AuditOffer() {
    const { open } = useLeadForm();
    return (
        <section
            id="audit"
            data-testid="audit-section"
            className="relative bg-[#0A0A0A] py-24 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    {/* Left: copy */}
                    <div className="reveal lg:col-span-5">
                        <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                            / 03 — The Audit
                        </p>
                        <h2 className="font-display mt-5 text-4xl font-800 leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                            The $997 Revenue
                            <br />
                            <span className="text-[#CC5500]">
                                Extraction Audit.
                            </span>
                        </h2>
                        <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
                            One flat fee. One senior operator. Three days. We
                            walk into your business as if we were buying it
                            tomorrow — and walk out with a forensic map of every
                            dollar trapped inside it, plus the AI agents and
                            operating moves to free them.
                        </p>

                        <div className="mt-10 space-y-4 border-l border-[#CC5500]/40 pl-6">
                            <BulletRow text="For CEOs and Founders of $5M–$250M companies." />
                            <BulletRow text="No 47-page deck. Plan, dollar targets, agent blueprint." />
                            <BulletRow text="Credited 1:1 against any future engagement." />
                            <BulletRow text="If the plan doesn't 10× the fee on paper — it's free." />
                        </div>

                        <button
                            type="button"
                            onClick={() => open("audit")}
                            data-testid="audit-cta-book-button"
                            className="btn-copper mt-10 inline-flex items-center gap-3 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] md:text-[13px]"
                        >
                            Claim Your Audit Slot
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <p className="font-mono-plex mt-4 text-[10px] uppercase tracking-[0.28em] text-white/40">
                            <Lock className="mr-1.5 inline h-3 w-3" />
                            Only 4 audit slots open per month
                        </p>
                    </div>

                    {/* Right: value-stack card */}
                    <div className="lg:col-span-7">
                        <div
                            data-testid="audit-value-stack"
                            className="reveal relative border border-white/10 bg-[#0E0E0E] p-7 md:p-10"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px -z-10 border border-[#CC5500]/20"
                                style={{ transform: "translate(8px,8px)" }}
                            ></div>

                            <div className="font-mono-plex flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
                                <span>Engagement / Audit-A1</span>
                                <span className="text-[#E6843A]">
                                    Inclusion · Itemized
                                </span>
                            </div>
                            <div className="etched-line mt-5"></div>

                            <ul className="mt-6 divide-y divide-white/5">
                                {stack.map((s, i) => (
                                    <li
                                        key={s.label}
                                        data-testid={`audit-line-item-${i}`}
                                        className="flex items-start justify-between gap-5 py-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-[#CC5500]/40 bg-[#CC5500]/10 text-[#E6843A]">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            <div>
                                                <h3 className="font-display text-[15px] font-700 text-white md:text-base">
                                                    {s.label}
                                                </h3>
                                                <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white/55">
                                                    {s.desc}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-mono-plex shrink-0 text-[12px] uppercase tracking-[0.18em] text-white/40 line-through">
                                            {s.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="etched-line my-2"></div>

                            <div className="flex flex-col items-start justify-between gap-4 pt-5 md:flex-row md:items-end">
                                <div>
                                    <div className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-white/45">
                                        Stand-alone value
                                    </div>
                                    <div className="font-display mt-1 text-2xl font-700 text-white/55 line-through">
                                        ${STACK_TOTAL.toLocaleString()}
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <div className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-[#E6843A]">
                                        Your fixed fee
                                    </div>
                                    <div
                                        data-testid="audit-price"
                                        className="font-display text-5xl font-800 tracking-[-0.02em] text-white md:text-6xl"
                                    >
                                        $997
                                    </div>
                                    <div className="font-mono-plex mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
                                        Credited against engagement
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BulletRow({ text }) {
    return (
        <div className="flex items-start gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-[#CC5500]"></span>
            <p className="text-[14px] leading-relaxed text-white/75">{text}</p>
        </div>
    );
}
