import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Trophy, Target, Rocket, ChevronLeft, ChevronRight, Crown, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PushpakClub = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Club gallery images - Using your actual image files from public/pushpak/
  const galleryImages = [
    {
      src: '/pushpak/AeroTrack.png',
      alt: 'Aerotrack F1 Event',
      caption: 'Aerotrack F1 - Drone Racing Event',
    },
    {
      src: '/pushpak/Workshop.jpg',
      alt: 'Drone Workshop',
      caption: 'Technical Workshop Session',
    },
    {
      src: '/pushpak/team.jpg',
      alt: 'Team Photo',
      caption: 'Team Pushpak',
    },
    {
      src: '/pushpak/Event.jpg',
      alt: 'Competition',
      caption: 'Airborne Archers Competition',
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

    // Content animation
    if (contentRef.current) {
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);
    }

    // Gallery animation
    if (galleryRef.current) {
      const galleryTrigger = ScrollTrigger.create({
        trigger: galleryRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            galleryRef.current,
            { rotateY: 30, opacity: 0 },
            { rotateY: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(galleryTrigger);
    }

    // Activities cards animation
    const activityCards = activitiesRef.current?.querySelectorAll('.activity-card');
    if (activityCards) {
      activityCards.forEach((card, i) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 50, opacity: 0, scale: 0.9 },
              { 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                duration: 0.6, 
                delay: i * 0.1, 
                ease: 'back.out(1.7)' 
              }
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
  }, []);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const activities = [
    {
      icon: Plane,
      title: 'Drone Development',
      description: 'Building and programming autonomous drones for various applications including surveillance and delivery systems.',
    },
    {
      icon: Trophy,
      title: 'Aerotrack F1',
      description: 'Currently conducting Aerotrack F1 - an exciting drone racing and innovation event as Technical Head.',
    },
    {
      icon: Rocket,
      title: 'Innovation Projects',
      description: 'Working on agricultural drone innovation presented at IIT Roorkee Ideastorm for sustainable farming solutions.',
    },
    {
      icon: Target,
      title: 'Technical Workshops',
      description: 'Organizing and leading workshops on flight dynamics, embedded systems, and drone programming.',
    },
  ];

  const highlights = [
    { label: 'Events Conducted', value: '5+' },
    { label: 'Projects Built', value: '3+' },
    { label: 'Team Members', value: '20+' },
  ];

  return (
    <section
      id="pushpak"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#c6f90608] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#06c6f908] rounded-full blur-3xl" />
      </div>

      {/* Animated Plane Icon */}
      <div className="absolute top-20 right-10 opacity-10 animate-float">
        <Plane className="w-24 h-24 text-[#c6f906]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 text-center opacity-0"
        >
          PUSHPAK <span className="text-[#c6f906]">FLYING CLUB</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Content */}
          <div ref={contentRef} className="space-y-6 opacity-0">
            {/* Technical Head Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#c6f90622] to-[#c6f90611] border border-[#c6f906] mb-4">
              <Crown className="w-5 h-5 text-[#c6f906]" />
              <span className="text-[#c6f906] font-semibold text-lg">Technical Head</span>
            </div>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              <span className="text-[#c6f906] font-semibold">PUSHPAK: The Flying Club</span> is RKGIT's 
              premier aviation and drone technology club. As the <span className="text-white font-semibold">Technical Head</span>, 
              I lead technical initiatives and organize events that push the boundaries of drone technology.
            </p>

            {/* Current Event Highlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#c6f90615] to-transparent border-l-4 border-[#c6f906]">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#c6f906]" />
                <span className="text-[#c6f906] font-semibold">Currently Conducting</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">AEROTRACK F1</h3>
              <p className="text-gray-400 text-sm">
                An exciting drone racing and innovation event featuring high-speed drone races, 
                technical challenges, and innovation showcases.
              </p>
            </div>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              My journey includes participating in <span className="text-white">Airborne Archers - Drone Archery Showdown</span> 
              {' '}and contributing to agricultural drone innovation at IIT Roorkee Ideastorm.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {highlights.map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl border border-[#c6f90622] bg-[#111] hover:border-[#c6f906] transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-display font-bold text-[#c6f906]">{item.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery Carousel */}
          <div
            ref={galleryRef}
            className="relative opacity-0"
            style={{ perspective: '1200px' }}
          >
            <div className="relative h-[400px] md:h-[450px]">
              {galleryImages.map((image, i) => {
                const offset = i - activeImageIndex;
                const isActive = i === activeImageIndex;
                const isPrev = offset === -1 || (activeImageIndex === 0 && i === galleryImages.length - 1);
                const isNext = offset === 1 || (activeImageIndex === galleryImages.length - 1 && i === 0);

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
                        ? 'translateX(-40%) scale(0.85) rotateY(20deg)'
                        : isNext
                        ? 'translateX(40%) scale(0.85) rotateY(-20deg)'
                        : 'translateX(0) scale(0.7) rotateY(0deg)',
                      opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    }}
                  >
                    <div className="h-full rounded-2xl overflow-hidden border-2 border-[#c6f90644] bg-[#111] group">
                      <div className="relative h-full">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxMTExMTEiLz48cGF0aCBkPSJNMjAwIDEyMEwxNjAgMTgwSDI0MEwyMDAgMTIwWiIgc3Ryb2tlPSIjYzZmOTA2IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBzdHJva2U9IiNjNmY5MDYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjE0Ij5BZGQgaW1hZ2UgdG8gcHVibGljL3B1c2hwYWsvPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                        
                        {/* Caption Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                          <p className="text-white font-semibold text-lg">{image.caption}</p>
                        </div>

                        {/* Hover Glow */}
                        {isActive && (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(198,249,6,0.2)]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-12 h-12 rounded-full bg-[#111] border border-[#c6f906] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-12 h-12 rounded-full bg-[#111] border border-[#c6f906] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeImageIndex
                      ? 'w-8 bg-[#c6f906]'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div
          ref={activitiesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activities.map((activity, i) => (
            <div
              key={i}
              className="activity-card group relative p-6 rounded-2xl border border-[#c6f90622] bg-[#111] hover:border-[#c6f906] transition-all duration-500 hover:-translate-y-2 opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-[#c6f90615] flex items-center justify-center mb-4 group-hover:bg-[#c6f906] transition-colors duration-300">
                <activity.icon className="w-6 h-6 text-[#c6f906] group-hover:text-black transition-colors duration-300" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{activity.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{activity.description}</p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(198,249,6,0.1)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PushpakClub;
