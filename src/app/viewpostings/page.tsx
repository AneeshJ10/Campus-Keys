'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Listing = {
  listing_id: number;
  created_at: string;
  title: string;
  description: string;
  price: number;
  location: string;
  start_date: string;
  end_date: string;
  image_url: string;
  user_id: number;
};

export default function ViewPostings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {

      const { data, error } = await supabase.from('Listing').select('*');

      if (error) {
        setError(error.message);
      } else {
        setListings(data || []);
      }
      console.log('Fetched listings:', data);

    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Listings</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <Link
            key={item.listing_id}
            href={`/viewpostings/${item.listing_id}`}
            className="block"
          >
            <div
              key={item.listing_id}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
