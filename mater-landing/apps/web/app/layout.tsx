import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@mater/ui/styles.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mater - Socorro Veicular Inteligente",
  description: "Conectando motoristas a prestadores de serviço de forma rápida e eficiente",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="light">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
} 