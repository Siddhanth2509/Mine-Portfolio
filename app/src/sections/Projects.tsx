import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: 'Underground Water Level Predictor',
      category: 'Machine Learning',
      description:
        'Time-series ML model for predicting groundwater levels using historical data and seasonal patterns. Engineered features like lag variables, rolling means, and seasonal indicators to capture groundwater trends.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Time-Series Analysis'],
      links: { demo: '#', github: '#' },
      color: '#c6f906',
    },
    {
      title: 'Eye Assist - Disease Detection',
      category: 'Computer Vision',
      description:
        'CNN-based medical image classification system for detecting eye diseases from retinal fundus images. Addressed class imbalance and focused on cross-dataset generalization to reduce overfitting.',
      tech: ['TensorFlow', 'OpenCV', 'CNN', 'Transfer Learning', 'Medical Imaging'],
      links: { github: '#' },
      color: '#06f9c6',
    },
    {
      title: 'EEG Brainwave Analysis',
      category: 'Signal Processing',
      description:
        'Real-time emotional and cognitive state prediction from EEG signals using machine learning. Integrated trained ML models with a GUI-based system for real-time prediction and visualization.',
      tech: ['Python', 'Signal Processing', 'ML', 'GUI Development', 'Healthcare AI'],
      links: { demo: '#' },
      color: '#f906c6',
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
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);
    }

    // Carousel animation
    if (carouselRef.current) {
      const carouselTrigger = ScrollTrigger.create({
        trigger: carouselRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            carouselRef.current,
            { rotateY: 45, opacity: 0 },
            { rotateY: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(carouselTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c6f90608] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c6f90605] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 text-center opacity-0"
        >
          FEATURED <span className="text-[#c6f906]">PROJECTS</span>
        </h2>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          style={{ perspective: '1200px' }}
        >
          {/* Cards Container */}
          <div className="relative h-[500px] md:h-[450px]">
            {projects.map((project, i) => {
              const offset = i - activeIndex;
              const isActive = i === activeIndex;
              const isPrev = offset === -1 || (activeIndex === 0 && i === projects.length - 1);
              const isNext = offset === 1 || (activeIndex === projects.length - 1 && i === 0);

              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? 'z-20' : isPrev || isNext ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    transform: isActive
                      ? 'translateX(0) scale(1) rotateY(0deg)'
                      : isPrev
                      ? 'translateX(-60%) scale(0.8) rotateY(25deg)'
                      : isNext
                      ? 'translateX(60%) scale(0.8) rotateY(-25deg)'
                      : 'translateX(0) scale(0.6) rotateY(0deg)',
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="h-full group">
                    <div className="relative h-full p-8 md:p-10 rounded-3xl border border-[#333] bg-gradient-to-br from-[#111] to-[#0a0a0a] hover:border-[#c6f906] transition-all duration-500 overflow-hidden">
                      {/* Background Glow */}
                      <div
                        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                        style={{ backgroundColor: project.color }}
                      />

                      {/* Content */}
                      <div className="relative h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <span
                              className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3"
                              style={{ color: project.color, backgroundColor: `${project.color}22` }}
                            >
                              {project.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-[#c6f906] transition-colors duration-300">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <p className="text-sm text-gray-500 mb-3">Technologies Used</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, j) => (
                              <span
                                key={j}
                                className="px-3 py-1.5 text-sm text-gray-300 bg-[#222] rounded-lg border border-[#333] hover:border-[#c6f906] hover:text-[#c6f906] transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              className="flex items-center gap-2 px-5 py-2.5 bg-[#c6f906] text-black font-medium rounded-full hover:shadow-[0_0_20px_rgba(198,249,6,0.4)] transition-all duration-300 hover:scale-105 group/link"
                            >
                              Live Demo
                              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-gray-300 rounded-full hover:border-[#c6f906] hover:text-[#c6f906] transition-all duration-300"
                            >
                              <Github className="w-4 h-4" />
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:text-[#c6f906] hover:border-[#c6f906] hover:shadow-[0_0_15px_rgba(198,249,6,0.3)] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-[#c6f906] w-8 shadow-[0_0_10px_#c6f906]'
                      : 'bg-[#333] hover:bg-[#555]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:text-[#c6f906] hover:border-[#c6f906] hover:shadow-[0_0_15px_rgba(198,249,6,0.3)] transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* View All Projects Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c6f906] transition-colors duration-300 group"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
