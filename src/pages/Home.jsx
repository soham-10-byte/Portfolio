import React from 'react';
import Hero from '@/sections/Hero';
import TwoPathSection from '@/sections/TwoPathSection';
import AboutSection from '@/sections/AboutSection';
import StatsStrip from '@/sections/StatsStrip';
import SkillsSection from '@/sections/SkillsSection';
import ServicesSection from '@/sections/ServicesSection';
import ContactSection from '@/sections/ContactSection';

/**
 * Home Page — single scrolling experience.
 * Order after Two-Path:
 * 1. ABOUT (id="about")
 * 2. STATS STRIP
 * 3. SKILLS (id="skills")
 * 4. SERVICES (id="services")
 * 5. CONTACT (id="contact")
 * (Footer is rendered globally in Layout.jsx)
 */
export default function Home() {
  return (
    <div className="relative w-full" id="home">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Two-Path Split (#works) */}
      <TwoPathSection />

      {/* 3. About Section (#about) */}
      <AboutSection />

      {/* 4. Stats Strip — Ruled band with count-ups */}
      <StatsStrip />

      {/* 5. Skills & Certifications (#skills) */}
      <SkillsSection />

      {/* 6. Services & Methodology (#services) */}
      <ServicesSection />

      {/* 7. Contact Form & Direct Channels (#contact) */}
      <ContactSection />
    </div>
  );
}
