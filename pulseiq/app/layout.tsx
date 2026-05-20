import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PulseIQ - Enterprise AI Analytics Platform",
  description: "Advanced product intelligence platform powered by IBM Orchestration and ICA workflows",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%233b82f6' width='100' height='100'/><text x='50' y='60' font-size='60' font-weight='bold' fill='white' text-anchor='middle'>P</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark h-full scroll-smooth">
      <body className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  )
}
