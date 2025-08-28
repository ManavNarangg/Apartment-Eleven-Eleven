import { Button } from "@/components/ui/button";
import { 
  Briefcase, Laptop, Heart, TrendingUp, Users, Globe, 
  BookOpen, Award, Zap, Building2, Palette 
} from "lucide-react";

const OurResidents = () => {
  const residentExpertise = [
    { icon: Briefcase, label: "Business", color: "text-blue-600" },
    { icon: Laptop, label: "Technology", color: "text-green-600" },
    { icon: Heart, label: "Healthcare", color: "text-red-500" },
    { icon: TrendingUp, label: "Finance", color: "text-purple-600" },
    { icon: Users, label: "Leadership", color: "text-orange-500" },
    { icon: Globe, label: "Global Trade", color: "text-teal-600" },
    { icon: BookOpen, label: "Education", color: "text-indigo-600" },
    { icon: Award, label: "Innovation", color: "text-yellow-600" },
    { icon: Palette, label: "Creative", color: "text-pink-500" },
  ];

  // Hexagon component with responsive sizing
  const HexagonCell = ({ expertise, x, y, isMobile = false }: { 
    expertise: typeof residentExpertise[0], 
    x: number, 
    y: number,
    isMobile?: boolean
  }) => {
    const Icon = expertise.icon;
    const size = isMobile ? "w-16 h-16" : "w-20 h-20";
    const iconSize = isMobile ? "w-3 h-3" : "w-4 h-4";
    const textSize = isMobile ? "text-[7px]" : "text-[8px]";
    
    return (
      <div
        className="absolute group/hex"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`
            ${size} bg-card border border-border shadow-md
            flex flex-col items-center justify-center
            transition-transform duration-300 ease-out
            hover:scale-110 hover:z-20 hover:shadow-xl hover:ring-2 hover:ring-primary/40
            cursor-pointer
          `}
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          <Icon className={`${iconSize} ${expertise.color} mb-0.5`} />
          <span className={`${textSize} font-medium text-foreground text-center leading-tight px-1`}>
            {expertise.label}
          </span>
        </div>
      </div>
    );
  };

  // Desktop honeycomb positions
  const getDesktopHoneycombPositions = () => {
    const hexSize = 90;
    const verticalSpacing = hexSize * 0.75;
    const horizontalSpacing = hexSize * 0.866;

    return [
      { x: 0, y: 0 }, // center
      { x: -horizontalSpacing, y: -verticalSpacing },
      { x: horizontalSpacing, y: -verticalSpacing },
      { x: -horizontalSpacing * 2, y: 0 },
      { x: horizontalSpacing * 2, y: 0 },
      { x: -horizontalSpacing, y: verticalSpacing },
      { x: horizontalSpacing, y: verticalSpacing },
      { x: 0, y: -verticalSpacing * 2 },
      { x: 0, y: verticalSpacing * 2 },
    ];
  };

  // Mobile honeycomb positions (smaller and more compact)
  const getMobileHoneycombPositions = () => {
    const hexSize = 70;
    const verticalSpacing = hexSize * 0.75;
    const horizontalSpacing = hexSize * 0.866;

    return [
      { x: 0, y: 0 }, // center
      { x: -horizontalSpacing, y: -verticalSpacing },
      { x: horizontalSpacing, y: -verticalSpacing },
      { x: -horizontalSpacing * 2, y: 0 },
      { x: horizontalSpacing * 2, y: 0 },
      { x: -horizontalSpacing, y: verticalSpacing },
      { x: horizontalSpacing, y: verticalSpacing },
      { x: 0, y: -verticalSpacing * 2 },
      { x: 0, y: verticalSpacing * 2 },
    ];
  };

  const desktopPositions = getDesktopHoneycombPositions();
  const mobilePositions = getMobileHoneycombPositions();

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
          Our Residents
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left text */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Resident Expertise
              <br />
              <span className="text-primary">Derived Naturally</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Apartment Eleven Eleven residents are thoughtfully selected using
              diverse professional backgrounds sourced from various industries
              and expertise areas.
            </p>

            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5"
              >
                <a href="/our-residents" className="inline-flex items-center gap-2">
                  View all residents
                </a>
              </Button>
            </div>
          </div>

          {/* Right honeycomb - Desktop */}
          <div className="hidden lg:flex relative w-full h-[500px] items-center justify-center">
            <div className="relative w-[420px] h-[420px]">
              {/* Center Badge - Desktop */}
              <div
                className="absolute w-20 h-20 bg-primary flex items-center justify-center
                  text-primary-foreground font-bold border-2 border-primary shadow-lg z-30"
                style={{
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-center leading-tight">
                  <div className="text-[8px] font-semibold">Excellence</div>
                  <div className="text-[8px]">from</div>
                  <div className="text-[8px] font-semibold">Diversity</div>
                </div>
              </div>

              {/* Hexagons - Desktop */}
              {residentExpertise.map((expertise, i) => (
                <HexagonCell
                  key={`desktop-${i}`}
                  expertise={expertise}
                  x={desktopPositions[i]?.x + 210}
                  y={desktopPositions[i]?.y + 210}
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          {/* Right honeycomb - Mobile/Tablet */}
          <div className="lg:hidden relative w-full h-[380px] md:h-[420px] flex items-center justify-center">
            <div className="relative w-[320px] md:w-[360px] h-[320px] md:h-[360px]">
              {/* Center Badge - Mobile */}
              <div
                className="absolute w-16 md:w-18 h-16 md:h-18 bg-primary flex items-center justify-center
                  text-primary-foreground font-bold border-2 border-primary shadow-lg z-30"
                style={{
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-center leading-tight">
                  <div className="text-[7px] md:text-[8px] font-semibold">Excellence</div>
                  <div className="text-[7px] md:text-[8px]">from</div>
                  <div className="text-[7px] md:text-[8px] font-semibold">Diversity</div>
                </div>
              </div>

              {/* Hexagons - Mobile */}
              {residentExpertise.map((expertise, i) => (
                <HexagonCell
                  key={`mobile-${i}`}
                  expertise={expertise}
                  x={mobilePositions[i]?.x + (window.innerWidth < 768 ? 160 : 180)}
                  y={mobilePositions[i]?.y + (window.innerWidth < 768 ? 160 : 180)}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurResidents;