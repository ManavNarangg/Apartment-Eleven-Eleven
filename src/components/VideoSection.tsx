import React from "react";
import videoFile from "@/assets/video.mov";

const VideoSection = ({ shouldPlay = true }) => {
  return (
    <section className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen relative overflow-hidden">
      <video
        src={videoFile}
        className="w-full h-full object-cover"
        autoPlay={shouldPlay}
        muted
        loop
        playsInline
        style={{ display: shouldPlay ? 'block' : 'none' }}
      />
      
      {/* Responsive overlay with original text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 px-4">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Welcome to Apartment Eleven Eleven
        </h1>
      </div>
    </section>
  );
};

export default VideoSection;