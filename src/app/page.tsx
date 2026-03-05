"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Globe, Zap, Users, PlayCircle, Crown } from "lucide-react";
import CinematicLogo from "@/components/ui/CinematicLogo";
import { motion } from "framer-motion";

export default function Home() {
  const { lang, t } = useLanguage();

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-nova-purple" />,
      title: lang === "en" ? "Instant Deployment" : "نشر فوري",
      desc: lang === "en" ? "Lightning fast delivery of digital assets." : "تسليم فوري للأصول الرقمية."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-nova-cyan" />,
      title: lang === "en" ? "Secure Terminal" : "نظام آمن",
      desc: lang === "en" ? "Enterprise-grade encryption on every layer." : "تشفير عالي المستوى في كل طبقة."
    },
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      title: lang === "en" ? "Global Reach" : "وصول عالمي",
      desc: lang === "en" ? "Supporting clients across every continent." : "ندعم العملاء في جميع أنحاء العالم."
    }
  ];

  return (
    <div className={`relative w-full ${lang === "ar" ? "rtl" : "ltr"}`}>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">

        {/* Cinematic Backdrop Animation */}
        <div className="absolute inset-0 -z-20">
          <CinematicLogo className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/10 via-[#020205]/40 to-[#020205]" />
        </div>

        {/* Floating Light Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-nova-purple/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#020205] to-transparent -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-12 px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="glass-panel px-8 py-3 rounded-full border-white/5 flex items-center gap-4 bg-white/[0.02] shadow-[0_0_40px_rgba(129,140,248,0.1)]">
              <div className="w-2.5 h-2.5 rounded-full bg-nova-cyan animate-ping" />
              <span className="text-[12px] font-[900] uppercase tracking-[0.5em] text-nova-cyan/80">
                {lang === "en" ? "Luxury Architecture" : "معمارية فاخرة"}
              </span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[4.5rem] sm:text-[8rem] md:text-[14rem] lg:text-[18rem] font-[1000] text-white tracking-tighter leading-[0.75] italic select-none"
            >
              NOVA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">STORE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-white/40 font-light leading-relaxed tracking-tight"
            >
              {lang === "en"
                ? "Experience the zenith of digital craftsmanship. We architect elite interfaces for world-class legacies."
                : "اختبر ذروة الحرفية الرقمية. نحن نصمم واجهات نخبوية للأصول ذات المستوى العالمي."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6"
          >
            <Link href="/packages" className="group w-full sm:w-auto">
              <Button size="lg" className="h-20 w-full sm:w-auto px-16 bg-white text-black text-[13px] font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4">
                {t("button.getStarted")}
                <Crown className="w-5 h-5 text-nova-purple group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <div className="px-12 py-6 w-full sm:w-auto rounded-2xl border border-white/5 text-[12px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer bg-white/[0.01] backdrop-blur-3xl flex items-center justify-center gap-3">
                <PlayCircle className="w-5 h-5" />
                {lang === "en" ? "Enter Portal" : "دخول البوابة"}
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-40 w-full px-6 pb-20">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-panel p-10 rounded-3xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent blur-3xl -z-10" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-nova-cyan group-hover:text-black transition-all duration-500 group-hover:scale-110 shadow-2xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-[1000] text-white uppercase italic tracking-widest mb-4">{f.title}</h3>
              <p className="text-white/30 text-base leading-relaxed font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Section: Luxury Statement */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-nova-cyan/10 blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-nova-purple uppercase tracking-[0.4em]">The Standard</span>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic">
                  Crafted for <br />
                  <span className="opacity-30">Excellence.</span>

                </h2>
              </div>
              <p className="text-white/50 text-xl font-light leading-relaxed max-w-lg">
                {lang === "en"
                  ? "Our software is built to perform and designed to inspire. We don't just write code; we architect experiences that leave a million-dollar impression."
                  : "وقد تم بناء برامجنا للعمل وتصميمها للإلهام. نحن لا نكتفي بكتابة الكود؛ بل نبني تجارب تترك انطباعاً بمليون دولار."}
              </p>
              <div className="space-y-6">
                {[
                  { t: "Pixel Perfect Design", a: "تصميم مثالي لكل بكسل" },
                  { t: "Advanced Security Layer", a: "طبقة أمان متقدمة" },
                  { t: "Unmatched Performance", a: "أداء لا مثيل له" }
                ].map((item, id) => (
                  <div key={id} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border border-nova-purple/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-nova-purple" />
                    </div>
                    <span className="text-sm font-black text-white/70 uppercase tracking-widest">
                      {lang === "en" ? item.t : item.a}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Asset: Interactive Card Stack */}
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute top-0 right-0 w-[400px] h-[500px] glass-panel rounded-3xl -rotate-6 z-30 flex items-center justify-center border-white/10 group hover:rotate-0 transition-transform duration-700">
                <div className="p-10 text-center space-y-8">
                  <Star className="w-12 h-12 text-nova-cyan mx-auto animate-spin-slow" />
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white uppercase italic">Premium</h4>
                    <p className="text-white/40 text-sm">Validated Environment</p>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-center text-[10px] font-black text-white/60 tracking-widest">
                    <span>EST. 2024</span>
                    <span>AUTHENTIC</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-10 right-20 w-[400px] h-[500px] bg-nova-purple/10 border border-white/5 backdrop-blur-xl rounded-3xl -rotate-12 z-20" />
              <div className="absolute top-20 right-40 w-[400px] h-[500px] bg-nova-cyan/5 border border-white/5 backdrop-blur-xl rounded-3xl -rotate-[18deg] z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-black text-white italic">Nova <span className="opacity-30">Store</span></span>
          <div className="flex gap-10">
            {['Terms', 'Privacy', 'Contact'].map(item => (
              <span key={item} className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer">{item}</span>
            ))}
          </div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">© 2024 Nova Store Luxury</p>
        </div>
      </footer>
    </div>
  );
}
