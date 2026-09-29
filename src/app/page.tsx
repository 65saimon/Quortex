import React from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroContent from "@/components/hero/HeroContent";
import ServicesSection from "@/components/services/ServicesSection";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import TechMatrix from "@/components/tech-stack/TechMatrix";
import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/navigation/Footer";
import BubbleMotion from "@/components/ui/BubbleMotion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200 transition-colors duration-300 overflow-x-hidden">
      {/* Floating Ambient & Micro-Bubble Motion Layer */}
      <BubbleMotion />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero with Standalone Three.js 60fps Orbital Animation */}
      <HeroContent />

      {/* 3 Core Pillars: Enterprise SaaS, Autonomous AI, Frontier R&D */}
      <ServicesSection />

      {/* Dynamic Projects Showcase */}
      <ProjectsGallery limit={6} showFilters={true} showViewAll={true} />

      {/* Technology Capability Matrix */}
      <TechMatrix />

      {/* About & Stack Hierarchy */}
      <AboutSection />

      {/* Secure Transmission Contact Form */}
      <ContactSection />

      {/* Enterprise Diagnostics Footer */}
      <Footer />
    </main>
  );
}
