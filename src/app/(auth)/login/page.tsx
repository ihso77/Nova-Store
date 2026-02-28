"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const { lang } = useLanguage();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || (lang === "en" ? "Failed to sign in" : "فشل تسجيل الدخول"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden z-0">
            {/* Cinematic Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-nova-purple blur-[250px] opacity-20 rounded-full mix-blend-screen pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-nova-cyan blur-[250px] opacity-20 rounded-full mix-blend-screen pointer-events-none -z-10 animate-[pulse-nova_10s_infinite_alternate]" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none -z-10" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg relative"
            >
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-nova-purple/20 via-nova-cyan/20 to-nova-pink/20 rounded-[4rem] blur-3xl opacity-50 -z-10" />

                <div className="bg-[#050510]/60 backdrop-blur-3xl p-10 md:p-16 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                    {/* Inner highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative z-10">
                        <div className="text-center space-y-6 mb-12">
                            <motion.div
                                initial={{ rotate: -10, scale: 0.8 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-nova-purple/10 border border-nova-purple/20 mb-2 shadow-[0_0_30px_rgba(167,139,250,0.2)]"
                            >
                                <Lock className="w-10 h-10 text-nova-purple" />
                            </motion.div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-[1000] text-white tracking-tighter italic uppercase mb-2">
                                    {lang === "en" ? "IDENT" : "هوية"}<span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-purple to-nova-cyan">VERIFY</span>
                                </h1>
                                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.5em]">
                                    {lang === "en" ? "Operative Access Required" : "مطلوب تصريح وصول العميل"}
                                </p>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl flex items-center gap-4 mb-8 overflow-hidden"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p className="text-xs font-black tracking-widest uppercase">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-3 group/input">
                                <label className="text-[10px] font-[1000] tracking-[0.4em] uppercase text-white/30 group-focus-within/input:text-nova-purple transition-colors ml-1">
                                    {lang === "en" ? "Protocol Email" : "بريد البروتوكول"}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-nova-purple transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white focus:outline-none focus:border-nova-purple focus:ring-1 focus:ring-nova-purple transition-all placeholder:text-white/10"
                                        placeholder="terminal@nova.operative"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 group/input">
                                <label className="text-[10px] font-[1000] tracking-[0.4em] uppercase text-white/30 group-focus-within/input:text-nova-purple transition-colors ml-1">
                                    {lang === "en" ? "Security Token" : "رمز الأمان"}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-nova-purple transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white focus:outline-none focus:border-nova-purple focus:ring-1 focus:ring-nova-purple transition-all placeholder:text-white/10"
                                        placeholder="••••••••"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="primary" className="w-full mt-10 h-18 text-xs font-black tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform rounded-[1.5rem]" isLoading={loading}>
                                {lang === "en" ? "AUTHORIZE ACCESS" : "تصريح الدخول"}
                                {!loading && <ArrowRight className={`w-5 h-5 ml-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />}
                            </Button>
                        </form>

                        <div className="mt-12 flex flex-col items-center gap-6">
                            <div className="text-center text-white/30 text-[10px] font-[1000] tracking-widest uppercase">
                                {lang === "en" ? "New Operative? " : "عميل جديد؟ "}
                                <Link href="/register" className="text-nova-cyan hover:text-nova-purple transition-colors ml-2 underline decoration-nova-cyan/20 underline-offset-[6px]">
                                    {lang === "en" ? "Request Matrix Entry" : "طلب دخول المصفوفة"}
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                                <ShieldCheck className="w-3.5 h-3.5 text-nova-cyan" />
                                <span className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">Military Grade Encryption Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
