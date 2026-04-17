import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { AffiliateCTA } from '@/components/affiliate-cta'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ type: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const { data } = await supabase.from('business_types').select('name').eq('slug', type).single()
  if (!data) return { title: 'Not Found' }
  return {
    title: `${data.name} License Requirements by State`,
    description: `Compare ${data.name} license requirements, fees, and renewal periods across all 50 US states.`,
  }
}

export const revalidate = 604800

export default async function TypeHubPage({ params }: PageProps) {
  const { type: typeSlug } = await params

  const { data: typeData } = await supabase.from('business_types').select('*').eq('slug', typeSlug).single()
  if (!typeData) notFound()

  const { data: pages } = await supabase
    .from('license_pages')
    .select('slug, license_required, application_fee, renewal_period, states(name, slug, abbreviation)')
    .eq('business_type_id', typeData.id)
    .eq('status', 'published')
    .order('slug')

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Breadcrumb items={[{ label: 'Licenses', href: '/licenses' }, { label: 'By Type', href: '/licenses/type' }, { label: typeData.name }]} />

      <div style={{ marginBottom: 40 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', border: '1px solid #1E1E1E', borderRadius: 20, padding: '3px 10px' }}>
          {typeData.category}
        </span>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', margin: '16px 0 12px' }}>
          {typeData.name} License Requirements by State
        </h1>
        {typeData.description && (
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>{typeData.description}</p>
        )}
      </div>

      {pages && pages.length > 0 ? (
        <div style={{ border: '1px solid #1E1E1E', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '10px 16px', backgroundColor: '#0D0D0D', borderBottom: '1px solid #1E1E1E' }}>
            {['State', 'Required', 'App. Fee', 'Renewal', ''].map((h, i) => (
              <div key={i} style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
            ))}
          </div>
          {pages.map((page, i) => {
            const st = page?.states as unknown as { name: string; slug: string; abbreviation: string } | null
            return (
              <div key={page?.slug} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '12px 16px', alignItems: 'center', borderBottom: i < pages.length - 1 ? '1px solid #1A1A1A' : 'none', backgroundColor: i % 2 === 0 ? '#111111' : '#0E0E0E' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', backgroundColor: '#1A1A1A', padding: '2px 6px', borderRadius: 4, width: 28, textAlign: 'center' }}>{st?.abbreviation}</span>
                  <span style={{ fontSize: 14, color: '#F8FAFC' }}>{st?.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: page?.license_required === false ? '#64748B' : '#22C55E' }}>
                    {page?.license_required === null ? '—' : page?.license_required ? 'Required' : 'Not Required'}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>{page?.application_fee || '—'}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>{page?.renewal_period || '—'}</div>
                <div>
                  <Link href={`/licenses/${st?.slug}/${typeSlug}`} style={{ fontSize: 12, color: '#3B82F6', textDecoration: 'none' }}>
                    Details →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ padding: '48px 0', textAlign: 'center', color: '#475569' }}>
          State-by-state data for {typeData.name} is being compiled. Check back soon.
        </div>
      )}

      <div style={{ marginTop: 48 }}>
        <AffiliateCTA context="license_required_llc" businessType={typeData.name} />
      </div>
    </div>
  )
}
