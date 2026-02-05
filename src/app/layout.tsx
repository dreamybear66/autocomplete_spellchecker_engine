import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
    title: "AutoComplete Pro - Algorithms Made Visible",
    description: "Advanced autocomplete and spell correction engine with interactive visualizations",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Header />
                <main className="pt-20 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
