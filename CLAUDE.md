# BizLicenseGuide — CLAUDE.md

## Project Overview
Business License & Permit Requirements Index. Programmatic SEO site. All data in Supabase. Pages are ISR (7-day revalidation).

## Tech Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase · Vercel

## Design System
- Background: #0A0A0A | Surface: #111111 | Elevated: #1A1A1A
- Border: #1E1E1E | Border subtle: #2A2A2A | Accent: #3B82F6
- Text primary: #F8FAFC | Secondary: #94A3B8 | Muted: #64748B
- Radius: 8px standard, 10-12px cards | Font: system-ui/Geist/Inter

## Key Rules
- Inline styles throughout (portability)
- ISR revalidate: 604800 on all data pages
- Supabase client: lib/supabase.ts (service role key, server-side only)
- Affiliate links: /out/[partner] redirect handler
- UTM: ?utm_source=bizlicenseindex&utm_medium=affiliate&utm_campaign=[state]-[type]
- 404 for unpublished license_pages (status != 'published')

## Database: states | business_types | license_pages

## Affiliate Partners
zenbusiness | northwest | legalzoom | rocketlawyer | bonsai

## Employee Ownership
#16 = code changes | #9 = data population/refresh | #4 = performance monitoring
