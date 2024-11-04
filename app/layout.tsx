import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/app/components/Footer";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uquick - Foro Web3 ",
  description:
    "Resuelve dudas, participa en debates y comparte conocimiento, con increíbles recompensas en Token Web3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {/* El contenido crecerá y ocupará el espacio disponible */}
            <main className="flex-grow">{children}</main>
            {/* Footer siempre estará al final */}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
