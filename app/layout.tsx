import './globals.css'
import { Inter } from 'next/font/google'
import Sessionprovider from './providers/provider';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jeff Remittance',
  description: 'This app allows you to send money to anyone, anywhere in the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sessionprovider>
          {children}
        </Sessionprovider>
      </body>
    </html>
  )
}
