import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled
            ? 'py-5 bg-wall/95 backdrop-blur-md'
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-12 lg:px-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-xl tracking-[0.15em] text-charcoal hover:text-gold transition-colors duration-500"
          >
            Elena Voss
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/70 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`w-6 h-px bg-charcoal transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-px bg-charcoal transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-px bg-charcoal transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-wall transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
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
          <div className="mt-8 pt-8 border-t border-charcoal/10">
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
