"use client"

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
      </main>
    </div>
  )
}
