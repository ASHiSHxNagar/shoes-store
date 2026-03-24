import type { Metadata } from "next";
import { Roboto} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Shoes Store",
  description: "Mordern Website in Nextjs 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
