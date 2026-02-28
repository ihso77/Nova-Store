"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Check, Star, Zap, Shield, Globe, ArrowRight, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PackagesPage() {
    const { lang, t } = useLanguage();

    const plans = [
        {
            id: "basic",
            name: lang === "en" ? "Essential" : "الأساسية",
            price: lang === "en" ? "$49" : "185 ر.س",
            features: [
                lang === "en" ? "Standard Design" : "تصميم قياسي",
                lang === "en" ? "3 Pages" : "3 صفحات",
                lang === "en" ? "Basic SEO" : "سيو أساسي",
                lang === "en" ? "Mobile Responsive" : "متوافق مع الجوال",
            ],
            color: "text-white/40"
        },
        {
            id: "standard",
            name: lang === "en" ? "Professional" : "الاحترافية",
            price: lang === "en" ? "$149" : "560 ر.س",
            features: [
                lang === "en" ? "Premium Design" : "تصميم مميز",
                lang === "en" ? "10 Pages" : "10 صفحات",
                lang === "en" ? "Advanced SEO" : "سيو متقدم",
                lang === "en" ? "Speed Optimized" : "سرعة عالية",
            ],
            popular: true,
            color: "text-nova-purple"
        },
        {
            id: "premium",
            name: lang === "en" ? "Luxury" : "الفخمة",
            price: lang === "en" ? "$499" : "1,870 ر.س",
            features: [
                lang === "en" ? "Custom Animation" : "أنيميشن مخصص",
                lang === "en" ? "Unlimited Pages" : "صفحات غير محدودة",
                lang === "en" ? "E-commerce Ready" : "متجر إلكتروني",
                lang === "en" ? "VIP Support" : "دعم VIP",
            ],
            color: "text-nova-cyan"
        }
    ];

    return (
        <div className={`min-h-screen pt-40 pb-20 px-6 ${lang === "ar" ? "rtl" : "ltr"}`}>

            <div className="max-w-7xl mx-auto space-y-24">

                {/* Header */}
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="glass-panel px-8 py-3 rounded-full border-white/5 flex items-center gap-4 bg-white/[0.02]">
                            <Sparkles className="w-4 h-4 text-nova-purple animate-pulse" />
                            <span className="text-[11px] font-[900] uppercase tracking-[0.5em] text-white/70">
                                {lang === "en" ? "Digital Selection Terminal" : "محطة الاختيار الرقمي"}
                            </span>
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-[1000] text-white tracking-tighter italic leading-tight"
                    >
                        {lang === "en" ? "CHOOSE" : "اختر"} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent italic">{lang === "en" ? "YOUR LEGACY." : "إرثك."}</span>
                    </motion.h1>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative group ${plan.popular ? 'z-10' : 'z-0'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full border-nova-purple/20 text-[9px] font-black uppercase tracking-[0.2em] text-nova-purple z-20">
                                    Recommended
                                </div>
                            )}

                            <div className={`glass-panel p-10 rounded-3xl h-full border-white/5 transition-all duration-700 hover:-translate-y-4 ${plan.popular ? 'bg-nova-purple/5 border-nova-purple/20 shadow-[0_30px_100px_-20px_rgba(129,140,248,0.15)]' : ''}`}>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h3 className={`text-xs font-black uppercase tracking-widest ${plan.color}`}>
                                            {plan.name}
                                        </h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-white italic tracking-tighter">{plan.price}</span>
                                            <span className="text-white/20 text-xs font-black uppercase tracking-widest">/ Project</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-white/5" />

                                    <ul className="space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-4 group/item">
                                                <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover/item:border-nova-purple/30 transition-colors">
                                                    <Check className="w-3 h-3 text-white/60 group-hover/item:text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8">
                                        <Link href={`/checkout?plan=${plan.id}`}>
                                            <Button
                                                variant={plan.popular ? "primary" : "secondary"}
                                                className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                                            >
                                                {lang === "en" ? "Initiate Selection" : "بدء الاختيار"}
                                                <ArrowRight className="ml-3 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Features Bento */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
                    <div className="lg:col-span-8 glass-panel p-12 rounded-3xl flex flex-col justify-between space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-nova-cyan uppercase tracking-[0.4em]">The Architecture</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none">
                                Performance <br />
                                <span className="opacity-30">Without Compromise.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <Shield className="w-6 h-6 text-nova-purple" />
                                <h4 className="text-sm font-black text-white uppercase tracking-widest">Enterprise Security</h4>
                                <p className="text-xs text-white/30 leading-relaxed font-medium">Multi-layer encryption and real-time monitoring on every asset.</p>
                            </div>
                            <div className="space-y-4">
                                <Globe className="w-6 h-6 text-nova-cyan" />
                                <h4 className="text-sm font-black text-white uppercase tracking-widest">Cloud Distribution</h4>
                                <p className="text-xs text-white/30 leading-relaxed font-medium">Global CDN edge networks ensuring the lowest latency possible.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 glass-panel p-12 rounded-3xl bg-nova-purple/5 border-nova-purple/20 flex flex-col items-center justify-center text-center space-y-8">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                            <Star className="w-10 h-10 text-white animate-spin-slow" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Support</h3>
                            <p className="text-xs text-white/40 font-medium tracking-tight">Need a custom solution? Our architects are ready.</p>
                        </div>
                        <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest border border-white/10 w-full h-14 rounded-xl">
                            {lang === "en" ? "Contact Support" : "اتصل بالدعم"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
