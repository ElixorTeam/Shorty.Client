'use client'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}