"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex h-20 items-center justify-between px-6 md:px-8 lg:px-16">
        <a href="/" className="flex items-end gap-0.5 group">
          <img
            src="/images/design-mode/Kids%20Playing%20Sport%20Graphic%20Nov%209%202025%20%287%29%20%281%29.png"
            alt="Movo Logo"
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105 flex-shrink-0"
          />
          <span className="font-bold text-2xl text-gray-900 tracking-tight">Movo</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#product" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Product
          </a>
          <a href="#solution" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Solution
          </a>
          <a href="#success" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Success
          </a>
        </nav>

        <a
          href="https://calendly.com/ari-movoai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-sm px-8 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer w-full"
          >
            Book a demo
          </Button>
        </a>

        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            <a
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100"
            >
              Product
            </a>
            <a
              href="#solution"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100"
            >
              Solution
            </a>
            <a
              href="#success"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100"
            >
              Success
            </a>
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              Book a demo
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
