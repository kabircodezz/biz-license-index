'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ backgroundColor: '#1B2E4B', borderBottom: '1px solid #253d60', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 17, color: '#FFFFFF', letterSpacing: '-0.01em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          BizLicenseGuide
        </Link>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/licenses" style={{ fontSize: 14, color: '#93B4D4', textDecoration: 'none', padding: '6px 12px', borderRadius: 6 }}>
            Browse by State
          </Link>
          <Link href="/licenses/type" style={{ fontSize: 14, color: '#93B4D4', textDecoration: 'none', padding: '6px 12px', borderRadius: 6 }}>
            Browse by Type
          </Link>
        </div>
      </div>
    </nav>
  )
}
