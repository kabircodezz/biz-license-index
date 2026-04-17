import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { QuickFacts } from '@/components/quick-facts'
import { AffiliateCTA } from '@/components/affiliate-cta'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ state: string; type: string }>
}

async function getLicensePage(stateSlug: string, typeSlug: string) {
  const { data } = await supabase
    .from('license_pages')
    .select('*, states(*), business_types(*)')
    .eq('status', 'published')
    .eq('slug', `${stateSlug}-${typeSlug}`)
    .single()
  return data
}

type RelatedPageState = { slug: string; states: { name: string; slug: string } | null }
type RelatedPageType = { slug: string; business_types: { name: string; slug: string } | null }

async function getRelatedPages(stateId: string, typeId: string, stateSlug: string, typeSlug: string) {
  const [sameType, sameState] = await Promise.all([
    supabase.from('license_pages').select('slug, states(name, slug)').eq('business_type_id', typeId).eq('status', 'published').neq('slug', `${stateSlug}-${typeSlug}`).limit(5),
    supabase.from('license_pages').select('slug, business_types(name, slug)').eq('state_id', stateId).eq('status', 'published').neq('slug', `${stateSlug}-${typeSlug}`).limit(3),
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
  const verifiedDate = page.data_verified_at ? new Date(page.data_verified_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null

  const faqSchema = page.faq_json ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq_json.map((faq: { q: string; a: string }) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Breadcrumb items={[
          { label: 'Licenses', href: '/licenses' },
          { label: stateName, href: `/licenses/${stateSlug}` },
          { label: typeName },
        ]} />

        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, border: '1px solid #1E1E1E', color: '#94A3B8' }}>
              {page.business_types?.category}
            </span>
            {page.license_required !== null && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                backgroundColor: page.license_required ? '#052e16' : '#1a1a1a',
                border: `1px solid ${page.license_required ? '#166534' : '#2A2A2A'}`,
                color: page.license_required ? '#22C55E' : '#64748B',
              }}>
                {page.license_required ? 'License Required' : 'No State License Required'}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 12px' }}>
            {typeName} License Requirements in {stateName}
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#64748B', flexWrap: 'wrap' }}>
            {page.licensing_body && <span>Issued by: <span style={{ color: '#94A3B8' }}>{page.licensing_body}</span></span>}
            {verifiedDate && <span>Verified: <span style={{ color: '#94A3B8' }}>{verifiedDate}</span></span>}
          </div>
        </div>

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
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC', marginBottom: 16 }}>Requirements</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(page.requirements_list as string[]).map((req, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#3B82F6', marginTop: 1 }}>{i + 1}</span>
                  <span style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.6 }}>{req}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* How to apply */}
        {page.requirements_summary && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC', marginBottom: 16 }}>How to Apply</h2>
            <div style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.7, backgroundColor: '#111111', border: '1px solid #1E1E1E', borderRadius: 10, padding: 24 }}>
              {page.requirements_summary}
            </div>
            {page.licensing_body_url && (
              <a href={page.licensing_body_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '10px 18px', backgroundColor: '#111111', border: '1px solid #2A2A2A', borderRadius: 8, fontSize: 14, color: '#94A3B8', textDecoration: 'none' }}>
                Apply at {page.licensing_body || 'Official Portal'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            )}
          </section>
        )}

        {/* Costs */}
        {(page.application_fee || page.renewal_fee || page.bond_amount) && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC', marginBottom: 16 }}>Costs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {page.application_fee && (
                <div style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Application Fee</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC' }}>{page.application_fee}</div>
                </div>
              )}
              {page.renewal_fee && (
                <div style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Renewal Fee</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC' }}>{page.renewal_fee}</div>
                </div>
              )}
              {page.bond_amount && (
                <div style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', borderRadius: 8, padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Surety Bond</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC' }}>{page.bond_amount}</div>
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
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F8FAFC', marginBottom: 20 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(page.faq_json as { q: string; a: string }[]).map((faq, i) => (
                <details key={i} style={{ border: '1px solid #1E1E1E', borderRadius: 8, overflow: 'hidden' }}>
                  <summary style={{ padding: '16px 20px', fontSize: 15, fontWeight: 500, color: '#F8FAFC', cursor: 'pointer', listStyle: 'none', backgroundColor: '#111111' }}>
                    {faq.q}
                  </summary>
                  <div style={{ padding: '16px 20px', fontSize: 14, color: '#94A3B8', lineHeight: 1.7, borderTop: '1px solid #1E1E1E', backgroundColor: '#0D0D0D' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {(sameType.length > 0 || sameState.length > 0) && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F8FAFC', marginBottom: 20 }}>Related Pages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {sameType.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>{typeName} in other states</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sameType.map((p) => (
                      <Link key={p.slug} href={`/licenses/${p.states?.slug || ''}/${typeSlug}`}
                        style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid #1A1A1A' }}>
                        {p.states?.name || p.slug} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {sameState.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Other licenses in {stateName}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sameState.map((p) => (
                      <Link key={p.slug} href={`/licenses/${stateSlug}/${p.business_types?.slug || ''}`}
                        style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid #1A1A1A' }}>
                        {p.business_types?.name || p.slug} →
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
          <div style={{ marginTop: 48, padding: '16px 20px', backgroundColor: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>Official source</div>
              <div style={{ fontSize: 13, color: '#64748B' }}>Data sourced from official state government portal{verifiedDate ? `. Last verified ${verifiedDate}.` : '.'}</div>
            </div>
            <a href={page.official_source_url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#3B82F6', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View source →
            </a>
          </div>
        )}
      </div>
    </>
  )
}
