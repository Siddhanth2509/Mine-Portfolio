import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award, Star, FileBadge, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      icon: Medal,
      title: 'Gold Medalist',
      subtitle: 'Image Booster Soft Skills Course',
      description: 'Awarded Certificate of Excellence and Gold Medal for leadership, communication, and professional skills development.',
      date: 'Jan 2024',
      color: '#FFD700',
    },
    {
      icon: Trophy,
      title: '3rd Position',
      subtitle: 'Tech Session 2.0',
      description: 'Secured 3rd position in a technical event organized by AI-Innovators, Department of CSE-AI&ML, RKGIT.',
      date: 'Apr 2025',
      color: '#c6f906',
    },
    {
      icon: FileBadge,
      title: 'Oracle Fusion Cloud',
      subtitle: 'Professional Certification',
      description: 'Earned professional certification in Oracle Fusion Cloud, covering enterprise cloud fundamentals.',
      date: '2024',
      color: '#F80000',
    },
    {
      icon: Award,
      title: 'Machine Learning & Python',
      subtitle: 'Coursera Certification',
      description: 'Completed foundational coursework covering machine learning concepts and Python programming.',
      date: '2024',
      color: '#0056D2',
    },
    {
      icon: Star,
      title: 'C++ for C Programmers',
      subtitle: 'UC Santa Cruz - Coursera',
      description: 'Completed online course authorized by University of California, Santa Cruz, strengthening C++ fundamentals.',
      date: 'Nov 2023',
      color: '#c6f906',
    },
    {
      icon: Target,
      title: 'Airborne Archers',
      subtitle: 'Drone Archery Showdown',
      description: 'Participated in an aviation-focused drone competition organized by PUSHPAK: The Flying Club.',
      date: 'Oct 2023',
      color: '#06f9c6',
    },
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
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);
    }

    // Cards animation with staggered directions
    const cards = gridRef.current?.querySelectorAll('.achievement-card');
    cards?.forEach((card, i) => {
      const directions = [
        { rotateY: -90 },
        { rotateY: 90 },
        { rotateX: 90 },
        { scale: 0, rotate: -10 },
        { y: 40, opacity: 0 },
        { rotateX: -90 },
      ];
      
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { ...directions[i % directions.length], opacity: 0 },
            { 
              rotateY: 0, 
              rotateX: 0, 
              scale: 1, 
              rotate: 0, 
              y: 0, 
              opacity: 1, 
              duration: 0.7, 
              delay: i * 0.1, 
              ease: i % 4 === 3 ? 'back.out(1.7)' : 'expo.out' 
            }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c6f90605] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c6f90603] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 text-center opacity-0"
        >
          ACHIEVEMENTS <span className="text-[#c6f906]">&</span> CERTIFICATIONS
        </h2>

        {/* Achievements Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="achievement-card group relative opacity-0"
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full p-6 rounded-2xl border-l-4 border-[#222] bg-[#111] hover:border-l-[#c6f906] hover:bg-[#161616] transition-all duration-500 overflow-hidden">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${achievement.color}15` }}
                >
                  <achievement.icon 
                    className="w-7 h-7 transition-colors duration-300" 
                    style={{ color: achievement.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-[#c6f906] transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{achievement.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {achievement.description}
                </p>

                {/* Date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 px-2 py-1 bg-[#222] rounded">
                    {achievement.date}
                  </span>
                  
                  {/* Shine Effect */}
                  <div className="absolute top-0 right-0 w-20 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <div 
                      className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#c6f906] to-transparent transform translate-x-0 group-hover:translate-x-[-80px] transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(198,249,6,0.05)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Also participated in{' '}
            <span className="text-[#c6f906]">Binarycodes Coding Contest</span>,{' '}
            <span className="text-[#c6f906]">Robo Soccer</span>, and{' '}
            <span className="text-[#c6f906]">IIT Roorkee Ideastorm</span> for Agricultural Drone innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
