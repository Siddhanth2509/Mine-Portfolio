import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Headline word-by-word animation
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word');
      const headlineTrigger = ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            words,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(headlineTrigger);
    }

    // Subtext animation
    if (subtextRef.current) {
      const subtextTrigger = ScrollTrigger.create({
        trigger: subtextRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            subtextRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(subtextTrigger);
    }

    // Button bounce in
    if (buttonRef.current) {
      const buttonTrigger = ScrollTrigger.create({
        trigger: buttonRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            buttonRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, delay: 0.7, ease: 'elastic.out(1, 0.5)' }
          );
        },
        once: true,
      });
      triggers.push(buttonTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToContact = () => {
    const footer = document.querySelector('#contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c6f906] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#c6f906] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-[#c6f906] animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-[#c6f906] opacity-50" />
          </div>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
        >
          {'LET\'S BUILD SOMETHING'.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-3 opacity-0">
              {word}
            </span>
          ))}
          <br />
          <span className="word inline-block text-[#c6f906] opacity-0">AMAZING</span>
          <span className="word inline-block ml-3 opacity-0">TOGETHER</span>
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto opacity-0"
        >
          Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
        </p>

        {/* CTA Button */}
        <button
          ref={buttonRef}
          onClick={scrollToContact}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[#c6f906] text-[#c6f906] font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 opacity-0"
        >
          {/* Background Fill Animation */}
          <span className="absolute inset-0 bg-[#c6f906] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          
          {/* Content */}
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">
            GET IN TOUCH
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:text-black group-hover:translate-x-2 transition-all duration-500" />
          
          {/* Glow Effect */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(198,249,6,0.5)]" />
        </button>

        {/* Contact Info */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {[
            { label: 'Email', value: 'siddhanth2325@gmail.com', href: 'mailto:siddhanth2325@gmail.com' },
            { label: 'Phone', value: '+91 7819995992', href: 'tel:+917819995992' },
            { label: 'Location', value: 'Ghaziabad, India', href: '#' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group p-6 rounded-xl border border-[#222] bg-[#111] hover:border-[#c6f90644] transition-all duration-300"
            >
              <p className="text-sm text-gray-500 mb-2">{item.label}</p>
              <p className="text-white group-hover:text-[#c6f906] transition-colors duration-300">
                {item.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
