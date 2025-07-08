import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gem, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Gem className="h-24 w-24 text-purple-600 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gem Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The gem you're looking for seems to have vanished from our collection. It might have been moved or doesn't
            exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/gems">
            <Button variant="outline">
              <Gem className="mr-2 h-4 w-4" />
              Browse Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
