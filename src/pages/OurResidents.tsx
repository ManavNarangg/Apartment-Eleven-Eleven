import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  MessageSquare,
  Users,
  Building2,
  Lightbulb,
  TrendingUp,
  Rocket,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Target,
  Zap,
  Quote,
  BookOpen,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import HallwayVisualization from "@/components/HallwayVisualization";
import MultiHallwayVisualization from "@/components/HallwayVisualization";

interface Resident {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  description: string;
  industry: string;
  foundedYear: number;
  employees: string;
  revenue: string;
  headquarters: string;
  website: string;
  achievements: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  duration: string;
  client: string;
  image: string;
  slug: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

interface Conversation {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  timestamp: string;
  context: string;
  position: "left" | "right";
  offset: number; // percentage along hallway
}

interface Hallway {
  id: string;
  name: string;
  description: string;
  theme: "innovation" | "growth" | "impact" | "collaboration";
  conversations: Conversation[];
}

const hallways: Hallway[] = [
  {
    id: "1",
    name: "Innovation Corridor",
    description: "Where breakthrough ideas are born",
    theme: "innovation",
    conversations: [
      {
        id: "1",
        quote:
          "The breakthrough came during a casual hallway chat about quantum computing limitations. Sometimes the best ideas happen in the most unexpected places.",
        author: "Dr. Sarah Chen",
        role: "Chief AI Officer",
        company: "QuantumMind",
        avatar: "SC",
        timestamp: "2 hours ago",
        context: "Discussing quantum supremacy",
        position: "left",
        offset: 50,
      },
    ],
  },
  {
    id: "2",
    name: "Growth Gallery",
    description: "Scaling stories and success secrets",
    theme: "growth",
    conversations: [
      {
        id: "2",
        quote:
          "Bumped into our investor in the hallway and pitched our expansion idea. Got a verbal commitment for Series B funding right there!",
        author: "James Park",
        role: "CEO",
        company: "ScaleUp Solutions",
        avatar: "JP",
        timestamp: "1 week ago",
        context: "Impromptu investor pitch",
        position: "right",
        offset: 50,
      },
    ],
  },
  {
    id: "3",
    name: "Impact Avenue",
    description: "Conversations that change the world",
    theme: "impact",
    conversations: [
      {
        id: "3",
        quote:
          "Met a nonprofit leader in the hallway who showed us how our technology could provide clean water to millions. Purpose found us here.",
        author: "Alex Kumar",
        role: "Impact Officer",
        company: "CleanTech Innovations",
        avatar: "AK",
        timestamp: "1 month ago",
        context: "Social impact discovery",
        position: "left",
        offset: 50,
      },
    ],
  },
  {
    id: "4",
    name: "Collaboration Commons",
    description: "Where partnerships are forged",
    theme: "collaboration",
    conversations: [
      {
        id: "4",
        quote:
          "Two competing startups met in the hallway and realized they could be perfect partners instead. Competition became collaboration.",
        author: "David Kim",
        role: "Partnership Manager",
        company: "CollabCorp",
        avatar: "DK",
        timestamp: "3 weeks ago",
        context: "Competitor to partner",
        position: "right",
        offset: 50,
      },
    ],
  },
];

const residents: Resident[] = [
  {
    id: "1",
    name: "TechFlow Solutions",
    logo: "TF",
    bgColor: "bg-blue-600",
    description:
      "Leading AI-powered workflow automation platform helping enterprises streamline operations and boost productivity by 300%.",
    industry: "Enterprise Software",
    foundedYear: 2019,
    employees: "150+",
    revenue: "$10M ARR",
    headquarters: "San Francisco, CA",
    website: "techflow.com",
    achievements: [
      "Secured $25M Series B funding",
      "Serving 500+ enterprise clients",
      "40% market share in workflow automation",
      "Named 'Best AI Startup 2023' by TechCrunch",
    ],
  },
  {
    id: "2",
    name: "Digital Dynamics",
    logo: "DD",
    bgColor: "bg-purple-600",
    description:
      "Revolutionary digital transformation consultancy specializing in cloud migration and digital strategy for Fortune 500 companies.",
    industry: "Digital Consulting",
    foundedYear: 2020,
    employees: "75+",
    revenue: "$8M ARR",
    headquarters: "Austin, TX",
    website: "digitaldynamics.io",
    achievements: [
      "98% client retention rate",
      "Digital transformation for 200+ companies",
      "Reduced operational costs by avg 45%",
      "AWS Premier Partner status",
    ],
  },
  {
    id: "3",
    name: "InnovateLab",
    logo: "IL",
    bgColor: "bg-green-600",
    description:
      "Cutting-edge biotech research facility developing next-generation medical devices and breakthrough therapeutic solutions.",
    industry: "Biotechnology",
    foundedYear: 2018,
    employees: "200+",
    revenue: "$15M ARR",
    headquarters: "Boston, MA",
    website: "innovatelab.bio",
    achievements: [
      "12 patents filed in medical technology",
      "FDA approval for 3 medical devices",
      "Partnership with Mayo Clinic",
      "$50M Series C funding raised",
    ],
  },
  {
    id: "4",
    name: "CloudWorks",
    logo: "CW",
    bgColor: "bg-orange-600",
    description:
      "Next-generation cloud infrastructure platform providing scalable, secure, and cost-effective solutions for modern applications.",
    industry: "Cloud Infrastructure",
    foundedYear: 2021,
    employees: "80+",
    revenue: "$6M ARR",
    headquarters: "Seattle, WA",
    website: "cloudworks.dev",
    achievements: [
      "99.99% uptime guarantee",
      "Processing 50B+ API requests monthly",
      "30% cost reduction vs traditional cloud",
      "SOC 2 Type II certified",
    ],
  },
  {
    id: "5",
    name: "DataStream Corp",
    logo: "DS",
    bgColor: "bg-red-600",
    description:
      "Advanced data analytics and machine learning platform empowering businesses to make data-driven decisions at scale.",
    industry: "Data Analytics",
    foundedYear: 2020,
    employees: "120+",
    revenue: "$12M ARR",
    headquarters: "New York, NY",
    website: "datastream.ai",
    achievements: [
      "Processing 10TB+ data daily",
      "ML models with 95%+ accuracy",
      "Real-time insights for 1000+ clients",
      "Gartner Magic Quadrant Leader",
    ],
  },
  {
    id: "6",
    name: "NextGen Analytics",
    logo: "NG",
    bgColor: "bg-indigo-600",
    description:
      "Predictive analytics platform using advanced AI to forecast market trends and consumer behavior with unprecedented accuracy.",
    industry: "Predictive Analytics",
    foundedYear: 2019,
    employees: "90+",
    revenue: "$9M ARR",
    headquarters: "Chicago, IL",
    website: "nextgenanalytics.com",
    achievements: [
      "Predicting trends with 92% accuracy",
      "Serving top 100 retail brands",
      "AI models trained on 50B+ data points",
      "Winner of AI Excellence Award 2023",
    ],
  },
];

const caseStudies = [
  {
    id: "1",
    title: "Enterprise Digital Transformation",
    subtitle: "From Legacy to Leading Edge",
    description:
      "How we helped a Fortune 500 company modernize their entire tech stack and achieve 300% productivity gains through comprehensive digital transformation.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: "Digital Transformation",
    duration: "18 months",
    client: "Global Manufacturing Corp",
    date: "March 2024",
    content: `
      This project involved a complete overhaul of legacy systems for a Fortune 500 manufacturing company. The client was struggling with outdated processes that were hindering growth and innovation.

      ## The Challenge
      
      The company faced multiple challenges including legacy ERP systems causing frequent downtime, manual processes leading to inefficiencies, and resistance to change from employees. Data silos across departments made it difficult to get real-time insights for decision making.
      
      ## Our Approach
      
      We developed a comprehensive digital transformation strategy that included:
      
      - Cloud migration using modern AWS infrastructure
      - Implementation of integrated ERP and CRM systems  
      - Automated workflow processes to reduce manual work
      - Employee training and change management programs
      - Real-time analytics dashboards for executives
      
      ## The Results
      
      The transformation exceeded expectations with a 300% increase in operational productivity, 85% reduction in system downtime, and 40% cost savings on IT infrastructure. Employee satisfaction with new tools reached 95%.
      
      The client now operates with modern, scalable systems that support their growth ambitions and provide the agility needed in today's competitive market.
    `,
    slug: "enterprise-digital-transformation",
  },
  {
    id: "2",
    title: "AI-Powered Customer Service Revolution",
    subtitle: "Redefining Customer Experience",
    description:
      "Implementing intelligent chatbots and AI analytics to transform customer service operations for a major e-commerce platform.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    category: "AI Implementation",
    duration: "12 months",
    client: "E-commerce Platform Inc",
    date: "January 2024",
    content: `
      A major e-commerce platform was struggling with high support ticket volumes and long response times. We implemented an AI-powered solution that revolutionized their customer service operations.

      ## The Challenge
      
      The platform was receiving over 100,000 customer inquiries monthly with an average response time of 24 hours. This led to customer frustration and increased churn rates. The support team was overwhelmed with repetitive questions.
      
      ## Our Solution
      
      We built a comprehensive AI customer service system:
      
      - Advanced NLP chatbot with machine learning capabilities
      - Integration across web, mobile, and social media platforms
      - Predictive analytics for proactive customer support
      - Automated ticket routing and prioritization
      - Real-time sentiment analysis for escalation
      
      ## Outstanding Results
      
      The implementation delivered remarkable improvements: 80% reduction in response time, 95% customer satisfaction rate, 60% decrease in support costs, and 24/7 intelligent customer support availability.
      
      The AI system now handles routine inquiries automatically while escalating complex issues to human agents, creating a seamless customer experience.
    `,
    slug: "ai-customer-service-revolution",
  },
  {
    id: "3",
    title: "Sustainable Tech Innovation",
    subtitle: "Building a Greener Future",
    description:
      "Developing clean energy solutions that reduced carbon footprint by 50% while increasing operational efficiency for a traditional energy company.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
    category: "Sustainability",
    duration: "24 months",
    client: "Green Energy Solutions",
    date: "September 2023",
    content: `
      We helped transform a traditional energy company into a green technology leader through innovative IoT solutions and renewable energy integration.

      ## The Environmental Challenge
      
      The company was heavily reliant on fossil fuels, facing increasing regulatory pressure to reduce carbon emissions while maintaining profitability. They lacked real-time monitoring of energy consumption and had inefficient distribution systems.
      
      ## Our Green Solution
      
      We implemented a comprehensive sustainability transformation:
      
      - IoT sensor network for real-time energy monitoring
      - AI-powered predictive analytics for optimization  
      - Solar and wind energy integration systems
      - Smart grid technology for efficient distribution
      - Carbon tracking and ESG reporting dashboard
      
      ## Impressive Impact
      
      The project achieved a 50% reduction in carbon footprint, 30% energy cost savings, and helped the company achieve ISO 14001 certification. They're now on track to reach carbon neutral operations by 2024.
      
      This transformation not only benefited the environment but also improved the company's market position and profitability in the growing green energy sector.
    `,
    slug: "sustainable-tech-innovation",
  },
  {
    id: "4",
    title: "FinTech Platform Modernization",
    subtitle: "Scaling Secure Digital Banking",
    description:
      "Revamping a legacy banking platform into a modern, cloud-native FinTech solution with enhanced security and seamless scalability.",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=600&fit=crop",
    category: "FinTech",
    duration: "15 months",
    client: "NextGen Banking Solutions",
    date: "June 2023",
    content: `
    A mid-sized financial services company needed to modernize their digital banking platform to compete with agile FinTech startups. Their existing systems were monolithic, slow to update, and not designed for cloud scalability.

    ## The Challenge
    
    The legacy banking platform faced multiple pain points:
    - High maintenance costs for outdated infrastructure
    - Limited scalability during peak transaction loads
    - Security vulnerabilities and compliance issues
    - Poor user experience on mobile devices
    
    ## Our Approach
    
    We executed a phased modernization program:
    - Migrated core banking services to a microservices architecture
    - Deployed a secure, cloud-native infrastructure on AWS
    - Implemented real-time fraud detection using machine learning
    - Built a responsive mobile-first banking app
    - Ensured full compliance with PCI DSS and GDPR standards
    
    ## The Results
    
    The modernized platform achieved:
    - 10x scalability improvement during high-traffic events
    - 70% faster transaction processing
    - 99.99% uptime reliability
    - 45% reduction in infrastructure costs
    - 92% customer satisfaction score on the new mobile app
    
    Today, the client is positioned as a leader in secure, scalable FinTech innovation, attracting new customers and investors.
  `,
    slug: "fintech-platform-modernization",
  },
];

const OurResidents: React.FC = () => {
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null
  );
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHallway, setCurrentHallway] = useState(0);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const currentHallwayData = hallways[currentHallway];
  useEffect(() => {
    if (!isMarqueeHovered) {
      controls.start({
        x: [0, -100 * residents.length],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isMarqueeHovered, controls]);

  const handleResidentClick = (resident: Resident) => {
    setSelectedResident(resident);
  };

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    navigate(`/case-studies/${caseStudy.slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const slideVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <section className="mt-8 py-16 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Meet Our Residents
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              A diverse community of innovators, entrepreneurs, and industry
              leaders driving change across various sectors.
            </p>
          </motion.div>

          {/* Residents Slider */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={marqueeRef}
              className="flex space-x-4 sm:space-x-6"
              animate={controls}
            >
              {[...residents, ...residents].map((resident, index) => (
                <motion.div
                  key={`${resident.id}-${index}`}
                  className="flex-shrink-0 w-64 sm:w-72"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="glass-card p-6 rounded-2xl group cursor-pointer h-48 flex flex-col justify-center items-center text-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    onClick={() => handleResidentClick(resident)}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 ${resident.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {resident.logo}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      {resident.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {resident.industry}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Info Modal */}
          {selectedResident && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-80 max-w-sm relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedResident(null)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div
                  className={`w-16 h-16 ${selectedResident.bgColor} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto`}
                >
                  {selectedResident.logo}
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                  {selectedResident.name}
                </h3>
                <p className="text-slate-600 text-center mb-4">
                  {selectedResident.industry}
                </p>
                <p className="text-sm text-slate-500 text-center">
                  {selectedResident.description ||
                    "This company is making an impact in its industry with innovative solutions."}
                </p>
              </motion.div>
            </div>
          )}
        </section>

        {/* Case Studies Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Case Studies
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Deep dives into transformative projects that showcase
                innovation, impact, and measurable results.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <Link
                    to={`/case-studies/${caseStudy.slug}`}
                    state={{ caseStudy }}
                    className="flex flex-col w-full"
                  >
                    <div className="relative flex flex-col h-full">
                      <div className="absolute inset-0 rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.2)] group-hover:shadow-[12px_12px_20px_rgba(0,0,0,0.25)] transition-all duration-500"></div>
                      <div className="absolute top-0 left-[-8px] bottom-0 w-6 bg-gradient-to-r from-[#d4c3a0] via-[#e8ddc4] to-[#fdfcf8] rounded-l-md shadow-inner"></div>
                      <Card
                        className="relative flex flex-col h-full min-h-[420px] border border-[#d4c3a0] rounded-r-lg 
                          bg-gradient-to-br from-[#fdfbf6] to-[#f8f5ec]
                          shadow-lg hover:shadow-xl transition-all duration-500
                          font-serif overflow-hidden"
                      >
                        <div className="relative h-44 w-full overflow-hidden border-b border-[#d4c3a0]">
                          <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 border border-[#d4c3a0] rounded text-xs font-medium text-slate-700 shadow-sm">
                            {caseStudy.category}
                          </span>
                        </div>

                        <CardContent className="flex flex-col justify-between flex-grow p-6 bg-gradient-to-br from-[#ffffff] to-[#faf9f5]">
                          <div>
                            <CardTitle className="text-xl font-bold text-[#2c2c2c] mb-3 leading-snug">
                              {caseStudy.title}
                            </CardTitle>
                            <p className="text-sm text-[#5c5c5c] italic leading-relaxed">
                              {caseStudy.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="absolute top-2 right-[-8px] bottom-2 w-2 bg-gradient-to-r from-[#f8f6f0] to-[#ebe8dc] border border-[#d4c3a0] rounded-r-md"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <MultiHallwayVisualization />
      </div>
      <Footer />
    </>
  );
};

export default OurResidents;
