import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Gem } from "lucide-react"
import { getGemById } from "@/lib/actions"
import { DeleteGemButton } from "@/components/delete-gem-button"

// Required for static export - return empty array during build
export async function generateStaticParams() {
  // During build time with static export, we return empty array
  // The routes will work via client-side navigation
  return []
}

interface GemDetailPageProps {
  params: {
    id: string
  }
}

export default async function GemDetailPage({ params }: GemDetailPageProps) {
  const gem = await getGemById(Number.parseInt(params.id))

  if (!gem) {
    notFound()
  }

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
            <Link href="/gems">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Collection
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={gem.image_url || "/placeholder.svg?height=500&width=500"}
                  alt={gem.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{gem.name}</h1>
                    <div className="flex gap-2 mb-4">
                      {gem.category && <Badge variant="secondary">{gem.category}</Badge>}
                      {gem.rarity && <Badge variant="outline">{gem.rarity}</Badge>}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-green-600 mb-4">${gem.price.toLocaleString()}</p>
                  {gem.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{gem.description}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{gem.category || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rarity</p>
                    <p className="font-medium">{gem.rarity || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Added</p>
                    <p className="font-medium">{new Date(gem.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Updated</p>
                    <p className="font-medium">{new Date(gem.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/gems/${gem.id}/edit`}>
                    <Button className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Gem
                    </Button>
                  </Link>
                  <DeleteGemButton gemId={gem.id} gemName={gem.name} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
