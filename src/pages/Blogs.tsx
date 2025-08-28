import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blogs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif text-foreground mb-8">
              Our Blog
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                Discover insights, stories, and inspiration from the world of Apartment 11:11.
              </p>
              
              <div className="grid gap-8 md:gap-12">
                <article className="border-b border-border pb-8">
                  <h2 className="text-2xl font-serif text-foreground mb-4">
                    The Philosophy Behind Minimalist Living
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Exploring how intentional spaces can transform our daily experiences and mindset.
                  </p>
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </article>
                
                <article className="border-b border-border pb-8">
                  <h2 className="text-2xl font-serif text-foreground mb-4">
                    Curating Meaningful Connections
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    How thoughtful design and community building create lasting relationships.
                  </p>
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </article>
                
                <article className="border-b border-border pb-8">
                  <h2 className="text-2xl font-serif text-foreground mb-4">
                    The Art of Conscious Hospitality
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Redefining what it means to create welcoming spaces in modern times.
                  </p>
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;