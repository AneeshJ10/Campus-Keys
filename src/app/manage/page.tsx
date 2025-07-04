'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Listing = {
  listing_id: number
  created_at: string
  title: string
  description: string
  price: number
  location: string
  start_date: string
  end_date: string
  image_url: string
  user_id: string
}

export default function ManagePostings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        setError('You must be logged in to view your listings.')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('Listing')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        setError(error.message)
      } else {
        setListings(data || [])
      }

      setLoading(false)
    }

    fetchListings()
  }, [])

  const handleDelete = async (listingId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?')
    if (!confirmDelete) return

    const { error } = await supabase.from('Listing').delete().eq('listing_id', listingId)

    if (error) {
      alert('Error deleting listing: ' + error.message)
    } else {
      setListings((prev) => prev.filter((l) => l.listing_id !== listingId))
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Your Sublease Listings</h1>
      {loading && <p className="text-gray-500">Loading your listings...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {listings.length === 0 && !loading && (
        <p className="text-gray-600">You haven’t posted any listings yet.</p>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <div key={item.listing_id} className="border rounded p-4 shadow hover:shadow-md transition">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600 mb-1">{item.description}</p>
            <p className="text-sm text-gray-500">Location: {item.location}</p>
            <p className="text-sm text-gray-500">
              Available: {item.start_date} → {item.end_date}
            </p>
            <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>

            <div className="flex justify-between mt-4 space-x-2">
              <Link
                href={`/editlisting/${item.listing_id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.listing_id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
