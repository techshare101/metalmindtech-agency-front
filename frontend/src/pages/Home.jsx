import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import AuditOffer from "@/components/AuditOffer";
import Framework from "@/components/Framework";
import Guarantee from "@/components/Guarantee";
import FounderLetter from "@/components/FounderLetter";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
    // Scroll-reveal observer for any element with the "reveal" class
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

    return (
        <main
            data-testid="home-page"
            className="min-h-screen bg-[#0A0A0A] text-white"
        >
            <Navigation />
            <Hero />
            <SocialProof />
            <AuditOffer />
            <Framework />
            <Guarantee />
            <FounderLetter />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
