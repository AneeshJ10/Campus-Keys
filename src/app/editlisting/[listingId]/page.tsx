'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function EditListing() {
  const { listingId } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      console.log('[DEBUG] Fetching listing with ID:', listingId)

      const { data, error } = await supabase
        .from('Listing')
        .select('*')
        .eq('listing_id', listingId)
        .single()

      if (error || !data) {
        console.error('[ERROR] Listing fetch failed:', error?.message)
        setError('Listing not found.')
        setLoading(false)
        return
      }

      console.log('[DEBUG] Listing loaded:', data)

      setTitle(data.title)
      setDescription(data.description)
      setPrice(data.price.toString())
      setLocation(data.location)
      setStartDate(data.start_date)
      setEndDate(data.end_date)
      setLoading(false)
    }

    if (listingId) fetchListing()
  }, [listingId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const payload = {
      title,
      description,
      price: parseFloat(price),
      location,
      start_date: startDate,
      end_date: endDate,
    }

    console.log('[DEBUG] Submitting update to table: Listing')
    console.log('[DEBUG] Update payload:', payload)
    console.log('[DEBUG] Target listing_id:', listingId)

    const { data, error: updateError } = await supabase
      .from('Listing')
      .update(payload)
      .eq('listing_id', listingId)

    if (updateError) {
      console.error('[ERROR] Failed to update listing:', updateError.message)
      setError(updateError.message)
    } else {
      console.log('[SUCCESS] Listing updated:', data)
      router.push('/manage')
    }
  }

  if (loading) return <p className="p-6 text-gray-500">Loading listing...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          className="w-full p-2 border rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          className="w-full p-2 border rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </main>
  )
}
