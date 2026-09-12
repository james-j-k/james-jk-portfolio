import Navbar from "@/components/Navbar";
import FloatingPortrait from "@/components/FloatingPortrait";
import SnakeEasterEgg from "@/components/SnakeEasterEgg";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingPortrait />
      <SnakeEasterEgg />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
