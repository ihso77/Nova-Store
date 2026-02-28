"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Star, Lock, CreditCard, Box, ChevronRight, Activity } from "lucide-react";
import { checkoutSchema } from "@/lib/validations";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { lang } = useLanguage();
    const { user } = useAuth();
    const plan = searchParams.get("plan");

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        projectDetails: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!plan) router.push("/packages");
    }, [plan, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            checkoutSchema.parse(form);

            const planData: Record<string, { amount: string; item: string }> = {
                basic: { amount: "49", item: "Basic Development Tier" },
                standard: { amount: "149", item: "Standard Development Tier" },
                premium: { amount: "499", item: "Premium Development Tier" }
            };

            const data = planData[plan || "basic"];

            const params = new URLSearchParams({
                amount: data.amount,
                item: data.item,
                type: "service",
                plan: plan || "basic",
                name: form.name,
                description: form.projectDetails,
                lang: lang || 'en'
            });

            router.push(`/payment?${params.toString()}`);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErr: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0]) newErr[issue.path[0].toString()] = issue.message;
                });
                setErrors(newErr);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentPlan = (plan || "basic").toLowerCase();
    const amount = currentPlan === "standard" ? "149" : currentPlan === "premium" ? "499" : "49";

    return (
        <div className={`min-h-screen pt-40 pb-32 px-6 relative overflow-hidden ${lang === "ar" ? "rtl" : "ltr"}`}>
            {/* Cinematic Background */}
            <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-nova-purple blur-[300px] opacity-[0.07] rounded-full pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-nova-cyan blur-[300px] opacity-[0.07] rounded-full pointer-events-none -z-10 animate-[pulse-nova_15s_infinite_alternate]" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
                {/* Left: Procurement Form */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 space-y-16"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-3 text-nova-purple"
                        >
                            <div className="w-8 h-px bg-nova-purple/30" />
                            <Lock className="w-4 h-4 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">SECURE_ENVIRONMENT_ALPHA</span>
                        </motion.div>
                        <h1 className="text-7xl md:text-9xl font-[1000] text-white tracking-tighter italic leading-[0.85] uppercase">
                            Procure <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/10">Your Asset.</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 gap-10">
                            <div className="space-y-4 group">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] group-focus-within:text-nova-purple transition-colors flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-nova-purple animate-pulse" />
                                    Entity Designation
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-3xl px-8 text-white text-lg font-bold focus:outline-none focus:border-nova-purple/50 focus:ring-1 focus:ring-nova-purple/50 transition-all backdrop-blur-3xl italic placeholder:text-white/5"
                                        placeholder="OPERATIVE_NAME..."
                                    />
                                    <Activity className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-nova-purple transition-colors" />
                                </div>
                                {errors.name && <p className="text-nova-pink text-[9px] font-black uppercase tracking-widest mt-2 ml-2">{errors.name}</p>}
                            </div>

                            <div className="space-y-4 group opacity-60">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    Communication terminal
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    className="w-full h-20 bg-white/[0.01] border border-white/5 rounded-3xl px-8 text-white/40 text-lg font-mono focus:outline-none cursor-not-allowed backdrop-blur-sm"
                                    disabled
                                />
                            </div>

                            <div className="space-y-4 group">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] group-focus-within:text-nova-cyan transition-colors flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-nova-cyan animate-pulse" />
                                    Project Matrix Brief
                                </label>
                                <textarea
                                    value={form.projectDetails}
                                    onChange={e => setForm({ ...form, projectDetails: e.target.value })}
                                    className="w-full h-56 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-white text-lg font-medium focus:outline-none focus:border-nova-cyan/50 focus:ring-1 focus:ring-nova-cyan/50 transition-all backdrop-blur-3xl resize-none placeholder:text-white/5 leading-relaxed"
                                    placeholder="Describe your vision, goals, and technical requirements..."
                                />
                                {errors.projectDetails && <p className="text-nova-pink text-[9px] font-black uppercase tracking-widest mt-2 ml-2">{errors.projectDetails}</p>}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full h-24 bg-white text-black text-[14px] font-[1000] uppercase tracking-[0.5em] rounded-3xl hover:bg-nova-purple hover:text-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center gap-6 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-nova-purple to-nova-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="relative z-10">{isSubmitting ? "SYNCHRONIZING..." : "INITIATE PROCUREMENT"}</span>
                            {!isSubmitting && <CreditCard className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />}
                            {isSubmitting && <Activity className="w-6 h-6 relative z-10 animate-spin" />}
                        </motion.button>

                        <p className="text-center text-[10px] font-black text-white/10 uppercase tracking-[0.3em] font-mono">
                            ENCRYPTED_256_BIT_AES_TRANSMISSION
                        </p>
                    </form>
                </motion.div>

                {/* Right: Summary Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-5"
                >
                    <div className="relative group/panel sticky top-40">
                        <div className="absolute -inset-1 bg-gradient-to-b from-nova-purple/20 to-nova-cyan/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover/panel:opacity-50 transition duration-1000 -z-10" />

                        <div className="bg-[#050510]/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 space-y-12 shadow-2xl relative overflow-hidden">
                            {/* Panel Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-nova-purple blur-[80px] opacity-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-nova-cyan blur-[80px] opacity-20 pointer-events-none" />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-nova-purple uppercase tracking-[0.4em] italic leading-none block">ASSET_CONFIG</span>
                                    <h3 className="text-5xl font-[1000] text-white italic uppercase tracking-tighter">
                                        {currentPlan}
                                    </h3>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner group-hover/panel:scale-110 transition-transform duration-500">
                                    <Box className="w-8 h-8 text-nova-purple" />
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                {[
                                    { text: "Full Asset Source Control", icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
                                    { text: "Deployment Architecture", icon: <Activity className="w-4 h-4 text-nova-cyan" /> },
                                    { text: "Security Audit Certified", icon: <Lock className="w-4 h-4 text-nova-pink" /> },
                                    { text: "24/7 Direct Architect Access", icon: <Star className="w-4 h-4 text-yellow-500" /> }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center gap-5 group/item"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover/item:border-white/20 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-black text-white/40 uppercase tracking-widest group-hover/item:text-white/70 transition-colors">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-white/5 relative z-10">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Total Valuation</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-6xl font-[1000] text-white italic tracking-tighter drop-shadow-2xl">
                                            ${amount}
                                        </span>
                                        <span className="text-xs font-black text-white/20 uppercase">USD</span>
                                    </div>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-nova-purple via-nova-pink to-nova-cyan"
                                    />
                                </div>
                            </div>

                            <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4 relative z-10">
                                <div className="flex items-center gap-3 text-nova-cyan">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Protocol Secured</span>
                                </div>
                                <p className="text-[10px] text-white/20 leading-relaxed font-black uppercase tracking-widest">
                                    Your transaction is handled through our secure encrypted procurement gateway. Neural assets are protected by top-tier encryption standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center gap-8">
                <div className="w-24 h-24 border-4 border-white/5 border-t-nova-purple rounded-3xl animate-spin shadow-[0_0_50px_rgba(167,139,250,0.3)]" />
                <div className="font-mono text-white/20 uppercase tracking-[1em] text-xs animate-pulse">Establishing Secure Uplink...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
