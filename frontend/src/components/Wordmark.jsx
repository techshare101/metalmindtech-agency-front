export default function Wordmark({ className = "", showDot = true }) {
    return (
        <a
            href="/"
            data-testid="wordmark-home-link"
            className={`group inline-flex items-center gap-2 ${className}`}
            aria-label="MetalMindTech home"
        >
            <span className="relative inline-flex items-center">
                <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-2.5 w-2.5 -translate-y-[1px] rotate-45 border border-[#CC5500] bg-[#CC5500]/30 transition-transform duration-300 group-hover:rotate-[135deg]"
                ></span>
                <span className="font-display text-[15px] font-700 uppercase tracking-[0.22em] text-white">
                    Metal<span className="text-[#CC5500]">Mind</span>Tech
                </span>
            </span>
            {showDot && (
                <span className="font-mono-plex hidden text-[10px] uppercase tracking-[0.3em] text-white/40 sm:inline">
                    / Agency
                </span>
            )}
        </a>
    );
}
