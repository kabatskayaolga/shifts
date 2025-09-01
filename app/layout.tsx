import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Footer from "@/components/layout/footer";

import Header from "@/components/layout/header";
import { ThemeProvider as ThemeProviderUI } from "@mui/material";
import theme from "./theme";
import { ThemeProvider as ThemeProviderTheme } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dienstplan",
  description:
    "Einfache Verwaltung von Mitarbeiterschichten mit Monatsübersicht und Browser-Speicherung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="de" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProviderTheme
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProviderUI theme={theme}>
                <div className="font-sans grid grid-rows-auto items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                  <Header />
                  <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    {children}
                  </main>
                  <Footer />
                </div>
              </ThemeProviderUI>
            </AppRouterCacheProvider>
          </ThemeProviderTheme>
        </body>
      </html>
    </StoreProvider>
  );
}
