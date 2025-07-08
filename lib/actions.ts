"use server"

import { sql } from "./db"
import type { CreateGemData, UpdateGemData, Gem } from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getGems(search?: string, category?: string, rarity?: string): Promise<Gem[]> {
  try {
    if (search && category && category !== "all" && rarity && rarity !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE (name ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`}) 
        AND category = ${category} 
        AND rarity = ${rarity}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (search && category && category !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE (name ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`}) 
        AND category = ${category}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (search && rarity && rarity !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE (name ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`}) 
        AND rarity = ${rarity}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (category && category !== "all" && rarity && rarity !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE category = ${category} 
        AND rarity = ${rarity}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (search) {
      const result = await sql`
        SELECT * FROM gems 
        WHERE name ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (category && category !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE category = ${category}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else if (rarity && rarity !== "all") {
      const result = await sql`
        SELECT * FROM gems 
        WHERE rarity = ${rarity}
        ORDER BY created_at DESC
      `
      return result as Gem[]
    } else {
      const result = await sql`
        SELECT * FROM gems 
        ORDER BY created_at DESC
      `
      return result as Gem[]
    }
  } catch (error) {
    console.error("Error fetching gems:", error)
    return []
  }
}

export async function getGemById(id: number): Promise<Gem | null> {
  try {
    const result = await sql`SELECT * FROM gems WHERE id = ${id}`
    return (result[0] as Gem) || null
  } catch (error) {
    console.error("Error fetching gem:", error)
    return null
  }
}

export async function createGem(data: CreateGemData) {
  try {
    await sql`
      INSERT INTO gems (name, description, image_url, price, category, rarity) 
      VALUES (${data.name}, ${data.description || null}, ${data.image_url || null}, ${data.price}, ${data.category || null}, ${data.rarity || null})
    `
    revalidatePath("/gems")
    redirect("/gems")
  } catch (error) {
    console.error("Error creating gem:", error)
    throw new Error("Failed to create gem")
  }
}

export async function updateGem(data: UpdateGemData) {
  try {
    await sql`
      UPDATE gems 
      SET name = ${data.name}, description = ${data.description || null}, image_url = ${data.image_url || null}, 
          price = ${data.price}, category = ${data.category || null}, rarity = ${data.rarity || null}, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${data.id}
    `
    revalidatePath("/gems")
    revalidatePath(`/gems/${data.id}`)
    redirect("/gems")
  } catch (error) {
    console.error("Error updating gem:", error)
    throw new Error("Failed to update gem")
  }
}

export async function deleteGem(id: number) {
  try {
    await sql`DELETE FROM gems WHERE id = ${id}`
    revalidatePath("/gems")
    redirect("/gems")
  } catch (error) {
    console.error("Error deleting gem:", error)
    throw new Error("Failed to delete gem")
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const result = await sql`SELECT DISTINCT category FROM gems WHERE category IS NOT NULL ORDER BY category`
    return result.map((row: any) => row.category)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getRarities(): Promise<string[]> {
  try {
    const result = await sql`SELECT DISTINCT rarity FROM gems WHERE rarity IS NOT NULL ORDER BY rarity`
    return result.map((row: any) => row.rarity)
  } catch (error) {
    console.error("Error fetching rarities:", error)
    return []
  }
}
