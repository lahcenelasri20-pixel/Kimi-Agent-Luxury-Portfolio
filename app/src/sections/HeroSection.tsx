import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { label: 'Exhibitions', value: '47' },
  { label: 'Countries', value: '23' },
  { label: 'Years', value: '18' },
];

const pressLogos = ['Artforum', 'Frieze', 'Artnet', 'The Observer'];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' }
      )
        .fromTo(
          artworkRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
          0.4
        )
        .fromTo(
          contentRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12 },
          0.6
        )
        .fromTo(
          credentialsRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
          1.0
        )
        .fromTo(
          indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          1.4
        );

      gsap.to(artworkRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: '60% top',
          scrub: true,
        },
      });

      gsap.to(section, {
        opacity: 0.7,
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
      className="relative w-full min-h-screen overflow-hidden bg-wall"
    >
      <div className="relative w-full min-h-screen flex">
        {/* Left: Artist Info */}
        <div
          ref={contentRef}
          className="relative z-20 w-full lg:w-[50%] lg:min-h-screen flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-0"
        >
          {/* Main Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold mb-6 lg:mb-8">
              Contemporary Fine Art
            </p>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] text-charcoal leading-[0.95] tracking-tight mb-6 lg:mb-8">
              The Poetry<br />
              of <span className="italic text-gold/80">Silence</span>
            </h1>

            {/* Description */}
            <p className="font-serif text-lg lg:text-xl text-charcoal/60 leading-relaxed max-w-lg mb-10 lg:mb-12">
              Large-scale oil paintings that capture the quiet moments between movement and stillness.
            </p>

            {/* Credentials */}
            <div
              ref={credentialsRef}
              className="flex items-center gap-12 lg:gap-16 mb-12 lg:mb-16"
            >
              {credentials.map((cred, i) => (
                <div key={cred.label} className="flex flex-col">
                  <span className="font-serif text-3xl lg:text-4xl text-charcoal">
                    {cred.value}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mt-1">
                    {cred.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/collections/abstract"
                className="group inline-flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.2em] text-wall bg-charcoal px-10 py-5 hover:bg-gold transition-all duration-500"
              >
                <span>View Collections</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/60 border border-charcoal/20 px-10 py-5 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <span>Inquire</span>
              </Link>
            </div>
          </div>

          {/* Press */}
          <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-16">
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-charcoal/30 mb-4">
              Featured In
            </p>
            <div className="flex items-center gap-8">
              {pressLogos.map((logo) => (
                <span
                  key={logo}
                  className="font-serif text-sm text-charcoal/25 tracking-wider"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Featured Artwork */}
        <div
          ref={artworkRef}
          className="hidden lg:flex relative z-10 w-[40%] min-h-screen items-center justify-center pr-8 lg:pr-16"
        >
          <div className="relative w-full max-w-xs">
            {/* Frame */}
            <div className="absolute -inset-6 border border-charcoal/10" />
            <div className="absolute -inset-12 border border-charcoal/5" />

            {/* Artwork */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/art/hero.jpg"
                alt="Whispered Memories - Elena Voss"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas reference/signature element */}
      <div
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-charcoal/5 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] border border-gold/5 rounded-full" />
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-charcoal/20" />
        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-charcoal/40 writing-vertical-lr rotate-180">
          Scroll
        </span>
      </div>
    </section>
  );
}