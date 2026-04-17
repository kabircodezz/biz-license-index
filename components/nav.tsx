'use client'
import Link from 'next/link'

export function Nav() {
  return (
    <nav style={{ borderBottom: '1px solid #1E1E1E', backgroundColor: '#0A0A0A', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 600, fontSize: 16, color: '#F8FAFC', letterSpacing: '-0.02em', textDecoration: 'none' }}>
          BizLicenseGuide
        </Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/licenses" style={{ fontSize: 14, color: '#94A3B8', textDecoration: 'none' }}>Browse by State</Link>
          <Link href="/licenses/type" style={{ fontSize: 14, color: '#94A3B8', textDecoration: 'none' }}>Browse by Type</Link>
        </div>
      </div>
    </nav>
  )
}
