import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gem, Plus } from "lucide-react"
import { GemsList } from "@/components/gems-list"
import { SearchAndFilter } from "@/components/search-and-filter"

interface GemsPageProps {
  searchParams: {
    search?: string
    category?: string
    rarity?: string
  }
}

export default function GemsPage({ searchParams }: GemsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Gem className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GemVault
              </span>
            </Link>
            <Link href="/gems/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Gem
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Gem Collection</h1>
          <p className="text-gray-600">Discover and manage your precious gemstone collection</p>
        </div>

        <Suspense fallback={<div>Loading filters...</div>}>
          <SearchAndFilter />
        </Suspense>

        <Suspense fallback={<div>Loading gems...</div>}>
          <GemsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
