import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athena vs Neura | Tic-Tac-Toe",
  description: "A cosmic Tic-Tac-Toe battle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-rajdhani">{children}</body>
    </html>
  );
}
