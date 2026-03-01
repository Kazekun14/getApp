import { useEffect, useState } from 'react';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const SECTIONS = [
    {
        num: "1",
        title: "Acceptance of Terms",
        content: [
            `Welcome to GetApp, a delivery and logistics platform operated by GetServed PH Corp. ("GetApp", "we", "us", or "our"). By downloading, installing, or using the GetApp mobile application (the "App") or any of our related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").`,
            `If you do not agree to these Terms, please do not use or access our Services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms.`,
        ],
    },
    {
        num: "2",
        title: "Eligibility",
        content: [
            `You must be at least 18 years of age to use our Services. By using the App, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement.`,
            `If you are using the Services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.`,
        ],
    },
    {
        num: "3",
        title: "Account Registration",
        content: [
            `To access certain features of the App, you may be required to register for an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`,
            `You agree to notify us immediately of any unauthorized use of your account or any other breach of security. GetApp will not be liable for any loss or damage arising from your failure to protect your account information.`,
            `We reserve the right to suspend or terminate your account at our discretion if we believe you have violated these Terms or if your account has been compromised.`,
        ],
    },
    {
        num: "4",
        title: "Use of the App",
        content: [
            `GetApp grants you a limited, non-exclusive, non-transferable, and revocable license to use the App for personal, non-commercial purposes in accordance with these Terms.`,
            `You agree not to: (a) use the App for any unlawful purpose or in violation of any applicable laws or regulations; (b) impersonate any person or entity or falsely represent your affiliation with any person or entity; (c) interfere with or disrupt the integrity or performance of the App or its related systems; (d) attempt to gain unauthorized access to any part of the App or its related systems; (e) use any automated means, including bots or scrapers, to access or interact with the App; (f) upload or transmit any content that is harmful, offensive, or otherwise objectionable.`,
        ],
    },
    {
        num: "5",
        title: "Delivery Services",
        content: [
            `GetApp connects customers with delivery riders to facilitate the delivery of goods and services. We act as an intermediary platform and are not responsible for the quality, safety, or legality of items ordered through the App.`,
            `Delivery times are estimates only and may vary depending on factors including distance, traffic conditions, weather, and rider availability. GetApp does not guarantee delivery within any specific timeframe.`,
            `You agree to provide accurate delivery information, including your delivery address and contact details. GetApp and its riders are not liable for failed deliveries resulting from incorrect or incomplete information provided by you.`,
        ],
    },
    {
        num: "6",
        title: "Orders and Payments",
        content: [
            `By placing an order through the App, you agree to pay all applicable fees, including the cost of the items ordered and any applicable delivery charges. All prices are displayed in Philippine Pesos (PHP) and are inclusive of applicable taxes unless stated otherwise.`,
            `Payment must be made through the payment methods available in the App. You authorize GetApp to charge your selected payment method for any orders placed. All transactions are final upon confirmation unless otherwise stated in our cancellation policy.`,
            `GetApp reserves the right to refuse or cancel any order at its discretion, including in cases of suspected fraud, payment failure, or unavailability of the requested service.`,
        ],
    },
    {
        num: "7",
        title: "Cancellations and Refunds",
        content: [
            `Orders may be cancelled prior to a rider accepting your request. Once a rider has accepted your order, cancellation may not be possible or may incur a cancellation fee.`,
            `Refunds, where applicable, will be processed in accordance with our Refund Policy. GetApp reserves the right to determine the eligibility of any refund request. Refunds may be issued as app credits or returned to your original payment method, at our discretion.`,
            `In the event of a failed delivery due to circumstances beyond the rider's control, GetApp will assess the situation on a case-by-case basis and may offer a replacement delivery or partial refund.`,
        ],
    },
    {
        num: "8",
        title: "User Content",
        content: [
            `The App may allow you to submit reviews, ratings, comments, or other content ("User Content"). By submitting User Content, you grant GetApp a worldwide, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, and display your User Content in connection with the Services.`,
            `You are solely responsible for your User Content. You agree not to submit any content that is false, misleading, defamatory, offensive, or that infringes on any third-party rights. GetApp reserves the right to remove any User Content at its discretion without prior notice.`,
        ],
    },
    {
        num: "9",
        title: "Intellectual Property",
        content: [
            `All content, features, and functionality of the App, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of GetServed PH Corp. and are protected by applicable intellectual property laws.`,
            `You may not copy, reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from the App without our prior written consent. Unauthorized use of our intellectual property is strictly prohibited.`,
        ],
    },
    {
        num: "10",
        title: "Third-Party Services",
        content: [
            `The App may contain links to or integrations with third-party websites, services, or applications. GetApp does not endorse and is not responsible for the content, privacy practices, or terms of any third-party services. Your use of third-party services is at your own risk and subject to their respective terms and conditions.`,
            `Payments processed through third-party payment gateways are subject to those providers' terms and conditions. GetApp is not responsible for any errors or issues arising from third-party payment processing.`,
        ],
    },
    {
        num: "11",
        title: "Limitation of Liability",
        content: [
            `To the fullest extent permitted by applicable law, GetApp and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of or inability to use the Services.`,
            `GetApp's total liability to you for any claims arising out of or relating to these Terms or the Services shall not exceed the amount you paid to GetApp in the three (3) months preceding the event giving rise to the claim.`,
        ],
    },
    {
        num: "12",
        title: "Disclaimer of Warranties",
        content: [
            `The Services are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. GetApp does not warrant that the App will be uninterrupted, error-free, or free of viruses or other harmful components.`,
            `We do not warrant the accuracy, completeness, or reliability of any content or information available through the App. You use the Services at your own risk.`,
        ],
    },
    {
        num: "13",
        title: "Indemnification",
        content: [
            `You agree to indemnify, defend, and hold harmless GetApp, GetServed PH Corp., and their respective officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the Services, your User Content, or your violation of these Terms.`,
        ],
    },
    {
        num: "14",
        title: "Privacy",
        content: [
            `Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal data.`,
        ],
    },
    {
        num: "15",
        title: "Governing Law and Dispute Resolution",
        content: [
            `These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions.`,
            `Any disputes arising out of or relating to these Terms or the Services shall first be attempted to be resolved through good-faith negotiations. If a resolution cannot be reached, the dispute shall be submitted to the appropriate courts of the Philippines with competent jurisdiction.`,
        ],
    },
    {
        num: "16",
        title: "Termination",
        content: [
            `GetApp reserves the right to suspend or terminate your access to the Services at any time, with or without cause or notice, including if we believe you have violated these Terms or applicable laws.`,
            `Upon termination, your right to use the App will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to intellectual property rights, disclaimers, and limitations of liability.`,
        ],
    },
    {
        num: "17",
        title: "Changes to the Services",
        content: [
            `GetApp reserves the right to modify, suspend, or discontinue any aspect of the Services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.`,
        ],
    },
    {
        num: "18",
        title: "Contact Us",
        content: [
            `If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:`,
            `GetServed PH Corp. — Email: support@getfood.ph | Legal: legal@getfood.ph | Philippines (Servers: Singapore)`,
        ],
    },
];

