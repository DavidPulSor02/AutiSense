import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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



function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutAutisense />
      <EarlySigns />
      <SecurityPrivacy />
      <WhyChooseUs />
      <PricingPlans />
      <Testimonials />
      <Footer />
      <Chatbot />
    </>
  );
}
export default App;
