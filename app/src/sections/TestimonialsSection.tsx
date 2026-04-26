import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Elena's work has a quiet power that transforms any space. We commissioned a large piece for our home and it became the heart of every room.",
    author: 'Sarah Mitchell',
    role: 'Private Collector',
    location: 'New York',
  },
  {
    quote: "Working with Elena on our corporate collection was extraordinary. Her understanding of space and light resulted in pieces that exceed our expectations daily.",
    author: 'David Chen',
    role: 'Director, Whitfield Gallery',
    location: 'San Francisco',
  },
  {
    quote: "The painting we acquired has become a meditation space in our home. It responds to light throughout the day in ways that continually reveal new depths.",
    author: 'Emma Richardson',
    role: 'Collector',
    location: 'London',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            delay: i * 0.15,
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
      className="relative py-32 lg:py-44 px-12 lg:px-20 bg-charcoal overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-4">
            Collectors
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-wall leading-tight">
            Words from collectors
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="opacity-0"
            >
              {/* Quote mark */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-gold/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl lg:text-2xl text-wall/90 leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-wall/10 pt-6">
                <p className="font-sans text-sm text-wall font-medium">
                  {testimonial.author}
                </p>
                <p className="font-sans text-[11px] text-wall/50 mt-1">
                  {testimonial.role} — {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery badge */}
        <div className="mt-20 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/30 mb-4">
            Featured in collections worldwide
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-wall/10" />
            <span className="font-serif text-lg text-wall/20">Artsy</span>
            <span className="w-8 h-px bg-wall/10" />
            <span className="font-serif text-lg text-wall/20">Saatchi</span>
            <span className="w-8 h-px bg-wall/10" />
            <span className="font-serif text-lg text-wall/20">1stDibs</span>
            <span className="w-8 h-px bg-wall/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
