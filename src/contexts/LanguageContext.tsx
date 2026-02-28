"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
    dir: "ltr" | "rtl";
}

const translations = {
    en: {
        "nav.home": "Home",
        "nav.login": "Login",
        "nav.register": "Register",
        "nav.dashboard": "Dashboard",
        "nav.packages": "Packages",
        "nav.admin": "Admin",
        "nav.logout": "Logout",
        "hero.title": "NOVA STORE",
        "hero.subtitle": "Where Dreams Become Reality",
        "hero.desc": "Premium digital products & web solutions tailored for you.",
        "button.getStarted": "Get Started",
        "button.viewProducts": "View Products",
        "home.whyChooseUs": "Why Choose Us?",
        "home.latestWork": "Our Latest Work",
        "home.choosePlan": "Choose Your Plan",
        "home.cybersecurity": "Cybersecurity",
        "home.getInTouch": "Get In Touch",
    },
    ar: {
        "nav.home": "الرئيسية",
        "nav.login": "تسجيل الدخول",
        "nav.register": "إنشاء حساب",
        "nav.dashboard": "لوحة التحكم",
        "nav.packages": "الباقات",
        "nav.admin": "الإدارة",
        "nav.logout": "تسجيل الخروج",
        "hero.title": "NOVA STORE",
        "hero.subtitle": "حيث تصبح الأحلام حقيقة",
        "hero.desc": "منتجات رقمية متميزة وحلول ويب مصممة خصيصاً لك.",
        "button.getStarted": "ابدأ الآن",
        "button.viewProducts": "تصفح المنتجات",
        "home.whyChooseUs": "لماذا تختارنا؟",
        "home.latestWork": "أحدث أعمالنا",
        "home.choosePlan": "اختر باقتك",
        "home.cybersecurity": "الأمن السيبراني",
        "home.getInTouch": "تواصل معنا",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>("en");

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("nova_lang") as Language;
        if (saved === "en" || saved === "ar") {
            setLangState(saved);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("nova_lang", newLang);
    };

    const t = (key: string) => {
        return (translations[lang] as Record<string, string>)[key] || key;
    };

    const dir = lang === "ar" ? "rtl" : "ltr";

    // Force direction on document body
    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [dir, lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
            <div dir={dir} className={lang === "ar" ? "font-arabic" : ""}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
