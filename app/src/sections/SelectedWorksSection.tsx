import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { src: '/art/gallery-1.jpg', title: 'Autumn Rhapsody', medium: 'Oil on canvas', size: '48 × 60 in', year: '2024' },
  { src: '/art/gallery-2.jpg', title: 'Midnight Garden', medium: 'Acrylic & oil', size: '36 × 48 in', year: '2024' },
  { src: '/art/gallery-3.jpg', title: 'Valley Morning', medium: 'Oil on linen', size: '30 × 40 in', year: '2023' },
  { src: '/art/collection-abstract.jpg', title: 'Spiral Meditation', medium: 'Mixed media', size: '40 × 50 in', year: '2024' },
  { src: '/art/gallery-4.jpg', title: 'Reaching', medium: 'Oil on canvas', size: '36 × 48 in', year: '2023' },
  { src: '/art/gallery-5.jpg', title: 'Emerald Fragments', medium: 'Oil & acrylic', size: '48 × 60 in', year: '2024' },
  { src: '/art/gallery-6.jpg', title: 'The Navigator', medium: 'Oil on canvas', size: '24 × 24 in', year: '2023' },
];

export default function SelectedWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Band entrance
      scrollTl.fromTo(
        bandRef.current,
        { y: '20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Row drifts from right
      scrollTl.fromTo(
        rowRef.current,
        { x: '18vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Labels fade in
      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.05
      );
      scrollTl.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.08
      );

      // EXIT
      scrollTl.fromTo(
        bandRef.current,
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        rowRef.current,
        { x: 0 },
        { x: '-22vw', ease: 'none' },
        0.7
      );
      scrollTl.fromTo(
        [labelRef.current, linkRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full h-screen overflow-hidden bg-ink"
      style={{ zIndex: 30 }}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Band container */}
      <div
        ref={bandRef}
        className="absolute top-[12vh] left-0 w-full h-[76vh] overflow-hidden"
      >
        {/* Top label */}
        <div
          ref={labelRef}
          className="absolute top-0 left-[6vw] z-10"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1">
            Selected Works
          </p>
          <p className="font-sans text-xs text-white/40">
            Oil, acrylic, and mixed media on canvas
          </p>
        </div>

        {/* Image row */}
        <div
          ref={rowRef}
          className="absolute top-[8vh] left-0 flex items-center gap-[3.2vw] pl-[6vw]"
        >
          {works.map((work, i) => (
            <div
              key={i}
              className="group flex-shrink-0 cursor-pointer"
              style={{ height: '50vh', aspectRatio: '4/5' }}
            >
              <div className="relative w-full h-full art-frame overflow-hidden bg-charcoal/20">
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-500 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="font-serif text-lg text-white mb-1">{work.title}</p>
                  <p className="font-sans text-[11px] text-white/70 uppercase tracking-wide">{work.medium}</p>
                  <p className="font-sans text-[11px] text-white/50">{work.size} • {work.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <a
          ref={linkRef}
          href="#"
          className="absolute bottom-[4vh] right-[6vw] font-sans text-xs uppercase tracking-[0.18em] text-white/60 hover:text-gold transition-colors duration-300"
        >
          Explore the archive
        </a>
      </div>
    </section>
  );
}
