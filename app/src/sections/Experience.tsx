import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);
    }

    // Timeline line animation
    const timelineLine = timelineRef.current?.querySelector('.timeline-line');
    if (timelineLine) {
      const lineTrigger = ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            timelineLine,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'top' }
          );
        },
        once: true,
      });
      triggers.push(lineTrigger);
    }

    // Experience cards animation
    const cards = timelineRef.current?.querySelectorAll('.exp-card');
    const nodes = timelineRef.current?.querySelectorAll('.timeline-node');

    cards?.forEach((card, i) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, delay: i * 0.15, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    });

    nodes?.forEach((node, i) => {
      const nodeTrigger = ScrollTrigger.create({
        trigger: node,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            node,
            { y: -30, scale: 0 },
            { y: 0, scale: 1, duration: 0.6, delay: i * 0.15, ease: 'back.out(1.7)' }
          );
        },
        once: true,
      });
      triggers.push(nodeTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const experiences = [
    {
      role: 'AI/ML Intern',
      company: 'Qmansys Infosolutions LLP',
      location: 'New Delhi, India',
      duration: 'July 2025 - October 2025',
      type: 'Hybrid',
      description:
        'Worked on an AI-based EEG brainwave analysis project focused on predicting patients\' emotional and cognitive states from brainwave signals. Conducted literature survey, data preprocessing, feature extraction, and ML model integration with GUI-based systems.',
      skills: ['Python', 'Machine Learning', 'EEG Analysis', 'Signal Processing'],
      link: '#',
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c6f90604] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-20 text-center opacity-0"
        >
          PROFESSIONAL <span className="text-[#c6f906]">EXPERIENCE</span>
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c6f906] via-[#c6f90688] to-transparent transform -translate-x-1/2 hidden lg:block scale-y-0" />

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, i) => (
              <div key={i} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                {/* Timeline Node */}
                <div className="timeline-node hidden lg:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                  <div className="w-4 h-4 bg-[#c6f906] rounded-full shadow-[0_0_20px_#c6f906] animate-pulse-glow" />
                </div>

                {/* Card */}
                <div
                  className={`exp-card lg:${i % 2 === 0 ? 'col-start-1' : 'col-start-2'} opacity-0`}
                >
                  <div className="group relative p-8 rounded-2xl border border-[#333] bg-[#111] hover:border-[#c6f906] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(198,249,6,0.1)]">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white group-hover:text-[#c6f906] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg text-gray-400">{exp.company}</span>
                          <a
                            href={exp.link}
                            className="text-[#c6f906] hover:scale-110 transition-transform duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium text-[#c6f906] border border-[#c6f90644] rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#c6f906]" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#c6f906]" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-6">{exp.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="px-3 py-1.5 text-sm text-gray-300 bg-[#222] rounded-lg border border-[#333] hover:border-[#c6f906] hover:text-[#c6f906] transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                      <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[#c6f906] to-transparent transform rotate-45 origin-top-right" />
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${i % 2 === 0 ? 'col-start-2' : 'col-start-1 row-start-1'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-10 text-center">
            <span className="text-[#c6f906]">EDUCATION</span> BACKGROUND
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                degree: 'B.Tech in CSE-AIML',
                school: 'Raj Kumar Goel Institute of Technology',
                location: 'Ghaziabad, India',
                period: '2022 - 2026',
                score: 'CGPA: 8.22/10',
              },
              {
                degree: 'ISC (Class XII)',
                school: 'St. Conrad\'s Inter College',
                location: 'Agra, India',
                period: '2019 - 2020',
                score: 'Percentage: 80%',
              },
            ].map((edu, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl border border-[#222] bg-[#0a0a0a] hover:border-[#c6f90644] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-display font-semibold text-white group-hover:text-[#c6f906] transition-colors duration-300">
                    {edu.degree}
                  </h4>
                  <span className="text-xs text-gray-500 px-2 py-1 bg-[#222] rounded">
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-400 mb-2">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-3">{edu.location}</p>
                <span className="inline-block px-3 py-1 text-sm text-[#c6f906] border border-[#c6f90644] rounded-full">
                  {edu.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
