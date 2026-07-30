import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Pitch from "@/components/home/Pitch";
import ProblemGrid from "@/components/home/ProblemGrid";
import SolutionCompare from "@/components/home/SolutionCompare";
import HowItWorks from "@/components/home/HowItWorks";
import Security from "@/components/home/Security";
import Onboarding from "@/components/home/Onboarding";
import { Skeleton } from "@/components/common/Skeleton";

// Lazy-loaded sections below the fold
const ModulesTabs = dynamic(() => import("@/components/home/ModulesTabs"), {
  loading: () => (
    <div className="max-w-7xl mx-auto p-12 space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
});

const RoiSection = dynamic(() => import("@/components/home/RoiSection"), {
  loading: () => (
    <div className="max-w-7xl mx-auto p-12 space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  )
});

const Pricing = dynamic(() => import("@/components/home/Pricing"), {
  loading: () => (
    <div className="max-w-7xl mx-auto p-12 space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  )
});

const WhyUs = dynamic(() => import("@/components/home/WhyUs"), {
  loading: () => (
    <div className="max-w-7xl mx-auto p-12 space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-40" />
    </div>
  )
});

const FinalCta = dynamic(() => import("@/components/home/FinalCta"), {
  loading: () => (
    <div className="bg-brand-primary p-12 flex justify-center">
      <Skeleton className="h-48 w-full max-w-4xl" />
    </div>
  )
});

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="h-20 bg-brand-primary/90" />
});

export const metadata = {
  title: "ClinicFlow AI - The AI Operating System for Modern Clinics",
  description: "Automate your front desk, clinical notes, reminders, patient intake, billing, and retention. Save 50% admin workload, cut no-shows, and provide 24/7 AI reception.",
  alternates: {
    canonical: "https://www.clinicflow.ai"
  },
  openGraph: {
    title: "ClinicFlow AI - The AI Operating System for Modern Clinics",
    description: "Automate your front desk, clinical notes, reminders, patient intake, billing, and retention. Save 50% admin workload, cut no-shows, and provide 24/7 AI reception.",
    url: "https://www.clinicflow.ai",
    siteName: "ClinicFlow AI",
    locale: "en_US",
    type: "website"
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Structural Semantic Layout */}
      <Navbar />
      
      <main className="flex-grow">
        {/* Above-the-fold components */}
        <Hero />
        <Pitch />
        <ProblemGrid />
        <SolutionCompare />
        
        {/* Below-the-fold lazy loaded components */}
        <ModulesTabs />
        <HowItWorks />
        <Security />
        <Onboarding />
        <RoiSection />
        <Pricing />
        <WhyUs />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
