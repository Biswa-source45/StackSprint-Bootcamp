import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Curriculum } from './components/sections/Curriculum';
import { Projects } from './components/sections/Projects';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { Testimonials } from './components/sections/Testimonials';
import { Marquee } from './components/sections/Marquee';
import { CTA } from './components/sections/CTA';
import { Syllabus } from './pages/Syllabus';
import { Resources } from './pages/Resources';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Curriculum />
      <Projects />
      <Features />
      <Pricing />
      <CTA />
      <Testimonials />
      <Marquee />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden w-full text-[15px] relative min-h-screen font-sans">
        {/* Background Decor Layer - Visible everywhere */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Dashed Grid */}
          <div className="absolute inset-0 bg-grid-dashed mask-radial-fade opacity-[0.5]"></div>
          
          {/* Left Green Ambience */}
          <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-400/15 blur-[120px]"></div>
          
          {/* Right Golden Ambience */}
          <div className="absolute top-[-5%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-orange-400/15 blur-[130px]"></div>
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 antialiased">
          <Navbar />
          
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/syllabus" element={<Syllabus />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
