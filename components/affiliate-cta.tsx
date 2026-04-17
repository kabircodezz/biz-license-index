import Link from 'next/link'

type CTAContext = 'license_required_llc' | 'license_required_sole_prop' | 'license_not_required' | 'bond_required' | 'state_hub' | 'default'

interface AffiliateCTAProps {
  context?: CTAContext
  stateName?: string
  businessType?: string
  licenseRequired?: boolean | null
  bondRequired?: boolean | null
}

const partners = {
  zenbusiness: {
    name: 'ZenBusiness',
    tagline: 'Form your LLC — $0 + state fees',
    badge: 'Most popular',
    url: '/out/zenbusiness',
    bg: '#185FA5',
    color: '#FFFFFF',
  },
  northwest: {
    name: 'Northwest Registered Agent',
    tagline: 'Registered agent + formation from $39/year',
    badge: null,
    url: '/out/northwest',
    bg: '#FFFFFF',
    color: '#1E293B',
  },
  legalzoom: {
    name: 'LegalZoom',
    tagline: 'Trusted by 4M+ businesses',
    badge: null,
    url: '/out/legalzoom',
    bg: '#FFFFFF',
    color: '#1E293B',
  },
  rocketlawyer: {
    name: 'Rocket Lawyer',
    tagline: 'Legal documents + attorney access',
    badge: null,
    url: '/out/rocketlawyer',
    bg: '#FFFFFF',
    color: '#1E293B',
  },
  bonsai: {
    name: 'Bonsai',
    tagline: 'Contracts and invoicing for freelancers',
    badge: null,
    url: '/out/bonsai',
    bg: '#FFFFFF',
    color: '#1E293B',
  },
}

function getCTAPair(context: CTAContext): [keyof typeof partners, keyof typeof partners] {
  switch (context) {
    case 'license_required_llc':     return ['zenbusiness', 'northwest']
    case 'license_required_sole_prop': return ['legalzoom', 'bonsai']
    case 'license_not_required':     return ['zenbusiness', 'rocketlawyer']
    case 'bond_required':            return ['northwest', 'legalzoom']
    case 'state_hub':                return ['zenbusiness', 'northwest']
    default:                         return ['zenbusiness', 'northwest']
  }
}

function resolveContext(props: AffiliateCTAProps): CTAContext {
  if (props.context) return props.context
  if (props.bondRequired) return 'bond_required'
  if (props.licenseRequired === false) return 'license_not_required'
  if (props.licenseRequired === true) return 'license_required_llc'
  return 'default'
}

export function AffiliateCTA({ context, stateName, businessType, licenseRequired, bondRequired }: AffiliateCTAProps) {
  const ctx = resolveContext({ context, licenseRequired, bondRequired })
  const [primary, secondary] = getCTAPair(ctx)
  const p = partners[primary]
  const s = partners[secondary]

  const utm = stateName && businessType
    ? `?utm_source=bizlicenseindex&utm_medium=affiliate&utm_campaign=${stateName.toLowerCase().replace(/\s+/g, '-')}-${businessType.toLowerCase().replace(/\s+/g, '-')}`
    : '?utm_source=bizlicenseindex&utm_medium=affiliate'

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF', marginTop: 8 }}>
      <div style={{ padding: '12px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Ready to get started?
        </div>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href={`${p.url}${utm}`} target="_blank" rel="noopener noreferrer sponsored"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#185FA5', borderRadius: 8, textDecoration: 'none' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#FFFFFF', marginBottom: 2 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: '#B3CFEF' }}>{p.tagline}</div>
          </div>
          {p.badge && (
            <span style={{ fontSize: 11, backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
              {p.badge}
            </span>
          )}
        </Link>
        <Link href={`${s.url}${utm}`} target="_blank" rel="noopener noreferrer sponsored"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', border: '1px solid #E2E8F0', borderRadius: 8, textDecoration: 'none', backgroundColor: '#FFFFFF' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 14, color: '#1E293B', marginBottom: 1 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{s.tagline}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </Link>
      </div>
      <div style={{ padding: '10px 20px', borderTop: '1px solid #F1F5F9', fontSize: 11, color: '#94A3B8' }}>
        Affiliate disclosure: we may earn a commission if you purchase through these links, at no extra cost to you.
      </div>
    </div>
  )
}
