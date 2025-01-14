import type { Metadata } from 'next'
import ReactQueryProvider from './services/ReactQueryProvider'
import CarProvider from './provider/CarContextProvider';
import './globals.css'


export const metadata: Metadata = {
  title: 'Form Task',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CarProvider>
          <ReactQueryProvider>
            <div className="flex justify-center">{children}</div>
          </ReactQueryProvider>
        </CarProvider>
      </body>
    </html>
  )
}
