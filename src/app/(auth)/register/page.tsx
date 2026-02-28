"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
    User as UserIcon, Mail, Phone, Lock, AlertCircle,
    ArrowRight, ShieldCheck, Zap, CheckCircle2, RefreshCw, KeyRound
} from "lucide-react";
import { supabase } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { registerSchema } from "@/lib/validations";

import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
    const { lang } = useLanguage();
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setLoading(true);
        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: { data: { name: formData.name, phone: formData.phone } },
            });
            if (signUpError) throw signUpError;

            setIsSuccess(true);
            setTimeout(() => router.push("/dashboard"), 2000);
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden z-0">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-nova-cyan blur-[250px] opacity-15 rounded-full mix-blend-screen pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-nova-pink blur-[250px] opacity-10 rounded-full mix-blend-screen pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none -z-10" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-2xl relative"
            >
                <div className="absolute -inset-6 bg-gradient-to-b from-nova-cyan/20 to-nova-purple/20 rounded-[4rem] blur-3xl opacity-30 -z-10" />

                <div className="bg-[#050510]/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />

                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-10 md:p-16 relative z-10"
                            >
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-nova-cyan/10 border border-nova-cyan/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                        <Zap className="w-10 h-10 text-nova-cyan" />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-[1000] text-white tracking-tighter italic uppercase mb-3">
                                        {lang === "en" ? "INITIALIZE" : "بدء"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">CORE</span> <br />
                                        <span className="text-nova-cyan">ENTITY</span>
                                    </h1>
                                    <p className="text-[10px] text-nova-purple font-[1000] uppercase tracking-[0.5em] italic">
                                        {lang === "en" ? "Begin your digital evolution" : "ابدأ تطورك الرقمي"}
                                    </p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl flex items-center gap-4 mb-8 text-xs font-black uppercase tracking-widest"
                                    >
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3 group/i">
                                            <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/i:text-nova-cyan transition-colors ml-1">
                                                {lang === "en" ? "Designation" : "الاسم بالكامل"}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder={lang === "en" ? "Operative Name" : "اسم العميل"}
                                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-nova-cyan focus:ring-1 focus:ring-nova-cyan transition-all"
                                                />
                                                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/i:text-nova-cyan transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 group/i">
                                            <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/i:text-nova-cyan transition-colors ml-1">
                                                {lang === "en" ? "Comm Link" : "رقم الهاتف"}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+000 0000 0000"
                                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-nova-cyan focus:ring-1 focus:ring-nova-cyan transition-all"
                                                />
                                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/i:text-nova-cyan transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 group/i md:col-span-2">
                                            <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/i:text-nova-cyan transition-colors ml-1">
                                                {lang === "en" ? "Registry Email" : "البريد الإلكتروني"}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="nova@operative.terminal"
                                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-nova-cyan focus:ring-1 focus:ring-nova-cyan transition-all"
                                                />
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/i:text-nova-cyan transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 group/i md:col-span-2">
                                            <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/i:text-nova-cyan transition-colors ml-1">
                                                {lang === "en" ? "Access Matrix" : "كلمة المرور"}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-nova-cyan focus:ring-1 focus:ring-nova-cyan transition-all"
                                                />
                                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/i:text-nova-cyan transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-8 h-18 rounded-[1.5rem] bg-nova-cyan hover:bg-nova-cyan/90 text-black font-black uppercase tracking-[0.3em] text-xs relative overflow-hidden group/btn shadow-[0_20px_50px_rgba(6,182,212,0.3)] transition-all duration-300"
                                        isLoading={loading}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {lang === "en" ? "INITIALIZE SYNC" : "بدء التزامن"}
                                            {!loading && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />}
                                        </span>
                                    </Button>

                                    <div className="text-center pt-8">
                                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                                            {lang === "en" ? "Already Authenticated?" : "هل قمت بالتوثيق مسبقاً؟"}{" "}
                                            <Link href="/login" className="text-nova-cyan hover:text-white transition-all underline decoration-nova-cyan/20 underline-offset-[6px]">
                                                {lang === "en" ? "EXECUTE LOGIN" : "تنفيذ الدخول"}
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-16 md:p-24 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-32 h-32 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 mb-10 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
                                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                                </div>
                                <h2 className="text-5xl font-[1000] text-white mb-6 tracking-tighter italic uppercase">
                                    ACCESS <span className="text-green-500">GRANTED</span>
                                </h2>
                                <p className="text-white/40 text-lg max-w-xs mx-auto mb-12 leading-relaxed font-medium uppercase tracking-widest">
                                    {lang === "en"
                                        ? "Welcome Operative. Redirecting to bridge..."
                                        : "مرحباً بك أيها العميل. يتم التوجيه..."}
                                </p>
                                <div className="flex items-center justify-center gap-4 text-nova-cyan font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    SYNCING STATE
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
