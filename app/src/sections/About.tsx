import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    if (titleRef.current) {
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);
    }

    // Image animation
    if (imageRef.current) {
      const imgTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { rotate: -10, scale: 0.9, opacity: 0 },
            { rotate: -3, scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(imgTrigger);

      // Parallax effect
      const parallaxTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: (self.progress - 0.5) * 100,
              rotate: -3 + self.progress * 6,
            });
          }
        },
      });
      triggers.push(parallaxTrigger);
    }

    // Content paragraphs
    const paragraphs = contentRef.current?.querySelectorAll('.about-text');
    if (paragraphs) {
      paragraphs.forEach((para, i) => {
        const paraTrigger = ScrollTrigger.create({
          trigger: para,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              para,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, delay: i * 0.15, ease: 'expo.out' }
            );
          },
          once: true,
        });
        triggers.push(paraTrigger);
      });
    }

    // Stats animation
    const statCards = statsRef.current?.querySelectorAll('.stat-card');
    if (statCards) {
      statCards.forEach((card, i) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.7)' }
            );
          },
          once: true,
        });
        triggers.push(cardTrigger);
      });
    }

    // Counter animation
    const counters = statsRef.current?.querySelectorAll('.counter');
    if (counters) {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const counterTrigger = ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              { value: 0 },
              { value: target },
              {
                duration: 1.5,
                ease: 'expo.out',
                onUpdate: function () {
                  counter.textContent = Math.floor(this.targets()[0].value).toString();
                },
              }
            );
          },
          once: true,
        });
        triggers.push(counterTrigger);
      });
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { icon: Briefcase, value: 2, suffix: '+', label: 'Years Experience' },
    { icon: Code, value: 10, suffix: '+', label: 'Projects Completed' },
    { icon: Award, value: 15, suffix: '+', label: 'Technologies' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c6f90608] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 opacity-0"
        >
          ABOUT <span className="text-[#c6f906]">ME</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative group opacity-0"
          >
            <div className="relative overflow-hidden rounded-2xl border-3 border-[#c6f906] transform -rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-2">
              {/* Placeholder for About Image */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#c6f90622] flex items-center justify-center border-2 border-[#c6f906]">
                    <span className="text-5xl font-display font-bold text-[#c6f906]">S</span>
                  </div>
                  <p className="text-gray-500 text-sm">Siddhanth Sharma</p>
                  <p className="text-[#c6f906] text-xs mt-1">AI/ML Engineer</p>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(198,249,6,0.2)]" />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#c6f90633] rounded-full animate-pulse-glow" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#c6f90611] rounded-full animate-float" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-6">
            <p className="about-text text-lg md:text-xl text-gray-300 leading-relaxed opacity-0">
              I&apos;m a passionate <span className="text-[#c6f906] font-semibold">AI/ML Engineer</span> with expertise 
              in building intelligent systems that make a difference. My journey in technology started 
              with a curiosity about how machines can learn and evolve.
            </p>
            
            <p className="about-text text-base md:text-lg text-gray-400 leading-relaxed opacity-0">
              Currently pursuing my <span className="text-white">B.Tech in CSE-AIML</span> at Raj Kumar Goel 
              Institute of Technology with a CGPA of <span className="text-[#c6f906]">8.22/10</span>, I&apos;ve worked 
              on projects ranging from EEG brainwave analysis to computer vision applications.
            </p>

            <p className="about-text text-base md:text-lg text-gray-400 leading-relaxed opacity-0">
              My experience at <span className="text-white">Qmansys Infosolutions LLP</span> as an AI/ML Intern 
              gave me hands-on experience with real-world machine learning pipelines, from data preprocessing 
              to model deployment.
            </p>

            {/* Quick Info */}
            <div className="about-text pt-4 opacity-0">
              <div className="flex flex-wrap gap-4">
                {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Signal Processing'].map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-[#c6f90644] rounded-full text-sm text-[#c6f906] hover:bg-[#c6f90611] transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card group relative p-8 rounded-2xl border border-[#c6f90622] bg-[#111] hover:border-[#c6f906] transition-all duration-500 hover:-translate-y-2 opacity-0"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-[#c6f90615] flex items-center justify-center group-hover:bg-[#c6f906] transition-colors duration-300">
                  <stat.icon className="w-7 h-7 text-[#c6f906] group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="counter text-4xl md:text-5xl font-display font-bold text-white" data-target={stat.value}>
                      0
                    </span>
                    <span className="text-2xl text-[#c6f906]">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </div>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(198,249,6,0.15)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
