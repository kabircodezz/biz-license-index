export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E1E1E', backgroundColor: '#0A0A0A', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#F8FAFC', marginBottom: 8 }}>BizLicenseGuide</div>
            <div style={{ fontSize: 13, color: '#64748B', maxWidth: 320, lineHeight: 1.6 }}>
              Business license and permit requirements for all 50 US states. Data sourced directly from state government portals.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 48 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Browse</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="/licenses" style={{ fontSize: 13, color: '#94A3B8' }}>By State</a>
                <a href="/licenses/type" style={{ fontSize: 13, color: '#94A3B8' }}>By Business Type</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E1E1E', fontSize: 12, color: '#64748B' }}>
          Data sourced from official state government websites. Always verify requirements directly with your state licensing authority before proceeding.
        </div>
      </div>
    </footer>
  )
}
