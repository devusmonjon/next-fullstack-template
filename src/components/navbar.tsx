"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasBackground, setHasBackground] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < lastScrollY) {
      setIsVisible(true)
    } else if (latest > 100 && latest > lastScrollY) {
      setIsVisible(false)
    }
    setLastScrollY(latest)
    setHasBackground(latest > 50)
  })

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const navbarBackground = isMobileMenuOpen ? "rgba(15, 15, 45, 0.8)" : hasBackground ? "rgba(15, 15, 45, 0.8)" : "rgba(15, 15, 45, 0)"
  const navbarBackdropFilter = isMobileMenuOpen ? "blur(10px)" : hasBackground ? "blur(10px)" : "blur(0)"

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: 0, backgroundColor: navbarBackground, backdropFilter: navbarBackdropFilter }}
      animate={{
        y: isVisible ? 0 : "-100%",
        backgroundColor: navbarBackground,
        backdropFilter: navbarBackdropFilter,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-purple-600 font-bold text-2xl">Streamvid</div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm hover:text-purple-400 duration-300">
                Home
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400 duration-300">
                Features
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400 duration-300">
                Pages
              </Link>
              <Link href="#" className="text-sm hover:text-purple-400 duration-300">
                Blog
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      placeholder="Search..."
                      className="w-full border-b border-purple-500 text-white placeholder-purple-300 focus:outline-none placeholder:text-purple-300 bg-[rgba(15,_15,_45,_0.8)]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                
                size="icon"
                onClick={toggleSearch}
                className="hover:text-purple-400 bg-purple-500 aspect-square h-full text-white"
              >
                {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
            <Button
              
              size="icon"
              className="hidden md:flex hover:text-purple-400 bg-purple-500 aspect-square h-full text-white"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button  size="sm" className="hidden md:flex hover:text-purple-400 bg-purple-500 aspect-square h-full text-white">
              EN</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 hidden md:flex">Login</Button>
            <Button
              
              size="icon"
              className="md:hidden hover:text-purple-400 bg-purple-500 aspect-square h-full text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
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
              <div className="relative w-full flex items-center">
                <Input
                  placeholder="Search..."
                  className="w-full bg-transparent border-b border-purple-500 text-white placeholder-purple-300 focus:outline-none pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-purple-500 hover:text-purple-400 hover:bg-purple-500/20"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/20"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-purple-500 hover:text-purple-400">
                  EN
                </Button>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">Login</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

