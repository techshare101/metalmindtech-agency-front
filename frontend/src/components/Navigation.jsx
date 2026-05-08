import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { useLeadForm } from "@/components/LeadFormProvider";
import { FORGE_URL } from "@/lib/constants";

const navLinks = [
    { label: "The Audit", href: "#audit", testid: "nav-link-audit" },
    { label: "Method", href: "#method", testid: "nav-link-method" },
    { label: "Guarantee", href: "#guarantee", testid: "nav-link-guarantee" },
    { label: "Letter", href: "#letter", testid: "nav-link-letter" },
    { label: "FAQ", href: "#faq", testid: "nav-link-faq" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { open: openLeadForm } = useLeadForm();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-navigation"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
                    : "border-b border-transparent bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-10">
                <Wordmark />

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            data-testid={l.testid}
                            className="font-mono-plex text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <a
                        href={FORGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="forge-nav-link"
                        className="group hidden items-center gap-2 border border-[#CC5500]/40 bg-[#CC5500]/5 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#E6843A] transition-all duration-200 hover:border-[#CC5500] hover:bg-[#CC5500]/15 hover:text-white sm:inline-flex md:px-4 md:text-[12px]"
                    >
                        <span className="font-mono-plex">Enter The Forge</span>
                        <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                        />
                    </a>

                    <button
                        type="button"
                        onClick={() => openLeadForm("audit")}
                        data-testid="nav-cta-book-audit"
                        className="btn-copper hidden items-center px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] md:inline-flex md:px-5 md:text-[12px]"
                    >
                        Book the $997 Audit
                    </button>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        data-testid="nav-mobile-toggle"
                        aria-label="Toggle menu"
                        className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-white lg:hidden"
                    >
                        {open ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div
                    className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
                    data-testid="mobile-nav-panel"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6">
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                data-testid={`mobile-${l.testid}`}
                                className="font-mono-plex border-b border-white/5 py-4 text-[12px] uppercase tracking-[0.24em] text-white/80"
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href={FORGE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            data-testid="mobile-forge-nav-link"
                            className="font-mono-plex mt-4 inline-flex items-center justify-between border border-[#CC5500]/40 px-4 py-3 text-[12px] uppercase tracking-[0.24em] text-[#E6843A]"
                        >
                            <span>Enter The Forge</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                openLeadForm("audit");
                            }}
                            data-testid="mobile-nav-cta-book-audit"
                            className="btn-copper mt-2 w-full px-4 py-3 text-[12px] uppercase tracking-[0.24em]"
                        >
                            Book the $997 Audit
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
