import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const triggers: ScrollTrigger[] = [];

    // Top line draw animation
    if (topLineRef.current) {
      const lineTrigger = ScrollTrigger.create({
        trigger: footer,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            topLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'expo.out', transformOrigin: 'center' }
          );
        },
        once: true,
      });
      triggers.push(lineTrigger);
    }

    // Brand animation
    if (brandRef.current) {
      const letters = brandRef.current.querySelectorAll('.brand-letter');
      const brandTrigger = ScrollTrigger.create({
        trigger: brandRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            letters,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, stagger: 0.03, ease: 'none' }
          );
        },
        once: true,
      });
      triggers.push(brandTrigger);
    }

    // Social icons
    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll('.social-icon');
      const socialsTrigger = ScrollTrigger.create({
        trigger: socialsRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            icons,
            { scale: 0 },
            { scale: 1, duration: 0.4, stagger: 0.1, ease: 'elastic.out(1, 0.5)' }
          );
        },
        once: true,
      });
      triggers.push(socialsTrigger);
    }

    // Links animation
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.footer-link');
      const linksTrigger = ScrollTrigger.create({
        trigger: linksRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            links,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(linksTrigger);
    }

    // Copyright
    if (copyrightRef.current) {
      const copyrightTrigger = ScrollTrigger.create({
        trigger: copyrightRef.current,
        start: 'top 95%',
        onEnter: () => {
          gsap.fromTo(
            copyrightRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.5, ease: 'none' }
          );
        },
        once: true,
      });
      triggers.push(copyrightTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Pushpak', href: '#pushpak' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/siddhanth-sharma2509', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Siddhanth2509', label: 'GitHub' },
    { icon: Mail, href: 'mailto:siddhanth2325@gmail.com', label: 'Email' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 pb-8 overflow-hidden"
    >
      {/* Top Border Line */}
      <div
        ref={topLineRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c6f90644] to-transparent scale-x-0"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div ref={brandRef}>
            <a href="#home" className="inline-block text-3xl font-display font-bold mb-4">
              {'SIDDHANTH'.split('').map((letter, i) => (
                <span key={i} className="brand-letter opacity-0 hover:text-[#c6f906] transition-colors duration-300">
                  {letter}
                </span>
              ))}
            </a>
            <p className="text-gray-500 text-sm mb-6">
              AI/ML Engineer & Creative Technologist
            </p>
            
            {/* Social Icons */}
            <div ref={socialsRef} className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:text-[#c6f906] hover:border-[#c6f906] hover:shadow-[0_0_15px_rgba(198,249,6,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">
              Quick <span className="text-[#c6f906]">Links</span>
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="footer-link group flex items-center gap-2 text-gray-400 hover:text-[#c6f906] transition-all duration-300 hover:translate-x-2 opacity-0"
                  >
                    <span className="w-0 h-[1px] bg-[#c6f906] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">
              Get In <span className="text-[#c6f906]">Touch</span>
            </h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>
                <span className="text-gray-500">Email:</span>{' '}
                <a href="mailto:siddhanth2325@gmail.com" className="hover:text-[#c6f906] transition-colors duration-300">
                  siddhanth2325@gmail.com
                </a>
              </p>
              <p>
                <span className="text-gray-500">Phone:</span>{' '}
                <a href="tel:+917819995992" className="hover:text-[#c6f906] transition-colors duration-300">
                  +91 7819995992
                </a>
              </p>
              <p>
                <span className="text-gray-500">Location:</span> Ghaziabad, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={copyrightRef}
          className="pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0"
        >
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © 2025 Siddhanth Sharma. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{' '}
            and lots of code.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-[#c6f906] transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center group-hover:border-[#c6f906] group-hover:bg-[#c6f906] transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:text-black transition-colors duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
