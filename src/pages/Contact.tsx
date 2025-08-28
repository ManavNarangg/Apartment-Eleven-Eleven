import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb, Users, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Section A - Hero Quote */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
          <div className="container-max section-padding text-center relative z-10">
            <blockquote className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-foreground leading-tight max-w-6xl mx-auto animate-fade-in">
              Great ideas deserve great partnerships. Let's build something
              extraordinary together.
            </blockquote>
          </div>
        </section>

        {/* Section B - Why You're Reaching Us */}
        <section className="py-24 bg-secondary/30">
          <div className="container-max section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Three Ways to Connect with Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the path that best fits your vision and let's start your
                journey together.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Card className="group hover:shadow-elegant transition-smooth border-0 bg-card cursor-pointer transform hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="w-10 h-10 text-black-400" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                      Share Your Innovation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Have a groundbreaking idea? Connect with our network of
                      visionary founders and angel investors. We'll help
                      transform your concept into reality with funding starting
                      from $5,000.
                    </p>
                  </div>
                  <Link to="/contact-form" className="w-full mt-auto">
                    <Button className="w-full transition-smooth" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-elegant transition-smooth border-0 bg-card cursor-pointer transform hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                      <Users className="w-10 h-10 text-black" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                      Join Our Network
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Connect with our portfolio of innovative founders and
                      industry leaders. If you know any of our 100+ portfolio
                      teams, they can introduce you and fast-track your journey
                      with us.
                    </p>
                  </div>
                  <Link to="/contact-form" className="w-full mt-auto">
                    <Button className="w-full transition-smooth" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-elegant transition-smooth border-0 bg-card cursor-pointer transform hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-subtle rounded-full flex items-center justify-center mb-4">
                      <Rocket className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                      Apply Directly
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      Submit your application through our streamlined process.
                      We review 500+ applications monthly, ensuring every
                      founder gets a fair evaluation and personalized feedback.
                    </p>
                  </div>
                  <Link to="/contact-form" className="w-full mt-auto">
                    <Button className="w-full transition-smooth" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section C - FAQs */}
        <section className="py-24 bg-background">
          <div className="container-max section-padding max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about working with us.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  What type of startups do you typically invest in?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We focus on early-stage startups across various sectors
                  including healthcare, technology, finance, education, and
                  sustainability. We look for innovative ideas with strong
                  founding teams and scalable business models.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  What is the typical investment range?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our initial investments typically range from $5,000 to
                  $100,000, with follow-on funding available for promising
                  ventures. We also provide access to our network of angel
                  investors and VCs for larger funding rounds.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  How long does the application process take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our standard review process takes 2-4 weeks from application
                  submission to decision. Priority applications through our
                  network referrals may be expedited to 1-2 weeks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  Do you provide mentorship beyond funding?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Absolutely! We offer comprehensive support including
                  mentorship, strategic guidance, networking opportunities, and
                  access to industry experts. Our goal is to help you succeed
                  beyond just providing capital.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  What should I include in my pitch deck?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Your pitch deck should include: problem statement, solution,
                  market size, business model, traction, team background,
                  financial projections, funding requirements, and use of funds.
                  Keep it concise (10-15 slides) and focus on the most
                  compelling aspects of your venture.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-smooth">
                  Can international startups apply?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! We welcome applications from international startups.
                  However, we do require companies to have or be willing to
                  establish a legal entity in our jurisdiction for investment
                  purposes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
