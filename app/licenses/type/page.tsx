import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Business License Requirements by Type',
  description: 'Browse license requirements for 50+ business types across all US states.',
}

export const revalidate = 604800

const categoryOrder = ['Construction','Healthcare','Legal & Financial','Transportation','Food & Hospitality','Professional Services','Technology & Creative','Home Services']

export default async function TypeIndexPage() {
  const { data: types } = await supabase.from('business_types').select('*').order('name')
  const byCategory = (types || []).reduce((acc: Record<string, typeof types>, t) => {
    const cat = t?.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat]!.push(t)
    return acc
  }, {})
  const orderedCategories = [...categoryOrder.filter(c => byCategory[c]), ...Object.keys(byCategory).filter(c => !categoryOrder.includes(c))]

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Browse by Type' }]} />
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1E293B', letterSpacing: '-0.02em', margin: '0 0 8px' }}>Browse by Business Type</h1>
      <p style={{ fontSize: 16, color: '#64748B', margin: '0 0 40px' }}>Select a business type to see license requirements in every US state.</p>

      {orderedCategories.map(category => (
        <div key={category} style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #E6F1FB' }}>
            {category}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {byCategory[category]?.map(t => (
              <Link key={t?.slug} href={`/licenses/type/${t?.slug}`}
                style={{ padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#FFFFFF', fontSize: 14, color: '#1E293B', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>{t?.name}</div>
                {t?.description && (
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>
                    {t.description.length > 60 ? t.description.slice(0, 60) + '...' : t.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
