import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AboutAutisense from './components/aboutAutisense.jsx';
import EarlySigns from './components/EarlySigns.jsx'
import SecurityPrivacy from './components/SecurityPrivacy.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import PricingPlans from './components/PricingPlans.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/ChatBot.jsx'
import LoadingScreen from './components/LoadingScreen.jsx';
import AppShowcase from './components/AppShowcase.jsx';
import ScrollReveal from './components/ScrollReveal.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import NotFound from './components/NotFound.jsx';

// Main Landing Page Component
const HomePage = () => {
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5, // Detect when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="landing-wrapper">
      <ScrollProgress />
      <Navbar
        activeSection={activeSection}
      />
      
      <main>
        <div className={`section-focus-wrap ${activeSection === 'hero' ? 'is-active' : ''}`}>
          <Hero />
        </div>

        <div className={`section-focus-wrap ${activeSection === 'showcase' ? 'is-active' : ''}`}>
          <ScrollReveal variant="slideUp" delay={0.2}>
            <AppShowcase />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'about' ? 'is-active' : ''}`}>
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <AboutAutisense />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'signals' ? 'is-active' : ''}`}>
          <ScrollReveal variant="slideUp" delay={0.2}>
            <EarlySigns />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'security' ? 'is-active' : ''}`}>
          <ScrollReveal variant="scale" delay={0.2}>
            <SecurityPrivacy />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'why' ? 'is-active' : ''}`}>
          <ScrollReveal variant="slideRight" delay={0.2}>
            <WhyChooseUs />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'plans' ? 'is-active' : ''}`}>
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <PricingPlans />
          </ScrollReveal>
        </div>

        <div className={`section-focus-wrap ${activeSection === 'testimonials' ? 'is-active' : ''}`}>
          <ScrollReveal variant="slideUp" delay={0.2}>
            <Testimonials />
          </ScrollReveal>
        </div>

        <Footer />
      </main>
      
      <Chatbot />
      
      <style jsx>{`
        .section-focus-wrap {
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease;
          opacity: 0.8;
          transform: scale(0.99);
        }
        .section-focus-wrap.is-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <Routes>
          <Route path="/" element={
            <HomePage />
          } />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
