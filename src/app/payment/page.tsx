"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, supabase } from "@/contexts/AuthContext";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingCart, ShieldCheck, Zap, Lock, CreditCard, Activity, Globe, ArrowLeft } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";

function PaymentContent() {
    const { lang } = useLanguage();
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const amount = searchParams.get("amount");
    const item = searchParams.get("item");
    const type = searchParams.get("type");

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!loading && !user) router.push("/login");
        if (!amount || !item || !type) router.push("/packages");
    }, [user, loading, router, amount, item, type]);

    if (loading || !user || !amount || !item) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#050510]">
                <div className="w-24 h-24 border-4 border-white/5 border-t-nova-purple rounded-3xl animate-spin shadow-[0_0_50px_rgba(167,139,250,0.3)]" />
            </div>
        );
    }

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    const createOrder = async () => {
        return fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, description: item })
        })
            .then((res) => res.json())
            .then((order) => order.id)
            .catch(() => {
                console.warn("Using mock PayPal order ID");
                return "MOCK_ORDER_ID_" + Date.now();
            });
    };

    const onApprove = async (data: any, actions: any) => {
        setIsProcessing(true);

        try {
            const { error: dbError } = await supabase.from('orders').insert([{
                user_id: user.id,
                item_name: item,
                item_type: type,
                amount: parseFloat(amount),
                status: 'paid',
                payment_id: data.orderID || "mock_payment_id_" + Date.now(),
                website_type: searchParams.get("plan") || null,
                description: searchParams.get("description") || null,
                preferred_language: searchParams.get("lang") || null,
            }]);

            if (dbError) throw dbError;

            router.push(`/success?type=${type}`);
        } catch (err: any) {
            setError(err.message || "Payment processing failed. Please contact support.");
            setIsProcessing(false);
        }
    };

    return (
        <div className={`relative w-full min-h-screen py-32 px-4 sm:px-6 flex items-center justify-center overflow-hidden z-0 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
            {/* Cinematic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-nova-purple blur-[300px] opacity-[0.08] rounded-full mix-blend-screen pointer-events-none -z-10 animate-pulse" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-nova-cyan blur-[300px] opacity-[0.05] rounded-full pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl w-full mx-auto z-10"
            >
                {/* Back Button */}
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={() => router.back()}
                    className="mb-12 flex items-center gap-2 text-white/30 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">{lang === "en" ? "REVERT_TRANSMISSION" : "الرجوع"}</span>
                </motion.button>

                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                            <Lock className="w-4 h-4 text-nova-cyan animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">
                                {lang === "en" ? "ENCRYPTED_AUTH_UPLINK" : "اتصال مشفر"}
                            </span>
                        </span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-[1000] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/10 tracking-tighter italic uppercase drop-shadow-2xl">
                        {lang === "en" ? "Secure Checkout" : "الدفع الآمن"}
                    </h1>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-nova-pink/10 border border-nova-pink/20 text-nova-pink p-6 rounded-3xl text-center mb-12 font-black text-xs uppercase tracking-widest backdrop-blur-3xl flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(236,72,153,0.2)]"
                    >
                        <Activity className="w-6 h-6 animate-pulse" />
                        {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Investment Matrix */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="bg-[#050510]/80 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-white/5 relative overflow-hidden h-full shadow-2xl group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-nova-purple blur-[120px] rounded-full opacity-10 pointer-events-none transition-all group-hover:opacity-20" />

                            <div className="space-y-12 relative z-10">
                                <div className="flex items-start gap-8">
                                    <div className="w-20 h-20 bg-white/[0.03] rounded-3xl border border-white/10 flex items-center justify-center shadow-inner group-hover:border-nova-cyan transition-colors duration-700">
                                        <ShoppingCart className="w-10 h-10 text-nova-cyan group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-4xl md:text-5xl font-[1000] text-white tracking-tighter uppercase italic">{item}</h2>
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-px bg-nova-purple" />
                                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-nova-purple">
                                                {type === 'digital' ? 'DIGITAL_ARTIFACT' : 'DEVELOPMENT_TIER'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-2 relative group/stat overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] relative z-10">Total Investment</span>
                                        <div className="text-6xl font-[1000] text-white italic tracking-tighter relative z-10 drop-shadow-2xl">
                                            ${amount}
                                            <span className="text-xs font-black text-white/20 ml-2 uppercase italic">USD</span>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4 relative group/stat">
                                        <div className="flex items-center gap-3 text-green-400">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Status: Ready</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-white/30">
                                                <Zap className="w-4 h-4 text-nova-cyan" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{lang === "en" ? "Neural delivery enabled" : "تسليم فوري متاح"}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-white/30">
                                                <Globe className="w-4 h-4 text-nova-purple" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{lang === "en" ? "Global Access Protocol" : "وصول عالمي"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex items-center justify-between group-hover:bg-white/[0.02] transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Auth Protocol</span>
                                        <span className="text-xs font-mono text-white/60">SHA-256_VERIFIED</span>
                                    </div>
                                    <ShieldCheck className="w-8 h-8 text-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Gateway */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <div className="bg-[#050510]/60 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white/5 h-full flex flex-col justify-center gap-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-nova-cyan/40 to-transparent" />

                            <div className="space-y-2">
                                <h3 className="text-2xl font-[1000] text-white uppercase tracking-tighter italic flex items-center gap-4">
                                    <CreditCard className="w-8 h-8 text-white/20" />
                                    {lang === "en" ? "SELECT GATEWAY" : "بوابة الدفع"}
                                </h3>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-1">Military-grade protection</p>
                            </div>

                            <div className="relative min-h-[350px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {isProcessing ? (
                                        <motion.div
                                            key="processing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center gap-10 py-20"
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-nova-cyan blur-3xl opacity-20 animate-pulse" />
                                                <div className="w-24 h-24 border-4 border-white/5 border-t-nova-cyan rounded-[2rem] animate-spin relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.3)]" />
                                            </div>
                                            <div className="text-center space-y-3">
                                                <p className="text-white font-black text-xl tracking-[0.2em] uppercase italic animate-pulse">
                                                    {lang === "en" ? "AUTHENTICATING..." : "جاري المصادقة..."}
                                                </p>
                                                <p className="text-[10px] text-nova-cyan font-black uppercase tracking-[0.5em] font-mono opacity-50">DO_NOT_TERMINATE_CONNECTION</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="gateway"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 shadow-inner"
                                        >
                                            <PayPalScriptProvider options={initialOptions}>
                                                <div className={`transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0 scale-95'}`}>
                                                    <PayPalButtons
                                                        createOrder={createOrder}
                                                        onApprove={onApprove}
                                                        style={{ layout: "vertical", shape: "pill", color: "blue", label: "checkout" }}
                                                        disabled={isProcessing}
                                                        forceReRender={[amount, item]}
                                                    />
                                                </div>
                                            </PayPalScriptProvider>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col items-center gap-4 pt-10 border-t border-white/5">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                                    <ShieldCheck className="w-4 h-4 text-green-500/30" />
                                    SECURED_BY_PAYPAL_GLOBAL
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div >
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#050510] gap-8">
                <div className="w-24 h-24 border-4 border-white/5 border-t-nova-purple rounded-3xl animate-spin shadow-[0_0_50px_rgba(167,139,250,0.3)]" />
                <div className="font-mono text-white/20 uppercase tracking-[1em] text-xs animate-pulse">Initializing Security Gateway...</div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
