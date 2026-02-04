import React from 'react';
import Hero from './components/Hero';
import TextReveal from './components/TextReveal';
import Footer from './components/Footer';
import Fireflies from './components/Fireflies';
import MagicCursor from './components/MagicCursor';
import Guestbook from './components/Guestbook';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  return (
    <main className="font-roboto bg-black min-h-screen text-white overflow-x-hidden selection:bg-orange-500 selection:text-white">
      <MagicCursor />
      <Fireflies />
      <Hero />
      <TextReveal />
      <Guestbook />
      <Footer />
    </main>
  );
};

export default App;