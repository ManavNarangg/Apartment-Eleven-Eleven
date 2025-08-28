import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import pillarImg from "../assets/doric-pillar-new.png";

interface ElegantPortalProps {
  isScrolled: boolean;
  onScrollStateChange?: (canScroll: boolean) => void;
}

const ClassicalArchitecture = ({
  isScrolled,
  onScrollStateChange,
}: ElegantPortalProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollAttempts, setScrollAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const leftPillarRef = useRef<HTMLImageElement | null>(null);
  const rightPillarRef = useRef<HTMLImageElement | null>(null);
  const [pillarHeight, setPillarHeight] = useState<number | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startOpen = useCallback(() => {
    if (!isOpening && !animationComplete) {
      setIsOpening(true);
      window.setTimeout(() => {
        setAnimationComplete(true);
        onScrollStateChange?.(true);
      }, 2200);
    }
  }, [isOpening, animationComplete, onScrollStateChange]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!animationComplete) {
        e.preventDefault();
        setScrollAttempts((prev) => {
          const next = prev + 1;
          if (next >= 2) startOpen();
          return next;
        });
        onScrollStateChange?.(false);
      }
    },
    [animationComplete, startOpen, onScrollStateChange]
  );

  // Handle touch events for mobile
  const handleTouch = useCallback(() => {
    if (!animationComplete) {
      setScrollAttempts((prev) => {
        const next = prev + 1;
        if (next >= 1) startOpen(); // Reduced attempts for mobile
        return next;
      });
    }
  }, [animationComplete, startOpen]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    
    if (isMobile) {
      window.addEventListener("touchstart", handleTouch);
      // Auto-start animation on mobile after a delay
      const autoStart = setTimeout(() => {
        if (!animationComplete && !isOpening) {
          startOpen();
        }
      }, 1000);
      
      return () => {
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("touchstart", handleTouch);
        clearTimeout(autoStart);
      };
    }
    
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll, handleTouch, isMobile, animationComplete, isOpening, startOpen]);

  const shouldAnimate = isOpening || animationComplete;

  // Match gate height to actual pillar element height
  useEffect(() => {
    if (isMobile) return; // desktop-only matching

    const updateHeight = () => {
      const left = leftPillarRef.current?.clientHeight ?? 0;
      const right = rightPillarRef.current?.clientHeight ?? 0;
      const next = Math.max(left, right);
    
      if (next > 0) setPillarHeight(next * 0.9); // 90% of pillar height
    };
    

    updateHeight();

    const observers: ResizeObserver[] = [];
    if (leftPillarRef.current) {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(leftPillarRef.current);
      observers.push(ro);
    }
    if (rightPillarRef.current) {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(rightPillarRef.current);
      observers.push(ro);
    }

    window.addEventListener("resize", updateHeight);
    const id = window.setInterval(updateHeight, 200);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("resize", updateHeight);
      window.clearInterval(id);
    };
  }, [isMobile]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 w-full pt-16 md:pt-20 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
      {/* Subtle background elements - responsive sizing */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-amber-100/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-stone-200/30 rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-amber-100/20 rounded-full blur-xl sm:blur-2xl"></div>
      </div>

      {/* Mobile Layout - Stacked */}
      {isMobile ? (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 py-8">
          {/* Mobile Gate Structure */}
          <div className="w-full max-w-sm h-[70vh] relative bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-xl shadow-2xl border-4 border-gray-500 overflow-hidden">
            {/* Mobile Double Doors */}
            <div className="absolute inset-0 flex z-20">
              {/* Left Door Panel - Mobile */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={shouldAnimate ? { rotateY: -90 } : { rotateY: 0 }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.2,
                }}
                className="relative w-1/2 h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 shadow-2xl border-r border-gray-500 rounded-l-lg"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Mobile door panel styling */}
                <div className="absolute inset-3 border-2 border-gray-400 bg-gradient-to-br from-white/15 to-black/25 rounded-md">
                  <div className="absolute inset-2 bg-gradient-to-br from-white/8 to-black/15 rounded-sm"></div>
                </div>
                
                {/* Mobile door handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-gradient-to-b from-gray-200 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
              </motion.div>

              {/* Right Door Panel - Mobile */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={shouldAnimate ? { rotateY: 90 } : { rotateY: 0 }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.4,
                }}
                className="relative w-1/2 h-full bg-gradient-to-l from-gray-900 via-gray-700 to-gray-600 shadow-2xl border-l border-gray-500 rounded-r-lg"
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Mobile door panel styling */}
                <div className="absolute inset-3 border-2 border-gray-400 bg-gradient-to-br from-white/15 to-black/25 rounded-md">
                  <div className="absolute inset-2 bg-gradient-to-br from-white/8 to-black/15 rounded-sm"></div>
                </div>
                
                {/* Mobile door handle */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-gradient-to-b from-gray-200 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
              </motion.div>
            </div>

            {/* Mobile Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                shouldAnimate
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 1.2,
                ease: [0.23, 1, 0.32, 1],
                delay: 1.3,
              }}
              className="absolute inset-4 bg-gradient-to-br from-white/98 via-gray-50/96 to-gray-100/98 backdrop-blur-sm rounded-lg shadow-xl flex flex-col justify-center items-center text-center p-4 border-2 border-gray-400 overflow-hidden"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={
                  shouldAnimate ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: 2.0,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-xl sm:text-2xl font-light text-black mb-3 tracking-wide font-serif leading-tight"
              >
                Our Philosophy
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 1.0,
                  delay: 2.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="w-16 h-0.5 bg-gradient-to-r from-gray-400 via-black to-gray-400 mb-4 rounded-full shadow-sm"
              ></motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={
                  shouldAnimate ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: 2.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light tracking-wide"
              >
                At Eleven Eleven, we believe exceptional living begins with understanding that a home is more than a space—it's a sanctuary where life unfolds and dreams take shape.
              </motion.p>
            </motion.div>
          </div>

          {/* Mobile Pillars - Decorative at bottom */}
          <div className="flex justify-between items-end w-full mt-8 px-4">
            <img
              src={pillarImg}
              alt="Doric pillar"
              className="h-16 sm:h-20 w-auto object-contain opacity-70"
              style={{
                filter: "drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.2)) saturate(0.8)",
              }}
            />
            <img
              src={pillarImg}
              alt="Doric pillar"
              className="h-16 sm:h-20 w-auto object-contain opacity-70"
              style={{
                filter: "drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.2)) saturate(0.8)",
              }}
            />
          </div>

          {/* Mobile Instructions */}
          {!animationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-sm text-gray-600 font-light">Tap to enter</p>
            </motion.div>
          )}
        </div>
      ) : (
        /* Desktop Layout - Original horizontal layout */
        <div className="relative z-10 w-full h-full flex items-end justify-between">
          {/* Left Doric Pillar - Desktop */}
          <div className="relative flex-shrink-0 h-full flex items-end">
            <img
              src={pillarImg}
              alt="Doric pillar in neutral stone"
              ref={leftPillarRef}
              className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-700 filter drop-shadow-2xl"
              style={{
                filter:
                  "drop-shadow(8px 12px 24px rgba(0, 0, 0, 0.25)) hue-rotate(10deg) saturate(0.8)",
              }}
              loading="eager"
            />
          </div>

          {/* Central Portal Gates - Desktop */}
          <div className="flex-grow relative h-full flex items-end z-0 justify-center">
            <div className="relative w-full flex" style={{ height: pillarHeight ?? undefined }}>
              {/* Main Gate Structure - Desktop - Aligned with pillars */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-t-xl shadow-2xl border-8 border-gray-500 overflow-hidden">
                {/* Double Doors - Desktop */}
                <div className="absolute inset-0 flex z-20">
                  {/* Left Door Panel - Desktop */}
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={shouldAnimate ? { rotateY: -100 } : { rotateY: 0 }}
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.2,
                    }}
                    className="relative w-1/2 h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 shadow-2xl border-r-2 border-gray-500 rounded-tl-lg"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Door panel styling */}
                    <div className="absolute inset-4 md:inset-6 border-4 border-gray-400 bg-gradient-to-br from-white/15 to-black/25 rounded-md">
                      <div className="absolute inset-2 md:inset-4 bg-gradient-to-br from-white/8 to-black/15 rounded-sm"></div>
                    </div>

                    {/* Door Handle */}
                    <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 w-3 md:w-4 h-6 md:h-8 bg-gradient-to-b from-gray-200 to-gray-600 rounded-full shadow-xl border-2 border-gray-400"></div>
                  </motion.div>

                  {/* Right Door Panel - Desktop */}
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={shouldAnimate ? { rotateY: 100 } : { rotateY: 0 }}
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.4,
                    }}
                    className="relative w-1/2 h-full bg-gradient-to-l from-gray-900 via-gray-700 to-gray-600 shadow-2xl border-l-2 border-gray-500 rounded-tr-lg"
                    style={{
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Door panel styling */}
                    <div className="absolute inset-4 md:inset-6 border-4 border-gray-400 bg-gradient-to-br from-white/15 to-black/25 rounded-md">
                      <div className="absolute inset-2 md:inset-4 bg-gradient-to-br from-white/8 to-black/15 rounded-sm"></div>
                    </div>

                    {/* Door Handle */}
                    <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-3 md:w-4 h-6 md:h-8 bg-gradient-to-b from-gray-200 to-gray-600 rounded-full shadow-xl border-2 border-gray-400"></div>
                  </motion.div>
                </div>

                {/* Content revealed when doors open - Desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={
                    shouldAnimate
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.85 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 1.3,
                  }}
                  className="absolute inset-6 md:inset-8 lg:inset-10 xl:inset-12 bg-gradient-to-br from-white/98 via-gray-50/96 to-gray-100/98 backdrop-blur-sm rounded-xl shadow-2xl flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 xl:p-10 border-4 border-gray-400 overflow-hidden"
                >
                  <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={
                      shouldAnimate ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }
                    }
                    transition={{
                      duration: 1.0,
                      delay: 2.2,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-black mb-4 md:mb-6 lg:mb-8 tracking-wide font-serif leading-tight"
                  >
                    Our Philosophy
                  </motion.h1>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 2.6,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="w-20 md:w-24 lg:w-32 h-0.5 md:h-1 bg-gradient-to-r from-gray-400 via-black to-gray-400 mb-4 md:mb-6 lg:mb-8 xl:mb-10 rounded-full shadow-sm"
                  ></motion.div>

                  <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={
                      shouldAnimate ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }
                    }
                    transition={{
                      duration: 1.0,
                      delay: 3.0,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-full font-light tracking-wide overflow-hidden"
                  >
                    At Eleven Eleven, we believe that exceptional living begins
                    with understanding that a home is more than a space—it's a
                    sanctuary where life unfolds, dreams take shape, and
                    connections flourish in an atmosphere of refined elegance.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Doric Pillar - Desktop */}
          <div className="relative flex-shrink-0 h-full flex items-end">
            <img
              src={pillarImg}
              alt="Doric pillar in neutral stone"
              ref={rightPillarRef}
              className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-700 filter drop-shadow-2xl"
              style={{
                filter:
                  "drop-shadow(8px 12px 24px rgba(0, 0, 0, 0.25)) hue-rotate(10deg) saturate(0.8)",
              }}
              loading="eager"
            />
          </div>

          {/* Desktop scroll instruction */}
          {!animationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-sm text-gray-600 font-light">Scroll to enter</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
};

export default ClassicalArchitecture;