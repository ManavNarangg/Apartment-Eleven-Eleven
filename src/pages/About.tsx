import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClassicalArchitecture from "@/components/ClassicalArchitecture";

// Sophisticated Lottie Component for animations
const LottieAnimation = ({ src, className = "" }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const mockLottieData = {
      v: "5.5.7",
      meta: { g: "LottieFiles AE", a: "", k: "", d: "", tc: "" },
      fr: 29.97,
      ip: 0,
      op: 90,
      w: 500,
      h: 500,
      nm: "Animation",
      ddd: 0,
      assets: [],
      layers: [],
    };
    setAnimationData(mockLottieData);
  }, [src]);

  return (
    <div
      className={`bg-muted border-2 border-charcoal shadow-lg flex items-center justify-center ${className}`}
    >
      <div className="text-muted-foreground text-xs text-center p-2">
        <div className="w-8 h-8 mx-auto mb-1 bg-stone-medium rounded animate-pulse"></div>
        Lottie Animation
        <br />
        {src}
      </div>
    </div>
  );
};

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Sarah Williams",
      designation: "Chief Executive Officer",
      description:
        "Leading innovation in residential excellence with over 15 years of experience in luxury property development and community building.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      designation: "Head of Resident Experience",
      description:
        "Passionate about creating exceptional living experiences through thoughtful design, community engagement, and personalized service excellence.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-alabaster">
        {/* Hero Section with Classical Architecture */}
        <ClassicalArchitecture isScrolled={isScrolled} />

        {/* Team Section */}
        <section className="py-20 px-4 bg-porcelain">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-16">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="bg-ivory hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-stone-medium/30"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-gold/30"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
                          <Badge className="w-2 h-2 bg-gold rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-charcoal mb-1">{member.name}</h3>
                        <p className="text-charcoal/70 font-semibold mb-4">{member.designation}</p>
                        <p className="text-charcoal/80 leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Content Bands */}
        <section className="w-full">
          <div className="bg-muted py-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                    An Alchemy of Nature & Science
                  </h2>
                  <p className="text-charcoal/70 text-xl mb-6 leading-relaxed">
                    Our approach combines natural elements with proven scientific research, 
                    creating impactful solutions for exceptional living experiences.
                  </p>
                  <p className="text-charcoal text-xl font-semibold">
                    Where innovation meets tranquility
                  </p>
                </div>
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative">
                    <LottieAnimation src="molecule-nature.json" className="w-40 h-40 transform translate-x-6 translate-y-6 rounded-lg" />
                    <LottieAnimation src="science-research.json" className="absolute top-0 left-0 w-40 h-40 shadow-2xl rounded-lg border border-stone-medium" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ivory py-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative flex justify-center lg:justify-start lg:order-1">
                  <div className="relative">
                    <LottieAnimation src="quality-excellence.json" className="w-40 h-40 transform translate-x-6 translate-y-6 rounded-lg" />
                    <LottieAnimation src="transparency-trust.json" className="absolute top-0 left-0 w-40 h-40 shadow-2xl rounded-lg border border-stone-medium" />
                  </div>
                </div>
                <div className="max-w-2xl lg:order-2">
                  <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                    Quality That Speaks for Itself
                  </h2>
                  <p className="text-charcoal/70 text-xl mb-6 leading-relaxed">
                    By going to the source, we uncover what you really need to achieve 
                    sophisticated, comfortable living in an environment of unparalleled excellence.
                  </p>
                  <p className="text-charcoal text-xl font-semibold">
                    Clarity & transparency in everything we create
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted py-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                    Excellence in Every Detail
                  </h2>
                  <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                    Our commitment to superior craftsmanship and attention to detail ensures 
                    every resident experiences the pinnacle of luxury living in thoughtfully 
                    designed spaces.
                  </p>
                  <p className="text-primary text-xl font-semibold">
                    Where sophistication meets functionality
                  </p>
                </div>
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative">
                    <LottieAnimation src="luxury-lifestyle.json" className="w-40 h-40 transform translate-x-6 translate-y-6 rounded-lg" />
                    <LottieAnimation src="excellence-craftsmanship.json" className="absolute top-0 left-0 w-40 h-40 shadow-2xl rounded-lg border border-stone-medium" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;