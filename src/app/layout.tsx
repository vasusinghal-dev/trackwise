import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trackwise - Job tracking, without chaos",
  description:
    "A productivity-focused SaaS for serious job seekers to manage applications, interviews, and decisions in one structured system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-text-primary antialiased`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
