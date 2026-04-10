"use client";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import ArchivePreview from "@/components/ArchivePreview";
import Craft from "@/components/Craft";
import Heritage from "@/components/Heritage";
import Atelier from "@/components/Atelier";
import Footer from "@/components/Footer";
import { useReveal } from "@/lib/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <ArchivePreview />
        <Craft />
        <Heritage />
        <Atelier />
      </main>
      <Footer />
    </>
  );
}
