"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, Package, CreditCard, User,
    ShoppingBag, Star, ArrowRight, CheckCircle2, LayoutDashboard, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import PromotionalCanvas from "@/components/ui/PromotionalCanvas";
import { motion, AnimatePresence } from "framer-motion";

const STEPS_EN = [
    {
        id: 1,
        icon: <User className="w-8 h-8" />,
        title: "Create Your Account",
        description: "Sign up in seconds with your email and a secure password. Your neural identity will be established in the Nova network.",
        details: [
            "Click on the 'Register' button in the top navigation",
            "Enter your full name, email address, and a secure password",
            "You'll be instantly redirected to your command dashboard",
        ],
        color: "from-nova-cyan to-nova-purple",
        accent: "text-nova-cyan",
        border: "border-nova-cyan/30",
        glow: "shadow-[0_0_40px_rgba(6,182,212,0.15)]",
        link: "/register",
        linkLabel: "Get Started →",
    },
    {
        id: 2,
        icon: <Package className="w-8 h-8" />,
        title: "Browse Our Packages",
        description: "Explore our elite portfolio of website design and digital product packages. Choose the tier that matches your ambitions.",
        details: [
            "Navigate to the 'Packages' page from the nav menu",
            "Review the 3 service tiers: Starter, Elite, and Empire",
            "You can also purchase our premium Cybersecurity Toolkit",
        ],
        color: "from-nova-purple to-nova-pink",
        accent: "text-nova-purple",
        border: "border-nova-purple/30",
        glow: "shadow-[0_0_40px_rgba(167,139,250,0.15)]",
        link: "/packages",
        linkLabel: "See Packages →",
    },
    {
        id: 3,
        icon: <ShoppingBag className="w-8 h-8" />,
        title: "Configure Your Order",
        description: "Tell us exactly what you need. Our bespoke checkout system lets you specify every detail for a custom-built project.",
        details: [
            "Select a package and click 'Order Now' to go to checkout",
            "Fill in project details: business name, has a logo, description",
            "Review your order summary before proceeding to payment",
        ],
        color: "from-nova-pink to-nova-fuchsia",
        accent: "text-nova-pink",
        border: "border-nova-pink/30",
        glow: "shadow-[0_0_40px_rgba(236,72,153,0.15)]",
        link: "/packages",
        linkLabel: "Order Now →",
    },
    {
        id: 4,
        icon: <CreditCard className="w-8 h-8" />,
        title: "Complete Secure Payment",
        description: "Pay safely via PayPal with full buyer protection. All transactions are encrypted with military-grade 256-bit security.",
        details: [
            "You'll be directed to our secure PayPal payment gateway",
            "Log into your PayPal account or pay as a Guest via card",
            "After payment, you'll receive an instant confirmation",
        ],
        color: "from-blue-500 to-nova-cyan",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
        link: "/packages",
        linkLabel: "Start Ordering →",
    },
    {
        id: 5,
        icon: <LayoutDashboard className="w-8 h-8" />,
        title: "Track From Your Dashboard",
        description: "Monitor all your orders and their real-time status directly from your personal command center dashboard.",
        details: [
            "Go to Dashboard to see all your orders and their current status",
            "Statuses include: Pending, Paid, and Completed",
            "Contact us anytime through your dashboard for updates",
        ],
        color: "from-green-500 to-nova-cyan",
        accent: "text-green-400",
        border: "border-green-500/30",
        glow: "shadow-[0_0_40px_rgba(74,222,128,0.15)]",
        link: "/dashboard",
        linkLabel: "Open Dashboard →",
    },
];

const STEPS_AR = [
    {
        id: 1,
        icon: <User className="w-8 h-8" />,
        title: "أنشئ حسابك",
        description: "سجّل في ثوانٍ باستخدام بريدك الإلكتروني وكلمة مرور آمنة. سيتم تأسيس هويتك الرقمية في شبكة نوفا.",
        details: [
            "انقر على زر 'إنشاء حساب' في قائمة التنقل العلوية",
            "أدخل اسمك الكامل وبريدك الإلكتروني وكلمة مرور",
            "سيتم توجيهك فورًا إلى لوحة تحكمك الشخصية",
        ],
        color: "from-nova-cyan to-nova-purple",
        accent: "text-nova-cyan",
        border: "border-nova-cyan/30",
        glow: "shadow-[0_0_40px_rgba(6,182,212,0.15)]",
        link: "/register",
        linkLabel: "← ابدأ الآن",
    },
    {
        id: 2,
        icon: <Package className="w-8 h-8" />,
        title: "استعرض الباقات",
        description: "تصفح مجموعتنا المتميزة من باقات تصميم المواقع والمنتجات الرقمية. اختر المستوى الذي يناسب طموحاتك.",
        details: [
            "انتقل إلى صفحة 'الباقات' من قائمة التنقل",
            "راجع الثلاثة مستويات: المبتدئ، النخبة، والإمبراطورية",
            "يمكنك أيضًا شراء حزمة الأمن السيبراني الاحترافية",
        ],
        color: "from-nova-purple to-nova-pink",
        accent: "text-nova-purple",
        border: "border-nova-purple/30",
        glow: "shadow-[0_0_40px_rgba(167,139,250,0.15)]",
        link: "/packages",
        linkLabel: "← اعرض الباقات",
    },
    {
        id: 3,
        icon: <ShoppingBag className="w-8 h-8" />,
        title: "خصّص طلبك",
        description: "أخبرنا بالضبط بما تحتاجه. يتيح لك نظام الطلب المخصص تحديد كل تفاصيل مشروعك.",
        details: [
            "اختر باقة وانقر 'اطلب الآن' للانتقال للدفع",
            "أدخل تفاصيل المشروع واسم النشاط التجاري",
            "راجع ملخص طلبك قبل الانتقال إلى الدفع",
        ],
        color: "from-nova-pink to-nova-fuchsia",
        accent: "text-nova-pink",
        border: "border-nova-pink/30",
        glow: "shadow-[0_0_40px_rgba(236,72,153,0.15)]",
        link: "/packages",
        linkLabel: "← اطلب الآن",
    },
    {
        id: 4,
        icon: <CreditCard className="w-8 h-8" />,
        title: "أتمم الدفع الآمن",
        description: "ادفع بأمان عبر PayPal مع حماية كاملة للمشترين. جميع المعاملات مشفرة بأعلى معايير الأمان.",
        details: [
            "سيتم توجيهك إلى بوابة الدفع الآمنة عبر PayPal",
            "سجّل دخولك إلى حساب PayPal أو ادفع كضيف بالبطاقة",
            "بعد الدفع، ستتلقى تأكيدًا فوريًا",
        ],
        color: "from-blue-500 to-nova-cyan",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
        link: "/packages",
        linkLabel: "← ابدأ الطلب",
    },
    {
        id: 5,
        icon: <LayoutDashboard className="w-8 h-8" />,
        title: "تتبّع طلباتك",
        description: "راقب جميع طلباتك وحالتها في الوقت الفعلي مباشرةً من لوحة التحكم الشخصية.",
        details: [
            "انتقل إلى 'لوحة التحكم' لرؤية جميع طلباتك",
            "الحالات تشمل: قيد الانتظار، مدفوع، ومكتمل",
            "تواصل معنا في أي وقت من لوحة التحكم",
        ],
        color: "from-green-500 to-nova-cyan",
        accent: "text-green-400",
        border: "border-green-500/30",
        glow: "shadow-[0_0_40px_rgba(74,222,128,0.15)]",
        link: "/dashboard",
        linkLabel: "← افتح لوحة التحكم",
    },
];

