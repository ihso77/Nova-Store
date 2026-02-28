"use client";

import { useEffect, useRef } from "react";

interface OrbType {
    cx: number;
    cy: number;
    r: number;
    color: string;
    alpha: number;
    speed: number;
    _t: number;
}

interface ParticleType {
    x: number;
    y: number;
    r: number;
    opacity: number;
    speed: number;
    twinkleOffset: number;
}

/**
 * CinematicLogo
 *
 * A fully in-browser canvas animation that plays a cinematic Nova Store
 * promotional sequence — animated star field, glowing orbs, orbital rings,
 * HUD marks, and phase-based typewriting text. No video file required.
 */
export default function CinematicLogo({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // ── Resize helpers ─────────────────────────────────────────────────
        const dpr = window.devicePixelRatio || 1;
        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const W = () => canvas.offsetWidth;
        const H = () => canvas.offsetHeight;

        // ── Stars / particles ──────────────────────────────────────────────
        const NUM_PARTICLES = 200;
        const particles: ParticleType[] = Array.from({ length: NUM_PARTICLES }, () => ({
            x: Math.random() * 2000,
            y: Math.random() * 1200,
            r: Math.random() * 1.6 + 0.3,
            opacity: Math.random() * 0.7 + 0.1,
            speed: Math.random() * 0.15 + 0.02,
            twinkleOffset: Math.random() * Math.PI * 2,
        }));

        // ── Glowing orbs ───────────────────────────────────────────────────
        const orbs: OrbType[] = [
            { cx: 0.22, cy: 0.3, r: 0.30, color: "#7c3aed", alpha: 0.18, speed: 0.0008, _t: 0 },
            { cx: 0.78, cy: 0.70, r: 0.32, color: "#0891b2", alpha: 0.14, speed: 0.0012, _t: 1200 },
            { cx: 0.50, cy: 0.50, r: 0.22, color: "#db2777", alpha: 0.10, speed: 0.0006, _t: 600 },
        ];

        // ── Orbital rings ─────────────────────────────────────────────────
        const rings = [
            { r: 0.38, color: "rgba(255,255,255,0.04)", speed: 0.00025 },
            { r: 0.52, color: "rgba(6,182,212,0.06)", speed: -0.00018 },
            { r: 0.65, color: "rgba(167,139,250,0.04)", speed: 0.00012 },
        ];

        // ── Text phases ───────────────────────────────────────────────────
        const phases = [
            { text: "NOVA STORE", sub: "The New Era of Digital Architecture", start: 0 },
            { text: "QUANTUM SPEED", sub: "Engineered for zero-latency execution", start: 160 },
            { text: "BESPOKE DESIGN", sub: "Award-winning hyper-tailored interfaces", start: 320 },
            { text: "FORT-KNOX SECURITY", sub: "Military-grade encryption, 24 / 7", start: 480 },
            { text: "START YOUR EMPIRE", sub: "Browse our packages to get started", start: 640 },
        ];
        const TOTAL_FRAMES = (phases[phases.length - 1].start) + 200;
        const FADE = 28;

        let frame = 0;

        // ── Main render loop ──────────────────────────────────────────────
        const draw = () => {
            const w = W();
            const h = H();
            ctx.clearRect(0, 0, w, h);

            // Background
            ctx.fillStyle = "#020205";
            ctx.fillRect(0, 0, w, h);

            // -- Stars
            particles.forEach((p) => {
                const twinkle = 0.45 + 0.55 * Math.sin(frame * 0.04 + p.twinkleOffset);
                ctx.beginPath();
                ctx.arc((p.x % w), (p.y + frame * p.speed) % h, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${(p.opacity * twinkle).toFixed(2)})`;
                ctx.fill();
            });

            // -- Orbs
            orbs.forEach((o) => {
                o._t += o.speed * 1000;
                const ox = w * o.cx + Math.sin(o._t) * w * 0.045;
                const oy = h * o.cy + Math.cos(o._t * 0.7) * h * 0.045;
                const rad = Math.min(w, h) * o.r;
                const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
                grad.addColorStop(0, o.color + "55");
                grad.addColorStop(0.5, o.color + "22");
                grad.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(ox, oy, rad, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            // -- Rings
            rings.forEach((ring, i) => {
                const angle = frame * ring.speed * 1000;
                const cx = w / 2, cy = h / 2;
                const radius = Math.min(w, h) * ring.r;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.strokeStyle = ring.color;
                ctx.lineWidth = 1;
                ctx.stroke();
                // Glowing dot
                const dotAngle = angle * (i + 1) * 1.3;
                const dx = Math.cos(dotAngle) * radius;
                const dy = Math.sin(dotAngle) * radius;
                const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 12);
                dg.addColorStop(0, i === 1 ? "#06b6d4" : "#a78bfa");
                dg.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(dx, dy, 12, 0, Math.PI * 2);
                ctx.fillStyle = dg;
                ctx.fill();
                ctx.restore();
            });

            // -- Scanning line
            const scanY = (frame * 1.6) % (h + 120) - 60;
            const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
            sg.addColorStop(0, "transparent");
            sg.addColorStop(0.5, "rgba(6,182,212,0.07)");
            sg.addColorStop(1, "transparent");
            ctx.fillStyle = sg;
            ctx.fillRect(0, scanY - 40, w, 80);

            // -- Animated text phases
            for (let i = 0; i < phases.length; i++) {
                const phase = phases[i];
                const nextStart = i + 1 < phases.length ? phases[i + 1].start : TOTAL_FRAMES;
                if (frame < phase.start || frame >= nextStart + FADE) continue;

                const elapsed = frame - phase.start;
                let alpha = 1;
                if (elapsed < FADE) alpha = elapsed / FADE;
                const fadeOutStart = nextStart - FADE;
                if (frame > fadeOutStart) alpha = Math.max(0, 1 - (frame - fadeOutStart) / FADE);

                const fs = Math.min(w * 0.065, 64);
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                const tg = ctx.createLinearGradient(w * 0.25, 0, w * 0.75, 0);
                tg.addColorStop(0, "#06b6d4");
                tg.addColorStop(0.5, "#a78bfa");
                tg.addColorStop(1, "#ec4899");

                // Main heading
                ctx.font = `900 ${fs}px 'Inter', Arial, sans-serif`;
                ctx.shadowColor = "#a78bfa";
                ctx.shadowBlur = 50;
                ctx.fillStyle = tg;
                ctx.fillText(phase.text, w / 2, h / 2 - fs * 0.4);

                // Sub-text
                ctx.font = `300 ${fs * 0.3}px 'Inter', Arial, sans-serif`;
                ctx.fillStyle = `rgba(156,163,175,${alpha})`;
                ctx.shadowBlur = 0;
                ctx.fillText(phase.sub.toUpperCase(), w / 2, h / 2 + fs * 0.55);

                ctx.restore();
            }

            // -- HUD corner marks
            const hud = "rgba(6,182,212,0.3)";
            const mk = 18;
            ([[0, 0], [w, 0], [0, h], [w, h]] as [number, number][]).forEach(([cx, cy]) => {
                const sx = cx === 0 ? 1 : -1;
                const sy = cy === 0 ? 1 : -1;
                ctx.strokeStyle = hud;
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx, cy + sy * 3); ctx.lineTo(cx, cy + sy * mk); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx + sx * 3, cy); ctx.lineTo(cx + sx * mk, cy); ctx.stroke();
            });

            // -- Frame counter (tiny mono, bottom right HUD)
            ctx.font = "10px monospace";
            ctx.fillStyle = "rgba(6,182,212,0.3)";
            ctx.textAlign = "right";
            ctx.fillText(`FRAME ${String(frame).padStart(4, "0")}`, w - 24, h - 16);

            frame = (frame + 1) % TOTAL_FRAMES;
            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className}`}
            style={{ display: "block" }}
        />
    );
}
