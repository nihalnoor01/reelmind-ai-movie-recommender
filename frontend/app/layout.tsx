import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Poppins } from "next/font/google"
import "./globals.css"
import BuyMeACoffeeButton from '../app/BuyMeACoffeeButton';

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
})
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ReelMind - AI Movie & Series Recommender",
  description: "Let AI script your next binge. Powered by Google Gemini & TMDB",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}
         {/* <BuyMeACoffeeButton /> */}
      </body>
    </html>
  )
}
