"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Star, Globe, Crown, LogOut, Menu, X, User, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const { user, signOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLang = () => {
        setLang(lang === "en" ? "ar" : "en");
    };

    const navLinks = [
        { name: t("nav.home") || "Home", href: "/" },
        { name: t("nav.packages") || "Packages", href: "/packages" },
        { name: lang === "en" ? "Tutorial" : "كيف يعمل", href: "/tutorial" },
    ];

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 ${scrolled ? "glass-panel py-2" : "bg-transparent py-4"
            } rounded-2xl`}>
            <div className="px-6 md:px-10">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-nova-purple blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-10 h-10 rounded-xl bg-nova-purple/90 flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <span className="text-xl font-black tracking-tight text-white uppercase italic">
                            Nova <span className="text-nova-purple opacity-80">Store</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${pathname === link.href ? "text-white" : "text-white/40"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 border-l border-white/5 pl-8 h-6">
                            <button onClick={toggleLang} className="text-[11px] font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] hover:scale-110">
                                {lang === "en" ? "AR" : "EN"}
                            </button>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/dashboard">
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer">
                                            {t("nav.dashboard") || "Dashboard"}
                                        </div>
                                    </Link>
                                    <button onClick={signOut} className="text-white/30 hover:text-red-400 transition-colors p-2">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login">
                                        <span className="text-[11px] font-black text-white/60 hover:text-white uppercase tracking-widest transition-colors cursor-pointer hover:scale-105">
                                            {t("nav.login") || "Login"}
                                        </span>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm" className="h-11 px-10 bg-white text-black text-[11px] font-[1000] uppercase tracking-widest rounded-xl hover:scale-110 shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all">
                                            {t("nav.register") || "Join"}
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white/60 hover:text-white p-2">
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-panel border-0 border-t border-white/5 absolute top-[calc(100%+12px)] left-0 w-full rounded-2xl animate-in slide-in-from-top-2 duration-300">
                    <div className="px-6 py-8 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest ${pathname === link.href ? "text-white bg-white/5" : "text-white/40"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-white/5 my-6" />
                        <div className="space-y-4">
                            {user ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block">
                                        <Button className="w-full bg-white text-black text-[10px] font-black tracking-widest">{t("nav.dashboard") || "Dashboard"}</Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full text-red-400 text-[10px] font-black tracking-widest" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                                        {t("nav.logout") || "Logout"}
                                    </Button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <div className="w-full h-12 flex items-center justify-center rounded-xl border border-white/5 text-white text-[10px] font-black tracking-widest">{t("nav.login") || "Login"}</div>
                                    </Link>
                                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full bg-white text-black text-[10px] font-black tracking-widest">{t("nav.register") || "Join"}</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
