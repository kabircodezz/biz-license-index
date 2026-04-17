interface QuickFact { label: string; value: string | null | undefined; highlight?: boolean }

export function QuickFacts({ facts }: { facts: QuickFact[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: 0,
      border: '1px solid #E2E8F0',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 32,
      backgroundColor: '#FFFFFF',
    }}>
      {facts.filter(f => f.value).map((fact, i) => (
        <div key={i} style={{
          padding: '16px 20px',
          borderRight: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
        }}>
          <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 500 }}>
            {fact.label}
          </div>
          <div style={{
            fontSize: 15,
            fontWeight: 600,
            color: fact.highlight
              ? fact.value === 'Required' ? '#16A34A'
              : fact.value === 'Not Required' ? '#64748B'
              : '#1E293B'
              : '#1E293B',
          }}>
            {fact.value}
          </div>
        </div>
      ))}
    </div>
  )
}
