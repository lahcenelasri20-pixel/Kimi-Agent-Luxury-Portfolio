import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processImages = [
  { src: '/art/collection-abstract.jpg', label: 'Layering' },
  { src: '/art/gallery-2.jpg', label: 'Composition' },
  { src: '/art/gallery-5.jpg', label: 'Texture' },
  { src: '/art/collection-limited.jpg', label: 'Detail' },
  { src: '/art/hero.jpg', label: 'Scale' },
];

export default function ProcessSection() {
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
        { x: '22vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Labels
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
        { x: '-18vw', ease: 'none' },
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
      id="process"
      className="relative w-full h-screen overflow-hidden bg-wall"
      style={{ zIndex: 50 }}
    >
      {/* Top border line */}
      <div className="absolute top-[10vh] left-[6vw] right-[6vw] h-px bg-charcoal/10" />
      {/* Bottom border line */}
      <div className="absolute bottom-[10vh] left-[6vw] right-[6vw] h-px bg-charcoal/10" />

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
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/60 mb-1">
            Process
          </p>
          <p className="font-sans text-xs text-charcoal/40">
            Materials, layers, and the slow build of a painting
          </p>
        </div>

        {/* Image row */}
        <div
          ref={rowRef}
          className="absolute top-[8vh] left-0 flex items-center gap-[3.2vw] pl-[6vw]"
        >
          {processImages.map((item, i) => (
            <div
              key={i}
              className="group flex-shrink-0"
              style={{ height: '50vh', aspectRatio: i % 2 === 0 ? '1/1' : '4/3' }}
            >
              <div className="relative w-full h-full art-frame overflow-hidden bg-charcoal/10">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal/40 to-transparent">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/80">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <a
          ref={linkRef}
          href="#"
          className="absolute bottom-[4vh] right-[6vw] font-sans text-xs uppercase tracking-[0.18em] text-charcoal/60 hover:text-gold transition-colors duration-300"
        >
          See how works are made
        </a>
      </div>
    </section>
  );
}
