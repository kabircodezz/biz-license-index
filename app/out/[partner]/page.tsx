import { redirect } from 'next/navigation'

const affiliateUrls: Record<string, string> = {
  zenbusiness: 'https://www.zenbusiness.com/?utm_source=bizlicenseindex&utm_medium=affiliate',
  northwest: 'https://www.northwestregisteredagent.com/?utm_source=bizlicenseindex&utm_medium=affiliate',
  legalzoom: 'https://www.legalzoom.com/?utm_source=bizlicenseindex&utm_medium=affiliate',
  rocketlawyer: 'https://www.rocketlawyer.com/?utm_source=bizlicenseindex&utm_medium=affiliate',
  bonsai: 'https://www.hellobonsai.com/?utm_source=bizlicenseindex&utm_medium=affiliate',
}

interface PageProps {
  params: Promise<{ partner: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function AffiliateRedirectPage({ params, searchParams }: PageProps) {
  const { partner } = await params
  const query = await searchParams

  const baseUrl = affiliateUrls[partner]
  if (!baseUrl) redirect('/')

  const campaign = query.utm_campaign ? `&utm_campaign=${query.utm_campaign}` : ''
  redirect(`${baseUrl}${campaign}`)
}
