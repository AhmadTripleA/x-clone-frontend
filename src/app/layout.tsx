import { Metadata } from "next";
import React from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "My Very First Next App",
    description: "I dont know",
};

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
