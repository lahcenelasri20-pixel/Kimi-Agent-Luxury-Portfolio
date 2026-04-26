import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artworks = [
  {
    id: 1,
    title: 'Silent Reverie',
    image: '/art/gallery-1.jpg',
    medium: 'Oil on canvas',
    size: '72 × 96 in',
    year: '2024',
    price: 'Inquired',
    available: false,
  },
  {
    id: 2,
    title: 'Golden Hour',
    image: '/art/gallery-2.jpg',
    medium: 'Oil on canvas',
    size: '48 × 60 in',
    year: '2024',
    price: '$18,500',
    available: true,
  },
  {
    id: 3,
    title: 'Between Shadows',
    image: '/art/gallery-3.jpg',
    medium: 'Mixed media',
    size: '60 × 84 in',
    year: '2024',
    price: '$24,000',
    available: true,
  },
  {
    id: 4,
    title: 'Morning Light',
    image: '/art/gallery-4.jpg',
    medium: 'Oil on linen',
    size: '36 × 48 in',
    year: '2023',
    price: '$12,500',
    available: true,
  },
  {
    id: 5,
    title: 'Ethereal Distance',
    image: '/art/gallery-5.jpg',
    medium: 'Oil on canvas',
    size: '84 × 72 in',
    year: '2024',
    price: 'Inquired',
    available: false,
  },
  {
    id: 6,
    title: 'Quiet Presence',
    image: '/art/gallery-6.jpg',
    medium: 'Oil on canvas',
    size: '40 × 52 in',
    year: '2023',
    price: '$15,800',
    available: true,
  },
];

export default function GalleryShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

      const items = gridRef.current?.querySelectorAll('.gallery-item');
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: item,
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
      id="works"
      className="relative py-32 lg:py-44 px-12 lg:px-20 bg-wall"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-20 max-w-6xl mx-auto opacity-0">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-4">
          Portfolio
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-charcoal leading-tight">
          Selected Works
        </h2>
      </div>

      {/* Gallery grid - editorial layout */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="gallery-item group cursor-pointer"
            onMouseEnter={() => setHoveredId(artwork.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Artwork image */}
            <div className="relative overflow-hidden mb-6 aspect-[4/5]">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover info overlay */}
              <div
                className={`absolute inset-0 bg-wall/95 flex flex-col justify-end p-6 transition-opacity duration-500 ${
                  hoveredId === artwork.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-1">
                  {artwork.medium}
                </p>
                <p className="font-sans text-[11px] text-charcoal/60 mb-1">
                  {artwork.size}
                </p>
                <p className="font-sans text-[11px] text-charcoal/60">
                  {artwork.available ? artwork.price : 'Private Collection'}
                </p>
              </div>

              {/* Availability badge */}
              {!artwork.available && (
                <div className="absolute top-4 right-4 bg-charcoal/80 px-3 py-1.5">
                  <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-wall">
                    Sold
                  </span>
                </div>
              )}
            </div>

            {/* Artwork info */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p className="font-sans text-[11px] text-charcoal/50">
                  {artwork.medium} • {artwork.year}
                </p>
              </div>
              <span className="font-serif text-lg text-charcoal/30 group-hover:text-gold transition-colors duration-300">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-20 text-center">
        <button className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.25em] text-charcoal border border-charcoal/20 px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300">
          <span>View Complete Archive</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
