import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizlicenseguide.com'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [statesRes, typesRes, pagesRes] = await Promise.all([
      supabase.from('states').select('slug, updated_at'),
      supabase.from('business_types').select('slug'),
      supabase.from('license_pages').select('slug, updated_at, states(slug), business_types(slug)').eq('status', 'published'),
    ])

    const staticRoutes: MetadataRoute.Sitemap = [
      { url: BASE, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
      { url: `${BASE}/licenses/type`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    ]

    const stateRoutes: MetadataRoute.Sitemap = (statesRes.data || []).map(s => ({
      url: `${BASE}/licenses/${s.slug}`,
      lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }))

    const typeRoutes: MetadataRoute.Sitemap = (typesRes.data || []).map(t => ({
      url: `${BASE}/licenses/type/${t.slug}`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }))

    const detailRoutes: MetadataRoute.Sitemap = (pagesRes.data || []).map(p => {
      const stateSlug = (p.states as unknown as { slug: string } | null)?.slug || ''
      const typeSlug = (p.business_types as unknown as { slug: string } | null)?.slug || ''
      return {
        url: `${BASE}/licenses/${stateSlug}/${typeSlug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        priority: 0.8,
        changeFrequency: 'monthly' as const,
      }
    })

    return [...staticRoutes, ...stateRoutes, ...typeRoutes, ...detailRoutes]
  } catch {
    return [{ url: BASE, lastModified: new Date(), priority: 1.0 }]
  }
}
