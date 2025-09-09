import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hallwayBg from "../assets/Hallway.webp"

const hallwaysData = [
  {
    id: "1",
    name: "Innovation Corridor",
    description: "Where breakthrough ideas are born",
    theme: "innovation",
    conversations: [
      {
        id: "1",
        quote: "The breakthrough came during a casual hallway chat about quantum computing limitations.",
        author: "Dr. Sarah Chen",
        role: "Chief AI Officer",
        company: "QuantumMind",
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
        id: "3",
        quote: "Bumped into our investor in the hallway and pitched our expansion idea right there!",
        author: "James Park",
        role: "CEO",
        company: "ScaleUp Solutions",
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
        id: "5",
        quote: "Met a nonprofit leader who showed us how our technology could provide clean water to millions.",
        author: "Alex Kumar",
        role: "Impact Officer",
        company: "CleanTech",
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
        id: "7",
        quote: "Two competing startups met here and realized they could be perfect partners instead.",
        author: "David Kim",
        role: "Partnership Manager",
        company: "CollabCorp",
      },
    ],
  },
  {
    id: "5",
    name: "Strategy Street",
    description: "Where big decisions take shape",
    theme: "strategy",
    conversations: [
      {
        id: "9",
        quote: "Overheard our competitor's strategy and pivoted our entire roadmap in 5 minutes.",
        author: "Lisa Wang",
        role: "Strategy Director",
        company: "PivotCorp",
      },
    ],
  },
  {
    id: "6",
    name: "Culture Corner",
    description: "Where company values come alive",
    theme: "culture",
    conversations: [
      {
        id: "11",
        quote: "A simple hallway conversation helped us redefine our company culture completely.",
        author: "Emma Davis",
        role: "Head of People",
        company: "CultureFirst",
      },
    ],
  },
];

const HALLWAYS_PER_VIEW = 3;

export default function MultiHallwayVisualization() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = Math.ceil(hallwaysData.length / HALLWAYS_PER_VIEW);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentHallways = () => {
    const start = currentSlide * HALLWAYS_PER_VIEW;
    return hallwaysData.slice(start, start + HALLWAYS_PER_VIEW);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 px-4">
            Conversations in the Hallways
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Where serendipitous encounters spark innovation and change. The most
            important innovations often happen in the spaces between meetings.
          </p>
        </div>

        {/* Navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-between items-center mb-6 md:mb-8 px-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-slate-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
            </button>
          </div>
        )}

        {/* Hallways */}
        <div className="relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl overflow-hidden">
          <div
            key={currentSlide}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-out"
          >
            {getCurrentHallways().map((hallway, hallwayIndex) => {
              return (
                <div
                  key={hallway.id}
                  className="relative flex flex-col h-full rounded-2xl overflow-hidden shadow-lg h-[450px]"
                  style={{
                    opacity: 1,
                    transform: "translateY(0px)",
                    transition: `all 0.6s ease-out ${hallwayIndex * 150}ms`,
                  }}
                >
                  {/* Background hallway image */}
                  <img
                    src={hallwayBg}
                    alt="Hallway"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  {/* Conversation content */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 md:p-8 h-full">
                    {hallway.conversations[0] && (
                      <>
                        <blockquote className="text-white italic mb-4 md:mb-6 text-base md:text-lg lg:text-xl leading-relaxed">
                          "{hallway.conversations[0].quote}"
                        </blockquote>
                        <div>
                          <p className="font-bold text-white text-base md:text-lg lg:text-xl">
                            {hallway.conversations[0].author}
                          </p>
                          <p className="text-slate-200 text-sm md:text-base lg:text-lg">
                            {hallway.conversations[0].role}
                          </p>
                          <p className="text-slate-300 text-sm md:text-base lg:text-lg">
                            {hallway.conversations[0].company}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}