import { Link } from 'react-router-dom';
import CinematicVideoBg from '../components/CinematicVideoBg';
import AetheraNavbar from '../components/layout/AetheraNavbar';
import { Stats } from '../components/sections/Stats';
import { Curriculum } from '../components/sections/Curriculum';
import { Projects } from '../components/sections/Projects';
import { Features } from '../components/sections/Features';
import { Pricing } from '../components/sections/Pricing';
import { CTA } from '../components/sections/CTA';
import { Testimonials } from '../components/sections/Testimonials';
import { Marquee } from '../components/sections/Marquee';
import { Footer } from '../components/layout/Footer';

const BG_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export default function AetheraHome() {
  return (
    <div className="relative min-h-screen w-full bg-white text-black font-inter">
      {/* Hero Section Container with Video Background */}
      <div className="relative w-full overflow-hidden">
        {/* Background video layer */}
        <CinematicVideoBg src={BG_VIDEO_URL} />

        {/* Navigation Bar */}
        <AetheraNavbar activePage="Home" />

        {/* Hero Copy & CTAs */}
        <main
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-24"
          style={{ paddingTop: 'calc(8rem - 75px)' }}
        >
          {/* Headline */}
          <h1 className="font-instrument text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-black animate-fade-rise">
            Architect <span className="italic text-black/80">Backend.</span>
            <br />
            <span className="italic text-black/80">Level Up</span> Your Career
          </h1>

          {/* Description */}
          <p className="text-base sm:text-base max-w-2xl mt-8 leading-relaxed text-black font-medium animate-fade-rise-delay">
            An immersive, gamified bootcamp designed to take you from basics to deploying production-ready applications. Learn by building real-world projects.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex items-center gap-4 mt-12 flex-wrap justify-center animate-fade-rise-delay-2">
            <Link
              to="/login"
              className="rounded-full px-10 py-4 text-base bg-black text-white font-medium hover:scale-[1.03] hover:bg-zinc-900 transition-all duration-300 shadow-md inline-block"
            >
              Start Your Sprint
            </Link>
            <Link
              to="/syllabus"
              className="rounded-full px-10 py-4 text-base bg-transparent text-black border border-black font-medium hover:bg-black hover:text-white hover:scale-[1.03] transition-all duration-300 inline-block shadow-sm"
            >
              View Curriculum
            </Link>
          </div>
        </main>
      </div>

      {/* Additional Section Components under Landing Page */}
      <div className="relative z-10 bg-white">
        <Stats />
        <Curriculum />
        <Projects />
        <Features />
        <div id="pricing">
          <Pricing />
        </div>
        <CTA />
        <Testimonials />
        <Marquee />
        <Footer />
      </div>
    </div>
  );
}
