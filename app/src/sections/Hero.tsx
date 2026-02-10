import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Mail, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Greeting typewriter effect
    if (greetingRef.current) {
      tl.fromTo(
        greetingRef.current,
        { width: 0, opacity: 0 },
        { width: 'auto', opacity: 1, duration: 0.6, ease: 'none' }
      );
    }

    // Name character animation
    const nameChars = nameRef.current?.querySelectorAll('.name-char');
    if (nameChars) {
      tl.fromTo(
        nameChars,
        { rotateX: -90, y: 50, opacity: 0 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );
    }

    // Title slide + blur
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { x: -80, opacity: 0, filter: 'blur(10px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out' },
        '-=0.3'
      );
    }

    // Description fade up
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // CTA buttons bounce
    const ctaButtons = ctaRef.current?.querySelectorAll('.cta-btn');
    if (ctaButtons) {
      tl.fromTo(
        ctaButtons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.2'
      );
    }

    // Social icons
    const socialIcons = socialsRef.current?.querySelectorAll('.social-icon');
    if (socialIcons) {
      tl.fromTo(
        socialIcons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'expo.out' },
        '-=0.4'
      );
    }

    // Orbit ring spiral in
    if (orbitRef.current) {
      tl.fromTo(
        orbitRef.current,
        { scale: 0, rotate: 180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.5, ease: 'expo.out' },
        '-=1'
      );
    }

    // Marquee slide up
    if (marqueeRef.current) {
      tl.fromTo(
        marqueeRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.5'
      );
    }

    // Scroll-triggered parallax
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (orbitRef.current) {
          gsap.set(orbitRef.current, {
            y: progress * 40,
            rotate: progress * 45,
          });
        }
        if (nameRef.current) {
          gsap.set(nameRef.current, {
            y: progress * -30,
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[70px]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(198, 249, 6, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198, 249, 6, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* 3D Orbit Ring */}
      <div
        ref={orbitRef}
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] pointer-events-none"
        style={{ perspective: '1000px' }}
      >
        <div
          className="absolute inset-0 border-2 border-[#c6f90633] rounded-full animate-spin-slow"
          style={{ transform: 'rotateX(75deg)' }}
        />
        <div
          className="absolute inset-4 border border-[#c6f90622] rounded-full animate-orbit"
          style={{ transform: 'rotateX(75deg) rotateY(30deg)' }}
        />
        <div
          className="absolute inset-8 border border-dashed border-[#c6f90618] rounded-full"
          style={{ transform: 'rotateX(75deg) rotateY(-20deg)', animation: 'orbit 30s linear infinite reverse' }}
        />
        
        {/* Orbiting Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#c6f906] rounded-full shadow-[0_0_10px_#c6f906]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translateX(200px) rotate(-${i * 60}deg)`,
              animation: `orbit ${15 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Greeting */}
            <span
              ref={greetingRef}
              className="inline-block text-[#c6f906] text-lg md:text-xl font-medium tracking-widest overflow-hidden whitespace-nowrap"
            >
              HI, I&apos;M
            </span>

            {/* Name */}
            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-none"
              style={{ perspective: '1000px' }}
            >
              {'SIDDHANTH'.split('').map((char, i) => (
                <span
                  key={i}
                  className="name-char inline-block hover:text-[#c6f906] transition-colors duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char}
                </span>
              ))}
              <br />
              {'SHARMA'.split('').map((char, i) => (
                <span
                  key={i}
                  className="name-char inline-block text-[#c6f906] hover:text-white transition-colors duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Title */}
            <p
              ref={titleRef}
              className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
            >
              AI/ML Engineer <span className="text-[#c6f906]">&</span> Creative Technologist
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed"
            >
              Transforming data into intelligent solutions. I build machine learning models 
              that solve real-world problems and create impactful technology.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="cta-btn group flex items-center gap-3 px-8 py-4 bg-[#c6f906] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(198,249,6,0.5)] transition-all duration-300 hover:scale-105"
              >
                View My Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button
                onClick={scrollToContact}
                className="cta-btn flex items-center gap-3 px-8 py-4 border-2 border-[#c6f906] text-[#c6f906] font-semibold rounded-full hover:bg-[#c6f906] hover:text-black transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 pt-6">
              {[
                { icon: Globe, href: 'https://siddhanthsharma.vercel.app/', label: 'Portfolio' },
                { icon: Github, href: 'https://github.com/Siddhanth2509', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/siddhanth-sharma2509', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:siddhanth2325@gmail.com', label: 'Email' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:text-[#c6f906] hover:border-[#c6f906] hover:shadow-[0_0_15px_rgba(198,249,6,0.3)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - 3D Visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Central 3D Element */}
            <div className="relative w-[350px] h-[350px]" style={{ perspective: '1000px' }}>
              {/* Floating Geometric Shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-48 h-48 border-2 border-[#c6f906] rotate-45 animate-float"
                  style={{ transform: 'rotateX(45deg) rotateZ(45deg)' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-32 bg-[#c6f90622] animate-float-slow"
                  style={{ transform: 'rotateX(60deg) rotateY(30deg)', animationDelay: '-2s' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#c6f906] rounded-full animate-pulse-glow" />
              </div>
              
              {/* Floating Particles Around */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#c6f906] rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="absolute bottom-0 left-0 right-0 py-6 border-t border-[#c6f90622] overflow-hidden"
      >
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 px-4">
              {[
                'INNOVATE',
                'CODE',
                'DEPLOY',
                'REPEAT',
                'PYTHON',
                'TENSORFLOW',
                'PYTORCH',
                'MACHINE LEARNING',
                'DEEP LEARNING',
                'COMPUTER VISION',
              ].map((text, i) => (
                <span key={i} className="flex items-center gap-8 text-gray-500 text-sm font-medium tracking-widest">
                  {text}
                  <span className="w-2 h-2 bg-[#c6f906] rounded-full" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
