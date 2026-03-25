import type { Metadata } from "next";
import { Roboto} from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_NAME , NEXT_PUBLIC_APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";

const roboto = Roboto({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `${NEXT_PUBLIC_APP_DESCRIPTION}`,
  metadataBase : new URL(SERVER_URL),
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
