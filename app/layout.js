import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/clientLayout";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Abiola Motors - Car dealers in Nigeria | Luxury and Affordable Cars",
  description:
    "At Abiola Motors, we pride ourselves as one of the best retail car dealers in Nigeria.",
  keywords: [
    "Car dealers in Nigeria",
    "Buy cars from retailers",
    "Buy cars in Nigeria",
    "Luxury cars Nigeria",
    "Affordable cars Nigeria",
    "Toyota Nigeria",
    "Lexus Nigeria",
    "Honda Nigeria",
    "Audi Nigeria",
  ],
  authors: [{ name: "Abiola Motors" }],
  openGraph: {
    title: "Abiola Motors - Car dealers in Nigeria",
    description: "Luxury and affordable cars for sale in Nigeria.",
    url: "https://abiolamotors.com",
    siteName: "Abiola Motors",
    images: [
      {
        url: "/images/Abiola-Motors.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury retail cars at Abiola Motors",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className={`${urbanist.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
