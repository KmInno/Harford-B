import React from 'react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/group-elementary-age-schoolchildren-outside-school-kids-going-to-together-215218953.jpg')",
      }}


    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="opacity-0 text-3xl md:text-5xl font-bold text-white leading-tight mb-4 animate-slide-in-left">
          Welcome to Harford Bridge International School
        </h1>

        <p className="opacity-0 text-lg md:text-xl text-gray-200 mb-6 animate-slide-in-right200">
          Unfettered Intelligencies Blooming Tomorrows
        </p>

        <button className="opacity-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg animate-slide-in-bottom400">
          Get Started
        </button>
      </div>
    </section>
  );
}