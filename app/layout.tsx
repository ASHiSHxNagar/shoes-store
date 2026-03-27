import type { Metadata } from "next";
import { Roboto} from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_NAME , NEXT_PUBLIC_APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
// import { ErrorWrapper } from "./error-wrapper";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
       <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
       >
       {/* <ErrorWrapper> */}
         {children}
       {/* </ErrorWrapper> */}
       </ThemeProvider>
      </body>
    </html>
  );
}
