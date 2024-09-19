import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/lib/providers";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col">
          <Providers>
            <Header></Header>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
