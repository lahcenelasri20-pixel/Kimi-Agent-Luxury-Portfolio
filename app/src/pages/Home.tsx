import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import FeaturedCollectionsSection from '../sections/FeaturedCollectionsSection';
import GalleryShowcaseSection from '../sections/GalleryShowcaseSection';
import ArtworkDetailSection from '../sections/ArtworkDetailSection';
import AboutSection from '../sections/AboutSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
