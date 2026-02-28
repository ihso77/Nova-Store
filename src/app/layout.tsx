import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nova Store | Where Dreams Become Reality",
  description: "Premium digital products & web solutions tailored for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden w-full">
      <body className={`${inter.className} min-h-screen bg-[#020205] text-white relative flex flex-col overflow-x-hidden w-full m-0 p-0`}>
        {/* Background Video Layer */}
        <div className="fixed inset-0 z-[-2] w-screen h-screen overflow-hidden bg-[#020205]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
            src="/stars.mp4"
          />
        </div>

        {/* Dark Overlay with Gradient */}
        <div
          className="fixed inset-0 z-[-1] pointer-events-none w-screen h-screen mix-blend-multiply"
          style={{
            background: "radial-gradient(circle at center, rgba(2,2,5,0.8) 0%, rgba(0,0,0,1) 100%)",
          }}
        />

        <AuthProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen relative z-10 w-full max-w-[100vw] overflow-x-hidden">
              <div className="mesh-gradient" />
              <Navbar />
              <main className="flex-grow w-full overflow-x-hidden flex flex-col">
                {children}
              </main>
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
