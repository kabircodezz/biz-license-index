interface QuickFact {
  label: string
  value: string | null | undefined
  highlight?: boolean
}

export function QuickFacts({ facts }: { facts: QuickFact[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 1,
      border: '1px solid #1E1E1E',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 32,
    }}>
      {facts.map((fact, i) => (
        <div key={i} style={{
          padding: '16px 20px',
          backgroundColor: '#111111',
        }}>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
            {fact.label}
          </div>
          <div style={{
            fontSize: 15,
            fontWeight: 500,
            color: fact.highlight
              ? fact.value === 'Required' ? '#22C55E' : fact.value === 'Not Required' ? '#94A3B8' : '#F8FAFC'
              : '#F8FAFC',
          }}>
            {fact.value || 'N/A'}
          </div>
        </div>
      ))}
    </div>
  )
}
