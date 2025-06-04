import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://cangmushui.github.io' : 'http://localhost:3000'),
  title: "Tongyuan Bai - Academic Portfolio",
  description: "AI researcher specializing in 3D scene generation, video generation, and diffusion models. Sharing latest research achievements and academic insights.",
  keywords: ["artificial intelligence", "machine learning", "deep learning", "3D scene generation", "diffusion models", "computer vision"],
  authors: [{ name: "Tongyuan Bai" }],
  creator: "Tongyuan Bai",
  publisher: "Tongyuan Bai",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Tongyuan Bai - Academic Portfolio",
    description: "AI researcher specializing in 3D scene generation, video generation, and diffusion models.",
    siteName: "Tongyuan Bai's Academic Portfolio",
    images: [
      {
        url: "/avatar.jpg",
        width: 400,
        height: 400,
        alt: "Tongyuan Bai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tongyuan Bai - Academic Portfolio",
    description: "AI researcher specializing in 3D scene generation and diffusion models",
    images: ["/avatar.jpg"],
    creator: "@cangmushui",
  },
  verification: {
    // google: "your-google-verification-code",
    // other: "your-other-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
