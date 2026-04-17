import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

export type State = {
  id: string
  name: string
  slug: string
  abbreviation: string
  general_license_required: boolean | null
  general_license_url: string | null
  secretary_of_state_url: string | null
  updated_at: string
}

export type BusinessType = {
  id: string
  name: string
  slug: string
  category: string | null
  description: string | null
  federal_regulated: boolean
}

export type LicensePage = {
  id: string
  state_id: string
  business_type_id: string
  slug: string
  license_required: boolean | null
  licensing_body: string | null
  licensing_body_url: string | null
  requirements_summary: string | null
  requirements_list: string[] | null
  application_fee: string | null
  renewal_period: string | null
  renewal_fee: string | null
  exam_required: boolean | null
  exam_provider: string | null
  insurance_required: boolean | null
  bond_required: boolean | null
  bond_amount: string | null
  processing_time: string | null
  official_source_url: string | null
  meta_title: string | null
  meta_description: string | null
  schema_json: string | null
  faq_json: { q: string; a: string }[] | null
  status: string
  data_verified_at: string | null
  updated_at: string
  states?: State
  business_types?: BusinessType
}
