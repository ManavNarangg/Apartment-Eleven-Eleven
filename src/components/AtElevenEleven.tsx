import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

const AtElevenEleven = () => {
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [mobileGateOpen, setMobileGateOpen] = useState(false);

  const testimonialsData: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Tech Entrepreneur",
      content:
        "Living at Eleven Eleven has transformed my perspective on community living. The innovative approach to resident collaboration has been incredible.",
      image: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      content:
        "The space itself inspires creativity. Every detail has been thoughtfully designed to foster innovation and meaningful connections.",
      image: "MR",
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      content:
        "Eleven Eleven isn't just a place to live—it's a catalyst for groundbreaking ideas. The intellectual community here is unparalleled.",
      image: "EW",
    },
  ];

  const nextTestimonial = () => {
    setHoveredGate(null); // Close any open gate when switching
    setMobileGateOpen(false); // Close mobile gate when switching
    setCurrentMobileIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setHoveredGate(null); // Close any open gate when switching
    setMobileGateOpen(false); // Close mobile gate when switching
    setCurrentMobileIndex((prev) => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  // Fixed mobile gate toggle function
  const toggleMobileGate = () => {
    setMobileGateOpen(prev => !prev);
  };

  const GothicGate = ({
    isOpen,
    gateIndex,
    isMobile = false,
  }: {
    isOpen: boolean;
    gateIndex: number;
    isMobile?: boolean;
  }) => {
    const width = isMobile ? 240 : 380;
    const height = isMobile ? 220 : 360;
    const scale = isMobile ? 0.8 : 1;
    
    return (
      <div className={`relative ${isMobile ? 'w-[240px] h-[220px]' : 'w-[380px] h-[360px]'}`}>
        {/* Glow Effect (only when open) */}
        {isOpen && (
          <motion.div
            className="absolute -inset-6 bg-primary/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1.1],
              opacity: [0.3, 0.7, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="cursor-pointer relative z-10"
          style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
        >
          {/* Gate Frame - adjusted for mobile */}
          <path
            d={`M${width * 0.16} ${height * 0.92} L${width * 0.16} ${height * 0.33} Q${width * 0.16} ${height * 0.11} ${width * 0.5} ${height * 0.11} Q${width * 0.84} ${height * 0.11} ${width * 0.84} ${height * 0.33} L${width * 0.84} ${height * 0.92}`}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={isMobile ? "5" : "6"}
          />

          {/* Decorative Top */}
          <circle cx={width * 0.5} cy={height * 0.24} r={isMobile ? "12" : "15"} fill="hsl(var(--foreground))" />

          {/* Cross Pattern */}
          <path
            d={`M${width * 0.37} ${height * 0.21} L${width * 0.63} ${height * 0.21} M${width * 0.5} ${height * 0.15} L${width * 0.5} ${height * 0.29}`}
            stroke="hsl(var(--foreground))"
            strokeWidth={isMobile ? "4" : "5"}
          />

          {/* Additional decorative elements */}
          <circle cx={width * 0.42} cy={height * 0.28} r={isMobile ? "3" : "4"} fill="hsl(var(--foreground))" />
          <circle cx={width * 0.58} cy={height * 0.28} r={isMobile ? "3" : "4"} fill="hsl(var(--foreground))" />

          {/* Gate Doors */}
          <motion.rect
            x={width * 0.2}
            y={height * 0.33}
            width={width * 0.28}
            height={height * 0.58}
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth={isMobile ? "3" : "4"}
            animate={{ scaleX: isOpen ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "left center" }}
          />
          <motion.rect
            x={width * 0.52}
            y={height * 0.33}
            width={width * 0.28}
            height={height * 0.58}
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth={isMobile ? "3" : "4"}
            animate={{ scaleX: isOpen ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "right center" }}
          />

          {/* Door vertical panels */}
          <motion.path
            d={`M${width * 0.3} ${height * 0.39} L${width * 0.3} ${height * 0.86} M${width * 0.36} ${height * 0.39} L${width * 0.36} ${height * 0.86}`}
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d={`M${width * 0.64} ${height * 0.39} L${width * 0.64} ${height * 0.86} M${width * 0.7} ${height * 0.39} L${width * 0.7} ${height * 0.86}`}
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Door Handles */}
          <motion.circle
            cx={width * 0.41}
            cy={height * 0.61}
            r={isMobile ? "5" : "6"}
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.circle
            cx={width * 0.59}
            cy={height * 0.61}
            r={isMobile ? "5" : "6"}
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Decorative hinges */}
          <motion.rect
            x={width * 0.18}
            y={height * 0.39}
            width="8"
            height="12"
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.rect
            x={width * 0.18}
            y={height * 0.56}
            width="8"
            height="12"
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.rect
            x={width * 0.82}
            y={height * 0.39}
            width="8"
            height="12"
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.rect
            x={width * 0.82}
            y={height * 0.56}
            width="8"
            height="12"
            fill="hsl(var(--foreground))"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </div>
    );
  };

  const TestimonialCard = ({
    testimonial,
    gateIndex,
    isMobile = false,
  }: {
    testimonial: Testimonial;
    gateIndex: number;
    isMobile?: boolean;
  }) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: 0.3,
      }}
    >
      <div className={`bg-background/98 backdrop-blur-xl rounded-lg p-3 md:p-6 border border-border shadow-xl shadow-foreground/10 ${isMobile ? 'w-52 mx-2' : 'w-72'} max-w-full`}>
        <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-3 md:mb-4 italic`}>
          "{testimonial.content}"
        </p>
        <div className="flex items-center gap-3">
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {testimonial.image}
          </div>
          <div>
            <div className={`font-semibold text-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {testimonial.name}
            </div>
            <div className={`text-muted-foreground ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-12 md:py-20 px-4 bg-muted/10 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Resident Testimonials
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            Discover what makes Eleven Eleven extraordinary through the voices
            of our community
          </p>
        </motion.div>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden lg:flex justify-center items-center gap-8 xl:gap-12 2xl:gap-16">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              onMouseEnter={() => setHoveredGate(index)}
              onMouseLeave={() => setHoveredGate(null)}
              whileHover={{ scale: 1.03 }}
            >
              <AnimatePresence>
                {hoveredGate === index && (
                  <TestimonialCard
                    testimonial={testimonial}
                    gateIndex={index}
                  />
                )}
              </AnimatePresence>
              <GothicGate isOpen={hoveredGate === index} gateIndex={index} />
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Layout - Single gate with navigation */}
        <div className="lg:hidden">
          {/* Navigation indicators */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentMobileIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentMobileIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Single gate with current testimonial */}
          <div className="flex justify-center items-center px-4">
            <div className="relative flex items-center justify-center gap-3 w-full max-w-md">
              {/* Previous button */}
              <button
                onClick={prevTestimonial}
                className="flex-shrink-0 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background hover:shadow-xl transition-all duration-300 z-40"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-foreground stroke-[1.5]" />
              </button>

              {/* Gate container */}
              <div className="relative flex justify-center">
                <motion.div
                  key={currentMobileIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatePresence>
                    {mobileGateOpen && (
                      <TestimonialCard
                        testimonial={testimonialsData[currentMobileIndex]}
                        gateIndex={currentMobileIndex}
                        isMobile={true}
                      />
                    )}
                  </AnimatePresence>
                  
                  <div 
                    className="cursor-pointer"
                    onClick={toggleMobileGate}
                  >
                    <GothicGate 
                      isOpen={mobileGateOpen} 
                      gateIndex={currentMobileIndex}
                      isMobile={true}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Next button */}
              <button
                onClick={nextTestimonial}
                className="flex-shrink-0 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background hover:shadow-xl transition-all duration-300 z-40"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-foreground stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Mobile instruction text */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              Tap the gate to view testimonial
            </p>
          </div>
        </div>

        <motion.div
          className="mt-8 md:mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#7DF9FF",
              color: "#000000",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-4 md:px-6 py-2 md:py-3 rounded-lg border border-yellow-500 font-semibold 
             bg-transparent text-black text-sm md:text-base"
          >
            Call To Action
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AtElevenEleven;