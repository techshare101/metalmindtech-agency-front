import { useEffect, useState } from "react";
import { ArrowRight, Play, CheckCircle2, MapPin, Clock, Shield, Zap } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API } from "@/lib/constants";

const HERO_BG =
    "https://images.unsplash.com/photo-1604591263412-b6d3ea4e2aac?crop=entropy&cs=srgb&fm=jpg&w=2400&q=80";

const SOVEREIGN_BENEFITS = [
    "24/7 AI receptionist handling calls, bookings & follow-ups",
    "Automated patient/client intake & scheduling pipeline",
    "AI-powered review generation & reputation management",
    "Revenue recovery from no-shows & abandoned leads",
    "Custom AI workflows tailored to your Twin Cities operation",
    "Full deployment in 90 minutes \u2014 not 90 days",
];

const AUDIT_FIELDS_INITIAL = {
    name: "",
    email: "",
    phone: "",
    business_name: "",
    business_type: "",
    location: "",
    biggest_challenge: "",
};

export default function TwinCitiesAIDepartment() {
    const [form, setForm] = useState(AUDIT_FIELDS_INITIAL);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const update = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        if (!form.name || !form.email || !form.business_name) {
            toast.error("Please fill in your name, email, and business name.");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${API}/leads`, {
                ...form,
                source: "twin-cities-sovereign-audit",
            });
            setSubmitted(true);
            toast.success("Sovereign Audit requested. We'll reach out within 24 hours.");
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main
            data-testid="twin-cities-ai-department-page"
            className="min-h-screen bg-[#05050a] text-white"
        >
            {/* Navigation Bar */}
            <header
                data-testid="tc-navigation"
                className="fixed inset-x-0 top-0 z-50 border-b border-orange-500/20 bg-[#05050a]/80 backdrop-blur-xl"
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-10">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-orange-500"></div>
                        <span className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-white/70">
                            MetalMindTech
                        </span>
                    </div>
                    <a
                        href="#sovereign-audit"
                        data-testid="tc-nav-cta"
                        className="btn-copper inline-flex items-center gap-2 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                    >
                        Request Sovereign Audit
                        <ArrowRight className="h-3 w-3" />
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section
                data-testid="tc-hero-section"
                className="relative isolate overflow-hidden pt-28 pb-24 md:pt-44 md:pb-36"
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${HERO_BG})` }}
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05050a]/90 via-[#05050a]/95 to-[#05050a]"
                />
                {/* Copper glow */}
                <div
                    aria-hidden="true"
                    className="absolute -right-40 top-10 -z-10 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]"
                />
                <div
                    aria-hidden="true"
                    className="absolute -left-32 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-orange-500/3 blur-[80px]"
                />

                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="reveal max-w-4xl">
                        {/* Eyebrow */}
                        <div
                            data-testid="tc-hero-eyebrow"
                            className="font-mono-plex mb-8 inline-flex items-center gap-3 border border-orange-500/20 bg-orange-500/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-orange-400/80"
                        >
                            <MapPin className="h-3 w-3" />
                            Minneapolis \u00b7 St. Paul \u00b7 Twin Cities Metro
                        </div>

                        {/* Header - Orbitron */}
                        <h1
                            data-testid="tc-hero-header"
                            className="mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-500/70"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            TWIN CITIES AI DEPARTMENT
                        </h1>

                        {/* Headline */}
                        <h2
                            data-testid="tc-hero-headline"
                            className="font-display text-[38px] font-800 leading-[1.02] tracking-[-0.025em] text-white sm:text-[52px] md:text-[64px] lg:text-[76px]"
                        >
                            The First AI Workforce
                            <br />
                            <span className="relative inline-block">
                                <span className="relative z-10">has Landed</span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-1 -z-0 h-[8px] bg-orange-500/40 md:bottom-2 md:h-[12px]"
                                ></span>
                            </span>{" "}
                            <span className="text-white/50">in the Twin Cities.</span>
                        </h2>

                        {/* Sub-headline */}
                        <p
                            data-testid="tc-hero-subheadline"
                            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
                        >
                            Stop losing customers to AI-blindness.{" "}
                            <span className="text-white">
                                Install your Sovereign Department in 90 minutes.
                            </span>
                        </p>

                        {/* CTA */}
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href="#sovereign-audit"
                                data-testid="tc-hero-cta"
                                className="btn-copper inline-flex items-center justify-center gap-3 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] sm:text-[13px]"
                            >
                                Claim Your Sovereign Audit
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <div className="font-mono-plex flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                                <Clock className="h-3 w-3" />
                                Limited to 12 Twin Cities businesses/month
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Viral Demo Section */}
            <section
                data-testid="tc-demo-section"
                className="relative border-t border-orange-500/10 py-24 md:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="reveal text-center">
                        <div className="font-mono-plex mb-6 text-[10px] uppercase tracking-[0.32em] text-orange-400/60">
                            <Zap className="mb-1 inline h-3 w-3" /> Live Demonstration
                        </div>
                        <h3
                            data-testid="tc-demo-hook"
                            className="font-display mx-auto max-w-3xl text-[32px] font-800 leading-tight tracking-[-0.02em] text-white sm:text-[42px] md:text-[52px]"
                        >
                            Voice-command your{" "}
                            <span className="text-orange-500">digital transformation.</span>
                        </h3>
                        <p className="mx-auto mt-6 max-w-xl text-base text-white/55 md:text-lg">
                            Watch a complete AI department deploy in 7 minutes. No code. No consultants. No waiting.
                        </p>
                    </div>

                    {/* Video Placeholder */}
                    <div className="reveal mx-auto mt-14 max-w-4xl" style={{ transitionDelay: "120ms" }}>
                        <div
                            data-testid="tc-demo-video-placeholder"
                            className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden border border-orange-500/20 bg-[#0a0a0f]"
                            style={{
                                background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f18 50%, #0a0a0f 100%)",
                            }}
                        >
                            {/* Glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] via-transparent to-orange-500/[0.02]"></div>

                            {/* Grid pattern */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                }}
                            ></div>

                            {/* Play button */}
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center border border-orange-500/40 bg-orange-500/10 backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/70 group-hover:bg-orange-500/20">
                                    <Play className="h-8 w-8 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <span className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-white/50">
                                    7-Minute Turnaround Demo
                                </span>
                            </div>

                            {/* Corner accents */}
                            <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-orange-500/30"></div>
                            <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-orange-500/30"></div>
                            <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-orange-500/30"></div>
                            <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-orange-500/30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits / What You Get */}
            <section
                data-testid="tc-benefits-section"
                className="border-t border-white/5 py-24 md:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
                        <div className="reveal lg:col-span-5">
                            <div className="font-mono-plex mb-4 text-[10px] uppercase tracking-[0.32em] text-orange-400/60">
                                Sovereign Deployment
                            </div>
                            <h3 className="font-display text-[32px] font-800 leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
                                Your AI department.
                                <br />
                                <span className="text-white/50">Installed in 90 minutes.</span>
                            </h3>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                                No SaaS subscriptions. No monthly retainers. A sovereign AI workforce
                                that belongs to your business \u2014 deployed, trained, and operational before lunch.
                            </p>
                        </div>

                        <div className="reveal lg:col-span-7" style={{ transitionDelay: "80ms" }}>
                            <div className="border border-orange-500/20 bg-[#08080f]/80 p-8 backdrop-blur-sm md:p-10">
                                <ul className="space-y-5">
                                    {SOVEREIGN_BENEFITS.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                                            <span className="text-[15px] leading-relaxed text-white/80">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-4 w-4 text-orange-500/70" />
                                        <span className="font-mono-plex text-[10px] uppercase tracking-[0.22em] text-white/45">
                                            72-Hour Revenue Recovery Guarantee \u00b7 Twin Cities Exclusive
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lead Capture: Sovereign Audit Form */}
            <section
                id="sovereign-audit"
                data-testid="tc-sovereign-audit-section"
                className="relative border-t border-orange-500/10 py-24 md:py-32"
            >
                {/* Background glow */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05050a] via-[#080810] to-[#05050a]"
                />
                <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/[0.03] blur-[100px]"
                />

                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                        {/* Left copy */}
                        <div className="reveal lg:col-span-5">
                            <div className="font-mono-plex mb-4 text-[10px] uppercase tracking-[0.32em] text-orange-400/60">
                                Free Strategic Assessment
                            </div>
                            <h3 className="font-display text-[32px] font-800 leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
                                Sovereign
                                <br />
                                <span className="text-orange-500">Audit.</span>
                            </h3>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                                For Twin Cities clinic owners, service businesses, and local operators
                                losing revenue to manual processes. We'll map your entire operation and
                                show you exactly where AI recovers money \u2014 in one 30-minute call.
                            </p>

                            <div className="mt-10 space-y-4">
                                <AuditFeature text="Personalized AI deployment roadmap" />
                                <AuditFeature text="Revenue leak identification" />
                                <AuditFeature text="90-minute installation timeline" />
                                <AuditFeature text="Zero obligation \u00b7 Zero cost" />
                            </div>
                        </div>

                        {/* Right form */}
                        <div className="reveal lg:col-span-7" style={{ transitionDelay: "100ms" }}>
                            {submitted ? (
                                <div
                                    data-testid="tc-audit-success"
                                    className="flex min-h-[400px] flex-col items-center justify-center border border-orange-500/20 bg-[#08080f]/80 p-10 text-center backdrop-blur-sm"
                                >
                                    <CheckCircle2 className="mb-4 h-12 w-12 text-orange-500" />
                                    <h4 className="font-display text-2xl font-700 text-white">
                                        Audit Requested
                                    </h4>
                                    <p className="mt-3 max-w-sm text-sm text-white/55">
                                        A senior AI strategist will reach out within 24 hours to schedule
                                        your Sovereign Audit. Twin Cities operators get priority.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={onSubmit}
                                    data-testid="tc-sovereign-audit-form"
                                    className="border border-orange-500/20 bg-[#08080f]/80 p-8 backdrop-blur-sm md:p-10"
                                >
                                    <div className="mb-8">
                                        <h4 className="font-display text-xl font-700 text-white">
                                            Request Your Sovereign Audit
                                        </h4>
                                        <p className="mt-1 text-sm text-white/45">
                                            Limited to 12 businesses per month in the Twin Cities.
                                        </p>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Full Name"
                                            name="name"
                                            value={form.name}
                                            onChange={update("name")}
                                            required
                                            testid="tc-form-name"
                                        />
                                        <FormField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={update("email")}
                                            required
                                            testid="tc-form-email"
                                        />
                                        <FormField
                                            label="Phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={update("phone")}
                                            testid="tc-form-phone"
                                        />
                                        <FormField
                                            label="Business Name"
                                            name="business_name"
                                            value={form.business_name}
                                            onChange={update("business_name")}
                                            required
                                            testid="tc-form-business-name"
                                        />
                                        <FormField
                                            label="Business Type"
                                            name="business_type"
                                            value={form.business_type}
                                            onChange={update("business_type")}
                                            placeholder="e.g., Dental Clinic, Med Spa, Law Firm"
                                            testid="tc-form-business-type"
                                        />
                                        <FormField
                                            label="Location"
                                            name="location"
                                            value={form.location}
                                            onChange={update("location")}
                                            placeholder="e.g., Minneapolis, St. Paul, Bloomington"
                                            testid="tc-form-location"
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <label className="font-mono-plex mb-2 block text-[10px] uppercase tracking-[0.22em] text-white/50">
                                            Biggest Challenge
                                        </label>
                                        <textarea
                                            name="biggest_challenge"
                                            value={form.biggest_challenge}
                                            onChange={update("biggest_challenge")}
                                            rows={3}
                                            data-testid="tc-form-challenge"
                                            placeholder="What manual process costs you the most time or money?"
                                            className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors focus:border-orange-500/60 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        data-testid="tc-form-submit"
                                        className="btn-copper mt-8 inline-flex w-full items-center justify-center gap-3 px-6 py-4 text-[12px] font-medium uppercase tracking-[0.22em] disabled:opacity-50 sm:w-auto"
                                    >
                                        {submitting ? "Submitting..." : "Request Sovereign Audit"}
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                    <p className="font-mono-plex mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                                        Your data is encrypted. No spam. Ever.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                data-testid="tc-footer"
                className="border-t border-white/5 py-12"
            >
                <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
                    <div className="font-mono-plex text-[10px] uppercase tracking-[0.3em] text-white/30">
                        \u00a9 {new Date().getFullYear()} MetalMindTech \u00b7 Twin Cities AI Department
                    </div>
                    <div className="mt-3 font-mono-plex text-[9px] uppercase tracking-[0.2em] text-white/20">
                        Minneapolis \u00b7 St. Paul \u00b7 Bloomington \u00b7 Edina \u00b7 Eden Prairie
                    </div>
                </div>
            </footer>

            {/* Orbitron font injection */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
            />
        </main>
    );
}

function FormField({ label, name, type = "text", value, onChange, placeholder, required, testid }) {
    return (
        <div>
            <label className="font-mono-plex mb-2 block text-[10px] uppercase tracking-[0.22em] text-white/50">
                {label}
                {required && <span className="text-orange-500/70"> *</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                data-testid={testid}
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors focus:border-orange-500/60 focus:outline-none"
            />
        </div>
    );
}

function AuditFeature({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 bg-orange-500"></div>
            <span className="text-sm text-white/60">{text}</span>
        </div>
    );
}
