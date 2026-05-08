import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
    {
        q: "Who is MetalMindTech actually for?",
        a: "Founders and CEOs running $5M–$250M operations who have already tried at least one AI vendor that produced slides, not revenue. We are not for early-stage exploration, not for enterprise procurement marathons, and not for clients looking for advisory hours by the month.",
    },
    {
        q: "Why $997 — isn't the audit either too cheap or too expensive?",
        a: "$997 is intentional friction. It filters out tire-kickers who were never going to engage, and signals to serious operators that we treat the audit as a real engagement, not a free sales call. The fee is credited 1:1 against any future work.",
    },
    {
        q: "How does the 72-Hour Revenue Recovery Guarantee actually work?",
        a: "The clock starts when your first MetalMindTech agent goes live in production — not at signature, not at kickoff. We pre-agree on a single metric you already track. If that metric does not move within 72 hours, every dollar paid is refunded within 5 business days. You keep every artifact we built.",
    },
    {
        q: "Will my team be working with juniors or offshore staff?",
        a: "No. Every engagement is led end-to-end by a senior MetalMindTech operator with prior P&L responsibility. We have no juniors, no CSMs, and no agency-style account-management layer between you and the person building your system.",
    },
    {
        q: "What's the relationship between the Agency and The Forge?",
        a: "The Agency (this site) deploys senior operators into your business. The Forge (ark.metalmindtech.com) is our internal weaponry — the agentic systems, frameworks, and tools we build for ourselves and license to clients. You can enter The Forge directly from the navigation.",
    },
    {
        q: "How fast can we start?",
        a: "We open four audit slots per month. Most CEOs who book today are scheduled within 7–10 business days. After the audit, full engagements typically begin within two weeks of the diagnostic.",
    },
];

export default function FAQ() {
    return (
        <section
            id="faq"
            data-testid="faq-section"
            className="bg-[#0A0A0A] py-24 md:py-32"
        >
            <div className="mx-auto max-w-5xl px-5 md:px-10">
                <div className="reveal mb-14 max-w-3xl">
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-white/45">
                        / 07 — Questions a serious operator asks
                    </p>
                    <h2 className="font-display mt-5 text-4xl font-800 leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                        Frequently
                        <br />
                        <span className="text-white/55">asked, plainly</span>{" "}
                        answered.
                    </h2>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="reveal divide-y divide-white/10 border-y border-white/10"
                    data-testid="faq-accordion"
                >
                    {items.map((it, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="border-b-0"
                            data-testid={`faq-item-${i}`}
                        >
                            <AccordionTrigger
                                data-testid={`faq-trigger-${i}`}
                                className="font-display group items-start py-7 text-left text-lg font-700 text-white hover:no-underline data-[state=open]:text-[#E6843A] md:text-xl"
                            >
                                <span className="font-mono-plex mr-6 mt-1.5 text-[10px] uppercase tracking-[0.28em] text-white/30">
                                    0{i + 1}
                                </span>
                                <span className="flex-1">{it.q}</span>
                            </AccordionTrigger>
                            <AccordionContent
                                data-testid={`faq-content-${i}`}
                                className="pb-7 pl-[60px] pr-4 text-[15px] leading-relaxed text-white/70"
                            >
                                {it.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
