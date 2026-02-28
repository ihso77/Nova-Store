import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "digital" | "danger" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group relative";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-100 border border-transparent shadow-lg",
        secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md",
        digital: "bg-gradient-to-r from-nova-purple to-nova-cyan text-white hover:opacity-90 shadow-lg",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
        outline: "bg-transparent text-white border border-white/20 hover:border-white/60 hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Premium Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {isLoading ? (
                <span className="flex flex-row items-center justify-center gap-2 relative z-10 w-full h-full">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                <span className="relative z-10 w-full h-full flex items-center justify-center gap-2 group-hover:scale-[1.05] transition-transform duration-300">
                    {children}
                </span>
            )}
        </button>
    );
}
