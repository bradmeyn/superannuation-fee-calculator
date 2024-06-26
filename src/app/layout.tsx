import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Superannuation Fee Calculator",
  description: "Calculate & compare the fees on your superannuation account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col ">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
