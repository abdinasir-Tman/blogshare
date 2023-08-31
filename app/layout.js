import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Share App  ",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
