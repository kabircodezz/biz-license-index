import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: {
    default: 'Business License Requirements by State | BizLicenseGuide',
    template: '%s | BizLicenseGuide',
  },
  description: 'Find business license and permit requirements for every state and business type. Updated regulatory data, fees, and step-by-step guidance.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bizlicenseguide.com'),
  openGraph: { type: 'website', siteName: 'BizLicenseGuide' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0A0A0A', color: '#F8FAFC', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <Nav />
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
