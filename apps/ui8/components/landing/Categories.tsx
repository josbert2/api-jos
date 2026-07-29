"use client";

import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    name: "UI Kits",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    count: "1,240+",
  },
  {
    id: 2,
    name: "Templates",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    count: "856+",
  },
  {
    id: 3,
    name: "Icons",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    count: "5,632+",
  },
  {
    id: 4,
    name: "Illustrations",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565e479?w=400&h=300&fit=crop",
    count: "2,145+",
  },
];

export function Categories() {
  return (
    <section className="py-32 px-5 bg-[#141414]">
      <div className="container space-y-12">
        <h2 className="text-3xl font-medium text-white text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className="group relative overflow-hidden rounded-2xl h-64 bg-[#1c1c1c]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-2xl font-medium text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-[#adb7be] mb-4">
                  {category.count} assets
                </p>
                <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
