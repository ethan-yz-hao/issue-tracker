import type {Metadata} from "next";
import {Inter} from "next/font/google";
import './combined-styles.css';
import {Container, Theme} from '@radix-ui/themes';
import NavBar from "@/app/NavBar";
import AuthProvider from "@/app/auth/Provider";
import React from "react";
import QueryClientProvider from "@/app/QueryClientProvider";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "An issue tracker for software development teams",
};

export default function RootLayout(
    {children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.variable}>
        <QueryClientProvider>
            <AuthProvider>
                <Theme appearance="light" accentColor="violet">
                    <NavBar/>
                    <main className="p-5">
                        <Container>{children}</Container>
                    </main>
                </Theme>
            </AuthProvider>
        </QueryClientProvider>
        </body>
        </html>
    );
}
