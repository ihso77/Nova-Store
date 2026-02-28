"use client";

import { useAuth, supabase } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Fingerprint,
    Shield,
    ShieldCheck,
    RefreshCw,
    UserIcon,
    Mail,
    Phone,
    Hexagon,
    Lock,
    AlertCircle,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const { lang } = useLanguage();
    const router = useRouter();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Password state
    const [newPassword, setNewPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            setName(user.name);
            setPhone(user.phone || "");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] bg-[#05050a]">
                <div className="w-16 h-16 border-4 border-nova-purple border-t-nova-cyan rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.5)]"></div>
            </div>
        );
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('users')
                .update({ name, phone })
                .eq('id', user.id);

            if (error) throw error;

            await supabase.auth.updateUser({
                data: { name, phone }
            });

            setPasswordMessage({ type: "success", text: lang === "en" ? "Neural identity updated successfully" : "تم تحديث الهوية العصبية بنجاح" });
        } catch (err: any) {
            console.error("Update error:", err);
            setPasswordMessage({ type: "error", text: lang === "en" ? "Failed to synchronize profile data" : "فشل في تحديث الملف الشخصي" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingPassword(true);
        setPasswordMessage({ type: "", text: "" });

        if (newPassword.length < 6) return;

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setPasswordMessage({
                type: "success",
                text: lang === "en" ? "Security authorization updated successfully" : "تم تحديث التصريح الأمني بنجاح"
            });
            setNewPassword("");
        } catch (err: any) {
            setPasswordMessage({
                type: "error",
                text: err.message || (lang === "en" ? "Failed to alter security clearance" : "فشل تحديث كلمة المرور")
            });
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const getAvatarUrl = (seed: string | undefined) => {
        const defaultSeed = seed || user.id;
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${defaultSeed}&colors=a78bfa,ec4899,06b6d4`;
    };

    const regenerateAvatar = async () => {
        const newSeed = Math.random().toString(36).substring(7);
        try {
            await supabase.from('users').update({ avatar: newSeed }).eq('id', user.id);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 min-h-screen z-0">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-nova-purple blur-[250px] opacity-10 rounded-full mix-blend-screen pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-nova-cyan blur-[250px] opacity-10 rounded-full mix-blend-screen pointer-events-none -z-10 animate-[pulse-nova_12s_infinite_alternate]" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none -z-10" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-10 border-b border-white/5 relative group">
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nova-purple/40 to-transparent shadow-[0_0_20px_rgba(167,139,250,0.4)]" />

                    <div className="flex items-center gap-6">
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            className="w-16 h-16 rounded-2xl bg-nova-purple/10 border border-nova-purple/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(167,139,250,0.2)]"
                        >
                            <div className="absolute inset-0 bg-nova-purple blur-lg opacity-40 animate-pulse" />
                            <Fingerprint className="w-8 h-8 text-nova-purple relative z-10" />
                        </motion.div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-[1000] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30 tracking-tighter uppercase italic">
                                {lang === "en" ? "IDENTITY" : "الهوية"}<span className="text-nova-purple opacity-100">MATRIX</span>
                            </h1>
                            <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em] mt-2 ml-1">
                                {lang === "en" ? "Operative Metadata Core" : "قلب البيانات الوصفية للعميل"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                        <ShieldCheck className="w-4 h-4 text-nova-cyan" />
                        <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">Neural Link Secured</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Col: Avatar & ID Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-b from-nova-purple to-nova-cyan rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000 -z-10" />

                            <div className="bg-[#050510]/80 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center gap-8 shadow-2xl relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 w-full h-3 bg-gradient-to-r from-nova-purple via-nova-pink via-nova-cyan to-nova-purple" />
                                <div className="absolute -right-20 -top-20 w-40 h-40 bg-nova-purple/10 blur-3xl rounded-full" />

                                <div className="relative group/avatar mt-4">
                                    <div className="absolute inset-0 bg-nova-purple blur-3xl opacity-20 rounded-full animate-pulse" />

                                    <div className="w-48 h-48 rounded-[3rem] bg-black/40 backdrop-blur-md border-2 border-nova-purple/30 overflow-hidden p-6 flex items-center justify-center relative shadow-[0_0_50px_rgba(167,139,250,0.2)] z-10 group-hover/avatar:border-nova-cyan transition-colors duration-700">
                                        <img src={getAvatarUrl(user.avatar)} alt="Avatar" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        onClick={regenerateAvatar}
                                        className="absolute -bottom-4 -right-4 bg-nova-pink p-4 rounded-2xl hover:bg-white hover:text-black transition-all text-white shadow-[0_10px_30px_rgba(236,72,153,0.4)] z-20"
                                        title={lang === "en" ? "Re-synthesize Profile Image" : "تغيير الصورة"}
                                    >
                                        <RefreshCw className="w-6 h-6" />
                                    </motion.button>
                                </div>

                                <div className="w-full space-y-2">
                                    <h2 className="text-3xl font-[1000] text-white tracking-tight italic uppercase">{user.name}</h2>
                                    <div className="flex items-center justify-center">
                                        {user.role === "owner" ? (
                                            <span className="bg-yellow-500/10 text-yellow-400 px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)] flex items-center gap-2">
                                                <Shield className="w-3.5 h-3.5" /> OVERWATCH DIRECTOR
                                            </span>
                                        ) : (
                                            <span className="bg-nova-cyan/5 text-nova-cyan px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase border border-nova-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center gap-2">
                                                <UserIcon className="w-3.5 h-3.5" /> VERIFIED OPERATIVE
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full pt-8 border-t border-white/5 flex flex-col gap-5 text-left">
                                    <div className="space-y-2">
                                        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Terminal Identifier</span>
                                        <p className="font-mono text-xs text-white/40 bg-white/[0.02] p-3 rounded-xl border border-white/5 break-all leading-relaxed">{user.id}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Neural Link Established</span>
                                        <p className="font-mono text-sm text-white/60 flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                            <Calendar className="w-4 h-4 text-nova-purple shrink-0" />
                                            {new Date(user.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Col: Forms */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="lg:col-span-8 flex flex-col gap-10"
                    >
                        <AnimatePresence mode="wait">
                            {passwordMessage.text && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`p-6 rounded-[2rem] text-xs font-black tracking-[0.2em] uppercase flex items-center gap-4 ${passwordMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_10px_30px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                                >
                                    <AlertCircle className="w-6 h-6 shrink-0" />
                                    {passwordMessage.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Account Info Form */}
                        <div className="bg-[#050510]/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-purple/[0.03] to-transparent pointer-events-none" />

                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <h3 className="text-2xl font-[1000] text-white flex items-center gap-4 uppercase tracking-tighter italic">
                                    <Hexagon className="w-8 h-8 text-nova-purple" />
                                    {lang === "en" ? "CORE PARAMETERS" : "المعلمات الأساسية"}
                                </h3>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group/input">
                                        <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/input:text-nova-purple transition-colors ml-1">
                                            {lang === "en" ? "Full Designation" : "الاسم الكامل"}
                                        </label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-nova-purple transition-colors" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white focus:outline-none focus:border-nova-purple focus:ring-1 focus:ring-nova-purple transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 group/input">
                                        <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 ml-1">
                                            {lang === "en" ? "Registry Terminal" : "البريد الإلكتروني"}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-sm text-white/30 cursor-not-allowed font-mono"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 group/input md:col-span-2">
                                        <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/input:text-nova-purple transition-colors ml-1">
                                            {lang === "en" ? "Comm Relay (Phone)" : "رقم الهاتف"}
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-nova-purple transition-colors" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white focus:outline-none focus:border-nova-purple focus:ring-1 focus:ring-nova-purple transition-all"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end">
                                    <Button type="submit" variant="primary" className="py-6 px-12 text-xs font-black tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(167,139,250,0.2)] hover:scale-[1.05] transition-all rounded-2xl" isLoading={isSaving}>
                                        {lang === "en" ? "UPDATE MATRIX" : "تحديث المصفوفة"}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Security Form */}
                        <div className="bg-[#050510]/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-pink/[0.03] to-transparent pointer-events-none" />

                            <h3 className="text-2xl font-[1000] text-white mb-12 flex items-center gap-4 uppercase tracking-tighter italic relative z-10">
                                <Lock className="w-8 h-8 text-nova-pink" />
                                {lang === "en" ? "SECURITY OVERRIDE" : "تجاوز الأمان"}
                            </h3>

                            <form onSubmit={handleUpdatePassword} className="space-y-8 relative z-10 w-full md:max-w-md">
                                <div className="space-y-4 group/input">
                                    <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-focus-within/input:text-nova-pink transition-colors ml-1">
                                        {lang === "en" ? "New Security Code" : "كود أمان جديد"}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-nova-pink transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            minLength={6}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white focus:outline-none focus:border-nova-pink focus:ring-1 focus:ring-nova-pink transition-all placeholder:text-white/10"
                                            placeholder="••••••••"
                                            dir="ltr"
                                        />
                                    </div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-1 mt-2">
                                        {lang === "en" ? "Minimum 6 dimensional characters required" : "مطلوب 6 أحرف على الأقل"}
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" variant="secondary" className="py-6 px-12 text-xs font-black tracking-[0.4em] uppercase bg-nova-pink/10 border-nova-pink/20 text-nova-pink hover:bg-nova-pink hover:text-white rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.1)]" isLoading={isUpdatingPassword}>
                                        {lang === "en" ? "ENCODE ACCESS" : "تشفير الدخول"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
