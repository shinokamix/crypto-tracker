import "./globals.css";
import { ThemeProvider } from "./providers/theme";
import { SmoothScrollProvider } from "./providers/smooth-scroll";
import localFont from "next/font/local";
import { Footer } from "@/widgets/footer";

const Heading = localFont({
    src: [
        { path: "./fonts/Array-Regular.woff2", weight: "400", style: "normal" },
        { path: "./fonts/Array-Bold.woff2", weight: "700", style: "normal" },
        {
            path: "./fonts/Array-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
    ],
    variable: "--font-heading",
    display: "swap",
});

const Body = localFont({
    src: [
        {
            path: "./fonts/Satoshi-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
        {
            path: "./fonts/Satoshi-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "./fonts/Satoshi-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-body",
    display: "swap",
});

export const metadata = {
    title: "Traceum",
    description: "Crypto Prices",
    icons: {
        icon: [
            {
                url: "/favicon_white.svg",
                type: "image/svg+xml",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
                media: "(prefers-color-scheme: light)",
            },
        ],
        apple: "/favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body
                className={`${Body.variable} ${Heading.variable} antialiased min-h-screen bg-background text-foreground`}
            >
                <ThemeProvider>
                    <SmoothScrollProvider>
                        {children}
                        <Footer />
                    </SmoothScrollProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
