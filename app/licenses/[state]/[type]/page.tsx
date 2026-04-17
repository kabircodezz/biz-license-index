import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { QuickFacts } from '@/components/quick-facts'
import { AffiliateCTA } from '@/components/affiliate-cta'
import Link from 'next/link'

interface PageProps { params: Promise<{ state: string; type: string }> }

type RelatedPageState = { slug: string; states: { name: string; slug: string } | null }
type RelatedPageType  = { slug: string; business_types: { name: string; slug: string } | null }

async function getLicensePage(stateSlug: string, typeSlug: string) {
  const { data } = await supabase
    .from('license_pages')
    .select('*, states(*), business_types(*)')
    .eq('status', 'published')
    .eq('slug', `${stateSlug}-${typeSlug}`)
    .single()
  return data
}

async function getRelatedPages(stateId: string, typeId: string, stateSlug: string, typeSlug: string) {
  const [sameType, sameState] = await Promise.all([
    supabase.from('license_pages').select('slug, states(name, slug)').eq('business_type_id', typeId).eq('status', 'published').neq('slug', `${stateSlug}-${typeSlug}`).limit(5),
    supabase.from('license_pages').select('slug, business_types(name, slug)').eq('state_id', stateId).eq('status', 'published').neq('slug', `${stateSlug}-${typeSlug}`).limit(4),
  ])
  return {
    sameType: (sameType.data || []) as unknown as RelatedPageState[],
    sameState: (sameState.data || []) as unknown as RelatedPageType[],
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, type } = await params
  const page = await getLicensePage(state, type)
  if (!page) return { title: 'Not Found' }
  return {
    title: page.meta_title || `${page.business_types?.name} License Requirements in ${page.states?.name}`,
    description: page.meta_description || `Requirements, fees, and how to apply for a ${page.business_types?.name} license in ${page.states?.name}.`,
  }
}

export const revalidate = 604800

export default async function LicenseDetailPage({ params }: PageProps) {
  const { state: stateSlug, type: typeSlug } = await params
  const page = await getLicensePage(stateSlug, typeSlug)
  if (!page) notFound()

  const { sameType, sameState } = await getRelatedPages(page.state_id, page.business_type_id, stateSlug, typeSlug)

  const stateName = page.states?.name || ''
  const typeName = page.business_types?.name || ''
  const verifiedDate = page.data_verified_at
    ? new Date(page.data_verified_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  const faqSchema = page.faq_json ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: page.faq_json.map((faq: { q: string; a: string }) => ({
      '@type': 'Question', name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Licenses', item: `${process.env.NEXT_PUBLIC_SITE_URL}/licenses` },
      { '@type': 'ListItem', position: 3, name: stateName, item: `${process.env.NEXT_PUBLIC_SITE_URL}/licenses/${stateSlug}` },
      { '@type': 'ListItem', position: 4, name: typeName },
    ],
  }

  const CTX = page.bond_required ? 'bond_required'
    : page.license_required === false ? 'license_not_required'
    : 'license_required_llc'

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page header */}
      <div style={{ backgroundColor: '#1B2E4B', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: stateName, href: `/licenses/${stateSlug}` },
            { label: typeName },
          ]} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(96,165,250,0.3)', color: '#93B4D4' }}>
              {page.business_types?.category}
            </span>
            {page.license_required !== null && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                backgroundColor: page.license_required ? 'rgba(22,163,74,0.15)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${page.license_required ? 'rgba(22,163,74,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: page.license_required ? '#86EFAC' : '#93B4D4',
              }}>
                {page.license_required ? 'License Required' : 'No State License Required'}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 12px' }}>
            {typeName} License Requirements in {stateName}
          </h1>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#93B4D4', flexWrap: 'wrap' }}>
            {page.licensing_body && <span>Issued by: <span style={{ color: '#CBD5E1' }}>{page.licensing_body}</span></span>}
            {verifiedDate && <span>Verified: <span style={{ color: '#CBD5E1' }}>{verifiedDate}</span></span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Quick facts */}
        <QuickFacts facts={[
          { label: 'License Required', value: page.license_required === null ? 'Varies' : page.license_required ? 'Required' : 'Not Required', highlight: true },
          { label: 'Application Fee', value: page.application_fee },
          { label: 'Renewal', value: page.renewal_period },
          { label: 'Exam Required', value: page.exam_required === null ? null : page.exam_required ? 'Yes' : 'No' },
          { label: 'Processing Time', value: page.processing_time },
          { label: 'Bond Required', value: page.bond_required === null ? null : page.bond_required ? `Yes${page.bond_amount ? ` (${page.bond_amount})` : ''}` : 'No' },
        ]} />

        {/* Requirements */}
        {page.requirements_list && page.requirements_list.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Requirements</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(page.requirements_list as string[]).map((req, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8 }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, backgroundColor: '#E6F1FB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#185FA5', marginTop: 1 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{req}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* How to apply */}
        {page.requirements_summary && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>How to Apply</h2>
            <div style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: 24 }}>
              {page.requirements_summary}
            </div>
            {page.licensing_body_url && (
              <a href={page.licensing_body_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '10px 18px', backgroundColor: '#185FA5', color: '#FFFFFF', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Apply at {page.licensing_body || 'Official Portal'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            )}
          </section>
        )}

        {/* Costs */}
        {(page.application_fee || page.renewal_fee || page.bond_amount) && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Costs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {page.application_fee && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 500 }}>Application Fee</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>{page.application_fee}</div>
                </div>
              )}
              {page.renewal_fee && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 500 }}>Renewal Fee</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>{page.renewal_fee}</div>
                </div>
              )}
              {page.bond_amount && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 500 }}>Surety Bond</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>{page.bond_amount}</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Affiliate CTA */}
        <AffiliateCTA context={CTX} stateName={stateName} businessType={typeName} licenseRequired={page.license_required} bondRequired={page.bond_required} />

        {/* FAQ */}
        {page.faq_json && page.faq_json.length > 0 && (
          <section style={{ marginTop: 48, marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(page.faq_json as { q: string; a: string }[]).map((faq, i) => (
                <details key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                  <summary style={{ padding: '16px 20px', fontSize: 15, fontWeight: 500, color: '#1E293B', cursor: 'pointer', listStyle: 'none' }}>
                    {faq.q}
                  </summary>
                  <div style={{ padding: '14px 20px', fontSize: 14, color: '#64748B', lineHeight: 1.7, borderTop: '1px solid #F1F5F9' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related pages */}
        {(sameType.length > 0 || sameState.length > 0) && (
          <section style={{ marginTop: 48, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E293B', marginBottom: 20 }}>Related pages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {sameType.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>{typeName} in other states</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sameType.map((p) => (
                      <Link key={p.slug} href={`/licenses/${p.states?.slug || ''}/${typeSlug}`}
                        style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{p.states?.name || p.slug}</span>
                        <span style={{ color: '#CBD5E1' }}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {sameState.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Other licenses in {stateName}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sameState.map((p) => (
                      <Link key={p.slug} href={`/licenses/${stateSlug}/${p.business_types?.slug || ''}`}
                        style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{p.business_types?.name || p.slug}</span>
                        <span style={{ color: '#CBD5E1' }}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Official source */}
        {page.official_source_url && (
          <div style={{ marginTop: 32, padding: '14px 18px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              Data sourced from official state government portal{verifiedDate ? `. Last verified ${verifiedDate}.` : '.'}
            </div>
            <a href={page.official_source_url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none', fontWeight: 500 }}>
              View official source →
            </a>
          </div>
        )}
      </div>
    </>
  )
}
