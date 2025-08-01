'use client'
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { Toaster } from 'react-hot-toast';
import Providers from "./provider";

// const geistSans = Geist({variable: "--font-geist-sans",subsets: ["latin"],});

// const geistMono = Geist_Mono({ variable: "--font-geist-mono",subsets: ["latin"],});

// export const metadata: Metadata = {title: "Create Next App",description: "Generated by create next app",};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body >
         <Providers>
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
