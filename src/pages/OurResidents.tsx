import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

type PresentationStage = "overview" | "section-1" | "section-2" | "section-3" | "complete";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  position: { x: number; y: number };
  content: React.ReactNode;
}

const OurResidents: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<PresentationStage>("overview");
  const isMobile = useIsMobile();

  const sections: Section[] = [
    {
      id: "case-studies",
      title: "Case Studies",
      icon: FileText,
      description: "In-depth analysis of resident success stories",
      color: "bg-slate-800",
      position: { x: -400, y: 0 },
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Digital Transformation Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm md:text-base">
                  How Sarah transformed her traditional business into a digital-first company, 
                  increasing revenue by 300% in 18 months.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Startup to Scale-up Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm md:text-base">
                  The complete journey of Alex's tech startup from ideation to Series A funding, 
                  including challenges overcome and lessons learned.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "testimonials",
      title: "Testimonials",
      icon: MessageSquare,
      description: "Hear directly from our successful residents",
      color: "bg-slate-600",
      position: { x: 0, y: 0 },
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4 md:space-y-6">
            <Card className="shadow-lg">
              <CardContent className="pt-4 md:pt-6">
                <blockquote className="text-base md:text-lg italic text-slate-900 mb-3 md:mb-4">
                  "The support and community here transformed my entire approach to business. 
                  I wouldn't be where I am today without this incredible environment."
                </blockquote>
                <footer className="text-slate-600 text-sm md:text-base">
                  — Maria Rodriguez, CEO of TechFlow Solutions
                </footer>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="pt-4 md:pt-6">
                <blockquote className="text-base md:text-lg italic text-slate-900 mb-3 md:mb-4">
                  "From struggling freelancer to running a team of 20. The mentorship and 
                  resources provided here are unmatched."
                </blockquote>
                <footer className="text-slate-600 text-sm md:text-base">
                  — James Chen, Founder of Digital Dynamics
                </footer>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "residents",
      title: "From Our Residents",
      icon: Users,
      description: "Stories and updates from our community",
      color: "bg-slate-400",
      position: { x: 400, y: 0 },
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Monthly Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm md:text-base mb-3 md:mb-4">
                  This month we're featuring innovative projects and achievements from our 
                  resident community. From AI startups to sustainable tech solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-slate-800 text-white rounded-full text-xs md:text-sm">
                    AI Innovation
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-slate-800 text-white rounded-full text-xs md:text-sm">
                    Sustainability
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-slate-800 text-white rounded-full text-xs md:text-sm">
                    Community Impact
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Resident Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm md:text-base">
                  Stay updated with the latest news, events, and achievements from our vibrant 
                  resident community. Join us for monthly meetups and networking events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  // Auto-progression logic with reset capability
  useEffect(() => {
    const progressStages: PresentationStage[] = [
      "overview",
      "section-1", 
      "section-2", 
      "section-3", 
      "complete"
    ];
    
    let stageIndex = 0;
    
    const timer = setInterval(() => {
      stageIndex++;
      if (stageIndex < progressStages.length) {
        setCurrentStage(progressStages[stageIndex]);
      } else {
        // Auto-restart after a pause
        setTimeout(() => {
          setCurrentStage("overview");
        }, 2000);
        clearInterval(timer);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Manual navigation handlers
  const handleSectionClick = (sectionIndex: number) => {
    setCurrentStage(`section-${sectionIndex + 1}` as PresentationStage);
  };

  const handleOverviewClick = () => {
    setCurrentStage("overview");
  };

  const handleCloseSection = () => {
    setCurrentStage("overview");
  };

  // Prezi-style camera calculations
  const getCameraTransform = () => {
    if (isMobile) {
      // Mobile: No camera movement, just opacity changes
      return { x: 0, y: 0, scale: 1, rotate: 0 };
    }
    
    const baseScale = 1.6;
    const panDistance = 450;
    
    switch (currentStage) {
      case "overview":
        return { x: 0, y: 0, scale: 0.7, rotate: 0 };
      case "section-1":
        return { x: panDistance, y: -50, scale: baseScale, rotate: -2 };
      case "section-2":
        return { x: 0, y: -30, scale: baseScale, rotate: 1 };
      case "section-3":
        return { x: -panDistance, y: -50, scale: baseScale, rotate: -1 };
      case "complete":
        return { x: 0, y: 0, scale: 0.8, rotate: 0 };
      default:
        return { x: 0, y: 0, scale: 1, rotate: 0 };
    }
  };

  const getSectionAnimation = (sectionIndex: number) => {
    const focusedIndex = currentStage.startsWith("section-") 
      ? parseInt(currentStage.split("-")[1]) - 1 
      : -1;
    
    const isFocused = sectionIndex === focusedIndex;
    const isOverview = currentStage === "overview" || currentStage === "complete";
    
    if (isMobile) {
      return {
        opacity: isOverview ? 1 : (isFocused ? 1 : 0.3),
        scale: 1,
        rotateY: 0,
        z: 0
      };
    }
    
    return {
      opacity: isOverview ? 1 : (isFocused ? 1 : 0.4),
      scale: isFocused ? 1.1 : (isOverview ? 1 : 0.9),
      rotateY: isFocused ? 5 : 0,
      z: isFocused ? 50 : 0
    };
  };

  const cameraTransform = getCameraTransform();

  // Easing functions for cinematic feel
  const preziEasing = [0.23, 1, 0.32, 1] as const; // Custom cubic-bezier for Prezi-like motion
  const contentEasing = [0.16, 1, 0.3, 1] as const; // Smoother for content transitions

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 mb-2">
        <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden">
          {/* Title - Animated positioning */}
          <motion.div 
            className="pt-16 pb-8 mt-8 text-center relative z-10"
            animate={{
              opacity: currentStage === "overview" || currentStage === "complete" ? 1 : 0.6,
              y: currentStage === "overview" || currentStage === "complete" ? 0 : -20,
            }}
            transition={{ duration: 0.8, ease: preziEasing }}
          >
            <motion.h1 
              className="text-5xl font-bold text-slate-900 mb-4"
              animate={{
                scale: currentStage === "overview" ? 1 : 0.9,
              }}
              transition={{ duration: 1, ease: preziEasing }}
            >
              Our Residents
            </motion.h1>
            <motion.p 
              className="text-2xl text-slate-600 max-w-2xl mx-auto"
              animate={{
                opacity: currentStage === "overview" || currentStage === "complete" ? 1 : 0.5,
              }}
              transition={{ duration: 0.6, ease: preziEasing }}
            >
              Discover success stories, insights, and updates from our thriving community
            </motion.p>
          </motion.div>

          {/* Prezi-style camera viewport */}
          <motion.div
            className="flex items-center justify-center min-h-[50vh] md:min-h-[60vh] perspective-1000"
            animate={{
              x: cameraTransform.x,
              y: cameraTransform.y,
              scale: cameraTransform.scale,
              rotateZ: cameraTransform.rotate
            }}
            transition={{ 
              duration: 1.5, 
              ease: preziEasing,
              type: "tween"
            }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Sections Container with 3D space */}
            <div 
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 px-4 md:px-8 w-full max-w-7xl"
              onClick={handleOverviewClick}
            >
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                const sectionAnimation = getSectionAnimation(index);
                
                return (
                  <motion.div
                    key={section.id}
                    className="flex-shrink-0"
                    animate={{
                      opacity: sectionAnimation.opacity,
                      scale: sectionAnimation.scale,
                      rotateY: sectionAnimation.rotateY,
                      z: sectionAnimation.z
                    }}
                    transition={{ 
                      duration: 1, 
                      ease: preziEasing,
                      type: "tween"
                    }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <Card 
                      className="w-full max-w-md md:w-96 h-80 md:h-96 shadow-xl border border-slate-200 relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSectionClick(index);
                      }}
                    >
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm"
                        animate={{ 
                          opacity: currentStage === `section-${index + 1}` ? 0.8 : 0,
                          scale: currentStage === `section-${index + 1}` ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5, ease: contentEasing }}
                      />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 md:p-6 text-center">
                        <motion.div 
                          className={`w-20 h-20 md:w-32 md:h-32 ${section.color} rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg`}
                          animate={{
                            scale: currentStage === `section-${index + 1}` ? 1.3 : 1,
                            rotateY: currentStage === `section-${index + 1}` ? 360 : 0,
                            rotateX: currentStage === `section-${index + 1}` ? 15 : 0
                          }}
                          transition={{ 
                            duration: 0.8, 
                            ease: preziEasing,
                            rotateY: { duration: 1.2 }
                          }}
                        >
                          <IconComponent className="w-10 h-10 md:w-16 md:h-16 text-white" />
                        </motion.div>
                        
                        <motion.div
                          animate={{
                            y: currentStage === `section-${index + 1}` ? -5 : 0
                          }}
                          transition={{ duration: 0.6, ease: contentEasing }}
                        >
                          <CardTitle className="text-xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-6">
                            {section.title}
                          </CardTitle>
                          
                          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            {section.description}
                          </p>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Content overlay with "dive inside" effect */}
          <AnimatePresence>
            {currentStage.startsWith("section-") && (
              <motion.div
                key={`content-${currentStage}`}
                className="fixed inset-0 bg-white/98 backdrop-blur-md z-40 flex items-center justify-center"
                onClick={handleCloseSection}
                initial={{ 
                  opacity: 0,
                  scale: 0.3,
                  rotateX: 45
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  rotateX: 0
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.8,
                  rotateX: -30
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: contentEasing,
                  opacity: { duration: 0.4 }
                }}
              >
                <motion.div
                  className="max-w-5xl mx-auto p-4 md:p-8 max-h-[85vh] overflow-y-auto bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-2xl m-4"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ 
                    y: 100,
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{ 
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ 
                    y: -50,
                    opacity: 0,
                    scale: 0.95
                  }}
                  transition={{ 
                    duration: 0.7, 
                    ease: contentEasing,
                    delay: 0.2
                  }}
                >
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: contentEasing,
                      delay: 0.4 
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {sections[parseInt(currentStage.split("-")[1]) - 1]?.title}
                      </h2>
                      <button
                        onClick={handleCloseSection}
                        className="text-slate-500 hover:text-slate-700 text-xl font-bold px-3 py-1 rounded-full hover:bg-slate-100 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <div className="text-slate-600">
                      {sections[parseInt(currentStage.split("-")[1]) - 1]?.content}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurResidents;