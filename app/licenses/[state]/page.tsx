import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { AffiliateCTA } from '@/components/affiliate-cta'
import Link from 'next/link'

interface PageProps { params: Promise<{ state: string }> }

const categoryOrder = ['Construction','Healthcare','Legal & Financial','Transportation','Food & Hospitality','Professional Services','Technology & Creative','Home Services']

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const { data } = await supabase.from('states').select('name').eq('slug', state).single()
  if (!data) return { title: 'Not Found' }
  return {
    title: `Business License Requirements in ${data.name}`,
    description: `License and permit requirements for every business type in ${data.name}. Fees, steps, and official state resources.`,
  }
}

export const revalidate = 604800

export default async function StateHubPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const { data: stateData } = await supabase.from('states').select('*').eq('slug', stateSlug).single()
  if (!stateData) notFound()

  type PageRow = { slug: string; license_required: boolean | null; application_fee: string | null; business_types: { name: string; slug: string; category: string | null } | null }
  const { data: pagesRaw } = await supabase
    .from('license_pages')
    .select('slug, license_required, application_fee, business_types(name, slug, category)')
    .eq('state_id', stateData.id).eq('status', 'published').order('slug')
  const pages = pagesRaw as PageRow[] | null

  const byCategory = (pages || []).reduce((acc: Record<string, PageRow[]>, page) => {
    const cat = (page?.business_types as { category?: string } | null)?.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat]!.push(page)
    return acc
  }, {})
  const orderedCategories = [...categoryOrder.filter(c => byCategory[c]), ...Object.keys(byCategory).filter(c => !categoryOrder.includes(c))]

  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#1B2E4B', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Licenses', href: '/licenses' }, { label: stateData.name }]} />
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
            Business License Requirements in {stateData.name}
          </h1>
          <p style={{ fontSize: 15, color: '#93B4D4', margin: 0 }}>
            Requirements, fees, and steps for {pages?.length || 0} business types in {stateData.name}.
            {stateData.secretary_of_state_url && (
              <> Visit the <a href={stateData.secretary_of_state_url} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA' }}>Secretary of State</a> for registration info.</>
            )}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>
        {pages && pages.length > 0 ? (
          orderedCategories.map(category => (
            <div key={category} style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #E6F1FB' }}>
                {category}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
                {byCategory[category]?.map(page => {
                  const bt = page?.business_types as { name: string; slug: string } | null
                  return (
                    <Link key={page?.slug} href={`/licenses/${stateSlug}/${bt?.slug}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#FFFFFF', textDecoration: 'none', gap: 12 }}>
                      <span style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>{bt?.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {page?.application_fee && <span style={{ fontSize: 12, color: '#64748B' }}>{page.application_fee}</span>}
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: page?.license_required === false ? '#CBD5E1' : '#16A34A', flexShrink: 0 }} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '64px 0', textAlign: 'center', color: '#94A3B8', backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 15, marginBottom: 8 }}>License data for {stateData.name} is being compiled.</div>
            <div style={{ fontSize: 13 }}>Check back soon — we add new states weekly.</div>
          </div>
        )}
        <div style={{ marginTop: 48 }}>
          <AffiliateCTA context="state_hub" stateName={stateData.name} />
        </div>
      </div>
    </div>
  )
}
