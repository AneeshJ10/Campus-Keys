"use client"

import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-end space-x-4 bg-white shadow">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </header>

      <main className="flex flex-col flex-grow items-center justify-center p-4">
        <h1 className="text-4xl font-bold">🏡 Campus Keys</h1>
        <p className="mt-2 text-lg text-center text-gray-600">
          Find or list student summer subleases easily.
        </p>

        <button
          onClick={() => router.push("/viewpostings")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Sublease Postings
        </button>

        <button
          onClick={() => router.push("/makeposting")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Post Your Own Sublease
        </button>
      </main>
    </div>
  )
}


