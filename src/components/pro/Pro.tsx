'use client';
import Hero from './Hero';
import Bio from './Bio';
import Projects from './Projects';
import Experience from './Experience';
import Skills from './Skills';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';
import CursorLens from './webgl/CursorLens';
import LenisProvider from './scroll/LenisProvider';
import { useGsapScrollChoreography } from './scroll/useGsapScrollChoreography';

export default function Pro() {
  useGsapScrollChoreography();
  return (
    <LenisProvider>
      <CursorLens />
      <Hero />
      <Bio />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </LenisProvider>
  );
}
