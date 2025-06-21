"use client"

import { supabase } from "@/lib/supabase"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("test").select("*")
      console.log("✅ Supabase data:", data)
      console.log("❌ Supabase error:", error)
    }

    testConnection()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">🏡 Campus Keys</h1>
      <p className="mt-2 text-lg text-center text-gray-600">
        Find or list student summer subleases easily.
      </p>
    </main>
  )
}
