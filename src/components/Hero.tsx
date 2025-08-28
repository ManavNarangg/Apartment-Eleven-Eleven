import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-32 pb-32 px-4 bg-background">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16 leading-tight">
          The Doors to The Next Chapter
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground mb-12 leading-relaxed">
          Sometimes it's founders that can bring everything together, other times 
          you need experts at resource building to help. We're helping build 
          businesses with the ethos of the new India.
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          From supply chain management and retention enhancement to operational efficiency and business 
          model redefinition, our team of business engineers is ready to pivot with you in whatever direction 
          you choose.
        </p>
      </div>
    </section>
  );
};

export default Hero;