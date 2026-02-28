"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, supabase } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Package, DollarSign, Clock, Plus, CheckCircle2, Hexagon, Activity, Zap, ShieldAlert, Cpu, Sparkles, History } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { lang } = useLanguage();
    const { user, loading } = useAuth();
    const router = useRouter();

    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        progress: 0,
        completed: 0,
        spent: 0
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            fetchOrders();
        }
    }, [user, loading, router]);

    const fetchOrders = async () => {
        try {
            if (!user) return;

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.log("No orders table yet or error:", error);
                setOrders(mockOrders);
                calculateStats(mockOrders);
                return;
            }

            if (data && data.length > 0) {
                setOrders(data);
                calculateStats(data);
            } else {
                setOrders(mockOrders);
                calculateStats(mockOrders);
            }
        } catch (err) {
            console.error(err);
            setOrders(mockOrders);
            calculateStats(mockOrders);
        }
    };

    const mockOrders = [
        { id: 1, item_name: "Standard Web Design", amount: 249, status: "pending", created_at: new Date().toISOString() },
        { id: 2, item_name: "Cybersecurity Book", amount: 19.99, status: "paid", created_at: new Date(Date.now() - 86400000 * 2).toISOString() }
    ];

    const calculateStats = (data: any[]) => {
        const total = data.length;
        const progress = data.filter(o => o.status === 'pending' || o.status === 'processing').length;
        const completed = data.filter(o => o.status === 'completed' || o.status === 'paid').length;
        const spent = data.reduce((acc, o) => acc + (o.status === 'paid' || o.status === 'completed' ? Number(o.amount) : 0), 0);

        setStats({ total, progress, completed, spent });
    };

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] bg-[#05050a]">
                <div className="w-16 h-16 border-4 border-nova-purple border-t-nova-cyan rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.5)]"></div>
            </div>
        );
    }

    const statCards = [
        { title: lang === "en" ? "Total Operations" : "إجمالي العمليات", value: stats.total, icon: <Activity className="w-7 h-7 text-nova-purple" />, glow: "from-nova-purple/20" },
        { title: lang === "en" ? "In Progress" : "قيد المعالجة", value: stats.progress, icon: <Clock className="w-7 h-7 text-yellow-400" />, glow: "from-yellow-400/20" },
        { title: lang === "en" ? "Systems Deployed" : "الأنظمة المنشورة", value: stats.completed, icon: <CheckCircle2 className="w-7 h-7 text-green-400" />, glow: "from-green-400/20" },
        { title: lang === "en" ? "Capital Invested" : "رأس المال المستثمر", value: `$${stats.spent.toFixed(2)}`, icon: <DollarSign className="w-7 h-7 text-nova-cyan" />, glow: "from-nova-cyan/20" }
    ];

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
            case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]';
            case 'pending':
            case 'processing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]';
            case 'failed':
            case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/30 shadow-[0_0_15px_rgba(248,113,113,0.2)]';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30 shadow-[0_0_15px_rgba(156,163,175,0.2)]';
        }
    };

    const getStatusText = (status: string) => {
        const s = status.toLowerCase();
        if (lang === "en") return s.charAt(0).toUpperCase() + s.slice(1);

        switch (s) {
            case 'paid': return 'تم الدفع';
            case 'completed': return 'مكتمل';
            case 'pending': return 'قيد الانتظار';
            case 'processing': return 'قيد التنفيذ';
            case 'failed': return 'فشل';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    return (
        <div className={`relative max-w-7xl mx-auto pt-32 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen z-0 ${lang === "ar" ? "rtl" : "ltr"}`}>

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nova-purple/5 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nova-cyan/5 blur-[150px] rounded-full -z-10" />

            <div className="space-y-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-10 relative">
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nova-cyan/30 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[2px] bg-nova-cyan/40" />
                            <Sparkles className="w-4 h-4 text-nova-cyan animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-nova-cyan italic">Operative_Command</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-[1000] text-white tracking-tighter italic uppercase leading-none">
                            {lang === "en" ? "Dashboard" : "لوحة التحكم"}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link href="/packages">
                            <Button className="bg-white text-black h-20 px-12 rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center gap-4 transition-all group">
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                                <span className="text-xs">{lang === "en" ? "Initiate Project" : "مشروع جديد"}</span>
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statCards.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -z-10 group-hover:bg-white/10 transition-colors" />
                            <div className="bg-white/[0.03] w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.title}</p>
                                <p className="text-4xl font-[1000] text-white tracking-tighter italic">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-6 h-6 text-nova-cyan" />
                        <h2 className="text-2xl font-bold text-white">
                            {lang === "en" ? "Order History" : "سجل الطلبات"}
                        </h2>
                    </div>

                    <div className="glass-panel rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5">
                                        <th className="px-8 py-6 text-xs font-black text-white/50 border-0 uppercase tracking-[0.2em]">{lang === "en" ? "Item" : "المنتج"}</th>
                                        <th className="px-8 py-6 text-xs font-black text-white/50 border-0 uppercase tracking-[0.2em]">{lang === "en" ? "Price" : "السعر"}</th>
                                        <th className="px-8 py-6 text-xs font-black text-white/50 border-0 uppercase tracking-[0.2em]">{lang === "en" ? "Status" : "الحالة"}</th>
                                        <th className="px-8 py-6 text-xs font-black text-white/50 border-0 uppercase tracking-[0.2em]">{lang === "en" ? "Date" : "التاريخ"}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-slate-500">
                                                {lang === "en" ? "No orders found." : "لا توجد طلبات بعد."}
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-8 py-8">
                                                    <span className="font-bold text-white">{order.item_name}</span>
                                                </td>
                                                <td className="px-8 py-8">
                                                    <span className="font-bold text-white">
                                                        ${order.amount}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-8">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusStyles(order.status)}`}>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                        {getStatusText(order.status)}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-8 text-slate-400 text-sm">
                                                    {new Date(order.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG')}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
