import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./navbar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import QueryClient from "@/QueryClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='p-2'>
        <QueryClient>
          <AuthProvider>
            <Theme>
              <NavBar />
              <main>{children}</main>
            </Theme>
          </AuthProvider>
        </QueryClient>
      </body>
    </html>
  );
}
