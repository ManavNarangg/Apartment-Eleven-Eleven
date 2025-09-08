import React from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Building, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const CaseStudyDetail = () => {
  const { state } = useLocation();
  const { slug } = useParams(); 
  const navigate = useNavigate();

  const caseStudy = state?.caseStudy;

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Case Study Not Found
          </h1>
          <button
            onClick={() => navigate("/case-studies")}
            className="text-blue-600 hover:underline"
          >
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("- ")) {
        return <li key={index} className="text-slate-700 mb-2">{line.replace("- ", "")}</li>;
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return <p key={index} className="text-slate-700 leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/case-studies")}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </button>

          {/* Header */}
          <header className="mb-8">

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(caseStudy.content)}
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default CaseStudyDetail;
