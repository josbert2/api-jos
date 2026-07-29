export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#141414]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container text-center space-y-8 animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-6xl font-medium text-white leading-tight">
          Design Assets Made Simple
        </h1>

        <p className="text-xl text-[#adb7be] max-w-2xl mx-auto leading-relaxed">
          Discover thousands of UI kits, templates, and design resources curated
          for modern designers and developers.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="btn-primary">
            Explore Assets
          </button>
          <button className="btn-secondary">
            Browse Collections
          </button>
        </div>

        <div className="pt-12">
          <p className="text-sm text-[#5a6068] mb-6">Trusted by designers worldwide</p>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-[#202020] rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
