import { useEffect, useState, useRef } from 'react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY.current;

          if (scrollingDown && currentScrollY > 100) {
            setIsVisible(false);
            setMenuOpen(false);
          } else {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Works', id: 'works' },
    { label: 'Collections', id: 'collections' },
    { label: 'About', id: 'about' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        } py-4 bg-wall/95 backdrop-blur-lg shadow-sm`}
      >
        <div className="flex items-center justify-between px-12 lg:px-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('top')}
            className="font-serif text-xl tracking-[0.15em] transition-colors duration-500 text-charcoal hover:text-gold"
          >
            Elena Voss
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 text-charcoal/70 hover:text-gold"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 w-8 h-8 text-charcoal"
          >
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-wall transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-20 gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-serif text-3xl text-charcoal hover:text-gold transition-colors duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </button>
          ))}
          <div
            className="mt-8 pt-8 border-t border-charcoal/10"
            style={{
              transitionDelay: menuOpen ? '250ms' : '0ms',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <button
              onClick={() => scrollTo('contact')}
              className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold border-b border-gold pb-0.5"
            >
              Inquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
