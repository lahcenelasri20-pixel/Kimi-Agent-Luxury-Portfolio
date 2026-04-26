import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCollectionById, collectionsData, type Artwork } from '../data/collectionsData';
import Navigation from '../components/Navigation';

gsap.registerPlugin(ScrollTrigger);

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  artwork,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  artwork: Artwork;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-ink/95 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 flex items-center gap-6 max-w-6xl w-full mx-4 lg:mx-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-wall/20 text-wall/50 hover:border-gold hover:text-gold transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous artwork"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative p-3 bg-wall/5 border border-wall/10">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-wall">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              {artwork.tags.join(' · ')}
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,3rem)] leading-tight mb-2">
              {artwork.title}
            </h2>
            <p className="font-sans text-sm text-wall/50 mb-8">
              {artwork.medium} · {artwork.year}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-wall/10">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-1">Dimensions</p>
                <p className="font-sans text-sm text-wall/80">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/40 mb-1">
                  {artwork.available ? 'Price' : 'Status'}
                </p>
                <p className={`font-serif text-xl ${artwork.available ? 'text-gold' : 'text-wall/50'}`}>
                  {artwork.price}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-wall/60 leading-relaxed mb-8">
              {artwork.story}
            </p>

            {artwork.available && (
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal bg-wall px-8 py-4 hover:bg-gold hover:text-white transition-all duration-300"
              >
                Inquire About This Work
              </Link>
            )}
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-wall/20 text-wall/50 hover:border-gold hover:text-gold transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next artwork"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-wall/50 hover:text-wall transition-colors duration-200 border border-wall/20 hover:border-wall/50"
        aria-label="Close lightbox"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/30">
          ← → Navigate · Esc Close
        </span>
      </div>
    </div>
  );
}

