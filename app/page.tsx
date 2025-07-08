import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gem, Search, Shield, Zap, Star, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gem className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GemVault
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/gems">
                <Button variant="ghost">Browse Gems</Button>
              </Link>
              <Link href="/gems/new">
                <Button>Add Gem</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              ✨ Premium Gem Management System
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Discover & Manage Your Precious Gems
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The ultimate platform for gem collectors, dealers, and enthusiasts. Organize, showcase, and discover the
              world's most beautiful gemstones with our comprehensive management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gems">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Gem className="mr-2 h-5 w-5" />
                  Explore Collection
                </Button>
              </Link>
              <Link href="/gems/new">
                <Button size="lg" variant="outline">
                  Add Your Gems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose GemVault?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to manage your gem collection professionally and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>
                  Find gems instantly with powerful search and filtering capabilities by name, category, rarity, and
                  price range.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Secure Storage</CardTitle>
                <CardDescription>
                  Your gem data is safely stored with enterprise-grade security and automatic backups for peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Built with modern technology for blazing-fast performance and seamless user experience across all
                  devices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Quality Tracking</CardTitle>
                <CardDescription>
                  Track gem quality, rarity, and authenticity with detailed descriptions and high-resolution images.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Join a community of gem enthusiasts and professionals sharing knowledge and discoveries.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>
                  Stay updated with market trends and pricing information to make informed decisions about your
                  collection.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Gem Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of gem enthusiasts who trust GemVault to manage their precious collections. Start
              organizing your gems today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gems">
                <Button size="lg" variant="secondary">
                  Browse Collection
                </Button>
              </Link>
              <Link href="/gems/new">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  Add Your First Gem
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Gem className="h-6 w-6" />
              <span className="text-xl font-bold">GemVault</span>
            </div>
            <p className="text-gray-400">© 2024 GemVault. Crafted with passion for gem enthusiasts worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
