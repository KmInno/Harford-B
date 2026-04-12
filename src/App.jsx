import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MultipleIntelligencies from './components/MultipleIntelligencies';
import Gallery from './components/Gallery';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <MultipleIntelligencies />
      <Gallery />
      <AdmissionForm />
      <Footer />
    </div>
  );
}

export default App;
