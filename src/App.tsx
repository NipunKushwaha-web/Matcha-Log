import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './index.css'

interface MatchaTin {
  id: string
  name: string
  rating: number
  createdAt: number
}

type SortField = 'name' | 'rating' | 'createdAt'
type SortDirection = 'asc' | 'desc'

const STORAGE_KEY = 'matcha-log-data'

function App() {
  const [tins, setTins] = useState<MatchaTin[]>([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(3)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const listRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setTins(parsed)
      } catch {
        setTins([])
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tins))
  }, [tins])

  const sortedTins = useCallback(() => {
    const sorted = [...tins].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortField === 'rating') {
        return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating
      }
      return b.createdAt - a.createdAt
    })
    return sorted
  }, [tins, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const animateAdd = (element: HTMLElement) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    )
  }

  const animateRemove = (element: HTMLElement, onComplete: () => void) => {
    gsap.to(element, {
      opacity: 0,
      x: -30,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newTin: MatchaTin = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rating: Math.max(1, Math.min(5, rating)),
      createdAt: Date.now()
    }

    setTins(prev => [...prev, newTin])
    setName('')
    setRating(3)

    // Pulse animation on form
    if (formRef.current) {
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    // Animate the new item after render
    setTimeout(() => {
      const items = listRef.current?.querySelectorAll('.matcha-item')
      const lastItem = items?.[items.length - 1] as HTMLElement
      if (lastItem) animateAdd(lastItem)
    }, 0)
  }

  const handleDelete = (id: string) => {
    const element = document.getElementById(`tin-${id}`) as HTMLElement
    if (element) {
      animateRemove(element, () => {
        setTins(prev => prev.filter(t => t.id !== id))
      })
    } else {
      setTins(prev => prev.filter(t => t.id !== id))
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-matcha-bg p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl text-matcha-secondary mb-2">Matcha Log</h1>
          <p className="text-matcha-muted">Track your favorite matcha tins</p>
        </header>

        {/* Add Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-matcha-primary/10"
        >
          <div className="grid md:grid-cols-[1fr_auto_auto] gap-4">
            <div className="text-left">
              <label htmlFor="name" className="block text-sm font-medium text-matcha-muted mb-1">
                Matcha Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ceremonial Grade Uji"
                className="w-full px-4 py-3 rounded-lg border border-matcha-muted/30 focus:border-matcha-primary focus:outline-none focus:ring-2 focus:ring-matcha-primary/20 transition-colors bg-matcha-bg/50"
                required
              />
            </div>
            <div className="text-left">
              <label htmlFor="rating" className="block text-sm font-medium text-matcha-muted mb-1">
                Rating
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  step={0.5}
                  value={rating}
                  onChange={e => setRating(parseFloat(e.target.value) || 3)}
                  className="w-20 px-3 py-3 rounded-lg border border-matcha-muted/30 focus:border-matcha-primary focus:outline-none focus:ring-2 focus:ring-matcha-primary/20 transition-colors bg-matcha-bg/50 text-center"
                />
                <span className="text-matcha-muted">/ 5</span>
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-3 bg-matcha-primary hover:bg-matcha-secondary text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md active:scale-95"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {/* List */}
        <div ref={listRef} className="space-y-3">
          {sortedTins().length === 0 ? (
            <div className="text-center py-16 text-matcha-muted">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-lg">No matcha tins yet</p>
              <p className="text-sm mt-1">Add your first matcha above</p>
            </div>
          ) : (
            <>
              {/* Sort Headers */}
              <div className="flex items-center gap-4 text-sm font-medium text-matcha-muted px-4 py-2">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-matcha-primary transition-colors"
                >
                  Name <SortIcon field="name" />
                </button>
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center gap-1 hover:text-matcha-primary transition-colors"
                >
                  Rating <SortIcon field="rating" />
                </button>
                <div className="ml-auto">Delete</div>
              </div>

              {/* Items */}
              {sortedTins().map(tin => (
                <div
                  key={tin.id}
                  id={`tin-${tin.id}`}
                  className="matcha-item flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-matcha-primary/10 hover:shadow-md hover:-translate-y-0.5 transition-shadow"
                >
                  <div className="flex-1 text-left">
                    <span className="font-medium text-matcha-text">{tin.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(tin.rating) ? 'text-matcha-accent' : 'text-matcha-muted/30'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-matcha-muted">{tin.rating.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(tin.id)}
                    className="p-2 text-matcha-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-matcha-muted">
          <p>{tins.length} matcha tin{tins.length !== 1 ? 's' : ''} in your collection</p>
          <a
            href="https://instagram.com/thakurxnipun"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link mt-4 inline-block text-matcha-primary hover:text-matcha-secondary transition-colors"
          >
            Build by @thakurxnipun
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App
