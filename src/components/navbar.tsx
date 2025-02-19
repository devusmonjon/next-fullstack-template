import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Globe } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-purple-600 font-bold text-2xl">Streamvid</div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm hover:text-purple-400">
                Home
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400">
                Features
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400">
                Pages
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400">
                Blog
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Find movies, TV shows and more" className="pl-8 bg-gray-900/50" />
            </div>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              EN
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