// ─── Artwork Card ─────────────────────────────────────────────────────────────
function ArtworkCard({
  artwork,
  index,
  onClick,
}: {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: (index % 3) * 0.12,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group cursor-gallery opacity-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden mb-5 ${
          index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[2/3]'
        }`}
      >
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-charcoal/60 flex items-center justify-center transition-opacity duration-400 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border border-wall flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-wall">
              View
            </span>
          </div>
        </div>

        {/* Sold badge */}
        {!artwork.available && (
          <div className="absolute top-4 left-4 bg-charcoal/90 px-3 py-1.5">
            <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-wall/70">
              Private Collection
            </span>
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
          {artwork.tags.includes('Featured') && (
            <span className="bg-gold px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.15em] text-white">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300 mb-1">
            {artwork.title}
          </h3>
          <p className="font-sans text-[11px] text-charcoal/50">
            {artwork.medium} · {artwork.dimensions} · {artwork.year}
          </p>
        </div>
        <div className="text-right ml-4 flex-shrink-0">
          {artwork.available ? (
            <p className="font-serif text-lg text-charcoal/60 group-hover:text-gold transition-colors duration-300">
              {artwork.price}
            </p>
          ) : (
            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/30 mt-1">
              Sold
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CollectionDetail() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const collection = getCollectionById(collectionId ?? '');

  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filterTag, setFilterTag] = useState<string>('All');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [collectionId]);

  // Hero GSAP animation
  useEffect(() => {
    if (!heroRef.current || !collection) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' }
      ).fromTo(
        heroContentRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12 },
        0.4
      );

      // Parallax
      gsap.to(heroImageRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef.current);

    return () => ctx.revert();
  }, [collection]);

  // Stats animation
  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current!.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, statsRef.current);
    return () => ctx.revert();
  }, [collection]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && collection && i < collection.artworks.length - 1 ? i + 1 : i
      ),
    [collection]
  );

  if (!collection) {
    return (
      <div className="min-h-screen bg-wall flex flex-col items-center justify-center">
        <Navigation />
        <p className="font-sans text-sm text-charcoal/50 mb-6">Collection not found.</p>
        <button
          onClick={() => navigate('/')}
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal border border-charcoal/20 px-8 py-3 hover:border-gold hover:text-gold transition-all duration-300"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Derive unique tags
  const allTags = ['All', ...Array.from(new Set(collection.artworks.flatMap((a) => a.tags).filter((t) => !['Featured', 'Sold'].includes(t))))];
  const filteredArtworks =
    filterTag === 'All'
      ? collection.artworks
      : collection.artworks.filter((a) => a.tags.includes(filterTag));

  // Other collections for related section
  const related = collectionsData.filter((c) => c.id !== collection.id).slice(0, 3);

  return (
    <div className="relative bg-wall min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navigation />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative h-[90vh] overflow-hidden bg-charcoal"
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <img
            ref={heroImageRef}
            src={collection.heroImage}
            alt={collection.title}
            className="w-full h-[115%] object-cover object-center"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-charcoal/80 pointer-events-none" />

        {/* Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 h-full flex flex-col justify-end pb-20 px-5 lg:px-20"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <button
              onClick={() => navigate('/')}
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/50 hover:text-gold transition-colors duration-200"
            >
              Home
            </button>
            <span className="text-wall/30 text-[10px]">/</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-wall/50">
              Collections
            </span>
            <span className="text-wall/30 text-[10px]">/</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold">
              {collection.title}
            </span>
          </div>

          {/* Eyebrow */}
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-4" style={{ opacity: 0 }}>
            {collection.theme}
          </p>

          {/* Title */}
          <h1
            className="font-serif text-[clamp(3rem,9vw,7rem)] text-wall leading-[0.92] tracking-tight mb-4"
            style={{ opacity: 0 }}
          >
            {collection.title}
          </h1>

          {/* Tagline */}
          <p className="font-sans text-[clamp(0.9rem,1.5vw,1.1rem)] text-wall/70 max-w-xl leading-relaxed" style={{ opacity: 0 }}>
            {collection.tagline}
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-wall to-transparent pointer-events-none" />
      </section>

      {/* ── Stats Bar ── */}
      <section
        ref={statsRef}
        className="relative bg-wall border-b border-charcoal/8 py-10 px-5 lg:px-20"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="stat-item opacity-0 flex items-center gap-8">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-1">Works</p>
              <p className="font-serif text-3xl text-charcoal">{collection.count}</p>
            </div>
            <div className="w-px h-10 bg-charcoal/10" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-1">Period</p>
              <p className="font-sans text-sm text-charcoal">{collection.year}</p>
            </div>
            <div className="w-px h-10 bg-charcoal/10" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-1">Available</p>
              <p className="font-sans text-sm text-charcoal">
                {collection.artworks.filter((a) => a.available).length} works
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="stat-item opacity-0 font-sans text-sm text-charcoal/60 leading-relaxed max-w-lg">
            {collection.description}
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-[64px] z-50 bg-wall/90 backdrop-blur-md border-b border-charcoal/8 px-5 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 flex-shrink-0 mr-2">
            Filter
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`flex-shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] px-5 py-2 border transition-all duration-300 ${
                filterTag === tag
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-charcoal/15 text-charcoal/50 hover:border-charcoal/40 hover:text-charcoal'
              }`}
            >
              {tag}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/30">
            {filteredArtworks.length} {filteredArtworks.length === 1 ? 'work' : 'works'}
          </div>
        </div>
      </section>

      {/* ── Artwork Grid ── */}
      <section className="py-20 lg:py-28 px-5 lg:px-20">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20"
        >
          {filteredArtworks.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="max-w-7xl mx-auto text-center py-20">
            <p className="font-sans text-sm text-charcoal/40">
              No works match the current filter.
            </p>
            <button
              onClick={() => setFilterTag('All')}
              className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-gold border-b border-gold pb-0.5"
            >
              Clear Filter
            </button>
          </div>
        )}
      </section>

      {/* ── Inquiry Banner ── */}
      <section className="bg-charcoal py-20 lg:py-28 px-5 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
            Acquisition
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-wall leading-tight mb-6">
            Interested in This Collection?
          </h2>
          <p className="font-sans text-sm text-wall/60 leading-relaxed max-w-xl mx-auto mb-12">
            Each work can be acquired directly through the studio. Private viewings, provenance documentation,
            and white-glove shipping are arranged upon request.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal bg-wall px-10 py-4 hover:bg-gold hover:text-white transition-all duration-400"
            >
              <span>Inquire About This Collection</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-wall border border-wall/20 px-10 py-4 hover:border-wall/60 transition-all duration-300"
            >
              View All Collections
            </button>
          </div>
        </div>
      </section>

      {/* ── Related Collections ── */}
      <section className="py-20 lg:py-28 px-5 lg:px-20 bg-wall">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-3">
              Explore More
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-charcoal">
              Other Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/collections/${rel.id}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-wall bg-charcoal/80 px-6 py-3">
                      View Collection
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                    {rel.title}
                  </h3>
                  <span className="font-sans text-[11px] text-charcoal/40">{rel.count} works</span>
                </div>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed">
                  {rel.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer Back Link ── */}
      <div className="border-t border-charcoal/8 py-8 px-5 lg:px-20 bg-wall">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back
          </button>
          <span className="font-serif text-sm text-charcoal/30">Elena Voss Studio</span>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          artwork={filteredArtworks[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filteredArtworks.length - 1}
        />
      )}
    </div>
  );
}
