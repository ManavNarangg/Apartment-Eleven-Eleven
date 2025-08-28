"use client";
import { motion, type Variants } from "framer-motion";

interface SplashScreenProps {
  onDismiss: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      delay: 0.5,
    },
  },
};

const quoteLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const quoteRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: 0.2,
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1,
    },
  },
};

const authorVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.8 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

const logoVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3,
    y: 50,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 1.2, 
      delay: 1.5,
      type: "spring",
      damping: 15,
      stiffness: 80,
    },
  },
  shrink: {
    scale: 0.4,
    x: -window.innerWidth * 0.35,
    y: -window.innerHeight * 0.4,
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 2.2 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.6, delay: 0.1 },
  },
};

const SplashScreen = ({ onDismiss }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-background flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="text-center px-8 max-w-6xl mx-auto">
        {/* Quote Section */}
        <div className="mb-8">
          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4"
            variants={quoteLeftVariants}
          >
            "Innovation distinguishes
          </motion.div>

          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
            variants={quoteRightVariants}
          >
            between a leader and a follower."
          </motion.div>

          {/* Author */}
          <motion.div
            className="flex justify-center items-center gap-2 mt-6"
            variants={authorVariants}
          >
            <span className="text-lg text-muted-foreground">— Steve Jobs</span>
          </motion.div>
        </div>

        {/* Logo Section - Full Screen */}
        <motion.div
          className="my-16"
          variants={logoVariants}
          layout
        >
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary mb-4 tracking-tight">
              Apartment
            </h1>
            <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tight">
              Eleven Eleven
            </div>
          </div>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          className="flex justify-center"
          variants={buttonVariants}
        >
          <motion.button
            onClick={onDismiss}
            className="group relative overflow-hidden bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-2xl shadow-lg border border-primary/20"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.25)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Button shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "100%",
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
            />

            <div className="relative flex items-center justify-center gap-3">
              <span className="text-lg">Enter</span>
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-200"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;