import React from 'react';

function Aboutbody() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-12">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-zinc-900 to-black py-16 px-6 text-center border-b border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlimited Premium Adult Entertainment
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Fast HD &amp; 4K streaming, smart recommendations, and seamless experience 
            directly inside Telegram Mini App.
          </p>
        </div>
      </section>

      {/* ABOUT PLATFORM */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">About Our Platform</h2>
          <div className="space-y-6 text-zinc-300 text-lg">
            <p>
              We deliver a premium, private, and high-quality adult streaming experience 
              built exclusively for Telegram users.
            </p>
            <p>
              Enjoy instant access to thousands of videos with lightning-fast playback, 
              personalized AI recommendations, and complete privacy.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Powerful Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">🔥 Smart AI Recommendations</h3>
              <p className="text-zinc-400">Personalized feed based on your watch history and taste.</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">⚡ Ultra Fast Streaming</h3>
              <p className="text-zinc-400">Smooth HD &amp; 4K playback with adaptive technology.</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">🔒 Secure Telegram Login</h3>
              <p className="text-zinc-400">Instant and private authentication via Telegram.</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">📈 Trending Content</h3>
              <p className="text-zinc-400">Real-time trending and newly uploaded videos.</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">🛡️ Privacy First</h3>
              <p className="text-zinc-400">Discreet experience with no external tracking.</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-2xl hover:bg-zinc-700 transition-all">
              <h3 className="text-xl font-semibold mb-3">🌟 Live &amp; Premium</h3>
              <p className="text-zinc-400">Access exclusive live streams and premium content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Popular Categories</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Trending", "Desi", "Bhabhi", "Indian MMS", "Aunty", 
              "Village Girl", "Saree", "Maid", "College Girl", "Hindi Audio",
              "South Indian", "Bollywood", "Tamil", "Bengali", "Paki",
              "Creampie", "Blowjob", "Anal", "Threesome", "POV",
              "Big Ass", "Public", "Amateur", "4K UHD", "New Releases"
            ].map((cat, i) => (
              <span 
                key={i}
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all active:scale-95"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Platform Stats</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-pink-500">1k+</h3>
              <p className="text-zinc-400 mt-2">Premium Videos</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-pink-500">500+</h3>
              <p className="text-zinc-400 mt-2">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-pink-500">98%</h3>
              <p className="text-zinc-400 mt-2">Satisfaction</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-pink-500">24/7</h3>
              <p className="text-zinc-400 mt-2">Streaming</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why Users Love Us</h2>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              Fresh content uploaded daily
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              No annoying ads in premium
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              Fully optimized for Telegram
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              Safe &amp; completely private
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              Fast customer support
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              Regular updates &amp; new features
            </li>
          </ul>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 px-6 text-center border-t border-zinc-800">
        <p className="text-zinc-500 text-sm">
          18+ Only • For Adults Only • Please use responsibly
        </p>
      </section>

    </div>
  );
}

export default Aboutbody;