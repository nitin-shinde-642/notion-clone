import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "Notion Clone for educational purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} color="#f00" />
            <Header />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-950">
                {children}
              </div>
            </div>
            <Toaster position={'top-center'} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
