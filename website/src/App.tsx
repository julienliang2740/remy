import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Scan } from "@/sections/Scan";
import { Afterward } from "@/sections/Afterward";
import { GetApp } from "@/sections/GetApp";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Scan />
        <Afterward />
        <GetApp />
      </main>
      <Footer />
    </>
  );
}
