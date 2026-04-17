import Link from 'next/link'

interface BreadcrumbItem { label: string; href?: string }

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: '#CBD5E1', fontSize: 13 }}>/</span>}
            {item.href
              ? <Link href={item.href} style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none' }}>{item.label}</Link>
              : <span style={{ fontSize: 13, color: '#64748B' }}>{item.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  )
}
