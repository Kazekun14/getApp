import { useState, useEffect, useRef } from 'react';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

/* ── Inline SVG Icons ───────────────────────────────────────────────────── */
const IArrow  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IUsers  = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IZap    = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IBook   = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const ILayout = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;

/* ── Page Data ──────────────────────────────────────────────────────────── */
const VALUE_PROPS = [
    { icon: <IUsers />, title: "Dedicated Teams",              desc: "Benefit from our committed teams who ensure your success is personal. Count on expert guidance and exceptional results throughout your business journey." },
    { icon: <IZap   />, title: "Simplicity and Affordability", desc: "Find easy-to-use, affordable solutions with GetApp's line of tools and services. Our products make business simple and keep everything within budget." },
    { icon: <IBook  />, title: "Comprehensive Documentation",  desc: "Integrate with ease using GetApp's exhaustive guides and libraries. Achieve seamless product adoption with our full suite of documentation designed for your success." },
    { icon: <ILayout/>, title: "User-Centric Design",          desc: "Experience the difference with GetApp's user-focused design — where functionality meets practicality for an enhanced work experience." },
];

/* ── Scroll Animation Hook ──────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

/* ── Page Component ─────────────────────────────────────────────────────── */
export default function Index() {
    const [activeSection, setActiveSection] = useState("#home");
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    /* Sync dark mode from HTML class */
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    /* Active section tracking */
    useEffect(() => {
        const sections = [
            { id: "home",     offset: 0   },
            { id: "download", offset: 100 },
        ];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop - section.offset && scrollPosition < offsetTop + offsetHeight - section.offset) {
                        setActiveSection(`#${section.id}`);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const event = new CustomEvent('sectionChange', { detail: { activeSection } });
        window.dispatchEvent(event);
    }, [activeSection]);

    useEffect(() => { document.title = 'GetApp - Business'; }, []);

    /* Reveal refs */
    const heroText   = useReveal(0.1);
    const heroImg    = useReveal(0.1);
    const midImage   = useReveal(0.15);
    const midContent = useReveal(0.15);
    const cardsWrap  = useReveal(0.1);
    const download   = useReveal(0.15);

    /* Dynamic color tokens */
    const pageBg      = isDark ? "bg-neutral-900"    : "bg-[#f7f7f5]";
    const headingColor = isDark ? "text-white"         : "text-[#111111]";
    const bodyColor    = isDark ? "text-neutral-400"   : "text-[#5c5c6b]";
    const cardBg       = isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-black/[0.08]";
    const cardHover    = isDark ? "hover:border-[rgba(255,0,19,0.22)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)]" : "hover:border-[rgba(255,0,19,0.16)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]";

    return (
        <>
            {/* Global animation keyframes */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeLeft {
                    from { opacity: 0; transform: translateX(-36px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeRight {
                    from { opacity: 0; transform: translateX(36px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.94) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .anim-fade-up    { opacity: 0; }
                .anim-fade-left  { opacity: 0; }
                .anim-fade-right { opacity: 0; }
                .anim-scale-up   { opacity: 0; }
                .revealed.anim-fade-up    { animation: fadeUp   0.65s cubic-bezier(0.22,1,0.36,1) both; }
                .revealed.anim-fade-left  { animation: fadeLeft 0.65s cubic-bezier(0.22,1,0.36,1) both; }
                .revealed.anim-fade-right { animation: fadeRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
                .revealed.anim-scale-up   { animation: scaleUp  0.7s  cubic-bezier(0.22,1,0.36,1) both; }
            `}</style>

            <div className={`w-full relative transition-colors duration-300 ${pageBg}`}>
                <HeaderNavigationBar />

                {/* ── HOME / HERO ─────────────────────────────────────────── */}
                <section id="home" className="relative z-10 pt-20 md:pt-[6.5rem] pb-10 scroll-mt-20">
                    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10">

                        {/* Hero text grid */}
                        <div
                            ref={heroText.ref}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-11 items-center anim-fade-up ${heroText.visible ? 'revealed' : ''}`}
                            style={{ animationDelay: '0.05s' }}
                        >
                            <div>
                                <span
                                    className={`inline-flex items-center font-[Plus_Jakarta_Sans] text-[0.63rem] font-bold tracking-[0.13em] uppercase text-[#ff0013] bg-[rgba(255,0,19,0.08)] border border-[rgba(255,0,19,0.18)] px-3 py-1 rounded-full mb-3 anim-fade-up ${heroText.visible ? 'revealed' : ''}`}
                                    style={{ animationDelay: '0.1s' }}
                                >
                                    GetApp Business · Est. 2026
                                </span>
                                <h1
                                    className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2.8rem,5.5vw,4.6rem)] leading-[1.04] tracking-[-0.035em] anim-fade-up ${heroText.visible ? 'revealed' : ''} ${headingColor}`}
                                    style={{ animationDelay: '0.18s' }}
                                >
                                    Equip Your<br />
                                    <span className="text-[#ff0013]">Business</span><br />
                                    with GetApp Business
                                </h1>
                            </div>
                            <div
                                className={`pb-1 anim-fade-up ${heroText.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.28s' }}
                            >
                                <p className={`text-base leading-[1.74] mb-6 ${bodyColor}`}>
                                    Top-quality online business monitoring tools and order management system all-in-one.
                                </p>
                                <div className="flex flex-wrap gap-[0.65rem]">
                                    <a href="#download" className="inline-flex items-center gap-[0.38rem] font-[Plus_Jakarta_Sans] font-bold text-[0.84rem] px-[1.4rem] py-[0.6rem] rounded-full no-underline cursor-pointer border-none relative overflow-hidden transition-all duration-[250ms] whitespace-nowrap bg-gradient-to-br from-[#ff334a] via-[#ff0013] to-[#cc0010] text-white shadow-[0_3px_14px_rgba(255,0,19,0.22)] hover:-translate-y-[1.5px] hover:shadow-[0_6px_20px_rgba(255,0,19,0.28)]">
                                        Start Exploring <IArrow />
                                    </a>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent("highlightSocials"))}
                                        className={`inline-flex items-center gap-[0.38rem] font-[Plus_Jakarta_Sans] font-bold text-[0.84rem] px-[1.4rem] py-[0.6rem] rounded-full cursor-pointer relative overflow-hidden transition-all duration-[250ms] whitespace-nowrap border ${
                                            isDark
                                                ? "bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30"
                                                : "bg-transparent text-[#111111] border-black/[0.11] hover:bg-black/[0.04] hover:border-black/[0.18]"
                                        }`}
                                    >
                                        Contact Sales Team
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hero image */}
                        <div
                            ref={heroImg.ref}
                            className={`w-full overflow-hidden rounded-[22px] anim-scale-up ${heroImg.visible ? 'revealed' : ''}`}
                            style={{ height: "clamp(220px, 46vw, 540px)", animationDelay: '0.38s' }}
                        >
                            <img
                                src="/heroImage.png"
                                alt="GetApp Business — Your Complete Business Management Solution"
                                className="w-full h-full object-cover block rounded-t-[18px] transition-transform duration-500 hover:scale-[1.03]"
                                onError={e => {
                                    const el = e.currentTarget;
                                    el.style.display = "none";
                                    const p = el.parentElement;
                                    if (p) {
                                        Object.assign(p.style, {
                                            background: "linear-gradient(135deg,#1a0808 0%,#2a1010 50%,#1a1a1a 100%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        });
                                        p.innerHTML = `<span style="font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;font-weight:700;color:rgba(255,255,255,0.2);letter-spacing:.1em">business-hero.avif</span>`;
                                    }
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* ── MEETING INDUSTRY DEMANDS ────────────────────────────── */}
                <section className="relative z-10 py-10 md:py-[6.5rem]">
                    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10">

                        {/* Image + Content row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">

                            {/* Image */}
                            <div
                                ref={midImage.ref}
                                className={`relative anim-fade-left ${midImage.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.05s' }}
                            >
                                <div className={`overflow-hidden rounded-[22px] ${isDark ? "shadow-[0_20px_40px_rgba(0,0,0,0.5)]" : "shadow-[0_20px_40px_rgba(0,0,0,0.08)]"}`} style={{ height: "clamp(300px, 40vw, 520px)" }}>
                                    <img
                                        src="/deliveryRiders.webp"
                                        alt="GetApp Platform Interface"
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                        onError={e => {
                                            e.currentTarget.style.display = "none";
                                            if (e.currentTarget.parentElement) e.currentTarget.parentElement.style.background = "#181818";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div
                                ref={midContent.ref}
                                className={`lg:pl-4 anim-fade-right ${midContent.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.15s' }}
                            >
                                <span className="inline-flex items-center font-[Plus_Jakarta_Sans] text-[0.63rem] font-bold tracking-[0.13em] uppercase text-[#ff0013] bg-[rgba(255,0,19,0.08)] border border-[rgba(255,0,19,0.18)] px-3 py-1 rounded-full mb-4">
                                    Why GetApp
                                </span>
                                <h2 className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2rem,3.8vw,3rem)] leading-[1.1] tracking-[-0.028em] mb-5 ${headingColor}`}>
                                    Meeting<br />Industry Demands
                                </h2>
                                <p className={`text-[0.95rem] leading-[1.75] ${bodyColor}`}>
                                    At GetApp, we tackle the unique challenges encountered by small businesses and in the logistic sector. From cutting-edge tools to expert services, we're dedicated to helping small business owners overcome obstacles and achieve your goals.
                                </p>
                            </div>
                        </div>

                        {/* Value Props Cards */}
                        <div
                            ref={cardsWrap.ref}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        >
                            {VALUE_PROPS.map((v, i) => (
                                <div
                                    key={v.title}
                                    className={`border rounded-2xl p-6 transition-all duration-[220ms] hover:-translate-y-1 anim-fade-up ${cardsWrap.visible ? 'revealed' : ''} ${cardBg} ${cardHover}`}
                                    style={{ animationDelay: `${0.05 + i * 0.1}s` }}
                                >
                                    <div className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center bg-[rgba(255,0,19,0.08)] text-[#ff0013] mb-4">
                                        {v.icon}
                                    </div>
                                    <h3 className={`font-[Plus_Jakarta_Sans] font-bold text-[0.9rem] mb-2 ${headingColor}`}>{v.title}</h3>
                                    <p className={`text-[0.83rem] leading-[1.6] ${bodyColor}`}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DOWNLOAD SECTION ────────────────────────────────────── */}
                <section id="download" className="relative z-10 py-10 md:py-[6.5rem] scroll-mt-20">
                    {/* Font Awesome */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10">
                        <div
                            ref={download.ref}
                            className={`rounded-[28px] p-8 md:p-12 lg:p-16 text-center anim-scale-up ${download.visible ? 'revealed' : ''} ${
                                isDark
                                    ? "bg-gradient-to-br from-[#111111] to-[#1c1c1c] border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                                    : "bg-gradient-to-br from-[#181818] to-[#242424] border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                            }`}
                            style={{ animationDelay: '0.05s' }}
                        >
                            {/* Badge */}
                            <span
                                className={`inline-flex items-center font-[Plus_Jakarta_Sans] text-[0.63rem] font-bold tracking-[0.13em] uppercase text-[#ff0013] bg-[rgba(255,0,19,0.1)] border border-[rgba(255,0,19,0.22)] px-3 py-1 rounded-full mb-5 anim-fade-up ${download.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.15s' }}
                            >
                                Now Available
                            </span>

                            <h2
                                className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2rem,3.8vw,3rem)] leading-[1.08] tracking-[-0.028em] text-white mb-4 anim-fade-up ${download.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.2s' }}
                            >
                                Download GetApp Now
                            </h2>
                            <p
                                className={`text-[0.975rem] leading-[1.7] text-[#a0a0a0] max-w-lg mx-auto mb-8 anim-fade-up ${download.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.3s' }}
                            >
                                Manage your business on the go. Download the GetApp mobile app to monitor orders, track performance, and stay in control — anytime, anywhere.
                            </p>

                            <div
                                className={`flex flex-col sm:flex-row flex-wrap justify-center gap-3 anim-fade-up ${download.visible ? 'revealed' : ''}`}
                                style={{ animationDelay: '0.4s' }}
                            >
                                {/* App Store */}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://apps.apple.com/ph/app/getfood-food-shop-more/id1559911286"
                                    className="inline-flex items-center justify-center gap-2 font-[Plus_Jakarta_Sans] font-bold text-[0.84rem] px-[1.4rem] py-[0.7rem] rounded-full no-underline cursor-pointer transition-all duration-[250ms] bg-gradient-to-br from-[#ff334a] via-[#ff0013] to-[#cc0010] text-white shadow-[0_3px_14px_rgba(255,0,19,0.22)] hover:-translate-y-[1.5px] hover:shadow-[0_6px_20px_rgba(255,0,19,0.28)]"
                                >
                                    <i className="fa-brands fa-apple text-[1.1rem]" />
                                    App Store
                                </a>

                                {/* Google Play */}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://play.google.com/store/apps/details?id=ph.getserved.getfood&hl=en"
                                    className="inline-flex items-center justify-center gap-2 font-[Plus_Jakarta_Sans] font-bold text-[0.84rem] px-[1.4rem] py-[0.7rem] rounded-full no-underline cursor-pointer transition-all duration-[250ms] bg-white/[0.08] border border-white/[0.12] text-white hover:bg-white/[0.14] hover:-translate-y-[1.5px]"
                                >
                                    <i className="fa-brands fa-google-play text-[1rem]" />
                                    Google Play
                                </a>

                                {/* Website */}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://getfood.ph"
                                    className="inline-flex items-center justify-center gap-2 font-[Plus_Jakarta_Sans] font-bold text-[0.84rem] px-[1.4rem] py-[0.7rem] rounded-full no-underline cursor-pointer transition-all duration-[250ms] bg-white/[0.08] border border-white/[0.12] text-white hover:bg-white/[0.14] hover:-translate-y-[1.5px]"
                                >
                                    <i className="fa-solid fa-globe text-[1rem]" />
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterNavigationBar />
            </div>
        </>
    );
}