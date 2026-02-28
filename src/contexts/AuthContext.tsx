"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "owner";
    avatar?: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (session?.user) {
                    const { data: profile } = await supabase
                        .from("users")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();

                    setUser(profile || {
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.user_metadata?.name || "User",
                        role: "user",
                        createdAt: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error("Auth session error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from("users")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();
                    setUser(profile || {
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.user_metadata?.name || "User",
                        role: "user",
                        createdAt: new Date().toISOString()
                    });
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
