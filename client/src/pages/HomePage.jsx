import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import WorkshopsSection from '../components/home/WorkshopsSection';
import ContactSection from '../components/home/ContactSection';
import { programService, workshopService } from '../services/api';

export default function HomePage() {
  const [programs, setPrograms] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, workRes] = await Promise.all([
          programService.getPrograms().catch(() => ({ data: [] })),
          workshopService.getWorkshops().catch(() => ({ data: [] })),
        ]);
        if (progRes.data) {
          setPrograms(Array.isArray(progRes.data) ? progRes.data : progRes.data.data || []);
        }
        if (workRes.data) {
          setWorkshops(Array.isArray(workRes.data) ? workRes.data : workRes.data.data || []);
        }
      } catch (err) {
        console.warn('Could not fetch homepage data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle smooth scroll when navigating to an anchor hash (e.g. #workshops, #about, #contact)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff]">
      {/* 1. Header / Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. About Us */}
        <AboutSection />

        {/* 4. Our Programs (Exactly TWO program cards) */}
        <ProgramsSection programs={programs} />

        {/* 5. Workshops & Activities (Selected upcoming workshops from both programs) */}
        <WorkshopsSection workshops={workshops} />

        {/* 6. Contact Us (Contact form saved to database) */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}

