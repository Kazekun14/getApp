import { useState, useEffect } from "react";

export default function HeaderNavigationBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        // Read synchronously so the correct theme is applied on the very first render,
        // preventing a flash-to-light when navigating between pages.
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const legalPaths = ['/privacy-policy', '/terms-and-conditions'];
    const isLegalPage = legalPaths.some(p => window.location.pathname.startsWith(p));
    const [active, setActive] = useState(isLegalPage ? "" : "#home");

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        // Dispatch so other components can react if needed
        window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme } }));
    }, [theme]);

    // --- Scroll ---
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
    }, []);

    // --- Resize (close menu) ---
    useEffect(() => {
        const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // --- Active section ---
    useEffect(() => {
        const handleSectionChange = (event: CustomEvent) => {
            setActive(event.detail.activeSection);
        };
        window.addEventListener('sectionChange', handleSectionChange as EventListener);
        return () => window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    }, []);

    const handleLink = (href: string) => {
        if (!isLegalPage) setActive(href);
        setMenuOpen(false);
    };

    const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

    const isDark = theme === "dark";

    const navBg = scrolled
        ? isDark
            ? "bg-neutral-900/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_1px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/90 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_1px_32px_rgba(0,0,0,0.06)]"
        : "bg-transparent border-b border-transparent";

    const linkBase = "relative font-[Outfit] text-[0.875rem] font-medium px-4 py-[0.4rem] no-underline whitespace-nowrap tracking-[0.01em] transition-colors duration-[220ms] after:content-[''] after:absolute after:bottom-[-1px] after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:rounded-sm after:bg-[#ff0013] after:transition-[width] after:duration-[280ms]";
    const linkInactive = isDark
        ? "text-neutral-400 hover:text-white after:w-0 hover:after:w-[calc(100%-2rem)]"
        : "text-[#888893] hover:text-[#111] after:w-0 hover:after:w-[calc(100%-2rem)]";
    const linkActive = "text-[#ff0013] after:w-[calc(100%-2rem)]";

    const themeBtn = isDark
        ? "bg-white/10 hover:bg-white/20 text-yellow-400"
        : "bg-gray-100 hover:bg-gray-200 text-gray-600";

    const barColor = isDark ? "bg-white" : "bg-[#111]";

    const MoonIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    );
    const SunIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    );

    return (
        <>
            <style>{`
                @keyframes hnb-slide {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>

            {/* ── NAV BAR ─────────────────────────────────────────────── */}
            <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] transition-all duration-300 ${navBg}`}>
                <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between relative">

                    {/* Logo */}
                    <a href="/" className="flex items-center shrink-0 z-10 group">
                        <img
                            src="/633722302_1192301606312420_8447200432655822663_n.png"
                            width={180}
                            height={80}
                            alt="GetApp Business"
                            className="transition-all duration-300 group-hover:scale-[1.02]"
                        />
                    </a>

                    {/* Desktop — Centered Links */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10">
                        <a
                            href="#home"
                            onClick={() => handleLink("#home")}
                            className={`${linkBase} ${active === "#home" ? linkActive : linkInactive}`}
                        >
                            Home
                        </a>
                        <a
                            href="#download"
                            onClick={() => handleLink("#download")}
                            className={`${linkBase} ${active === "#download" ? linkActive : linkInactive}`}
                        >
                            Download
                        </a>
                    </div>

                    {/* Desktop — Right: Theme Toggle */}
                    <div className="hidden md:flex items-center shrink-0 z-10">
                        <button
                            onClick={toggleTheme}
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${themeBtn}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Mobile — Right: Theme Toggle + Hamburger */}
                    <div className="flex md:hidden items-center gap-2 z-10">
                        <button
                            onClick={toggleTheme}
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${themeBtn}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            className="flex flex-col justify-center gap-[5px] p-2 rounded-[10px] border-none bg-transparent cursor-pointer"
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-[22px] h-[2px] rounded-sm transition-transform duration-[250ms] ${menuOpen ? "translate-y-[7px] rotate-45" : ""} ${barColor}`} />
                            <span className={`block w-[22px] h-[2px] rounded-sm transition-opacity duration-[250ms] ${menuOpen ? "opacity-0" : "opacity-100"} ${barColor}`} />
                            <span className={`block w-[22px] h-[2px] rounded-sm transition-transform duration-[250ms] ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""} ${barColor}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── MOBILE MENU ─────────────────────────────────────────── */}
            {menuOpen && (
                <div className={`fixed top-[80px] left-3 right-3 z-[999] backdrop-blur-xl rounded-[18px] border shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-4 animate-[hnb-slide_0.22s_cubic-bezier(0.4,0,0.2,1)] ${
                    isDark
                        ? "bg-neutral-900/95 border-white/[0.08]"
                        : "bg-white/[0.98] border-black/[0.08]"
                }`}>
                    <ul className="list-none m-0 p-0 flex flex-col gap-[2px]">
                        <li>
                            <a
                                href="#home"
                                onClick={() => handleLink("#home")}
                                className={`block px-4 py-[0.65rem] rounded-[11px] font-[Outfit] text-[0.9rem] font-medium no-underline transition-all duration-[180ms] ${
                                    active === "#home"
                                        ? "text-[#ff0013] bg-[rgba(255,0,19,0.08)]"
                                        : isDark
                                            ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                                            : "text-[#555] hover:text-[#111] hover:bg-black/[0.04]"
                                }`}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#download"
                                onClick={() => handleLink("#download")}
                                className={`block px-4 py-[0.65rem] rounded-[11px] font-[Outfit] text-[0.9rem] font-medium no-underline transition-all duration-[180ms] ${
                                    active === "#download"
                                        ? "text-[#ff0013] bg-[rgba(255,0,19,0.08)]"
                                        : isDark
                                            ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                                            : "text-[#555] hover:text-[#111] hover:bg-black/[0.04]"
                                }`}
                            >
                                Download App
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}