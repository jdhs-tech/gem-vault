import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gem } from "lucide-react"
import { getGemById } from "@/lib/actions"
import { GemForm } from "@/components/gem-form"

interface EditGemPageProps {
  params: {
    id: string
  }
}

export default async function EditGemPage({ params }: EditGemPageProps) {
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
            <Link href={`/gems/${gem.id}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gem
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Edit Gem</h1>
            <p className="text-gray-600">Update the details of {gem.name}</p>
          </div>

          <GemForm gem={gem} />
        </div>
      </div>
    </div>
  )
}
