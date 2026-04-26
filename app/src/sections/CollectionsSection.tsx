import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 'abstract',
    title: 'Abstract',
    image: '/art/collection-abstract.jpg',
    count: '24 works',
    description: 'Bold gestures, layered textures, and the dialogue between color and form.',
  },
  {
    id: 'nature',
    title: 'Nature',
    image: '/art/collection-nature.jpg',
    count: '18 works',
    description: 'Landscapes and organic forms translated through memory and observation.',
  },
  {
    id: 'portraits',
    title: 'Portraits',
    image: '/art/collection-portraits.jpg',
    count: '12 works',
    description: 'The human presence rendered in quiet dignity and emotional depth.',
  },
  {
    id: 'limited-editions',
    title: 'Limited Editions',
    image: '/art/collection-limited.jpg',
    count: '8 works',
    description: 'Exclusive mixed-media pieces with gold leaf and unique materials.',
  },
];

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4,
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
      className="relative w-full py-24 md:py-32 bg-wall"
      style={{ zIndex: 25 }}
    >
      <div className="px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/40 mb-3">
            Collections
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-charcoal">
            Featured Collections
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((collection, i) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[3/4] mb-5 art-frame overflow-hidden bg-charcoal/5">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500" />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                  {collection.title}
                </h3>
                <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal/40">
                  {collection.count}
                </span>
              </div>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                {collection.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
