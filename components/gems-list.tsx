import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGems } from "@/lib/actions"

interface GemsListProps {
  searchParams: {
    search?: string
    category?: string
    rarity?: string
  }
}

export async function GemsList({ searchParams }: GemsListProps) {
  const gems = await getGems(searchParams.search, searchParams.category, searchParams.rarity)

  if (gems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No gems found</h3>
        <p className="text-gray-500 mb-4">
          {searchParams.search || searchParams.category || searchParams.rarity
            ? "Try adjusting your search criteria"
            : "Get started by adding your first gem to the collection"}
        </p>
        <Link href="/gems/new">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
            Add Your First Gem
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gems.map((gem) => (
        <Link key={gem.id} href={`/gems/${gem.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={gem.image_url || "/placeholder.svg?height=300&width=300"}
                alt={gem.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1">{gem.name}</CardTitle>
              </div>
              <div className="flex gap-1 flex-wrap">
                {gem.category && (
                  <Badge variant="secondary" className="text-xs">
                    {gem.category}
                  </Badge>
                )}
                {gem.rarity && (
                  <Badge variant="outline" className="text-xs">
                    {gem.rarity}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-green-600 mb-2">${gem.price.toLocaleString()}</p>
              {gem.description && <CardDescription className="line-clamp-2">{gem.description}</CardDescription>}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
