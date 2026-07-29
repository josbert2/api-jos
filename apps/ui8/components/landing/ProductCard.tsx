"use client";

import { Heart, Zap } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  isFeatured?: boolean;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  author,
  authorAvatar,
  category,
  isFeatured,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="group relative bg-[#202020] rounded-2xl overflow-hidden"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Product Preview */}
      <div className="relative aspect-product bg-[#1c1c1c] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-20 p-2.5 bg-[#2c2c2c] rounded-full hover:bg-[#404040] transition-colors duration-200"
        >
          <Heart
            size={20}
            className={isLiked ? "fill-red-500 text-red-500" : "text-[#adb7be]"}
          />
        </button>

        {/* Action Buttons Overlay */}
        {showActions && (
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-sm">
            <button className="p-3 bg-[#2c2c2c] rounded-full hover:bg-[#404040] transition-colors">
              <Zap size={20} className="text-[#adb7be]" />
            </button>
            <button className="px-6 py-2 bg-[#2d68ff] rounded-full text-white text-sm font-medium hover:bg-[#2255dd] transition-colors">
              Preview
            </button>
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#00b27a]/20 border border-[#00b27a] rounded-full text-[#00b27a] text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title & Price */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <h3 className="text-sm font-medium text-white truncate flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {originalPrice && (
              <span className="text-xs text-[#adb7be] line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-sm font-medium text-white">${price}</span>
          </div>
        </div>

        {/* Author & Category */}
        <div className="flex items-center gap-2 text-xs text-[#adb7be]">
          <img
            src={authorAvatar}
            alt={author}
            className="w-6 h-6 rounded-full bg-[#2d68ff]"
          />
          <span className="truncate flex-1">{author}</span>
          <span className="text-[#5a6068]">•</span>
          <span className="flex-shrink-0">{category}</span>
        </div>
      </div>
    </div>
  );
}
