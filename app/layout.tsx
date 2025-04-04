import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "../components/theme-provider"

export const metadata: Metadata = {
  title: 'Lista de Compras',
  description: 'Aplicación para gestionar tus compras',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
