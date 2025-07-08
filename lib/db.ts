import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// For build time, we'll use a noop function if it's a dummy URL
const isDummyUrl = process.env.DATABASE_URL.includes('dummy')
export const sql = isDummyUrl ? (() => Promise.resolve([])) as any : neon(process.env.DATABASE_URL)

export interface Gem {
  id: number
  name: string
  description: string | null
  image_url: string | null
  price: number
  category: string | null
  rarity: string | null
  created_at: Date
  updated_at: Date
}

export interface CreateGemData {
  name: string
  description?: string
  image_url?: string
  price: number
  category?: string
  rarity?: string
}

export interface UpdateGemData extends Partial<CreateGemData> {
  id: number
}
