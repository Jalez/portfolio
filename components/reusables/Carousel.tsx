import React, { useState } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main content area */}
        {/* Mobile view - single item carousel */}
        <div className="block lg:hidden relative flex-1 min-h-0">
          <div className="relative h-full overflow-hidden mx-12">
            <div 
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children.map((child, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 flex flex-col">
                  <div className="h-full flex flex-col">
                    {child}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows - positioned outside content area */}
          {children.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-10 shadow-lg"
                aria-label="Previous item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-10 shadow-lg"
                aria-label="Next item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Desktop view - multiple items */}
        <div className="hidden lg:flex gap-4 sm:gap-6 flex-1 min-h-0 px-4 py-4">
          {children.map((child, index) => (
            <div key={index} className="flex-1 h-full flex flex-col min-h-0">
              {child}
            </div>
          ))}
        </div>

      {/* Dots indicator for mobile */}
      {children.length > 1 && (
        <div className="flex lg:hidden justify-center space-x-2 mt-3 py-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;