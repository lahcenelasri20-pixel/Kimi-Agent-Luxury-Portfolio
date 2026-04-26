import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.3 });

      loadTl
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
        )
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          0
        )
        .fromTo(
          contentRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
          0.3
        );

      // Parallax on scroll - image moves slower than scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content fades out smoothly on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: '15% top',
          end: '50% top',
          scrub: true,
        },
      });

      // Section fades out at the very end
      gsap.to(section, {
        opacity: 0.6,
        scrollTrigger: {
          trigger: section,
          start: '70% top',
          end: '85% top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-charcoal"
    >
      {/* Full-bleed hero painting */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/art/hero.jpg"
          alt="Elena Voss - Contemporary Oil Painting"
          className="w-full h-[120%] object-cover object-center"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/50 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-end pb-24 px-5 lg:px-20">
        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] uppercase tracking-[0.3em] text-wall/80 mb-6"
          style={{ opacity: 0 }}
        >
          Contemporary Fine Art
        </p>

        {/* Main title */}
        <h1
          className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-wall leading-[0.92] tracking-tight mb-6"
          style={{ opacity: 0 }}
        >
          Elena<br />Voss
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-[clamp(0.9rem,1.5vw,1.1rem)] text-wall/75 max-w-[28rem] leading-relaxed mb-12"
          style={{ opacity: 0 }}
        >
          Exploring the poetry of quiet moments through large-scale oil paintings.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-6" style={{ opacity: 0 }}>
          <button
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-wall border border-wall/40 px-8 py-4 hover:bg-wall hover:text-charcoal transition-all duration-500"
          >
            <span>Explore Collection</span>
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

          {/* Scroll indicator */}
          <div className="flex items-center gap-3">
            <div className="w-px h-10 bg-wall/30" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/50">
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-wall to-transparent pointer-events-none" />
    </section>
  );
}
