"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { getCategories, getRarities } from "@/lib/actions"

export function SearchAndFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [rarity, setRarity] = useState(searchParams.get("rarity") || "all")
  const [categories, setCategories] = useState<string[]>([])
  const [rarities, setRarities] = useState<string[]>([])

  useEffect(() => {
    async function loadFilters() {
      const [categoriesData, raritiesData] = await Promise.all([getCategories(), getRarities()])
      setCategories(categoriesData)
      setRarities(raritiesData)
    }
    loadFilters()
  }, [])

  const updateURL = (newSearch: string, newCategory: string, newRarity: string) => {
    const params = new URLSearchParams()
    if (newSearch) params.set("search", newSearch)
    if (newCategory && newCategory !== "all") params.set("category", newCategory)
    if (newRarity && newRarity !== "all") params.set("rarity", newRarity)

    const queryString = params.toString()
    router.push(`/gems${queryString ? `?${queryString}` : ""}`)
  }

  const handleSearch = () => {
    updateURL(search, category, rarity)
  }

  const handleClear = () => {
    setSearch("")
    setCategory("all")
    setRarity("all")
    router.push("/gems")
  }

  const hasActiveFilters = search || category !== "all" || rarity !== "all"

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search gems by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={rarity} onValueChange={setRarity}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            {rarities.map((rar) => (
              <SelectItem key={rar} value={rar}>
                {rar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {search && <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Search: "{search}"</span>}
          {category !== "all" && (
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Category: {category}</span>
          )}
          {rarity !== "all" && (
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Rarity: {rarity}</span>
          )}
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X className="mr-1 h-3 w-3" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
