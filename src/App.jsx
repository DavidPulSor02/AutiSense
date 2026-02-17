import React, { useState, useEffect } from 'react';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // Check for user session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <div className="animate-fade-in">
          <ScrollProgress />
          <Navbar
            user={user}
            setUser={setUser}
            isAuthOpen={isAuthOpen}
            setIsAuthOpen={setIsAuthOpen}
          />
          <Hero />

          <ScrollReveal variant="slideUp" delay={0.2}>
            <AppShowcase />
          </ScrollReveal>

          <ScrollReveal variant="fadeIn" delay={0.3}>
            <AboutAutisense />
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" delay={0.2}>
            <EarlySigns />
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.2}>
            <SecurityPrivacy />
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.2}>
            <WhyChooseUs />
          </ScrollReveal>

          <ScrollReveal variant="fadeIn" delay={0.2}>
            <PricingPlans
              user={user}
              onAuthRequired={() => setIsAuthOpen(true)}
            />
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <Testimonials />
          </ScrollReveal>

          <Footer />
          <Chatbot />
        </div>
      )}
    </>
  );
}
export default App;
