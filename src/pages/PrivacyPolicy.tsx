import { useEffect, useState } from 'react';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const SECTIONS = [
    {
        num: "1",
        title: "Introduction",
        content: [
            `Welcome to the GetFood platform run by GetServed PH Corp. and its affiliates ("GetFood", "we", "us" or "our"). GetFood takes its responsibilities under applicable privacy laws and regulations ("Privacy Laws") seriously and is committed to respecting the privacy rights and concerns of all Users of our GetFood website (the "Site") and mobile app (the "App") (collectively, the "Services"). We recognize the importance of the personal data you have entrusted to us and believe that it is our responsibility to properly manage, protect and process your personal data.`,
            `This Privacy Policy ("Policy") is designed to assist you in understanding how we collect, use, disclose and/or process the personal data you have provided to us and/or we possess about you, whether now or in the future. Please read this Privacy Policy carefully. If you have any questions regarding this information or our privacy practices, please see our "Contact Us" page.`,
            `"Personal Data" or "personal data" means data, whether true or not, about an individual who can be identified from that data, or from that data and other information to which an organization has or is likely to have access. Common examples of personal data could include name, identification number and contact information.`,
            `By using the Services, registering for an account with us, visiting our website, or accessing the Services, you acknowledge and agree that you accept the practices, requirements, and/or policies outlined in this Privacy Policy, and you hereby consent to us collecting, using, disclosing and/or processing your personal data as described herein. IF YOU DO NOT CONSENT TO THE PROCESSING OF YOUR PERSONAL DATA AS DESCRIBED IN THIS PRIVACY POLICY, PLEASE DO NOT USE OUR SERVICES OR ACCESS OUR WEBSITE.`,
        ],
    },
    {
        num: "2",
        title: "When Will GetFood Collect Personal Data?",
        content: [
            `We will/may collect personal data about you:`,
            `(a) when you register and/or use our Services or Site, or open an account with us; (b) when you submit any form, including, but not limited to, application forms or other forms relating to any of our products and services, whether online or by way of a physical form; (c) when you enter into any agreement or provide other documentation or information in respect of your interactions with us, or when you use our products and services; (d) when you interact with us, such as via telephone calls (which may be recorded), letters, fax, face-to-face meetings, social media platforms and emails; (e) when you use our electronic services, or interact with us via our application or use services on our website. This includes, without limitation, through cookies which we may deploy when you interact with our application or website; (f) when you carry out transactions through our Services; (g) when you provide us with feedback or complaints; (h) when you register for a contest; or (i) when you submit your personal data to us for any reason.`,
            `When you visit, use or interact with our mobile application or the Site, we may collect certain information by automated or passive means using a variety of technologies. The information we collect may include, without limitation, your Internet Protocol (IP) address, computer/mobile device operating system and browser type, type of mobile device, the characteristics of the mobile device, the unique device identifier (UDID) or mobile equipment identifier (MEID) for your mobile device, the address of a referring web site (if any), and the pages you visit on our website and mobile applications and the times of visit.`,
            `Our mobile applications may collect precise information about the location of your mobile device using technologies such as GPS, Wi-Fi, etc. We collect, use, disclose and/or process this information for one or more Purposes including, without limitation, location-based services that you request or to deliver relevant content to you based on your location or to allow you to share your location to other Users as part of the services under our mobile applications.`,
        ],
    },
    {
        num: "3",
        title: "What Personal Data Will GetFood Collect?",
        content: [
            `The personal data that GetFood may collect includes but is not limited to: name; email address; date of birth; address; telephone number; any other information about the User when the User signs up to use our Services or website, and when the User uses the Services or website, as well as information related to how the User uses our Services or website; and aggregate data on content the User engages with.`,
            `If you do not want us to collect the aforementioned information/personal data, you may opt out at any time by notifying our Data Protection Officer in writing about it. Note, however, that opting out of us collecting your personal data or withdrawing your consent for us to collect, use or process your personal data may affect your use of the Services. For example, opting out of the collection of location information will cause its location-based features to be disabled.`,
        ],
    },
    {
        num: "4",
        title: "Setting Up an Account",
        content: [
            `In order to use certain functionalities of the Services, you will have to create a user account which requires you to submit certain personal data. When you register and create an account, we require you to provide us with your name and email address. We may also ask for certain information about yourself such as your telephone number, email address, personal address, photo identification, bank account details, age, date of birth, gender and interests. Your mobile number and a one-time password (OTP) will be used every time you logged in so you can securely access and maintain your account.`,
        ],
    },
    {
        num: "5",
        title: "Viewing Web Pages",
        content: [
            `As with most websites, your computer sends information which may include personal data about you that gets logged by a web server when you browse our Site. This typically includes without limitation your computer's IP address, operating system, browser name/version, the referring web page, requested page, date/time, and sometimes a "cookie" (which can be disabled using your browser preferences) to help the site remember your last visit. If you are logged in, this information is associated with your personal account.`,
        ],
    },
    {
        num: "6",
        title: "Cookies",
        content: [
            `We may from time to time implement "cookies" or other features to allow us or third parties to collect or share information that will help us improve our Site and the Services we offer, or help us offer new services and features. "Cookies" are identifiers we transfer to your computer or mobile device that allow us to recognize your computer or device and tell us how and when the Services or website are used or visited, by how many people and to track movements within our website.`,
            `You may refuse the use of cookies by selecting the appropriate settings on your browser. However, please note that if you do this you may not be able to use the full functionality of our Site or the Services.`,
        ],
    },
    {
        num: "7",
        title: "Viewing and Downloading Content and Advertising",
        content: [
            `As with browsing web pages, when you watch content and advertising and access other software on our Site or through the Services, most of the same information is sent to us (including, without limitation, IP Address, operating system, etc.); but, instead of page views, your computer sends us information on the content, advertisement viewed and/or software installed by the Services and the website and time.`,
        ],
    },
    {
        num: "8",
        title: "Community & Support",
        content: [
            `We provide customer service support through email, SMS and feedback forms. In order to provide customer support, we will ask for your email address and mobile phone number. We only use information received from customer support requests, including, without limitation, email addresses, for customer support services and we do not transfer to or share this information with any third parties.`,
        ],
    },
    {
        num: "9",
        title: "Surveys",
        content: [
            `From time-to-time, we may request information from Users via surveys. Participation in these surveys is completely voluntary and you therefore have a choice whether or not to disclose your information to us. Information requested may include, without limitation, contact information (such as your email address), and demographic information (such as interests or age level). Survey information will be used for the purposes of monitoring or improving the use and satisfaction of the Services and will not be transferred to third parties, other than our contractors who help us to administer or act upon the survey.`,
        ],
    },
    {
        num: "10",
        title: "How Do We Use the Information You Provide Us?",
        content: [
            `We may collect, use, disclose and/or process your personal data for one or more of the following purposes: (a) to consider and/or process your application/transaction with us or your transactions or communications with third parties via the Services; (b) to manage, operate, provide and/or administer your use of and/or access to our Services and our website, as well as your relationship and user account with us; (c) to manage, operate, administer and provide you with as well as to facilitate the provision of our Services, including, without limitation, remembering your preferences; (d) to tailor your experience through the Services by displaying content according to your interests and preferences; (e) to respond to, process, deal with or complete a transaction and/or to fulfill your requests for certain products and services and notify you of service issues and unusual account actions; (f) to enforce our Terms of Service or any applicable end user license agreements; (g) to protect personal safety and the rights, property or safety of others; (h) for identification and/or verification; (i) to maintain and administer any software updates and/or other updates and support that may be required from time to time to ensure the smooth running of our Services.`,
            `Additional purposes include: (j) to deal with or facilitate customer service, carry out your instructions, deal with or respond to any enquiries given by you or on your behalf; (k) to contact you or communicate with you via voice call, text message, email and/or postal mail for the purposes of administering and/or managing your relationship with us or your use of our Services; (l) to inform you when another User has sent you a private message or posted a comment for you on the Site; (m) to conduct research, analysis and development activities to analyze how you use our Services and to improve our Services or products; (n) to allow for audits and surveys; (o) where you give us your prior consent, for marketing and promotional purposes; (p) to respond to legal processes or to comply with or as required by any applicable law, governmental or regulatory requirements; (q) to produce statistics and research for internal and statutory reporting and/or record-keeping requirements; (r) to carry out due diligence or other screening activities; (s) to audit our Services or GetFood's business; (t) to prevent or investigate any fraud, unlawful activity, omission or misconduct; (u) to store, host, back up your personal data; (v) to deal with and/or facilitate a business asset transaction; and/or (w) any other purposes which we notify you of at the time of obtaining your consent.`,
        ],
    },
    {
        num: "11",
        title: "Sharing of Information from the Services",
        content: [
            `Our Services enable Users to share personal information with each other, in almost all occasions without GetFood's involvement, to complete transactions. In a typical transaction, Users may have access to each other's name, user ID, email address and other contact and postage information. Our Terms of Service require that Users in possession of another User's personal data (the "Receiving Party") must (i) comply with all applicable Privacy Laws; (ii) allow the other User (the "Disclosing Party") to remove him/herself from the Receiving Party's database; and (iii) allow the Disclosing Party to review what information have been collected about them by the Receiving Party.`,
        ],
    },
    {
        num: "12",
        title: "How Does GetFood Protect Customer Information?",
        content: [
            `We implement a variety of security measures to ensure the security of your personal data on our systems. User personal data is contained behind secured networks and is only accessible by a limited number of employees who have special access rights to such systems. We will retain personal data in accordance with the Privacy Laws and/or other applicable laws. That is, we will destroy or anonymize your personal data as soon as it is reasonable to assume that (i) the purpose for which that personal data was collected is no longer being served by the retention of such personal data; and (ii) retention is no longer necessary for any legal or business purposes.`,
        ],
    },
    {
        num: "13",
        title: "Does GetFood Disclose the Information It Collects from Its Visitors to Outside Parties?",
        content: [
            `In conducting our business, we will/may need to disclose your personal data to our third party service providers, agents and/or our affiliates or related corporations, and/or other third parties, whether sited in Singapore or outside of Singapore, for one or more of the above-stated Purposes. Such third parties include, without limitation: (a) our subsidiaries, affiliates and related corporations; (b) contractors, agents, service providers and other third parties we use to support our business; (c) a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of GetFood's assets; and (d) third parties to whom disclosure by us is for one or more of the Purposes.`,
            `This may require, among other things, sharing statistical and demographic information about our Users and their use of the Services with suppliers of advertisements and programming. This would not include anything that could be used to identify you specifically or to discover individual information about you.`,
            `Third parties may unlawfully intercept or access personal data transmitted to or contained on the site, technologies may malfunction or not work as anticipated, or someone might access, abuse or misuse information through no fault of ours. We will nevertheless deploy reasonable security arrangements to protect your personal data as required by the Privacy Laws.`,
        ],
    },
    {
        num: "14",
        title: "Information on Children",
        content: [
            `The Services are not intended for children under the age of 10. We do not knowingly collect or maintain any personal data or non-personally-identifiable information from anyone under the age of 10 nor is any part of our Site or other Services directed to children under the age of 10. We will close any accounts used exclusively by such children and will remove and/or delete any personal data we believe was submitted by any child under the age of 10.`,
        ],
    },
    {
        num: "15",
        title: "Information Collected by Third Parties",
        content: [
            `Our Site uses Google Analytics, a web analytics service provided by Google, Inc. ("Google"). Google Analytics uses cookies, which are text files placed on your computer, to help the website analyze how Users use the Site. The information generated by the cookie about your use of the website (including your IP address) will be transmitted to and stored by Google on servers in the United States. Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity for website operators and providing other services relating to website activity and Internet usage.`,
            `We, and third parties, may from time to time make software applications downloads available for your use on or through the Services. These applications may separately access, and allow a third party to view, your identifiable information. Third party products or services provided through these applications are not owned or controlled by GetFood. You are encouraged to read the terms and other policies published by such third parties on their websites or otherwise.`,
        ],
    },
    {
        num: "16",
        title: "Disclaimer Regarding Security and Third Party Sites",
        content: [
            `WE DO NOT GUARANTEE THE SECURITY OF PERSONAL DATA AND/OR OTHER INFORMATION THAT YOU PROVIDE ON THIRD PARTY SITES. We do implement a variety of security measures to maintain the safety of your personal data that is in our possession or under our control. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems. When you place orders or access your personal data, we offer the use of a secure server.`,
            `In an attempt to provide you with increased value, we may choose various third party websites to link to, and frame within, the Site. These linked sites have separate and independent privacy policies as well as security arrangements. We therefore have no responsibility or liability for the content, security arrangements (or lack thereof) and activities of these linked sites. These linked sites are only for your convenience and you therefore access them at your own risk.`,
        ],
    },
    {
        num: "17",
        title: "Will GetFood Transfer Your Information Overseas?",
        content: [
            `Your personal data and/or information may be transferred to, stored or processed outside of your country. In most cases, your personal data will be processed in Singapore, where our servers are located and our central database is operated. GetFood will only transfer your information overseas in accordance with Privacy Laws.`,
        ],
    },
    {
        num: "18",
        title: "How Can You Opt-Out, Remove, Request Access to or Modify Information You Have Provided to Us?",
        content: [
            `To modify your email subscriptions, please let us know by sending an email to our Personal Data Protection Officer at the address listed below. Please note that due to email production schedules, you may still receive emails that are already in production.`,
            `You may withdraw your consent for the collection, use and/or disclosure of your personal data in our possession or under our control by sending an email to our Personal Data Protection Officer. Once we have your clear withdrawal instructions and verified your identity, we will process your request for withdrawal of consent. However, your withdrawal of consent could result in certain legal consequences, including that we may not be able to continue providing the Services to you.`,
            `If you have an account with us, you may personally access and/or correct your personal data currently in our possession or control through the Account Settings page on the Site. For a request to access personal data, once we have sufficient information from you to deal with the request, we will seek to provide you with the relevant personal data within 30 days. For a request to delete personal data, we will remove your personal data from the system within 15-30 days.`,
        ],
    },
    {
        num: "19",
        title: "Questions, Concerns or Complaints? Contact Us",
        content: [
            `If you have any questions or concerns about our privacy practices or your dealings with the Services, please do not hesitate to contact: support@getfood.ph`,
            `If you have any complaint or grievance regarding how we are handling your personal data or about how we are complying with Privacy Laws, we welcome you to contact us with your complaint or grievance. Please contact us through email: dpo@getfood.ph — Attention: "Personal Data Protection Officer". Please send all legal notices to legal@getfood.ph — Attention: "General Counsel".`,
            `Where it is an email or a letter through which you are submitting a complaint, your indication at the subject header that it is a Privacy Law complaint would assist us in attending to your complaint speedily. For example, you could insert the subject header as "Privacy Complaint". We will certainly strive to deal with any complaint or grievance that you may have fairly and as soon as possible.`,
        ],
    },
    {
        num: "20",
        title: "Terms and Conditions",
        content: [
            `Please also read the Terms of Service establishing the use, disclaimers, and limitations of liability governing the use of the Site and the Services and other related policies.`,
        ],
    },
];

export default function PrivacyPolicy() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.title = 'GetApp - Privacy Policy';
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const pageBg      = isDark ? "bg-neutral-900"  : "bg-[#f7f7f5]";
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
                        Privacy Policy
                    </h1>
                    <p className={`text-[0.875rem] ${bodyColor}`}>Last Updated: November 28, 2023</p>
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
                                    {/* Section header */}
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