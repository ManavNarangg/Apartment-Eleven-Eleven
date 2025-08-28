import { Button } from "@/components/ui/button";

const TheResidency = () => {
  return (
    <section className="py-20 px-4 bg-muted/5">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          The Residency
        </h2>
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Left side - Residency Panel */}
          <div className="flex h-full">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg flex flex-col justify-start w-full h-full">
              <h3 className="text-3xl text-center font-semibold text-foreground mb-5">
                Meet our Residency Panel
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                We bring authenticity and clarity to premium living with
                collaboration with the industry’s best professionals and
                experts. Learn more about our process and how we redefine modern
                residency with care, transparency, and excellence. Our residency
                panel is composed of highly accomplished architects, designers,
                and consultants who bring years of experience in creating spaces
                that merge modern aesthetics with functionality. Together, they
                ensure that every project reflects innovation, sustainability,
                and unmatched quality, providing residents with a lifestyle they
                can truly be proud of.
              </p>
            </div>
          </div>

          {/* Right side - Quote Content */}
          <div className="flex flex-col justify-center w-full">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg flex flex-col justify-center h-full space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Everything should be made as{" "}
                <span className="text-primary">simple as possible</span>, but no
                simpler
              </h2>
              <p className="text-primary text-lg font-medium">
                Albert Einstein
              </p>
              <p className="text-muted-foreground text-lg">
                Bringing clarity and making the decision process easier for your
                residency goals.
              </p>

              <Button
                asChild
                variant="outline"
                className="group relative overflow-hidden border-primary/30 text-primary hover:bg-primary/5 mt-4"
              >
                <a href="/contact" className="inline-flex items-center gap-2">
                  <span className="relative z-10">
                    {"Elevator's Waiting".split("").map((char, i) => (
                      <span
                        key={i}
                        className="animate-wave"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheResidency;
