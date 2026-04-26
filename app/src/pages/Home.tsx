import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import FeaturedCollectionsSection from '../sections/FeaturedCollectionsSection';
import GalleryShowcaseSection from '../sections/GalleryShowcaseSection';
import ArtworkDetailSection from '../sections/ArtworkDetailSection';
import AboutSection from '../sections/AboutSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <main className="relative bg-wall">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navigation />

      <HeroSection />
      <FeaturedCollectionsSection />
      <GalleryShowcaseSection />
      <ArtworkDetailSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