export default function TutorialPage() {
    const { lang } = useLanguage();
    const steps = lang === "en" ? STEPS_EN : STEPS_AR;
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="relative min-h-screen bg-[#020205] overflow-hidden">
            {/* --- Background Glows --- */}
            <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-nova-purple blur-[250px] opacity-10 rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-nova-cyan blur-[250px] opacity-10 rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">

                {/* ===== Header ===== */}
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-nova-cyan/30 bg-nova-cyan/5 mb-10 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            <BookOpen className="w-5 h-5 text-nova-cyan animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-nova-cyan">
                                {lang === "en" ? "Operative Protocol" : "بروتوكول التشغيل"}
                            </span>
                        </span>

                        <h1 className="text-7xl md:text-9xl font-[1000] text-white tracking-[0.05em] leading-[0.85] mb-12 italic uppercase drop-shadow-2xl">
                            {lang === "en" ? "MASTER" : "دليل"}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-cyan via-white to-nova-purple">
                                {lang === "en" ? "THE FLOW" : "الاحتراف"}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest">
                            {lang === "en"
                                ? "Complete neural guide to the Nova architecture."
                                : "دليل شامل للهندسة البرمجية في نوفا."}
                        </p>
                    </motion.div>
                </div>

                {/* ===== CINEMATIC VIDEO SECTION ===== */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative mb-40 group"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-nova-cyan/20 via-nova-purple/20 to-nova-pink/20 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

                    <div className="relative bg-[#050510]/50 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl">
                        {/* Top label bar */}
                        <div className="flex items-center gap-4 px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex gap-2.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-red-400/20 border border-red-400/40" />
                                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/20 border border-yellow-400/40" />
                                <div className="w-3.5 h-3.5 rounded-full bg-green-400/20 border border-green-400/40" />
                            </div>
                            <div className="h-4 w-px bg-white/10 mx-4" />
                            <span className="font-[900] text-white/20 text-[10px] tracking-[0.5em] uppercase">SYSTEM.INITIALIZE_PROMO</span>
                        </div>

                        {/* Canvas animation */}
                        <div className="w-full h-[600px] relative">
                            <PromotionalCanvas />
                        </div>
                    </div>
                </motion.div>

                {/* ===== INTERACTIVE STEPS ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Step Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {steps.map((step, idx) => (
                            <motion.button
                                key={step.id}
                                onClick={() => setActiveStep(idx)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                whileHover={{ scale: 1.02 }}
                                className={`group flex items-center gap-6 p-6 rounded-[2rem] text-left transition-all duration-500 border ${activeStep === idx
                                    ? `bg-white/[0.03] ${step.border} shadow-2xl`
                                    : 'border-transparent hover:bg-white/[0.02] hover:border-white/5'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0 shadow-xl ${activeStep === idx ? 'scale-110 rotate-[10deg]' : 'opacity-40 group-hover:opacity-100'} transition-all duration-500`}>
                                    {step.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${activeStep === idx ? step.accent : 'text-gray-500'} transition-colors`}>
                                        {lang === "en" ? `Phase ${step.id}` : `المرحلة ${step.id}`}
                                    </div>
                                    <div className={`font-[1000] text-lg italic uppercase tracking-tighter ${activeStep === idx ? 'text-white' : 'text-gray-400'} transition-colors`}>
                                        {step.title}
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 shrink-0 ${activeStep === idx ? step.accent : 'text-gray-700'} transition-all ${activeStep === idx ? 'translate-x-2' : ''}`} />
                            </motion.button>
                        ))}
                    </div>

                    {/* Step Detail Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="lg:col-span-8 relative group"
                        >
                            <div className={`absolute -inset-px rounded-[3.5rem] bg-gradient-to-br ${steps[activeStep].color} blur-3xl opacity-10 transition-all duration-1000 group-hover:opacity-20 -z-10`} />

                            <div className="bg-[#050510]/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-10 md:p-16 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -z-10" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/5 rounded-bl-[2rem]" />

                                <div className="flex items-start justify-between gap-6 mb-12">
                                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center text-white shadow-2xl relative`}>
                                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-50" />
                                        <div className="relative scale-150">{steps[activeStep].icon}</div>
                                    </div>
                                    <div className="text-[10rem] font-[1000] text-white/[0.03] leading-[0.7] select-none italic tracking-tighter">
                                        {String(steps[activeStep].id).padStart(2, '0')}
                                    </div>
                                </div>

                                <div className={`text-[12px] font-black uppercase tracking-[0.5em] mb-4 ${steps[activeStep].accent}`}>
                                    {lang === "en" ? `Protocol Wave ${steps[activeStep].id}` : `موجة البروتوكول ${steps[activeStep].id}`}
                                </div>

                                <h2 className="text-5xl md:text-7xl font-[1000] text-white tracking-tighter mb-8 italic uppercase leading-tight">
                                    {steps[activeStep].title}
                                </h2>

                                <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium max-w-2xl">
                                    {steps[activeStep].description}
                                </p>

                                <div className="space-y-6 mb-16">
                                    {steps[activeStep].details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-6 group/detail">
                                            <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 shadow-lg group-hover/detail:scale-110 transition-transform`}>
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${steps[activeStep].color}`} />
                                            </div>
                                            <p className="text-white/40 text-lg leading-relaxed group-hover/detail:text-white transition-colors duration-500">{detail}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <Link href={steps[activeStep].link} className="group relative">
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${steps[activeStep].color} rounded-2xl blur opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
                                        <Button className="relative h-16 px-12 rounded-2xl font-black text-black bg-white border-0 flex items-center gap-4 uppercase tracking-widest text-xs hover:scale-105 transition-all">
                                            {steps[activeStep].linkLabel}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Button>
                                    </Link>

                                    {activeStep < steps.length - 1 && (
                                        <button
                                            onClick={() => setActiveStep(activeStep + 1)}
                                            className="h-16 px-12 rounded-2xl font-black text-white/40 hover:text-white border border-white/10 hover:border-white/20 transition-all uppercase tracking-widest text-xs"
                                        >
                                            {lang === "en" ? "Proceed to Next ➔" : "← تابع للمرحلة التالية"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ===== Final CTA ===== */}
                <div className="mt-32 text-center relative animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-nova-purple blur-[150px] opacity-20 rounded-full pointer-events-none" />
                    <div className="relative">
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-6">
                            {lang === "en" ? "Ready to Begin?" : "جاهز للبدء؟"}
                        </h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
                            {lang === "en"
                                ? "Your digital masterpiece awaits. Start the journey now."
                                : "تحفتك الرقمية في انتظارك. ابدأ رحلتك الآن."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                            <Link href="/packages" className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-nova-cyan via-nova-purple to-nova-pink rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
                                <Button size="lg" className="relative text-lg py-6 px-12 font-black uppercase tracking-widest bg-black text-white border border-white/20 rounded-full flex items-center gap-4 group-hover:scale-[1.02] transition-all duration-500 shadow-[inset_0_0_30px_rgba(167,139,250,0.2)]">
                                    {lang === "en" ? "Browse Packages" : "تصفح الباقات"}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-nova-cyan" />
                                </Button>
                            </Link>
                            <Link href="/register" className="text-gray-400 hover:text-nova-cyan font-bold text-lg underline decoration-nova-cyan/30 underline-offset-4 transition-colors">
                                {lang === "en" ? "Create Free Account" : "إنشاء حساب مجاني"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
