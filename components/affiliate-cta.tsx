import Link from 'next/link'

type CTAContext = 
  | 'license_required_llc'
  | 'license_required_sole_prop'
  | 'license_not_required'
  | 'bond_required'
  | 'state_hub'
  | 'default'

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
    description: 'Form your LLC — $0 + state fees',
    badge: 'Most Popular',
    url: '/out/zenbusiness',
    color: '#3B82F6',
  },
  northwest: {
    name: 'Northwest Registered Agent',
    description: 'Registered agent + LLC formation from $39/year',
    badge: 'Best Value',
    url: '/out/northwest',
    color: '#8B5CF6',
  },
  legalzoom: {
    name: 'LegalZoom',
    description: 'Trusted by 4M+ businesses — full legal services',
    badge: null,
    url: '/out/legalzoom',
    color: '#64748B',
  },
  rocketlawyer: {
    name: 'Rocket Lawyer',
    description: 'Legal documents + attorney access on demand',
    badge: null,
    url: '/out/rocketlawyer',
    color: '#64748B',
  },
  bonsai: {
    name: 'Bonsai',
    description: 'Contracts, invoicing, and taxes for freelancers',
    badge: null,
    url: '/out/bonsai',
    color: '#64748B',
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
  const resolvedContext = resolveContext({ context, licenseRequired, bondRequired })
  const [primary, secondary] = getCTAPair(resolvedContext)
  const primaryPartner = partners[primary]
  const secondaryPartner = partners[secondary]

  const utmSuffix = stateName && businessType
    ? `?utm_source=bizlicenseindex&utm_medium=affiliate&utm_campaign=${stateName.toLowerCase().replace(/\s+/g, '-')}-${businessType.toLowerCase().replace(/\s+/g, '-')}`
    : '?utm_source=bizlicenseindex&utm_medium=affiliate'

  return (
    <div style={{
      border: '1px solid #1E1E1E',
      borderRadius: 12,
      padding: 24,
      backgroundColor: '#111111',
      marginTop: 8,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Ready to get started?
      </div>

      {/* Primary CTA */}
      <div style={{ marginBottom: 12 }}>
        <Link
          href={`${primaryPartner.url}${utmSuffix}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            backgroundColor: '#3B82F6',
            borderRadius: 8,
            color: 'white',
            fontWeight: 500,
            fontSize: 14,
            transition: 'background-color 0.15s',
            textDecoration: 'none',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{primaryPartner.name}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{primaryPartner.description}</div>
          </div>
          {primaryPartner.badge && (
            <span style={{ fontSize: 11, backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
              {primaryPartner.badge}
            </span>
          )}
        </Link>
      </div>

      {/* Secondary CTA */}
      <Link
        href={`${secondaryPartner.url}${utmSuffix}`}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          border: '1px solid #2A2A2A',
          borderRadius: 8,
          color: '#F8FAFC',
          fontSize: 14,
          transition: 'border-color 0.15s',
          textDecoration: 'none',
        }}
      >
        <div>
          <div style={{ fontWeight: 500, marginBottom: 1 }}>{secondaryPartner.name}</div>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>{secondaryPartner.description}</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </Link>

      <p style={{ fontSize: 11, color: '#475569', marginTop: 12, marginBottom: 0 }}>
        Affiliate disclosure: we may earn a commission if you purchase through these links, at no extra cost to you.
      </p>
    </div>
  )
}
