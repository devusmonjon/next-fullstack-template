import { Facebook, Twitter, Github } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0f0f2d] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-purple-600 font-bold text-2xl">Streamvid</div>
            <div className="text-sm text-gray-400">Connect with us</div>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Must Watch Movies</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                DJ Tillu
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                The Great Empire
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                Love Story
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                The Reckless
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                Zombie World
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Genres</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Romance
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Horror
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Drama
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Anime
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Action
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400">
                Sci-Fi
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                My Account
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                Customer Support
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                Contact Us
              </Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-purple-400">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-sm text-gray-400">Copyright © 2024 StreamVid. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

