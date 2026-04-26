import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(
          children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-24 px-12 lg:px-20 bg-wall overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center max-w-7xl mx-auto">
        {/* Artist portrait */}
        <div ref={imageRef} className="relative opacity-0 order-2 lg:order-1">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="/art/artist-portrait.jpg"
              alt="Elena Voss in her studio"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle frame */}
          <div className="absolute inset-0 border border-charcoal/10 pointer-events-none m-6 lg:m-8" />
          {/* Floating caption */}
          <div className="absolute -bottom-4 left-8 bg-wall px-6 py-3 shadow-lg">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
              Studio, Hudson Valley 2024
            </p>
          </div>
        </div>

        {/* Bio content */}
        <div ref={contentRef} className="order-1 lg:order-2">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-6 opacity-0">
            The Artist
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-charcoal leading-[1.1] mb-12 opacity-0">
            Elena<br />Voss
          </h2>

          <div className="space-y-6 opacity-0">
            <p className="font-sans text-base text-charcoal/70 leading-relaxed">
              Elena Voss creates large-scale oil paintings exploring the intersection of memory, landscape, and emotional experience. Her work has been exhibited internationally and resides in private collections across Europe, North America, and Asia.
            </p>

            <p className="font-sans text-base text-charcoal/70 leading-relaxed">
              Working from her studio in the Hudson Valley, Voss builds layered compositions through months of careful glazing and impasto, creating surfaces that shift and breathe with viewing angle and light. Her practice draws inspiration from Romantic painters, Abstract Expressionism, and the quiet contemplation of everyday moments.
            </p>

            <p className="font-sans text-base text-charcoal/70 leading-relaxed">
              Each painting begins as an emotional response to a place or memory, evolving through rigorous addition and subtraction until it achieves that precise balance of presence and suggestion.
            </p>
          </div>

          {/* Signature quote */}
          <div className="mt-14 pt-10 border-t border-charcoal/10 opacity-0">
            <div className="flex items-start gap-5">
              <div className="w-12 h-px bg-gold mt-3 flex-shrink-0" />
              <p className="font-serif text-xl text-charcoal/70 italic leading-relaxed">
                "Painting is the art of listening deeply—to color, to form, to the quiet spaces between."
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-8 opacity-0">
            <div>
              <p className="font-serif text-4xl text-charcoal mb-2">18</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
                Years
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-charcoal mb-2">200+</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
                Collected
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-charcoal mb-2">15</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
                Exhibitions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
