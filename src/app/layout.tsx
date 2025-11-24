import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kano Process Trading Company Limited",
  description: "Kano Process Trading Company Limited is a leading provider of high-quality Furniture accessories, Plumbing materials, Building materials & Home Improvement Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow"> {/* `flex-grow` makes sure content takes available space */}
              {children}
            </main>
            <Footer />
          </div>
      </AuthProvider>
      </body>
    </html>
  );
}