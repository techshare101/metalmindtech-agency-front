import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { API } from "@/lib/constants";

const REVENUE_BANDS = [
    "< $5M",
    "$5M – $15M",
    "$15M – $50M",
    "$50M – $150M",
    "$150M – $250M",
    "$250M+",
];

const initial = {
    name: "",
    email: "",
    company: "",
    role: "",
    annual_revenue: "",
    notes: "",
};

export default function LeadFormDialog({ open, onOpenChange, source }) {
    const [form, setForm] = useState(initial);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (open) {
            setSubmitted(false);
            setForm(initial);
        }
    }, [open]);

    const update = (field) => (e) =>
        setForm((f) => ({
            ...f,
            [field]: typeof e === "string" ? e : e.target.value,
        }));

    const onSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        // Basic client validation
        if (!form.name || !form.email || !form.company) {
            toast.error("Please fill in your name, email and company.");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${API}/leads`, {
                ...form,
                source: source || "audit",
            });
            setSubmitted(true);
            toast.success(
                "Request received. A senior operator will reply within 24h.",
            );
        } catch (err) {
            const msg =
                err?.response?.data?.detail ||
                "Something went wrong. Please try again.";
            toast.error(typeof msg === "string" ? msg : "Submission failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const titleByMap = {
        audit: "Book the $997 Revenue Extraction Audit",
        contact: "Speak with a Senior Operator",
        forge: "Request Forge Access",
    };
    const subByMap = {
        audit: "Tell us where you operate. We reply personally within 24 hours with audit availability.",
        contact:
            "Tell us about your operation. We reply personally within 24 hours.",
        forge: "Tell us where to send your Forge access link.",
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid="lead-form-dialog"
                className="border border-white/10 bg-[#0E0E0E] p-0 text-white sm:max-w-[560px]"
            >
                <div className="border-b border-white/10 p-7">
                    <DialogHeader className="space-y-3 text-left">
                        <p className="font-mono-plex text-[10px] uppercase tracking-[0.32em] text-[#E6843A]">
                            / Engagement Request
                        </p>
                        <DialogTitle
                            data-testid="lead-form-title"
                            className="font-display text-2xl font-800 leading-tight tracking-[-0.01em] text-white md:text-[28px]"
                        >
                            {titleByMap[source] || titleByMap.audit}
                        </DialogTitle>
                        <DialogDescription className="text-[14px] leading-relaxed text-white/60">
                            {subByMap[source] || subByMap.audit}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {submitted ? (
                    <div
                        className="p-9 text-center"
                        data-testid="lead-form-success"
                    >
                        <div className="copper-glow mx-auto inline-flex h-12 w-12 items-center justify-center border border-[#CC5500]/40 bg-[#0A0A0A]">
                            <ArrowRight className="h-5 w-5 text-[#E6843A]" />
                        </div>
                        <h3 className="font-display mt-6 text-2xl font-800 text-white">
                            Request received.
                        </h3>
                        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-white/65">
                            A senior MetalMindTech operator has been alerted.
                            You will receive a personal reply within 24 hours
                            from a real human, not a sequencer.
                        </p>
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            data-testid="lead-form-close-success"
                            className="btn-ghost-line mt-7 inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.24em]"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-5 p-7">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Full name"
                                id="lead-name"
                                required
                                value={form.name}
                                onChange={update("name")}
                                testid="lead-form-name"
                                placeholder="Alexandra Voss"
                            />
                            <Field
                                label="Work email"
                                id="lead-email"
                                type="email"
                                required
                                value={form.email}
                                onChange={update("email")}
                                testid="lead-form-email"
                                placeholder="alex@northwind.io"
                            />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Company"
                                id="lead-company"
                                required
                                value={form.company}
                                onChange={update("company")}
                                testid="lead-form-company"
                                placeholder="Northwind Capital"
                            />
                            <Field
                                label="Role / title"
                                id="lead-role"
                                value={form.role}
                                onChange={update("role")}
                                testid="lead-form-role"
                                placeholder="Founder & CEO"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="lead-revenue"
                                className="font-mono-plex text-[10px] uppercase tracking-[0.28em] text-white/55"
                            >
                                Annual revenue band
                            </Label>
                            <Select
                                value={form.annual_revenue}
                                onValueChange={(v) =>
                                    setForm((f) => ({
                                        ...f,
                                        annual_revenue: v,
                                    }))
                                }
                            >
                                <SelectTrigger
                                    id="lead-revenue"
                                    data-testid="lead-form-revenue"
                                    className="rounded-none border-white/15 bg-transparent text-white focus:border-[#CC5500] focus:ring-0"
                                >
                                    <SelectValue placeholder="Select a band" />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-[#0E0E0E] text-white">
                                    {REVENUE_BANDS.map((b) => (
                                        <SelectItem
                                            key={b}
                                            value={b}
                                            data-testid={`revenue-option-${b}`}
                                            className="rounded-none focus:bg-[#CC5500]/15 focus:text-white"
                                        >
                                            {b}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="lead-notes"
                                className="font-mono-plex text-[10px] uppercase tracking-[0.28em] text-white/55"
                            >
                                What outcome are you trying to extract?
                            </Label>
                            <Textarea
                                id="lead-notes"
                                data-testid="lead-form-notes"
                                value={form.notes}
                                onChange={update("notes")}
                                placeholder="Be specific. What revenue are you trying to free, and what have you already tried?"
                                rows={4}
                                className="resize-none rounded-none border-white/15 bg-transparent text-white placeholder:text-white/30 focus-visible:border-[#CC5500] focus-visible:ring-0"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                data-testid="lead-form-submit"
                                className="btn-copper inline-flex w-full items-center justify-center gap-3 px-6 py-4 text-[12px] font-medium uppercase tracking-[0.22em] disabled:opacity-60 sm:text-[13px]"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Submitting…
                                    </>
                                ) : (
                                    <>
                                        Send to a Senior Operator
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                            <p className="font-mono-plex mt-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/35">
                                Replies are personal · 24h SLA · NDA available
                            </p>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

function Field({
    label,
    id,
    type = "text",
    required,
    value,
    onChange,
    placeholder,
    testid,
}) {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
                className="font-mono-plex text-[10px] uppercase tracking-[0.28em] text-white/55"
            >
                {label}
                {required && <span className="text-[#CC5500]"> *</span>}
            </Label>
            <Input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                data-testid={testid}
                className="rounded-none border-white/15 bg-transparent text-white placeholder:text-white/30 focus-visible:border-[#CC5500] focus-visible:ring-0"
            />
        </div>
    );
}
