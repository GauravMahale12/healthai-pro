import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import QuickActions from "../components/QuickActions";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const user = localStorage.getItem("user_id");

    if (!user) {
      router.push("/login");
    }
  }, []);

  // Prevent SSR crash
  if (!isClient) return null;

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <QuickActions />
    </main>
  );
}