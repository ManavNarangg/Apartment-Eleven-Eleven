import { Card, CardContent } from "@/components/ui/card";

const MediaMentions = () => {
  const investors = [
    { name: "ELEVEN ELEVEN", logo: "11" },
    { name: "LUXURY HOMES", logo: "LH" },
    { name: "PREMIUM", logo: "PR" },
    { name: "ELITE LIVING", logo: "EL" },
    { name: "MODERN SPACES", logo: "MS" },
    { name: "URBAN LUXURY", logo: "UL" },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
          Our Media Mentions
        </h2>

        <div className="grid lg:grid-cols-3 gap-10 items-stretch">
          {/* Left side - Investor logos grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {investors.map((investor, index) => (
                <Card
                  key={index}
                  className="bg-card border border-border rounded-xl hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-8 flex items-center justify-center min-h-[120px]">
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center border border-border">
                        <span className="text-primary font-bold text-lg">
                          {investor.logo}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {investor.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-muted-foreground text-lg mt-8">
              Backed by top VCs and angel investors, fueling the future of
              premium living.
            </p>
          </div>

          {/* Right side - Featured news */}
          <div className="lg:col-span-1">
            <Card className="bg-card border border-border rounded-xl h-full hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col justify-center h-full text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    Inc42
                  </div>
                  <div className="w-12 h-1 bg-primary/80 mx-auto rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 leading-snug">
                  Apartment Eleven Eleven Raises INR 51 Cr To Boost Its Premium
                  Living Experience
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Revolutionizing luxury residential spaces with innovative
                  community-driven approaches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaMentions;
