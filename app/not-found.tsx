import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ maxWidth: 480, margin: '120px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, fontWeight: 700, color: '#1E1E1E', marginBottom: 8 }}>404</div>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: '#F8FAFC', marginBottom: 12 }}>Page not found</h1>
      <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32, lineHeight: 1.6 }}>
        This license page may not be available yet, or the URL may be incorrect.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ padding: '10px 20px', backgroundColor: '#3B82F6', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
          Browse all states
        </Link>
        <Link href="/licenses/type" style={{ padding: '10px 20px', border: '1px solid #2A2A2A', color: '#94A3B8', borderRadius: 8, fontSize: 14, textDecoration: 'none' }}>
          Browse by type
        </Link>
      </div>
    </div>
  )
}
