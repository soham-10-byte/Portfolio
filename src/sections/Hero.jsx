import React from 'react';
import { Linkedin, Github, Mail, MessageCircle } from 'lucide-react';
import MinimalistHero from '@/components/ui/MinimalistHero';
import { heroData, contact } from '@/data/content';
import { usePreloader } from '@/context/PreloaderContext';

/**
 * Hero Section
 * Imports copy and configurations from centralized content store (@/data/content.js)
 * and wires Lucide icons to <MinimalistHero />.
 */
export default function Hero() {
  const { startAnimations } = usePreloader();

  const socialLinks = [
    {
      icon: Linkedin,
      href: contact.linkedin,
      label: 'LinkedIn Profile',
    },
    {
      icon: Github,
      href: contact.github,
      label: 'GitHub Profile',
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: `Email Soham Sen (${contact.email})`,
    },
    {
      icon: MessageCircle,
      href: contact.whatsappUrl,
      label: `WhatsApp Soham Sen (${contact.phone})`,
    },
  ];

  return (
    <MinimalistHero
      logoText={heroData.logoText}
      navLinks={heroData.navLinks}
      mainText={heroData.mainText}
      readMoreLink={heroData.readMoreLink}
      imageSrc={heroData.imageSrc}
      imageAlt={heroData.imageAlt}
      overlayText={heroData.overlayText}
      socialLinks={socialLinks}
      locationText={heroData.locationText}
      primaryCta={heroData.primaryCta}
      secondaryCta={heroData.secondaryCta}
      floatingBadges={heroData.floatingBadges}
      startAnimations={startAnimations}
    />
  );
}

