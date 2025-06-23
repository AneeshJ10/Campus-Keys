// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabase"
// import { useRouter } from "next/navigation"
// import { userAgent } from "@/node_modules/next/server"

// export default function Signup() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     })
//     if (error) {
//       setError(error.message)
//     } else if(data.user){
//       router.push("/login")
//     }
//     //else {
//     //  router.push("/login")
//     //}
//   }

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
//       <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Sign Up
//         </button>
//         {error && <p className="text-red-600">{error}</p>}
//       </form>
//     </main>
//   )
// }

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [school, setSchool] = useState("")
  const [intent, setIntent] = useState("both")
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Step 1: Auth sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      return
    }

    const user = authData?.user
    if (!user) {
      setError("Signup succeeded but user data was missing.")
      return
    }

    // Step 2: Insert into `User` table (matching Supabase schema)
    const { error: insertError } = await supabase.from("User").insert({
      id: user.id, // Matches Supabase auth UUID
      first_name: firstName,
      last_name: lastName,
      school,
      listing_intent: intent,
    })

    if (insertError) {
      setError("Signup succeeded but profile setup failed: " + insertError.message)
      return
    }

    // Step 3: Redirect
    router.push("/")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="seller">Sell a lease</option>
          <option value="buyer">Take over a lease</option>
          <option value="both">Both</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  )
}
