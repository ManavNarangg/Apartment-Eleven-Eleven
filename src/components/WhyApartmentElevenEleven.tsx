import { motion } from "framer-motion";
import { Home, MapPin, Shield } from "lucide-react";

const AnimatedIcon = ({ children, delay = 0 }) => (
  <motion.div
    className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30 relative overflow-hidden"
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 15,
    }}
    whileHover={{ scale: 1.1 }}
  >
    {/* Animated background pulse */}
    <motion.div
      className="absolute inset-0 bg-primary/10 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Rotating border effect */}
    <motion.div
      className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-primary/40 via-transparent to-primary/40 rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />

    <motion.div
      className="relative z-10"
      animate={{
        y: [0, -3, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const PremiumLivingIcon = () => (
  <motion.div className="relative">
    <Home className="w-8 h-8 text-primary" />
    {/* Animated sparkles */}
    <motion.div
      className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
    />
    <motion.div
      className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary/70 rounded-full"
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    />
    <motion.div
      className="absolute top-0 left-0 w-1 h-1 bg-primary/50 rounded-full"
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
    />
  </motion.div>
);

const LocationIcon = () => (
  <motion.div className="relative">
    <MapPin className="w-8 h-8 text-primary" />
    {/* Animated ping effect */}
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary rounded-full"
      animate={{ scale: [1, 2.5], opacity: [1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary/60 rounded-full"
      animate={{ scale: [1, 2.5], opacity: [1, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.7,
      }}
    />
  </motion.div>
);

const TransparencyIcon = () => (
  <motion.div className="relative">
    <Shield className="w-8 h-8 text-primary" />
    {/* Animated check marks */}
    <motion.div
      className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
    >
      <motion.div
        className="w-1.5 h-1 border-b-2 border-r-2 border-white transform rotate-45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const WhyApartmentElevenEleven = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
            Ideas distilled to brilliance
          </h2>
          <p className="text-center text-muted-foreground mb-12">Our Philosophy</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <AnimatedIcon delay={0}>
              <PremiumLivingIcon />
            </AnimatedIcon>
            <motion.h3
              className="text-xl font-semibold text-foreground mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Premium
            </motion.h3>
            <motion.h4
              className="text-lg font-medium text-foreground mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Living Spaces
            </motion.h4>
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Carefully curated apartments with attention to every detail
            </motion.p>
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <AnimatedIcon delay={0.2}>
              <LocationIcon />
            </AnimatedIcon>
            <motion.h3
              className="text-xl font-semibold text-foreground mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Strategically
            </motion.h3>
            <motion.h4
              className="text-lg font-medium text-foreground mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Located
            </motion.h4>
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Prime locations with easy access to city amenities
            </motion.p>
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <AnimatedIcon delay={0.4}>
              <TransparencyIcon />
            </AnimatedIcon>
            <motion.h3
              className="text-xl font-semibold text-foreground mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Complete
            </motion.h3>
            <motion.h4
              className="text-lg font-medium text-foreground mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Transparency
            </motion.h4>
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Clear pricing and honest communication throughout
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyApartmentElevenEleven;
