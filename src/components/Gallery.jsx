import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/responsive'

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const headingRef = useScrollReveal('animate-slide-in-left')
  const carouselRef = useScrollReveal('animate-fadeIn200')
  const dotsRef = useScrollReveal('animate-slide-in-bottom400')

  const images = [
    '/images/IMG_5167.webp',
    '/images/IMG_5168.webp',
    '/images/IMG_5169.webp',
    '/images/IMG_5170.webp',
    '/images/IMG_5171.webp',
    '/images/IMG_5172.webp',
    '/images/IMG_5173.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto container shadow-xl rounded-lg p-8">
        <h3 ref={headingRef} className="opacity-0 text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          Gallery
        </h3>

        <div className="max-w-4xl mx-auto">
          {/* Carousel */}
          <div ref={carouselRef} className="opacity-0 relative rounded-xl overflow-hidden shadow-xl group">

            {/* Image */}
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="w-full h-96 object-cover transition-opacity duration-700"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              &#10094;
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              &#10095;
            </button>
          </div>

          {/* Dots */}
          <div ref={dotsRef} className="opacity-0 flex justify-center mt-6 gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 w-3'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-center mt-4 text-gray-600 font-medium">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </section>
  );
}