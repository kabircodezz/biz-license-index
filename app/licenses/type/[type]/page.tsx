import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { AffiliateCTA } from '@/components/affiliate-cta'
import Link from 'next/link'

interface PageProps { params: Promise<{ type: string }> }

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
    .eq('business_type_id', typeData.id).eq('status', 'published').order('slug')

  return (
    <div>
      <div style={{ backgroundColor: '#1B2E4B', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'By Type', href: '/licenses/type' }, { label: typeData.name }]} />
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#60A5FA', backgroundColor: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 20, padding: '3px 10px', marginBottom: 12 }}>
            {typeData.category}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
            {typeData.name} License Requirements by State
          </h1>
          {typeData.description && <p style={{ fontSize: 15, color: '#93B4D4', margin: 0 }}>{typeData.description}</p>}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>
        {pages && pages.length > 0 ? (
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '10px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['State', 'Required', 'App. fee', 'Renewal', ''].map((h, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
              ))}
            </div>
            {pages.map((page, i) => {
              const st = page?.states as unknown as { name: string; slug: string; abbreviation: string } | null
              return (
                <div key={page?.slug} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '12px 16px', alignItems: 'center', borderBottom: i < pages.length - 1 ? '1px solid #F1F5F9' : 'none', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: 4, width: 28, textAlign: 'center' }}>{st?.abbreviation}</span>
                    <span style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>{st?.name}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: page?.license_required === false ? '#94A3B8' : '#16A34A' }}>
                      {page?.license_required === null ? '—' : page?.license_required ? 'Required' : 'Not required'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{page?.application_fee || '—'}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{page?.renewal_period || '—'}</div>
                  <div>
                    <Link href={`/licenses/${st?.slug}/${typeSlug}`} style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none', fontWeight: 500 }}>
                      Details →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ padding: '64px 0', textAlign: 'center', color: '#94A3B8', backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
            State-by-state data for {typeData.name} is being compiled. Check back soon.
          </div>
        )}
        <div style={{ marginTop: 48 }}>
          <AffiliateCTA context="license_required_llc" businessType={typeData.name} />
        </div>
      </div>
    </div>
  )
}
