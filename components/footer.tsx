import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1B2E4B', borderTop: '1px solid #253d60', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#FFFFFF', marginBottom: 10 }}>BizLicenseGuide</div>
            <div style={{ fontSize: 13, color: '#93B4D4', lineHeight: 1.7 }}>
              Free reference for business license and permit requirements across all 50 US states. Data sourced directly from official state government portals.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Browse</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/licenses" style={{ fontSize: 13, color: '#93B4D4', textDecoration: 'none' }}>By State</Link>
                <Link href="/licenses/type" style={{ fontSize: 13, color: '#93B4D4', textDecoration: 'none' }}>By Business Type</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Popular</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/licenses/type/general-contractor" style={{ fontSize: 13, color: '#93B4D4', textDecoration: 'none' }}>Contractor License</Link>
                <Link href="/licenses/type/notary-public" style={{ fontSize: 13, color: '#93B4D4', textDecoration: 'none' }}>Notary Public</Link>
                <Link href="/licenses/type/real-estate-agent" style={{ fontSize: 13, color: '#93B4D4', textDecoration: 'none' }}>Real Estate Agent</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #253d60', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: '#64748B' }}>
            © {new Date().getFullYear()} BizLicenseGuide. For informational purposes only.
          </div>
          <div style={{ fontSize: 12, color: '#64748B', maxWidth: 480 }}>
            Always verify requirements directly with your state licensing authority before proceeding.
          </div>
        </div>
      </div>
    </footer>
  )
}