export default function TermsOfService() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.title = 'GetApp - Terms of Service';
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const pageBg       = isDark ? "bg-neutral-900"  : "bg-[#f7f7f5]";
    const headingColor = isDark ? "text-white"       : "text-[#111111]";
    const bodyColor    = isDark ? "text-neutral-400" : "text-[#5c5c6b]";
    const heroBorder   = isDark ? "border-white/[0.06]" : "border-black/[0.05]";
    const cardBg       = isDark ? "bg-neutral-800 border-neutral-700/60" : "bg-white border-black/[0.07]";
    const tocLinkBase  = isDark
        ? "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
        : "text-[#5c5c6b] hover:bg-black/[0.04] hover:text-[#111]";
    const scrollbarThumb = isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/[0.12]" : "[&::-webkit-scrollbar-thumb]:bg-black/[0.15]";

    return (
        <div className={`w-full transition-colors duration-300 ${pageBg}`}>
            <HeaderNavigationBar />

            {/* Hero */}
            <section className={`pt-20 md:pt-[6.5rem] pb-12 border-b overflow-x-clip transition-colors duration-300 ${pageBg} ${heroBorder}`}>
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10 pt-10">
                    <span className="inline-flex items-center font-[Plus_Jakarta_Sans] text-[0.63rem] font-bold tracking-[0.13em] uppercase text-[#ff0013] bg-[rgba(255,0,19,0.08)] border border-[rgba(255,0,19,0.18)] px-3 py-1 rounded-full mb-4">
                        Legal
                    </span>
                    <h1 className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.03em] mb-3 ${headingColor}`}>
                        Terms of Service
                    </h1>
                    <p className={`text-[0.875rem] ${bodyColor}`}>Last Updated: February 26, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className={`py-14 md:py-20 overflow-x-clip transition-colors duration-300 ${pageBg}`}>
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 xl:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">

                        {/* Sticky Table of Contents */}
                        <div className="hidden lg:block relative">
                            <aside className={`sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:opacity-80 ${scrollbarThumb}`}>
                                <p className="font-[Plus_Jakarta_Sans] font-bold text-[0.7rem] tracking-[0.12em] uppercase text-[#ff0013] mb-4">
                                    Table of Contents
                                </p>
                                <nav className="flex flex-col gap-[2px]">
                                    {SECTIONS.map(s => (
                                        <a
                                            key={s.num}
                                            href={`#section-${s.num}`}
                                            className={`flex items-start gap-2 px-3 py-[0.45rem] rounded-[9px] text-[0.78rem] no-underline transition-all duration-150 ${tocLinkBase}`}
                                        >
                                            <span className={`shrink-0 font-bold text-[0.7rem] mt-[1px] w-4 ${isDark ? "text-neutral-600" : "text-[#ccc]"}`}>{s.num}.</span>
                                            <span className="leading-[1.45]">{s.title}</span>
                                        </a>
                                    ))}
                                </nav>
                            </aside>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col gap-10">
                            {SECTIONS.map(s => (
                                <div
                                    key={s.num}
                                    id={`section-${s.num}`}
                                    className={`border rounded-[18px] p-7 scroll-mt-28 transition-colors duration-300 ${cardBg}`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="w-7 h-7 rounded-[8px] flex items-center justify-center bg-[rgba(255,0,19,0.08)] font-[Plus_Jakarta_Sans] font-bold text-[0.72rem] text-[#ff0013] shrink-0">
                                            {s.num}
                                        </span>
                                        <h2 className={`font-[Plus_Jakarta_Sans] font-bold text-[0.97rem] leading-[1.3] ${headingColor}`}>
                                            {s.title}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col gap-3 pl-10">
                                        {s.content.map((para, i) => (
                                            <p key={i} className={`text-[0.875rem] leading-[1.78] ${bodyColor}`}>
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FooterNavigationBar />
        </div>
    );
}