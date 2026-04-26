import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation - elegant staggered reveal
      const loadTl = gsap.timeline({ delay: 0.3 });

      loadTl
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
        )
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.4
        )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          0.55
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.75
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          1
        );

      // Parallax scroll effect
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content fade on scroll
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([eyebrowRef.current, titleRef.current, subtitleRef.current], {
          y: -80,
          opacity: 0,
          ease: 'power2.in',
          stagger: 0.1,
        })
        .to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -30,
          ease: 'power2.in',
        }, 0)
        .to(section, {
          opacity: 0,
          ease: 'power2.in',
        }, 0.85);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-wall"
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

      {/* Subtle gradient overlay for text legibility */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/40 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content - positioned with generous whitespace */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-12 lg:px-20">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-sans text-[11px] uppercase tracking-[0.3em] text-wall/80 mb-6"
          style={{ opacity: 0 }}
        >
          Contemporary Fine Art
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(3rem,8vw,7rem)] text-wall leading-[0.95] tracking-tight mb-8"
          style={{ opacity: 0 }}
        >
          Elena<br />Voss
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-sans text-[clamp(0.875rem,1.5vw,1.125rem)] text-wall/70 max-w-[28rem] leading-relaxed mb-12"
          style={{ opacity: 0 }}
        >
          Exploring the poetry of quiet moments through large-scale oil paintings.
          Memory, landscape, and the spaces between.
        </p>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="flex items-center gap-4"
          style={{ opacity: 0 }}
        >
          <div className="w-px h-12 bg-wall/40" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-wall/60">
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wall to-transparent pointer-events-none" />
    </section>
  );
}
