import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
  const [clicked, setClicked] = useState<string | null>(
    localStorage.getItem("clicked")
  );
  const [showSplash, setShowSplash] = useState(clicked !== "true");


  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSplash]);

  const handleSplashDismiss = () => {
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen
            onDismiss={handleSplashDismiss}
            clicked={clicked}
            setClicked={setClicked}
          />
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
