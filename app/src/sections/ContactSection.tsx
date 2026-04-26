import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = [headerRef.current, formRef.current].filter(Boolean);

      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-44 px-12 lg:px-20 bg-wall"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 opacity-0">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-charcoal leading-tight max-w-2xl">
            Inquire about<br />availability & commissions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <div className="space-y-10">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                  Studio
                </p>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                  Hudson Valley, New York<br />
                  By appointment only
                </p>
              </div>

              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                  Email
                </p>
                <a
                  href="mailto:studio@elenavoss.art"
                  className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300"
                >
                  studio@elenavoss.art
                </a>
              </div>

              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                  Representation
                </p>
                <p className="font-sans text-sm text-charcoal/70">
                  Whitfield Gallery, San Francisco
                </p>
                <p className="font-sans text-sm text-charcoal/70 mt-1">
                  Mason & Co, London
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-charcoal/10" />

              {/* Commission note */}
              <div className="bg-charcoal/5 p-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                  Custom Commissions
                </p>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                  Available for select commissions. Each piece is created to complement your space and vision.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="lg:col-span-3 opacity-0">
            {submitted ? (
              <div className="bg-charcoal/5 p-12 text-center">
                <div className="mb-4">
                  <svg className="w-10 h-10 mx-auto text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">Message Sent</h3>
                <p className="font-sans text-sm text-charcoal/60">
                  Thank you for reaching out. I'll respond within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-3">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-charcoal/20 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">Select an option</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="available">Available Works</option>
                    <option value="commission">Commission Request</option>
                    <option value="studio">Studio Visit</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-3">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-charcoal/20 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                    placeholder="Tell me about your interest..."
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-wall bg-charcoal px-10 py-4 hover:bg-gold transition-colors duration-500"
                >
                  <span>Send Message</span>
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
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 lg:mt-44 pt-16 border-t border-charcoal/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Large wordmark */}
          <p className="font-serif text-2xl text-charcoal/20 tracking-[0.1em]">
            Elena Voss
          </p>

          {/* Social + Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-gold transition-colors duration-300">
              Instagram
            </a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-gold transition-colors duration-300">
              Artsy
            </a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-gold transition-colors duration-300">
              Saatchi
            </a>
          </div>

          {/* Copyright */}
          <p className="font-sans text-[10px] text-charcoal/30">
            © 2024 Elena Voss Studio
          </p>
        </div>
      </footer>
    </section>
  );
}
