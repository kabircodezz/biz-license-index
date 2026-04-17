'use client'
import { useState } from 'react'
import Link from 'next/link'

const states = [
  { name: 'Alabama', slug: 'alabama', abbr: 'AL' },{ name: 'Alaska', slug: 'alaska', abbr: 'AK' },
  { name: 'Arizona', slug: 'arizona', abbr: 'AZ' },{ name: 'Arkansas', slug: 'arkansas', abbr: 'AR' },
  { name: 'California', slug: 'california', abbr: 'CA' },{ name: 'Colorado', slug: 'colorado', abbr: 'CO' },
  { name: 'Connecticut', slug: 'connecticut', abbr: 'CT' },{ name: 'Delaware', slug: 'delaware', abbr: 'DE' },
  { name: 'Florida', slug: 'florida', abbr: 'FL' },{ name: 'Georgia', slug: 'georgia', abbr: 'GA' },
  { name: 'Hawaii', slug: 'hawaii', abbr: 'HI' },{ name: 'Idaho', slug: 'idaho', abbr: 'ID' },
  { name: 'Illinois', slug: 'illinois', abbr: 'IL' },{ name: 'Indiana', slug: 'indiana', abbr: 'IN' },
  { name: 'Iowa', slug: 'iowa', abbr: 'IA' },{ name: 'Kansas', slug: 'kansas', abbr: 'KS' },
  { name: 'Kentucky', slug: 'kentucky', abbr: 'KY' },{ name: 'Louisiana', slug: 'louisiana', abbr: 'LA' },
  { name: 'Maine', slug: 'maine', abbr: 'ME' },{ name: 'Maryland', slug: 'maryland', abbr: 'MD' },
  { name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA' },{ name: 'Michigan', slug: 'michigan', abbr: 'MI' },
  { name: 'Minnesota', slug: 'minnesota', abbr: 'MN' },{ name: 'Mississippi', slug: 'mississippi', abbr: 'MS' },
  { name: 'Missouri', slug: 'missouri', abbr: 'MO' },{ name: 'Montana', slug: 'montana', abbr: 'MT' },
  { name: 'Nebraska', slug: 'nebraska', abbr: 'NE' },{ name: 'Nevada', slug: 'nevada', abbr: 'NV' },
  { name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH' },{ name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ' },
  { name: 'New Mexico', slug: 'new-mexico', abbr: 'NM' },{ name: 'New York', slug: 'new-york', abbr: 'NY' },
  { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC' },{ name: 'North Dakota', slug: 'north-dakota', abbr: 'ND' },
  { name: 'Ohio', slug: 'ohio', abbr: 'OH' },{ name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK' },
  { name: 'Oregon', slug: 'oregon', abbr: 'OR' },{ name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI' },{ name: 'South Carolina', slug: 'south-carolina', abbr: 'SC' },
  { name: 'South Dakota', slug: 'south-dakota', abbr: 'SD' },{ name: 'Tennessee', slug: 'tennessee', abbr: 'TN' },
  { name: 'Texas', slug: 'texas', abbr: 'TX' },{ name: 'Utah', slug: 'utah', abbr: 'UT' },
  { name: 'Vermont', slug: 'vermont', abbr: 'VT' },{ name: 'Virginia', slug: 'virginia', abbr: 'VA' },
  { name: 'Washington', slug: 'washington', abbr: 'WA' },{ name: 'West Virginia', slug: 'west-virginia', abbr: 'WV' },
  { name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI' },{ name: 'Wyoming', slug: 'wyoming', abbr: 'WY' },
]
const featuredTypes = [
  { name: 'General Contractor', slug: 'general-contractor', icon: '🔨' },
  { name: 'Real Estate Agent', slug: 'real-estate-agent', icon: '🏠' },
  { name: 'Notary Public', slug: 'notary-public', icon: '📋' },
  { name: 'Electrician', slug: 'electrician', icon: '⚡' },
  { name: 'Restaurant Owner', slug: 'restaurant', icon: '🍽️' },
  { name: 'Insurance Agent', slug: 'insurance-agent', icon: '🛡️' },
]
export default function HomePage() {
  const [search, setSearch] = useState('')
  const filtered = states.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#3B82F6', textTransform: 'uppercase' as const, letterSpacing: '0.1em', border: '1px solid #1E3A5F', borderRadius: 20, padding: '4px 12px', marginBottom: 20 }}>All 50 States · 50 Business Types · Free</div>
        <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 20px' }}>Business License Requirements<br /><span style={{ color: '#3B82F6' }}>for Every State</span></h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>Find the exact license requirements, fees, and steps to legally operate your business in any US state. Data sourced directly from state government portals.</p>
        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' as const }}>
          <input type="text" placeholder="Search states..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 16px 12px 44px', backgroundColor: '#111111', border: '1px solid #2A2A2A', borderRadius: 8, color: '#F8FAFC', fontSize: 15, outline: 'none', boxSizing: 'border-box' as const }} />
        </div>
      </div>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 16 }}>Popular business types</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
          {featuredTypes.map(type => (
            <Link key={type.slug} href={`/licenses/type/${type.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: '1px solid #1E1E1E', borderRadius: 8, backgroundColor: '#111111', fontSize: 13, color: '#94A3B8', textDecoration: 'none' }}>
              <span style={{ fontSize: 16 }}>{type.icon}</span>{type.name}
            </Link>
          ))}
          <Link href="/licenses/type" style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', border: '1px solid #1E1E1E', borderRadius: 8, fontSize: 13, color: '#64748B', textDecoration: 'none' }}>View all →</Link>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Browse by state</div>
          <div style={{ fontSize: 13, color: '#475569' }}>{filtered.length} states</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
          {filtered.map(state => (
            <Link key={state.slug} href={`/licenses/${state.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #1E1E1E', borderRadius: 8, backgroundColor: '#111111', textDecoration: 'none' }}>
              <span style={{ fontSize: 14, color: '#F8FAFC', fontWeight: 500 }}>{state.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', backgroundColor: '#1A1A1A', padding: '2px 6px', borderRadius: 4 }}>{state.abbr}</span>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '48px 0', color: '#475569' }}>No states found matching &quot;{search}&quot;</div>}
      </div>
    </div>
  )
}
