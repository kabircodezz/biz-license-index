'use client'
import { useState } from 'react'
import Link from 'next/link'

const states = [
  {name:'Alabama',slug:'alabama',abbr:'AL'},{name:'Alaska',slug:'alaska',abbr:'AK'},
  {name:'Arizona',slug:'arizona',abbr:'AZ'},{name:'Arkansas',slug:'arkansas',abbr:'AR'},
  {name:'California',slug:'california',abbr:'CA'},{name:'Colorado',slug:'colorado',abbr:'CO'},
  {name:'Connecticut',slug:'connecticut',abbr:'CT'},{name:'Delaware',slug:'delaware',abbr:'DE'},
  {name:'Florida',slug:'florida',abbr:'FL'},{name:'Georgia',slug:'georgia',abbr:'GA'},
  {name:'Hawaii',slug:'hawaii',abbr:'HI'},{name:'Idaho',slug:'idaho',abbr:'ID'},
  {name:'Illinois',slug:'illinois',abbr:'IL'},{name:'Indiana',slug:'indiana',abbr:'IN'},
  {name:'Iowa',slug:'iowa',abbr:'IA'},{name:'Kansas',slug:'kansas',abbr:'KS'},
  {name:'Kentucky',slug:'kentucky',abbr:'KY'},{name:'Louisiana',slug:'louisiana',abbr:'LA'},
  {name:'Maine',slug:'maine',abbr:'ME'},{name:'Maryland',slug:'maryland',abbr:'MD'},
  {name:'Massachusetts',slug:'massachusetts',abbr:'MA'},{name:'Michigan',slug:'michigan',abbr:'MI'},
  {name:'Minnesota',slug:'minnesota',abbr:'MN'},{name:'Mississippi',slug:'mississippi',abbr:'MS'},
  {name:'Missouri',slug:'missouri',abbr:'MO'},{name:'Montana',slug:'montana',abbr:'MT'},
  {name:'Nebraska',slug:'nebraska',abbr:'NE'},{name:'Nevada',slug:'nevada',abbr:'NV'},
  {name:'New Hampshire',slug:'new-hampshire',abbr:'NH'},{name:'New Jersey',slug:'new-jersey',abbr:'NJ'},
  {name:'New Mexico',slug:'new-mexico',abbr:'NM'},{name:'New York',slug:'new-york',abbr:'NY'},
  {name:'North Carolina',slug:'north-carolina',abbr:'NC'},{name:'North Dakota',slug:'north-dakota',abbr:'ND'},
  {name:'Ohio',slug:'ohio',abbr:'OH'},{name:'Oklahoma',slug:'oklahoma',abbr:'OK'},
  {name:'Oregon',slug:'oregon',abbr:'OR'},{name:'Pennsylvania',slug:'pennsylvania',abbr:'PA'},
  {name:'Rhode Island',slug:'rhode-island',abbr:'RI'},{name:'South Carolina',slug:'south-carolina',abbr:'SC'},
  {name:'South Dakota',slug:'south-dakota',abbr:'SD'},{name:'Tennessee',slug:'tennessee',abbr:'TN'},
  {name:'Texas',slug:'texas',abbr:'TX'},{name:'Utah',slug:'utah',abbr:'UT'},
  {name:'Vermont',slug:'vermont',abbr:'VT'},{name:'Virginia',slug:'virginia',abbr:'VA'},
  {name:'Washington',slug:'washington',abbr:'WA'},{name:'West Virginia',slug:'west-virginia',abbr:'WV'},
  {name:'Wisconsin',slug:'wisconsin',abbr:'WI'},{name:'Wyoming',slug:'wyoming',abbr:'WY'},
]

const featuredTypes = [
  {name:'General Contractor',slug:'general-contractor'},
  {name:'Real Estate Agent',slug:'real-estate-agent'},
  {name:'Notary Public',slug:'notary-public'},
  {name:'Electrician',slug:'electrician'},
  {name:'Restaurant Owner',slug:'restaurant'},
  {name:'Insurance Agent',slug:'insurance-agent'},
]

export default function HomePage() {
  const [search, setSearch] = useState('')
  const filtered = states.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.abbr.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#1B2E4B', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, color: '#60A5FA', backgroundColor: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
            Free · No signup · All 50 states
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 16px' }}>
            Business License Requirements<br />by State
          </h1>
          <p style={{ fontSize: 17, color: '#93B4D4', margin: '0 0 36px', lineHeight: 1.6 }}>
            Find the exact licenses, permits, fees, and steps to legally operate your business in any US state. Data sourced from official state government portals.
          </p>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' as const }}>
            <svg style={{ position: 'absolute' as const, left: 14, top: '50%', transform: 'translateY(-50%)', color: '#93B4D4' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by state name or abbreviation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '13px 16px 13px 44px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1E293B', fontSize: 15, outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '14px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' as const }}>
          {[
            'Data from official state .gov portals',
            'Regularly verified and updated',
            'Free — no account required',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              {t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Popular types */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Popular business types</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {featuredTypes.map(t => (
              <Link key={t.slug} href={`/licenses/type/${t.slug}`}
                style={{ padding: '9px 18px', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#FFFFFF', fontSize: 14, color: '#1E293B', textDecoration: 'none', fontWeight: 500 }}>
                {t.name}
              </Link>
            ))}
            <Link href="/licenses/type"
              style={{ padding: '9px 18px', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#FFFFFF', fontSize: 14, color: '#185FA5', textDecoration: 'none' }}>
              View all types →
            </Link>
          </div>
        </div>

        {/* State grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1E293B', margin: 0 }}>Browse by state</h2>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>{filtered.length} states</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 8 }}>
            {filtered.map(state => (
              <Link key={state.slug} href={`/licenses/${state.slug}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#FFFFFF', textDecoration: 'none' }}>
                <span style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>{state.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', backgroundColor: '#F1F5F9', padding: '2px 7px', borderRadius: 4 }}>{state.abbr}</span>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94A3B8' }}>
              No states found matching &quot;{search}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
