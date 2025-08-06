'use client'

import Hero from "@/components/Hero"
import KeyFeatures from "@/components/KeyFeatures"
import Navbar from "@/components/Navbar"
import Reviews from "@/components/Reviews"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const redirectToLogin = () => {
    router.push("/auth/login")
  }
  return (
    <>
      <Navbar />
      <Hero/>
      <KeyFeatures/>
      <Reviews/>
    </>
  )
}
