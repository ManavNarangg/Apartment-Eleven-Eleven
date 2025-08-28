import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Brands from "@/components/Brands";
import Media from "@/components/Media";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import VideoSection from "@/components/VideoSection";
import SplashScreen from "@/components/SplashScreen";
import WhyApartmentElevenEleven from "@/components/WhyApartmentElevenEleven";
import ResearchSection from "@/components/ResearchSection";
import OurResidents from "@/components/OurResidents";
import AtElevenEleven from "@/components/AtElevenEleven";
import MediaMentions from "@/components/MediaMentions";
import TheResidency from "@/components/TheResidency";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  const handleSplashDismiss = () => {
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onDismiss={handleSplashDismiss} />
        )}
      </AnimatePresence>
      
      <Header />
      <div className="min-h-screen pt-16 lg:pt-20">
        {/* Only render/play video when splash is dismissed */}
        {!showSplash && <VideoSection shouldPlay={true} />}
        <Hero />
        <WhyApartmentElevenEleven />
        <ResearchSection />
        <TheResidency />
        <OurResidents />
        <AtElevenEleven />
        <MediaMentions />
      </div>
      <Footer />
    </>
  );
};

export default Index;