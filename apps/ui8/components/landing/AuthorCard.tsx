import { Users, ExternalLink } from "lucide-react";

export function AuthorCard() {
  const authorPortfolio = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${1551431009 + i}?w=300&h=200&fit=crop`,
  }));

  return (
    <section className="py-32 px-5 bg-[#141414]">
      <div className="container max-w-6xl">
        <div className="bg-[#202020] border border-[#2d2d2d] rounded-3xl overflow-hidden">
          {/* Portfolio Grid */}
          <div className="grid grid-cols-3 gap-1">
            {authorPortfolio.map((item) => (
              <button
                key={item.id}
                className="relative h-48 overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={`Portfolio ${item.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-6 p-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-[#2d68ff] to-[#00b27a] blur-sm opacity-60" />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Designer"
                className="relative w-16 h-16 rounded-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-white mb-1">
                John Designer
              </h3>
              <p className="text-sm text-[#adb7be] mb-4">
                Award-winning designer with 10+ years experience creating digital products
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-[#adb7be]">
                  <Users size={16} />
                  <span>12.5K followers</span>
                </div>
                <button className="inline-flex items-center gap-2 text-[#2d68ff] hover:text-[#2255dd] transition-colors font-medium">
                  View Profile
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>

            {/* Follow Button */}
            <button className="btn-secondary flex-shrink-0">
              Follow
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
