import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const researchCards = [
  {
    title: "Location Analytics: Prime Urban Positioning for Maximum ROI",
    shortTitle: "Location Analytics",
    description:
      "Comprehensive research on apartment placement in high-growth areas with demographic insights.",
    content:
      "We combine demographic data, transport accessibility, and economic indicators to identify the most profitable locations.",
    category: "Market Research",
  },
  {
    title: "Sustainable Living: Green Building Standards and Energy Efficiency",
    shortTitle: "Sustainable Living",
    description:
      "Environmental studies highlighting our focus on sustainable apartment design and eco-friendly living.",
    content:
      "Our research covers LEED certification, renewable energy integration, and long-term cost efficiency.",
    category: "Environmental Impact",
  },
  {
    title: "Community Impact: Neighborhood Development and Social Integration",
    shortTitle: "Community Impact",
    description:
      "How housing projects contribute to community growth and resident satisfaction.",
    content:
      "We study how thoughtfully designed housing enhances social bonds, safety, and overall well-being.",
    category: "Social Research",
  },
  {
    title: "Advanced Living: Smart Home Technology Integration",
    shortTitle: "Smart Technology",
    description:
      "Tech-enabled housing that improves daily life through IoT and automation.",
    content:
      "Our studies cover IoT sensors, automated climate control, smart security, and energy optimization.",
    category: "Technology Research",
  },
  {
    title: "Investment Strategy: Market Analysis and Financial Projections",
    shortTitle: "Investment Strategy",
    description:
      "Financial models and market analysis ensuring strong returns for developments.",
    content:
      "We provide competitive pricing strategies, market trend analysis, and robust ROI forecasts.",
    category: "Financial Research",
  },
  {
    title: "Resident Experience: Satisfaction and Retention Studies",
    shortTitle: "Resident Experience",
    description:
      "Research on satisfaction factors and retention strategies for better living.",
    content:
      "Our surveys and studies highlight what drives community engagement and long-term resident retention.",
    category: "Experience Research",
  },
];

const ResearchSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextCard = () => {
    setDirection(1);
    setFlippedCard(null); // Reset flipped card when navigating
    setHoveredCard(null); // Reset hovered card when navigating
    // On mobile, show 1 card at a time; on desktop, show 3
    const cardsToShow = isMobile ? 1 : 3;
    const maxIndex = researchCards.length - cardsToShow;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCard = () => {
    setDirection(-1);
    setFlippedCard(null); // Reset flipped card when navigating
    setHoveredCard(null); // Reset hovered card when navigating
    const cardsToShow = isMobile ? 1 : 3;
    const maxIndex = researchCards.length - cardsToShow;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Get visible cards based on screen size
  const getVisibleCards = () => {
    const cards = [];
    const cardsToShow = isMobile ? 1 : 3;
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % researchCards.length;
      cards.push({ ...researchCards[index], originalIndex: index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  // Handle card interaction (hover for desktop, click for mobile)
  const handleCardInteraction = (cardIndex: number) => {
    if (isMobile) {
      // Toggle flip on mobile
      setFlippedCard(flippedCard === cardIndex ? null : cardIndex);
    } else {
      // Hover behavior for desktop
      setHoveredCard(cardIndex);
    }
  };

  const handleCardLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
    }
  };

  // Determine if card should be flipped
  const isCardFlipped = (cardIndex: number) => {
    return isMobile ? flippedCard === cardIndex : hoveredCard === cardIndex;
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hover: {
      y: -8,
      scale: 1.02,
    },
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white min-h-screen flex items-center">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            In science we trust
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center max-w-6xl mx-auto">
          {/* Navigation buttons - positioned outside cards */}
          <motion.button
            onClick={prevCard}
            className="absolute left-0 md:left-2 z-20 p-2 md:p-3 bg-card border border-border rounded-full shadow hover:bg-muted transition-colors -translate-x-2 md:translate-x-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Cards container */}
          <div className="overflow-hidden px-4 sm:px-8 md:px-16 w-full mx-8 md:mx-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                className="flex gap-4 md:gap-6 justify-center"
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                  mass: 1.2,
                }}
              >
                {visibleCards.map((card, displayIndex) => (
                  <motion.div
                    key={`${card.originalIndex}-${currentIndex}`}
                    className="w-full max-w-sm h-72 sm:h-80 md:w-80 md:h-80 perspective-1000 flex-shrink-0 mx-auto cursor-pointer"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={!isMobile ? "hover" : undefined}
                    onClick={() => handleCardInteraction(card.originalIndex)}
                    onMouseEnter={() => !isMobile && setHoveredCard(card.originalIndex)}
                    onMouseLeave={handleCardLeave}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    transition={{
                      delay: displayIndex * 0.1,
                    }}
                  >
                    <div className="relative w-full h-full transform-style-preserve-3d">
                      {/* Front cover */}
                      <motion.div
                        className="absolute inset-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          transformOrigin: "left center",
                        }}
                        animate={{
                          rotateY: isCardFlipped(card.originalIndex) ? -180 : 0,
                        }}
                        transition={{
                          duration: 1.8,
                          ease: [0.25, 0.8, 0.25, 1],
                        }}
                      >
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-2 bg-border opacity-80"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: 0.3 + displayIndex * 0.1,
                            duration: 0.5,
                          }}
                          style={{ originY: 0 }}
                        />
                        <div className="p-4 md:p-6 h-full flex flex-col justify-between ml-2">
                          <div className="flex-1">
                            <motion.div
                              className="text-xs font-medium text-muted-foreground mb-2 md:mb-3 uppercase tracking-wide"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + displayIndex * 0.1 }}
                            >
                              {card.category}
                            </motion.div>
                            <motion.h3
                              className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-4 leading-tight"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + displayIndex * 0.1 }}
                            >
                              {card.shortTitle}
                            </motion.h3>
                            <motion.p
                              className="text-muted-foreground text-sm leading-relaxed overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 + displayIndex * 0.1 }}
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: isMobile ? 6 : 4,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {card.description}
                            </motion.p>
                          </div>
                          <motion.button
                            className="text-xs font-medium text-foreground border border-border px-3 py-2 rounded hover:bg-muted transition-colors w-fit mt-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + displayIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Read Research
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* Inside pages */}
                      <motion.div
                        className="absolute inset-0 bg-background border border-border rounded-lg shadow-2xl overflow-hidden p-4 md:p-6"
                        style={{
                          transformOrigin: "left center",
                          backfaceVisibility: "hidden",
                        }}
                        animate={{
                          rotateY: isCardFlipped(card.originalIndex) ? 0 : 180,
                        }}
                        transition={{
                          duration: 1.8,
                          ease: [0.25, 0.8, 0.25, 1],
                        }}
                        initial={{ rotateY: 180 }}
                      >
                        <div className="h-full flex flex-col">
                          <motion.h3
                            className="text-sm md:text-lg font-bold text-foreground mb-2 md:mb-3 leading-tight"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: isCardFlipped(card.originalIndex) ? 1 : 0,
                              y: isCardFlipped(card.originalIndex) ? 0 : 10,
                            }}
                            transition={{
                              delay: isCardFlipped(card.originalIndex) ? 0.3 : 0,
                            }}
                          >
                            {card.title}
                          </motion.h3>
                          <motion.p
                            className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 flex-1 overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: isCardFlipped(card.originalIndex) ? 1 : 0,
                              y: isCardFlipped(card.originalIndex) ? 0 : 10,
                            }}
                            transition={{
                              delay: isCardFlipped(card.originalIndex) ? 0.4 : 0,
                            }}
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: isMobile ? 4 : 3,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {card.content}
                          </motion.p>
                          <motion.ul
                            className="text-xs space-y-1 text-muted-foreground mb-4"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: isCardFlipped(card.originalIndex) ? 1 : 0,
                            }}
                            transition={{
                              delay: isCardFlipped(card.originalIndex) ? 0.5 : 0,
                            }}
                          >
                            <li>• Peer-reviewed methodology</li>
                            <li>• Industry-leading standards</li>
                            <li>• Continuous monitoring</li>
                          </motion.ul>
                          <div className="pt-2 md:pt-4">
                            <motion.button
                              className="w-full bg-foreground text-background text-xs md:text-sm font-medium py-2 px-4 rounded hover:opacity-90 transition"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: isCardFlipped(card.originalIndex) ? 1 : 0,
                                y: isCardFlipped(card.originalIndex) ? 0 : 20,
                              }}
                              transition={{
                                delay: isCardFlipped(card.originalIndex) ? 0.6 : 0,
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              View Full Study
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={nextCard}
            className="absolute right-0 md:right-2 z-20 p-2 md:p-3 bg-card border border-border rounded-full shadow hover:bg-muted transition-colors translate-x-2 md:translate-x-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Indicators */}
        <motion.div
          className="flex justify-center mt-8 md:mt-12 space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {Array.from({ 
            length: Math.max(0, 
              isMobile 
                ? researchCards.length 
                : researchCards.length - 2
            ) 
          }).map((_, dotIndex) => (
            <motion.button
              key={dotIndex}
              onClick={() => {
                setCurrentIndex(dotIndex);
                setFlippedCard(null);
                setHoveredCard(null);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                dotIndex === currentIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          ))}
        </motion.div>

        {/* Progress */}
        <motion.div
          className="text-center mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Showing {currentIndex + 1}-
          {Math.min(
            currentIndex + (isMobile ? 1 : 3), 
            researchCards.length
          )} of {researchCards.length}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;