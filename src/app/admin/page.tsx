"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, supabase } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Users, Package, DollarSign, Clock, Search, Filter, Shield, Activity, Network, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
    const { lang } = useLanguage();
    const { user, loading } = useAuth();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"orders" | "users">("orders");
    const [searchQuery, setSearchQuery] = useState("");

    const [data, setData] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const [stats, setStats] = useState({
        users: 25,
        orders: 50,
        revenue: 5000,
        pending: 10
    });

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "owner") {
                router.push("/dashboard");
            } else {
                fetchData();
            }
        }
    }, [user, loading, router, activeTab]);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            if (activeTab === "users") {
                const { data: usersData, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
                if (!error && usersData) setData(usersData);
            } else {
                const { data: ordersData, error } = await supabase.from('orders').select('*, users(name, email)').order('created_at', { ascending: false });
                if (!error && ordersData) setData(ordersData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    };

    const updateOrderStatus = async (orderId: number, status: string) => {
        try {
            await supabase.from('orders').update({ status }).eq('id', orderId);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading || !user || user.role !== "owner") {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#050510]">
                <div className="w-20 h-20 border-4 border-yellow-500/20 border-t-yellow-400 rounded-3xl animate-spin shadow-[0_0_50px_rgba(234,179,8,0.3)]"></div>
            </div>
        );
    }

    const statCards = [
        { title: lang === "en" ? "Operative Network" : "شبكة العمليات", value: stats.users, icon: <Users className="w-8 h-8 text-nova-cyan" />, glow: "from-nova-cyan/20", unit: "NODES" },
        { title: lang === "en" ? "Live Protocols" : "البروتوكولات النشطة", value: stats.orders, icon: <Package className="w-8 h-8 text-nova-purple" />, glow: "from-nova-purple/20", unit: "ACTIVE" },
        { title: lang === "en" ? "Net Capital" : "صافي رأس المال", value: `$${stats.revenue / 1000}K`, icon: <DollarSign className="w-8 h-8 text-green-400" />, glow: "from-green-400/20", unit: "CREDITS" },
        { title: lang === "en" ? "Pending Clearances" : "التصاريح المعلقة", value: stats.pending, icon: <Clock className="w-8 h-8 text-yellow-400" />, glow: "from-yellow-400/30", unit: "QUEUE" }
    ];

    return (
        <div className="relative max-w-7xl mx-auto pt-40 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen z-0">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-yellow-500 blur-[300px] opacity-10 rounded-full mix-blend-screen pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-nova-purple blur-[300px] opacity-10 rounded-full mix-blend-screen pointer-events-none -z-10 animate-[pulse-nova_15s_infinite_alternate]" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none -z-10" />

            {/* Scanning Line Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff05_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none -z-10 opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* HUD Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 pb-12 border-b border-white/5 relative group">
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent shadow-[0_0_30px_rgba(234,179,8,0.4)]" />

                    <div className="flex items-center gap-8 relative z-10">
                        <motion.div
                            whileHover={{ rotate: 45, scale: 1.1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-30 rounded-3xl" />
                            <div className="relative w-20 h-20 bg-black/60 border-2 border-yellow-500/30 backdrop-blur-3xl rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                                <Crown className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.8)]" />
                            </div>
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-[1000] text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-600 tracking-tighter italic uppercase">
                                    {lang === "en" ? "OVERWATCH" : "نظام المراقبة"}
                                </h1>
                                <div className="px-3 py-1 rounded-lg text-[10px] font-black tracking-[0.3em] uppercase bg-yellow-500/20 text-yellow-100 border border-yellow-500/50 flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                    <Shield className="w-4 h-4" /> SEC-LVL 09
                                </div>
                            </div>
                            <p className="text-yellow-500/60 font-black text-[10px] uppercase tracking-[0.6em] italic ml-1 flex items-center gap-3">
                                <span className="w-10 h-px bg-yellow-500/30" />
                                {lang === "en" ? "SUPREME_DIRECTOR_CLEARANCE_ACTIVE" : "تم تفعيل صلاحيات الإدارة العليا"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-2xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Status</span>
                            <span className="text-xs font-black text-green-400 tracking-[0.2em] uppercase">LINK_ESTABLISHED</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_20px_rgba(34,197,94,1)]" />
                    </div>
                </div>

                {/* Intelligent Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
                    {statCards.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                            className="relative group cursor-pointer"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] -z-10`} />

                            <div className="bg-[#050510]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 h-full relative overflow-hidden transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/10 shadow-2xl">
                                {/* Background Glow */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.glow} blur-3xl opacity-20 pointer-events-none`} />

                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">{stat.title}</span>
                                        <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">{stat.unit}</span>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all group-hover:scale-110">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-5xl md:text-6xl font-[1000] text-white tracking-tighter drop-shadow-2xl flex items-baseline gap-2 italic">
                                    {stat.value}
                                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Command Center Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-12 relative z-10">
                    <div className="flex bg-black/60 p-2 rounded-[2rem] border border-white/5 backdrop-blur-3xl w-full lg:w-auto shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`relative flex-1 lg:w-56 py-4 px-8 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden group/btn ${activeTab === 'orders' ? 'text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            {activeTab === 'orders' && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="flex items-center justify-center gap-3 relative z-10">
                                <Activity className={`w-4 h-4 ${activeTab === 'orders' ? 'animate-pulse' : ''}`} />
                                {lang === "en" ? "PROTOCOLS" : "البروتوكولات"}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`relative flex-1 lg:w-56 py-4 px-8 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden group/btn ${activeTab === 'users' ? 'text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            {activeTab === 'users' && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="flex items-center justify-center gap-3 relative z-10">
                                <Network className={`w-4 h-4 ${activeTab === 'users' ? 'animate-pulse' : ''}`} />
                                {lang === "en" ? "OPERATIVES" : "العملاء"}
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-6 w-full lg:w-auto">
                        <div className="relative group flex-grow lg:w-96">
                            <div className="absolute -inset-1 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-yellow-500 transition-colors z-10" />
                            <input
                                type="text"
                                placeholder={lang === "en" ? "SCANNING_ENTITY_MATRIX..." : "مسح المصفوفة..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="relative w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-sm text-white placeholder:text-white/10 font-mono focus:outline-none focus:border-yellow-500/50 transition-all z-10 uppercase tracking-widest"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 p-5 rounded-2xl text-white/20 hover:text-yellow-400 border border-white/5 hover:border-yellow-500/30 transition-all shadow-xl backdrop-blur-3xl"
                        >
                            <Filter className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Intelligence Data Matrix */}
                <div className="relative group/table z-10">
                    <div className="absolute -inset-10 bg-gradient-to-b from-yellow-500/10 to-nova-purple/10 rounded-[4rem] blur-[100px] opacity-10 -z-10" />

                    <div className="bg-[#050510]/60 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl min-h-[600px] relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <AnimatePresence mode="wait">
                            {isFetching ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-3xl z-20 flex flex-col items-center justify-center gap-8"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse" />
                                        <div className="w-24 h-24 border-4 border-yellow-500/10 border-t-yellow-400 rounded-3xl animate-spin relative z-10 shadow-[0_0_50px_rgba(234,179,8,0.3)]" />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="font-mono text-yellow-400 uppercase tracking-[0.5em] text-xs font-black animate-pulse">Scanning Cloud Matrix</span>
                                        <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] font-mono">Synchronizing Assets...</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="overflow-x-auto"
                                >
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-white/[0.02] border-b border-white/5">
                                                {activeTab === "orders" ? (
                                                    <>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Entity_Name" : "اسم العميل"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Protocol_Key" : "البروتوكول"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Credits" : "القيمة"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Clearance" : "الحالة"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] text-right">{lang === "en" ? "Command" : "التوجيه"}</th>
                                                    </>
                                                ) : (
                                                    <>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Identity" : "الهوية"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Terminal_Link" : "رابط الاتصال"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Clearance" : "التصريح"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{lang === "en" ? "Initiation" : "تاريخ البدء"}</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] text-right">{lang === "en" ? "Access" : "إجراء"}</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {data.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-10 py-32 text-center">
                                                        <div className="flex flex-col items-center justify-center gap-6">
                                                            <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center">
                                                                <Search className="w-10 h-10 opacity-10 text-yellow-500" />
                                                            </div>
                                                            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">{lang === "en" ? "No Intelligence Found" : "لا توجد سجلات"}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                            {activeTab === "orders" ? data.map((order, idx) => (
                                                <motion.tr
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                                    key={idx}
                                                    className="hover:bg-white/[0.02] transition-colors group/row"
                                                >
                                                    <td className="px-10 py-8">
                                                        <div className="text-white font-black tracking-tighter uppercase italic text-lg">{order.users?.name || "UNKNOWN_OP"}</div>
                                                        <div className="text-white/20 font-mono text-[10px] uppercase tracking-widest mt-1">{order.users?.email || "ENCRYPTED"}</div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <div className="text-nova-cyan font-black tracking-[0.2em] italic uppercase text-xs">
                                                            PROTOCOL_{order.item_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <span className="font-mono text-white/60 text-sm bg-white/[0.03] px-4 py-2 rounded-xl border border-white/5 tracking-widest italic font-black">
                                                            ${order.amount}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <span className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase border transition-all duration-500
                                                            ${order.status === 'completed' ? 'text-green-500 bg-green-500/10 border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]' :
                                                                order.status === 'paid' ? 'text-nova-cyan bg-nova-cyan/10 border-nova-cyan/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]' :
                                                                    'text-yellow-500 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.1)]'}`}>
                                                            <div className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'paid' ? 'bg-nova-cyan' : 'bg-yellow-500 animate-pulse'}`} />
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover/row:translate-x-0 group-hover/row:opacity-100 transition-all duration-500">
                                                            {order.status !== 'completed' && (
                                                                <button onClick={() => updateOrderStatus(order.id, 'completed')} className="bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white px-5 py-3 rounded-2xl text-[9px] font-black tracking-[0.4em] uppercase transition-all border border-green-500/20 shadow-xl">
                                                                    {lang === "en" ? "GRANT" : "منح"}
                                                                </button>
                                                            )}
                                                            <button className="bg-white/5 hover:bg-white hover:text-black text-white px-5 py-3 rounded-2xl text-[9px] font-black tracking-[0.4em] uppercase transition-all border border-white/5">
                                                                {lang === "en" ? "INSPECT" : "فحص"}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )) : data.map((userRecord, idx) => (
                                                <motion.tr
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                                    key={idx}
                                                    className="hover:bg-white/[0.02] transition-colors group/row"
                                                >
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white text-xl font-black border border-white/5 shadow-inner transition-all group-hover:bg-yellow-500/20 group-hover:border-yellow-500/30">
                                                                {userRecord.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-[1000] text-white text-xl tracking-tighter uppercase italic">{userRecord.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8 font-mono text-white/30 text-xs uppercase tracking-widest">{userRecord.email}</td>
                                                    <td className="px-10 py-8">
                                                        {userRecord.role === 'owner' ? (
                                                            <span className="flex items-center gap-3 text-yellow-500 bg-yellow-500/10 px-5 py-2.5 rounded-2xl text-[9px] font-black tracking-[0.4em] border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)] w-max">
                                                                <Crown className="w-4 h-4" /> DIRECTOR
                                                            </span>
                                                        ) : (
                                                            <span className="text-nova-cyan bg-nova-cyan/10 px-5 py-2.5 rounded-2xl text-[9px] font-black tracking-[0.4em] border border-nova-cyan/20 w-max shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                                                                OPERATIVE
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-10 py-8 font-mono text-white/20 text-xs uppercase tracking-widest italic">
                                                        {new Date(userRecord.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG')}
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1, x: 5 }}
                                                            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:text-yellow-400 hover:border-yellow-500/30 transition-all opacity-0 group-hover/row:opacity-100"
                                                        >
                                                            <ChevronRight className="w-6 h-6" />
                                                        </motion.button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
