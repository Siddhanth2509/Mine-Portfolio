import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Programming' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'tools', label: 'Tools' },
    { id: 'cloud', label: 'Cloud/DB' },
  ];

  const skills = [
    // Programming
    { name: 'Python', category: 'programming', level: 90 },
    { name: 'C', category: 'programming', level: 75 },
    { name: 'Java', category: 'programming', level: 70 },
    { name: 'SQL', category: 'programming', level: 80 },
    // Frameworks
    { name: 'Scikit-learn', category: 'frameworks', level: 85 },
    { name: 'TensorFlow', category: 'frameworks', level: 80 },
    { name: 'PyTorch', category: 'frameworks', level: 75 },
    { name: 'Pandas', category: 'frameworks', level: 90 },
    { name: 'NumPy', category: 'frameworks', level: 88 },
    { name: 'OpenCV', category: 'frameworks', level: 78 },
    // Tools
    { name: 'Git', category: 'tools', level: 85 },
    { name: 'GitHub', category: 'tools', level: 88 },
    { name: 'Kaggle', category: 'tools', level: 80 },
    { name: 'Jupyter', category: 'tools', level: 90 },
    { name: 'Streamlit', category: 'tools', level: 82 },
    // Cloud/DB
    { name: 'MySQL', category: 'cloud', level: 80 },
    { name: 'Streamlit Cloud', category: 'cloud', level: 75 },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

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

    // Skills grid animation
    const skillCards = gridRef.current?.querySelectorAll('.skill-card');
    if (skillCards) {
      skillCards.forEach((card, i) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { scale: 0, rotate: 180 },
              { scale: 1, rotate: 0, duration: 0.4, delay: i * 0.05, ease: 'back.out(1.7)' }
            );
          },
          once: true,
        });
        triggers.push(cardTrigger);
      });
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [filteredSkills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#c6f90604_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-center opacity-0"
        >
          MY <span className="text-[#c6f906]">SKILLS</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#c6f906] text-black shadow-[0_0_20px_rgba(198,249,6,0.4)]'
                  : 'border border-[#333] text-gray-400 hover:border-[#c6f906] hover:text-[#c6f906]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill) => (
            <div
              key={`${skill.name}-${activeCategory}`}
              className="skill-card group relative"
            >
              <div className="relative p-6 rounded-2xl border border-[#222] bg-[#111] hover:border-[#c6f906] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(198,249,6,0.15)] overflow-hidden">
                {/* Skill Name */}
                <h3 className="text-center text-sm md:text-base font-medium text-white group-hover:text-[#c6f906] transition-colors duration-300 mb-3">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="relative h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c6f906] to-[#8bc34a] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Level Percentage */}
                <p className="text-center text-xs text-gray-500 mt-2 group-hover:text-[#c6f906] transition-colors duration-300">
                  {skill.level}%
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-[#c6f90608] to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Coursework Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center">
            RELEVANT <span className="text-[#c6f906]">COURSEWORK</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Machine Learning',
              'Artificial Intelligence',
              'Data Structures',
              'Database Management',
              'Operating Systems',
              'Computer Networks',
              'Deep Learning',
              'Computer Vision',
            ].map((course, i) => (
              <span
                key={i}
                className="px-5 py-2.5 border border-[#c6f90633] rounded-full text-sm text-gray-300 hover:bg-[#c6f90611] hover:border-[#c6f906] hover:text-[#c6f906] transition-all duration-300"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Areas of Interest */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center">
            AREAS OF <span className="text-[#c6f906]">INTEREST</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Machine Learning Applications',
              'AI in Healthcare',
              'Signal Processing & EEG Analysis',
              'Time-Series Forecasting',
              'Sustainable Technology',
              'AI-Based Decision Support Systems',
            ].map((interest, i) => (
              <div
                key={i}
                className="group p-5 rounded-xl border border-[#222] bg-[#0a0a0a] hover:border-[#c6f90644] transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-3 h-3 bg-[#c6f906] rounded-full shadow-[0_0_10px_#c6f906] group-hover:scale-125 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
