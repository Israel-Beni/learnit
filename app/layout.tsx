"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useUserData from "./hooks/useUserData";

const inter = Inter({ subsets: ["latin"] });

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const metadata: Metadata = {
        title: "LearnIt",
        description: "Frontend course for the web dev learner",
    };

    // The following 2 lines are just for testing useUserData() hook
    const userData = useUserData();
    console.log(userData)
    
    return (
        <html lang="en">
            <body
                className={inter.className}
                style={{
                    background: "black",
                    color: "white",
                    margin: "auto",
                    maxWidth: "80rem",
                }}
            >
                <ThemeProvider theme={darkTheme}>
                    <Header userData={userData} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
