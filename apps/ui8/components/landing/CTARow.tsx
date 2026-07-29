"use client";

import { Zap, Send, Sparkles } from "lucide-react";

export function CTARow() {
  return (
    <section className="py-32 px-5 bg-[#141414]">
      <div className="container max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Text */}
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1 animate-spin" />
              <p className="text-lg text-[#adb7be] leading-relaxed">
                Get instant access to premium design resources and unlock your
                creative potential
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Send
                className="w-6 h-6 text-white flex-shrink-0 mt-1"
                style={{
                  animation: "sendFloat 3.5s ease-in-out infinite",
                }}
              />
              <p className="text-lg text-[#adb7be] leading-relaxed">
                Subscribe to our newsletter for weekly curated design assets and
                exclusive offers
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <p className="text-lg text-[#adb7be] leading-relaxed">
                Join thousands of designers already saving time and improving
                their workflow
              </p>
            </div>
          </div>

          {/* Right Newsletter Signup */}
          <div className="flex-1 w-full max-w-sm">
            <div className="bg-[#202020] border border-[#2d2d2d] rounded-full p-1 flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-[#5a6068] focus:outline-none text-sm"
              />
              <button className="btn-primary flex-shrink-0 m-0.5">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-[#5a6068] mt-3 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
