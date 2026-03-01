import { useState, useEffect, useRef } from "react";

const LEGAL_LINKS = [
    { label: "Privacy Policy",     href: "/privacy-policy"      },
    { label: "Terms of Service", href: "/terms-of-service" },
];

const SOCIAL_LINKS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/getappph",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/getapp_ph",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
        ),
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@getapp_ph",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/channel/getapp_ph",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
            </svg>
        ),
    },
];

export default function FooterNavigationBar() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const socialsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleTheme = (e: CustomEvent) => setIsDark(e.detail.theme === "dark");
        window.addEventListener("themeChange", handleTheme as EventListener);

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => {
            window.removeEventListener("themeChange", handleTheme as EventListener);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleHighlight = () => {
            // Scroll socials into view
            socialsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

            // After scroll settles, stagger highlight each icon
            SOCIAL_LINKS.forEach((_, i) => {
                setTimeout(() => {
                    setHighlightedIndex(i);
                }, 600 + i * 200);
            });

            // Clear after all animations finish
            const totalDuration = 600 + SOCIAL_LINKS.length * 200 + 800;
            setTimeout(() => setHighlightedIndex(null), totalDuration);
        };

        window.addEventListener("highlightSocials", handleHighlight);
        return () => window.removeEventListener("highlightSocials", handleHighlight);
    }, []);

    return (
        <>
            <style>{`
                @keyframes socialFadeIn {
                    0%   { opacity: 0; transform: translateY(3px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes socialFadeOut {
                    0%   { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(3px); }
                }
                .social-icon-highlighted {
                    background: rgba(255, 0, 19, 0.1) !important;
                    border-color: rgba(255, 0, 19, 0.35) !important;
                    color: #ff0013 !important;
                    box-shadow: 0 0 0 3px rgba(255, 0, 19, 0.08), 0 4px 16px rgba(255, 0, 19, 0.15);
                    transform: translateY(-2px);
                    transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s;
                }
            `}</style>

            <footer className={`font-[Outfit] border-t border-neutral-700 transition-colors duration-300 ${
                isDark ? "bg-[#0a0a0a] text-white" : "bg-[#0d0d0d] text-white"
            }`}>
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10">
                    <div className="flex flex-col gap-8 pt-12 pb-6">

                        {/* Top row — Logo left, social right */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            {/* Logo */}
                            <a href="/" className="inline-block group">
                                <img
                                    src="/633722302_1192301606312420_8447200432655822663_n.png"
                                    width={180}
                                    height={90}
                                    alt="GetApp Business"
                                    className="transition-all duration-300 group-hover:scale-[1.02]"
                                />
                            </a>

                            {/* Social icons */}
                            <div ref={socialsRef} id="footer-socials" className="flex flex-wrap gap-3">
                                {SOCIAL_LINKS.map((s, i) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        title={s.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-[42px] h-[42px] rounded-[12px] flex items-center justify-center border no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,0,19,0.14)] hover:border-[rgba(255,0,19,0.3)] hover:text-[#ff0013] ${
                                            isDark
                                                ? "bg-white/[0.04] border-white/[0.07] text-neutral-500"
                                                : "bg-white/[0.06] border-white/[0.08] text-[#888]"
                                        } ${highlightedIndex === i ? "social-icon-highlighted" : ""}`}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className={`h-px ${isDark ? "bg-white/[0.06]" : "bg-white/[0.07]"}`} />

                        {/* Bottom bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                            <p className={`text-[0.8rem] ${isDark ? "text-neutral-500" : "text-[#888]"}`}>
                                © 2026 GetApp Business | All Rights Reserved.
                            </p>
                            <ul className="list-none m-0 p-0 flex flex-wrap gap-6">
                                {LEGAL_LINKS.map(l => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            className={`text-[0.8rem] no-underline transition-colors duration-200 ${
                                                isDark
                                                    ? "text-neutral-500 hover:text-neutral-300"
                                                    : "text-[#888] hover:text-[#aaa]"
                                            }`}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    );
}