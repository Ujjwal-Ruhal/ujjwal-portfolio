import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "Ujjwal Ruhal | Backend Developer | Python & Django",
  description:
    "Ujjwal Ruhal is a Computer Science graduate and Backend Developer focused on Python, Django, Flask, REST APIs, PostgreSQL, MySQL, and production-oriented web applications.",
  openGraph: {
    title: "Ujjwal Ruhal | Backend Developer",
    description:
      "Backend Developer building reliable, database-driven web applications with Python.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
