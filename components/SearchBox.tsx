'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="relative">
      {/* Search button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <Search className="w-5 h-5" />
        <span className="hidden md:inline">Buscar</span>
      </button>

      {/* Search overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 right-0 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container py-4">
              <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar notícias, tópicos, categorias..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
              
              {/* Quick search suggestions */}
              <div className="mt-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {['Tecnologia', 'Política', 'Esportes', 'Economia', 'Saúde'].map((topic) => (
                    <Link
                      key={topic}
                      href={`/search?q=${encodeURIComponent(topic)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}