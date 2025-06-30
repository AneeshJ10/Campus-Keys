"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      // Get the currently logged-in user
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Error getting authenticated user:", authError?.message || "No user found");
        setError("Please log in again.");
        router.push("/"); // redirect to home if not logged in
        return;
      }

      console.log("Authenticated user ID:", user.id);

      // Fetch the user's profile info from your User table
      const { data: userProfile, error: profileError } = await supabase
        .from("User")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        setError("Failed to fetch profile or no profile found.");
      } else {
        setProfile(userProfile);
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-end space-x-4 bg-white shadow">
        {profile ? (
          <span className="text-gray-800 font-semibold">Welcome, {profile.first_name}!</span>
        ) : (
          <span className="text-gray-800 font-semibold">Welcome, User!</span>
        )}
      </header>

      <main className="flex flex-col flex-grow items-center justify-center p-4">
        <h1 className="text-4xl font-bold">🏡 Campus Keys Dashboard</h1>
        <p className="mt-2 text-lg text-center text-gray-600">
          Manage your sublease postings or browse available listings.
        </p>

        <div className="mt-8 flex flex-col space-y-4">
          <button
            onClick={() => router.push("/viewpostings")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Sublease Postings
          </button>

          <button
            onClick={() => router.push("/makeposting")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Post Your Own Sublease
          </button>
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </main>
    </div>
  );
}
