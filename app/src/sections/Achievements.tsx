import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award, Star, Target, BookOpen, Rocket, Code2, Crown, ExternalLink } from 'lucide-react';

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
      link: '/Certificate.pdf',
    },
    {
      icon: Trophy,
      title: '3rd Position',
      subtitle: 'Tech Session 2.0',
      description: 'Secured 3rd position in a technical event organized by AI-Innovators, Department of CSE-AI&ML, RKGIT.',
      date: 'Apr 2025',
      color: '#c6f906',
      link: '/Tech_Session_Certificate.pdf',
    },
    {
      icon: Award,
      title: 'Viksit Uttar Pradesh @2047',
      subtitle: 'Certificate of Participation',
      description: 'Recognized for valuable suggestions contributing to the development and progress of Uttar Pradesh under the Viksit UP initiative.',
      date: '2024',
      color: '#06f9c6',
      link: '/Certificate.pdf',
    },
    {
      icon: BookOpen,
      title: 'DeepLearning.AI',
      subtitle: 'Supervised Machine Learning',
      description: 'Completed Andrew Ng\'s foundational course covering regression, classification, and model optimization.',
      date: 'Nov 2024',
      color: '#0056D2',
      link: '/DeepLearning_AI_ML.pdf',
    },
    {
      icon: Star,
      title: 'C++ for C Programmers',
      subtitle: 'UC Santa Cruz - Coursera',
      description: 'Completed professional course authorized by University of California, Santa Cruz, strengthening object-oriented foundations.',
      date: 'Nov 2023',
      color: '#a8d905',
      link: '/UC_Santa_Cruz_Cplusplus.pdf',
    },
    {
      icon: Rocket,
      title: 'IIT Roorkee Ideastorm',
      subtitle: 'E-Summit \'24 Innovation Showcase',
      description: 'Showcased sustainable agricultural drone innovation at IIT Roorkee\'s E-Summit Ideastorm startup competition.',
      date: '2024',
      color: '#ff9800',
      link: '/IIT_Roorkee_Ideastorm.pdf',
    },
    {
      icon: Target,
      title: 'Airborne Archers',
      subtitle: 'Drone Archery Showdown',
      description: 'Awarded completion certificate for participating in the drone archery and flying showdown by Pushpak Flying Club.',
      date: 'Oct 2023',
      color: '#e91e63',
      link: '/Pushpak_Drone_Archery.pdf',
    },
    {
      icon: Code2,
      title: 'CodersClash',
      subtitle: 'CodeChef RKGIT Chapter',
      description: 'Participated in the competitive coding contest CodersClash, organized by Logix - The Technical Society of IT.',
      date: 'Dec 2023',
      color: '#9c27b0',
      link: '/CodersClash_Appreciation.pdf',
    },
    {
      icon: Crown,
      title: 'Microsoft Learn',
      subtitle: 'Azure & AI Achievements',
      description: 'Earned learning achievements and modules in Azure cloud services, data structures, and AI application workflows.',
      date: '2024',
      color: '#00a300',
      link: '/Microsoft_Learn_Achievements.pdf',
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

    // Cards animation
    const cards = gridRef.current?.querySelectorAll('.achievement-card');
    cards?.forEach((card, i) => {
      const directions = [
        { rotateY: -90 },
        { rotateY: 90 },
        { rotateX: 90 },
        { scale: 0, rotate: -10 },
        { y: 40, opacity: 0 },
        { rotateX: -90 },
        { rotateY: -45 },
        { rotateY: 45 },
        { scale: 0.8, y: 50 },
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
              delay: (i % 3) * 0.1, 
              ease: 'expo.out' 
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c6f90605] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c6f90603] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 text-center opacity-0"
        >
          ACHIEVEMENTS <span className="text-[#c6f906]">&</span> CERTIFICATIONS
        </h2>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="achievement-card group relative opacity-0 flex flex-col"
              style={{ perspective: '1000px' }}
            >
              <div className="relative flex-1 flex flex-col justify-between p-6 rounded-2xl border-l-4 border-[#222] bg-[#111] hover:border-l-[#c6f906] hover:bg-[#161616] transition-all duration-500 overflow-hidden">
                <div>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${achievement.color}15` }}
                  >
                    <achievement.icon 
                      className="w-7 h-7 transition-colors duration-300" 
                      style={{ color: achievement.color }}
                    />
                  </div>

                  <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-[#c6f906] transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{achievement.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {achievement.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-600 px-2 py-1 bg-[#222] rounded flex-shrink-0">
                    {achievement.date}
                  </span>
                  
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#c6f906] px-3 py-1.5 bg-[#c6f90611] rounded border border-[#c6f90633] hover:bg-[#c6f906] hover:text-black transition-all duration-300 relative z-10 flex items-center gap-1"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

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
