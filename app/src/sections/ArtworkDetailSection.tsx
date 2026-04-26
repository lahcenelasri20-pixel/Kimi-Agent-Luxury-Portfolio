import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredArtwork = {
  title: 'Whispered Memories',
  subtitle: 'From the Eternal Light Series, 2024',
  image: '/art/collection-abstract.jpg',
  medium: 'Oil on canvas',
  dimensions: '72 × 96 inches',
  price: '$32,000',
  available: true,
  description: `This large-scale work emerged from months of observing how light transforms ordinary spaces into moments of extraordinary beauty. The layered technique, building transparent glazes over impasto, creates a luminosity that shifts as the viewer moves—a conversation between presence and memory.

Whispered Memories invites contemplation, drawing the eye deeper into its atmospheric depths while maintaining a sense of peaceful stillness.`,
};

export default function ArtworkDetailSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.fromTo(
        imageRef.current,
        { y: 60 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Content reveal
      const children = contentRef.current?.querySelectorAll('.reveal-item');
      children?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
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
      className="relative py-20 lg:py-24 bg-charcoal overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-12 lg:px-20 items-center">
        {/* Artwork image */}
        <div ref={imageRef} className="relative">
          {/* Frame effect */}
          <div className="relative p-3 bg-wall shadow-2xl">
            <div className="absolute inset-3 border border-charcoal/10 pointer-events-none" />
            <img
              src={featuredArtwork.image}
              alt={featuredArtwork.title}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          {/* Shadow */}
          <div className="absolute -bottom-6 left-6 right-6 h-4 bg-charcoal/40 blur-xl" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="text-wall">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-6 reveal-item opacity-0">
            Featured Work
          </p>

          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-3 reveal-item opacity-0">
            {featuredArtwork.title}
          </h2>

          <p className="font-sans text-sm text-wall/50 mb-12 reveal-item opacity-0">
            {featuredArtwork.subtitle}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-wall/10 reveal-item opacity-0">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-2">
                Medium
              </p>
              <p className="font-sans text-sm text-wall/80">
                {featuredArtwork.medium}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-2">
                Dimensions
              </p>
              <p className="font-sans text-sm text-wall/80">
                {featuredArtwork.dimensions}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-2">
                Price
              </p>
              <p className="font-serif text-2xl text-wall">
                {featuredArtwork.price}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-2">
                Availability
              </p>
              <p className="font-sans text-sm text-wall/80">
                {featuredArtwork.available ? 'Available' : 'Sold'}
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-12 reveal-item opacity-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-4">
              The Story
            </p>
            {featuredArtwork.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="font-sans text-sm text-wall/70 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 reveal-item opacity-0">
            <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal bg-wall px-10 py-4 hover:bg-wall/90 transition-colors duration-300">
              Acquire Artwork
            </button>
            <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-wall border border-wall/30 px-10 py-4 hover:border-wall/60 hover:bg-wall/5 transition-all duration-300">
              Request Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
