import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, CheckCircle2, BookOpen, Code2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const courseModules = [
    { name: 'ABAP Fundamentals', completed: true },
    { name: 'Data Dictionary', completed: true },
    { name: 'Reports & ALV', completed: true },
    { name: 'Modularization', completed: true },
    { name: 'Enhancements', completed: true },
  ];

  const timelineMonths = [
    { month: 'June', status: 'completed', description: 'ABAP Basics & Syntax' },
    { month: 'July', status: 'completed', description: 'Data Dictionary & Tables' },
    { month: 'August', status: 'completed', description: 'Reports & Debugging' },
    { month: 'September', status: 'completed', description: 'Advanced Concepts' },
  ];

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
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);
    }

    // Main card animation with 3D flip
    if (cardRef.current) {
      const cardTrigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            { rotateY: -90, opacity: 0, transformPerspective: 1000 },
            { rotateY: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    }

    // Badge animation with pulse
    if (badgeRef.current) {
      const badgeTrigger = ScrollTrigger.create({
        trigger: badgeRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            badgeRef.current,
            { scale: 0, rotate: -180 },
            { 
              scale: 1, 
              rotate: 0, 
              duration: 0.8, 
              ease: 'elastic.out(1, 0.5)',
              delay: 0.5
            }
          );
          // Continuous subtle pulse
          gsap.to(badgeRef.current, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.3
          });
        },
        once: true,
      });
      triggers.push(badgeTrigger);
    }

    // Timeline animation
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item, i) => {
      const itemTrigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: i * 0.15, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(itemTrigger);
    });

    // Module checkmarks stagger animation
    const modules = section.querySelectorAll('.module-item');
    modules?.forEach((module, i) => {
      const moduleTrigger = ScrollTrigger.create({
        trigger: module,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            module,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, delay: i * 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(moduleTrigger);
    });

    // Floating particles animation
    const particles = section.querySelectorAll('.floating-particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#c6f906]/5 blur-3xl floating-particle" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl floating-particle" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-purple-500/5 blur-2xl floating-particle" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold"
          >
            Course{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6f906] to-[#a8d905]">
              Certified
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Professional training and certification in enterprise technologies
          </p>
        </div>

        {/* Main Certification Card */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Certificate Card */}
          <div
            ref={cardRef}
            className="relative group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated border glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#c6f906] via-blue-500 to-[#c6f906] opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 animate-gradient-x" />
            
            <div className="relative p-8 rounded-2xl glass border border-[#c6f906]/20 hover:border-[#c6f906]/40 transition-all duration-500">
              {/* SAP Logo/Icon Area */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">SAP ABAP</h3>
                    <p className="text-[#c6f906] text-sm font-medium">Professional Certification</p>
                  </div>
                </div>
                
                {/* Completion Badge */}
                <div
                  ref={badgeRef}
                  className="relative"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c6f906] to-[#a8d905] flex items-center justify-center shadow-[0_0_30px_rgba(198,249,6,0.4)]">
                    <Award className="w-10 h-10 text-black" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#c6f906] animate-pulse" />
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-[#c6f906]" />
                  <span>June 2025 - September 2025</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <BookOpen className="w-5 h-5 text-[#c6f906]" />
                  <span>4 Months Intensive Training</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                Completed comprehensive SAP ABAP programming certification covering core concepts, 
                data dictionary management, report development, modularization techniques, 
                and enhancement frameworks for enterprise application development.
              </p>

              {/* Modules Completed */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Modules Completed
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {courseModules.map((module, index) => (
                    <div
                      key={index}
                      className="module-item flex items-center gap-2 text-sm text-gray-300 hover:text-[#c6f906] transition-colors duration-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#c6f906] flex-shrink-0" />
                      <span>{module.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <h4 className="text-lg font-semibold text-white mb-8 text-center lg:text-left">
              Learning Journey
            </h4>
            
            {/* Timeline Line */}
            <div className="absolute left-4 lg:left-8 top-16 bottom-4 w-0.5 bg-gradient-to-b from-[#c6f906] via-blue-500/50 to-transparent" />
            
            <div className="space-y-6">
              {timelineMonths.map((item, index) => (
                <div
                  key={index}
                  className="timeline-item relative flex items-start gap-6 pl-12 lg:pl-16"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-2 lg:left-6 w-4 h-4 rounded-full bg-[#c6f906] shadow-[0_0_15px_rgba(198,249,6,0.5)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="flex-1 p-4 rounded-xl glass border border-white/5 hover:border-[#c6f906]/30 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-white group-hover:text-[#c6f906] transition-colors duration-300">
                        {item.month}
                      </h5>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#c6f906]/10 text-[#c6f906] font-medium">
                        Completed
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Achievement */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#c6f906]/10 to-transparent border border-[#c6f906]/20 ml-12 lg:ml-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c6f906]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#c6f906]" />
                </div>
                <div>
                  <p className="text-white font-medium">Certification Achieved!</p>
                  <p className="text-xs text-gray-400">Successfully completed all modules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
