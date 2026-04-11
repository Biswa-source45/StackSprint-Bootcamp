import React from 'react';

export function Stats() {
  return (
    <section className="py-10 border-y border-zinc-100 bg-white/50 backdrop-blur-sm relative z-10 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-zinc-100">
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-emerald-600 mb-1.5">98%</div>
            <div className="text-base text-zinc-600 font-medium">Growth Rate</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-1.5">50k+</div>
            <div className="text-base text-zinc-600 font-medium">Lines of Code</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-1.5">10</div>
            <div className="text-base text-zinc-600 font-medium">Portfolio Projects</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-yellow-500 mb-1.5">24/7</div>
            <div className="text-base text-zinc-600 font-medium">AI Mentor Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
