import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });

    // Logo letter animation
    const logoLetters = logoRef.current?.querySelectorAll('.logo-letter');
    if (logoLetters) {
      tl.fromTo(
        logoLetters,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'expo.out' }
      );
    }

    // Nav links animation
    const links = linksRef.current?.querySelectorAll('.nav-link');
    if (links) {
      tl.fromTo(
        links,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'expo.out' },
        '-=0.3'
      );
    }

    // CTA button animation
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        '-=0.2'
      );
    }

    // Scroll-triggered background change
    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.start === 50) trigger.kill();
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass border-b border-[#c6f90633]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <a href="#home" className="text-xl font-display font-semibold tracking-wider">
              {'SIDDHANTH'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="logo-letter inline-block hover:text-[#c6f906] transition-colors duration-300"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {letter}
                </span>
              ))}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[#c6f906] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-[#c6f906] text-[#c6f906] rounded-full text-sm font-medium hover:bg-[#c6f906] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,249,6,0.4)]"
          >
            <Download className="w-4 h-4" />
            Resume
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[70px] left-0 right-0 glass border-b border-[#c6f90633] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-lg font-medium text-gray-300 hover:text-[#c6f906] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <button className="flex items-center gap-2 px-5 py-2.5 border border-[#c6f906] text-[#c6f906] rounded-full text-sm font-medium w-full justify-center">
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
