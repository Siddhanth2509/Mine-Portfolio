import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import PushpakClub from './sections/PushpakClub';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import Gallery from './sections/Gallery';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import FloatingParticles from './components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Optimize ScrollTrigger configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Normalize touch scroll for mobile smoothness
    if (ScrollTrigger.isTouch) {
      ScrollTrigger.normalizeScroll(true);
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Global Floating Particles */}
      <FloatingParticles />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <PushpakClub />
        <Skills />
        <Certifications />
        <Achievements />
        <Gallery />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
