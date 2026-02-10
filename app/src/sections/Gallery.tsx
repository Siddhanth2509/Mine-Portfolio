import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Camera, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery images - Add your images to public/gallery/ folder
  // Or use Google Drive direct links: https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
  const galleryImages = [
    {
      src: '/gallery/Medal.jpg',
      alt: 'Gold Medal Achievement',
      caption: 'Gold Medal - Image Booster Soft Skills',
    },
    {
      src: '/gallery/TechSession1.png',
      alt: 'Tech Session Event',
      caption: 'Tech Session 2.0 - 3rd Position',
    },
    {
      src: '/gallery/oracle.png',
      alt: 'Oracle Certification',
      caption: 'Oracle Fusion Cloud Certification',
    },
    {
      src: '/gallery/Aerotrack.png',
      alt: 'Aerotrack Project',
      caption: 'Aerotrack - Flight Tracking System',
    },
    {
      src: '/gallery/Pushpak.png',
      alt: 'Pushpak Flying Club',
      caption: 'Pushpak - The Flying Club',
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
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Handle body overflow when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section
      id="gallery"
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c6f90615] border border-[#c6f90633] mb-6">
            <Camera className="w-4 h-4 text-[#c6f906]" />
            <span className="text-[#c6f906] text-sm font-medium">Photo Gallery</span>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold opacity-0"
          >
            MEMORY <span className="text-[#c6f906]">LANE</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Capturing moments from events, achievements, and the journey so far.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          style={{ perspective: '1200px' }}
        >
          {/* Cards Container */}
          <div className="relative h-[400px] md:h-[500px]">
            {galleryImages.map((image, i) => {
              const offset = i - activeIndex;
              const isActive = i === activeIndex;
              const isPrev = offset === -1 || (activeIndex === 0 && i === galleryImages.length - 1);
              const isNext = offset === 1 || (activeIndex === galleryImages.length - 1 && i === 0);

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
                  <div 
                    className="h-full group cursor-pointer"
                    onClick={() => openLightbox(i)}
                  >
                    <div className="h-full rounded-2xl overflow-hidden border-2 border-[#c6f90644] bg-[#111] hover:border-[#c6f906] transition-all duration-500">
                      <div className="relative h-full">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxMTExMTEiLz48cmVjdCB4PSIxNTAiIHk9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI4MCIgc3Ryb2tlPSIjYzZmOTA2IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHJ4PSI4Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTQwIiByPSIyMCIgc3Ryb2tlPSIjYzZmOTA2IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1zaXplPSIxMiI+QWRkIGltYWdlIHRvIHB1YmxpYy9nYWxsZXJ5LzwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                        
                        {/* Caption Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                          <p className="text-white font-semibold text-xl">{image.caption}</p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#c6f906]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#c6f906] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <Camera className="w-8 h-8 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-[#111] border-2 border-[#c6f90644] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black hover:border-[#c6f906] transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 bg-[#c6f906]'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-[#111] border-2 border-[#c6f90644] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black hover:border-[#c6f906] transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#111] border border-[#c6f906] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black transition-all duration-300 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={lightboxPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#111] border border-[#c6f906] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={lightboxNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#111] border border-[#c6f906] flex items-center justify-center text-[#c6f906] hover:bg-[#c6f906] hover:text-black transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh] relative">
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxMTExMTEiLz48dGV4dCB4PSIzMDAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1zaXplPSIxOCI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <p className="text-center text-white font-semibold text-xl mt-4">
              {galleryImages[lightboxIndex].caption}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
