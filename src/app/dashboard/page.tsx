// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const [profile, setProfile] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       // Get the currently logged-in user
//       const { data: { user }, error: authError } = await supabase.auth.getUser();

//       if (authError || !user) {
//         console.error("Error getting authenticated user:", authError?.message || "No user found");
//         setError("Please log in again.");
//         router.push("/"); // redirect to home if not logged in
//         return;
//       }

//       console.log("Authenticated user ID:", user.id);

//       // Fetch the user's profile info from your User table
//       const { data: userProfile, error: profileError } = await supabase
//         .from("User")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (profileError) {
//         console.error("Profile fetch error:", profileError);
//         setError("Failed to fetch profile or no profile found.");
//       } else {
//         setProfile(userProfile);
//       }
//     };

//     fetchProfile();
//   }, [router]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="w-full p-4 flex justify-end space-x-4 bg-white shadow">
//         {profile ? (
//           <span className="text-gray-800 font-semibold">Welcome, {profile.first_name}!</span>
//         ) : (
//           <span className="text-gray-800 font-semibold">Welcome, User!</span>
//         )}
//       </header>

//       <main className="flex flex-col flex-grow items-center justify-center p-4">
//         <h1 className="text-4xl font-bold">🏡 Campus Keys Dashboard</h1>
//         <p className="mt-2 text-lg text-center text-gray-600">
//           Manage your sublease postings or browse available listings.
//         </p>

//         <div className="mt-8 flex flex-col space-y-4">
//           <button
//             onClick={() => router.push("/viewpostings")}
//             className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             View Sublease Postings
//           </button>

//           <button
//             onClick={() => router.push("/makeposting")}
//             className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Post Your Own Sublease
//           </button>
//         </div>

//         {error && <p className="mt-4 text-red-600">{error}</p>}
//       </main>
//     </div>
//   );
// }


"use client"

import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Campus Keys</h1>
        <div className="text-gray-600 dark:text-gray-300 font-medium">Welcome, Narayana</div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 text-left">
        <h2 className="text-4xl font-extrabold mb-2 text-blue-900 dark:text-blue-300">Your Subleasing Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Manage your listings or find a place to stay this semester.
        </p>
      </section>

      {/* Action Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12">
        <Link href="/viewpostings" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md p-6 transition text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">View Subleases</h3>
          <p className="text-gray-500 dark:text-gray-400">Browse available listings posted by students.</p>
        </Link>

        <Link href="/makeposting" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md p-6 transition text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Post a Sublease</h3>
          <p className="text-gray-500 dark:text-gray-400">Add a listing and find a subleaser fast.</p>
        </Link>

        <Link href="/manage" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md p-6 transition text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Manage Your Postings</h3>
          <p className="text-gray-500 dark:text-gray-400">Edit or remove your existing sublease ads.</p>
        </Link>
      </section>
    </div>
  )
}
