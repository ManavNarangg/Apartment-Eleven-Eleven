import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-primary-foreground py-16">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif text-3xl font-bold">Apartment Eleven Eleven</h3>
            <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
              Where creativity lives, community thrives, and every moment is 
              an opportunity for intentional living.
            </p>
            <div className="text-primary-foreground/60">
              <p>Made with intention and purpose</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-serif text-xl font-bold">Navigate</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/#testimonials" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Testimonials
              </Link>
              <Link to="/#about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-serif text-xl font-bold">Explore</h4>
            <nav className="space-y-3">
              <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Blogs
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Philosophy
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Community
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Events
              </a>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © {currentYear} Apartment Eleven Eleven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;