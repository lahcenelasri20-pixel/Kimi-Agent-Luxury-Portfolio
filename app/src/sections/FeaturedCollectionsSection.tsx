import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    title: 'Abstract',
    image: '/art/collection-abstract.jpg',
    count: 24,
    description: 'Bold gestures, layered textures, and the dialogue between color and form.',
  },
  {
    title: 'Nature',
    image: '/art/collection-nature.jpg',
    count: 18,
    description: 'Landscapes and organic forms translated through memory and observation.',
  },
  {
    title: 'Portraits',
    image: '/art/collection-portraits.jpg',
    count: 12,
    description: 'The human presence rendered in quiet dignity and emotional depth.',
  },
  {
    title: 'Limited Editions',
    image: '/art/collection-limited.jpg',
    count: 8,
    description: 'Exclusive mixed-media pieces with gold leaf and unique materials.',
  },
];

export default function FeaturedCollectionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative py-20 lg:py-24 px-12 lg:px-20 bg-wall"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-20 max-w-7xl mx-auto opacity-0">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-4">
          Curated Works
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-charcoal leading-tight">
          Featured Collections
        </h2>
      </div>

      {/* Collections grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection, index) => (
          <div
            key={collection.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group cursor-pointer opacity-0"
          >
            {/* Image container */}
            <div className="relative overflow-hidden mb-6 aspect-[3/4]">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-colors duration-500" />
              {/* View label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-wall bg-charcoal/80 px-6 py-3">
                  View Collection
                </span>
              </div>
            </div>

            {/* Collection info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                  {collection.title}
                </h3>
                <span className="font-sans text-[11px] text-charcoal/40">
                  {collection.count}
                </span>
              </div>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
