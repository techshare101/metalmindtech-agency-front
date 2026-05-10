import { ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { FORGE_URL } from "@/lib/constants";

const colA = [
    { label: "The Audit", href: "#audit" },
    { label: "The Method", href: "#method" },
    { label: "The Guarantee", href: "#guarantee" },
    { label: "Founder's Letter", href: "#letter" },
];

const colB = [
    {
        label: "The Forge",
        href: FORGE_URL,
        external: true,
        testid: "footer-forge-link",
    },
    {
        label: "Microfounders",
        href: "https://microfounders.metalmindtech.com",
        external: true,
        testid: "footer-microfounders-link",
    },
    { label: "FAQ", href: "#faq" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            id="footer"
            data-testid="site-footer"
            className="border-t border-white/10 bg-[#0A0A0A] pt-16"
        >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Wordmark />
                        <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">
                            MetalMindTech is the operator-led AI deployment
                            partner for CEOs and Founders. We do not consult.
                            We extract revenue.
                        </p>
                        <p className="mt-4 text-[13px] text-white/50">
                            For direct partner inquiries:{" "}
                            <a
                                href="mailto:contact@metalmindtech.com"
                                data-testid="footer-contact-email"
                                className="text-[#E6843A] transition-colors hover:text-white"
                            >
                                contact@metalmindtech.com
                            </a>
                        </p>
                        <p className="font-mono-plex mt-6 text-[10px] uppercase tracking-[0.3em] text-white/35">
                            metalmindtech.com
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="font-mono-plex mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Engagement
                        </p>
                        <ul className="space-y-3">
                            {colA.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        className="text-[14px] text-white/75 transition-colors hover:text-[#E6843A]"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <p className="font-mono-plex mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Network
                        </p>
                        <ul className="space-y-3">
                            {colB.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        target={
                                            l.external ? "_blank" : undefined
                                        }
                                        rel={
                                            l.external
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        data-testid={l.testid}
                                        className="group inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-[#E6843A]"
                                    >
                                        {l.label}
                                        {l.external && (
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="etched-line"></div>

                <div className="flex flex-col items-start justify-between gap-3 py-7 md:flex-row md:items-center">
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.28em] text-white/40">
                        &copy; {year} MetalMindTech. All outcomes reserved.
                    </p>
                    <p className="font-mono-plex text-[10px] uppercase tracking-[0.28em] text-white/30">
                        Built in obsidian. Sharpened in The Forge.
                    </p>
                </div>
            </div>
        </footer>
    );
}
