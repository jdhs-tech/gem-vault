"use server"

import { sql } from "./db"
import type { CreateGemData, UpdateGemData, Gem } from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getGems(search?: string, category?: string, rarity?: string): Promise<Gem[]> {
  try {
    let query = "SELECT * FROM gems WHERE 1=1"
    const params: any[] = []
    let paramIndex = 1

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (category && category !== "all") {
      query += ` AND category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (rarity && rarity !== "all") {
      query += ` AND rarity = $${paramIndex}`
      params.push(rarity)
      paramIndex++
    }

    query += " ORDER BY created_at DESC"

    const result = await sql(query, params)
    return result as Gem[]
  } catch (error) {
    console.error("Error fetching gems:", error)
    return []
  }
}

export async function getGemById(id: number): Promise<Gem | null> {
  try {
    const result = await sql("SELECT * FROM gems WHERE id = $1", [id])
    return (result[0] as Gem) || null
  } catch (error) {
    console.error("Error fetching gem:", error)
    return null
  }
}

export async function createGem(data: CreateGemData) {
  try {
    await sql(
      "INSERT INTO gems (name, description, image_url, price, category, rarity) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        data.name,
        data.description || null,
        data.image_url || null,
        data.price,
        data.category || null,
        data.rarity || null,
      ],
    )
    revalidatePath("/gems")
    redirect("/gems")
  } catch (error) {
    console.error("Error creating gem:", error)
    throw new Error("Failed to create gem")
  }
}

export async function updateGem(data: UpdateGemData) {
  try {
    await sql(
      "UPDATE gems SET name = $1, description = $2, image_url = $3, price = $4, category = $5, rarity = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7",
      [
        data.name,
        data.description || null,
        data.image_url || null,
        data.price,
        data.category || null,
        data.rarity || null,
        data.id,
      ],
    )
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
    await sql("DELETE FROM gems WHERE id = $1", [id])
    revalidatePath("/gems")
    redirect("/gems")
  } catch (error) {
    console.error("Error deleting gem:", error)
    throw new Error("Failed to delete gem")
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const result = await sql("SELECT DISTINCT category FROM gems WHERE category IS NOT NULL ORDER BY category")
    return result.map((row: any) => row.category)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getRarities(): Promise<string[]> {
  try {
    const result = await sql("SELECT DISTINCT rarity FROM gems WHERE rarity IS NOT NULL ORDER BY rarity")
    return result.map((row: any) => row.rarity)
  } catch (error) {
    console.error("Error fetching rarities:", error)
    return []
  }
}
