import React from 'react';

export function Stats() {
  return (
    <section className="py-12 md:py-16 border-y border-black/10 bg-white relative z-10 w-full font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
          <div className="text-center px-4 py-2 sm:py-0">
            <div className="text-4xl md:text-5xl font-normal font-instrument tracking-tight text-black mb-2">
              98%
            </div>
            <div className="text-sm sm:text-base text-black/70 font-medium">Growth Rate</div>
          </div>

          <div className="text-center px-4 py-2 sm:py-0">
            <div className="text-4xl md:text-5xl font-normal font-instrument tracking-tight text-black mb-2">
              50k+
            </div>
            <div className="text-sm sm:text-base text-black/70 font-medium">Lines of Code</div>
          </div>

          <div className="text-center px-4 py-2 sm:py-0">
            <div className="text-4xl md:text-5xl font-normal font-instrument tracking-tight text-black mb-2">
              10
            </div>
            <div className="text-sm sm:text-base text-black/70 font-medium">Portfolio Projects</div>
          </div>

          <div className="text-center px-4 py-2 sm:py-0">
            <div className="text-4xl md:text-5xl font-normal font-instrument tracking-tight text-black mb-2">
              24/7
            </div>
            <div className="text-sm sm:text-base text-black/70 font-medium">AI Mentor Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
