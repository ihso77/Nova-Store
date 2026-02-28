"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Stars, ShieldCheck, Home, Terminal, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessPage() {
    const { lang } = useLanguage();

    return (
        <div className={`min-h-screen flex items-center justify-center px-6 relative overflow-hidden ${lang === "ar" ? "rtl" : "ltr"}`}>
            {/* Cinematic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-nova-cyan blur-[300px] opacity-[0.05] rounded-full pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-nova-purple blur-[300px] opacity-[0.05] rounded-full pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl w-full text-center space-y-16 relative z-10"
            >
                {/* Status Indicator */}
                <div className="flex justify-center">
                    <div className="relative group">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 bg-nova-cyan/20 blur-3xl rounded-full"
                        />
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="w-32 h-32 rounded-[2.5rem] bg-[#050510]/80 backdrop-blur-3xl border border-nova-cyan/30 flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.2)] group-hover:border-nova-cyan transition-colors duration-500"
                        >
                            <ShieldCheck className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                            {/* Decorative particles */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-10px] border border-dashed border-white/10 rounded-full pointer-events-none"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="bg-white/[0.03] backdrop-blur-3xl px-6 py-2 rounded-2xl border border-white/5 flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-nova-cyan animate-pulse" />
                            <span className="text-[10px] font-[1000] uppercase tracking-[0.5em] text-nova-cyan italic">Protocol_Finalized</span>
                        </div>
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-[1000] text-white tracking-tighter italic leading-[0.85] uppercase">
                        Procured. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-cyan via-white to-white/10">Successfully.</span>
                    </h1>

                    <p className="text-sm font-black text-white/30 max-w-md mx-auto leading-loose uppercase tracking-[0.2em]">
                        {lang === "en"
                            ? "Your strategic asset procurement is now finalized. Our lead architects will contact your terminal within 12 standard cycle hours."
                            : "تم الانتهاء من شراء أصولك الاستراتيجية. سيتصل بك مهندسونا عبر جهازك خلال 12 ساعة دورة قياسية."}
                    </p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Link href="/dashboard" className="block">
                            <Button className="w-full h-20 bg-white text-black text-[11px] font-[1000] uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 transition-all">
                                <Terminal className="w-5 h-5" />
                                {lang === "en" ? "Command Center" : "لوحة التحكم"}
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Link href="/" className="block">
                            <Button variant="outline" className="w-full h-20 border-white/10 bg-white/[0.02] text-white/40 text-[11px] font-[1000] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-4">
                                <Home className="w-5 h-5" />
                                {lang === "en" ? "Return Home" : "الرئيسية"}
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Visual Accent */}
                <div className="pt-20 flex justify-center gap-6 opacity-5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
