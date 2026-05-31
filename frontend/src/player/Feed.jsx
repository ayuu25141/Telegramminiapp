import { useState } from 'react';
import { Play, Eye, Clock, TrendingUp } from "lucide-react";

const SAMPLE_VIDEOS = [
  { id: 1, title: "Advanced React Patterns and Best Practices for 2026", thumbnail: "/thumb1.jpg", duration: "12:34", views: "45.2K", trending: true },
  { id: 2, title: "Building Scalable Web Applications with Modern Tools", thumbnail: "/thumb2.jpg", duration: "8:15", views: "32.8K", trending: false },
  { id: 3, title: "CSS Grid and Flexbox: Complete Masterclass", thumbnail: "/thumb3.jpg", duration: "15:42", views: "28.1K", trending: true },
  { id: 4, title: "TypeScript Tips and Tricks for Production Apps", thumbnail: "/thumb4.jpg", duration: "10:20", views: "19.5K", trending: false },
  { id: 5, title: "Mastering Tailwind CSS v4: New Features", thumbnail: "/thumb5.jpg", duration: "6:45", views: "51.3K", trending: true },
  { id: 6, title: "Performance Optimization Techniques for React", thumbnail: "/thumb6.jpg", duration: "14:18", views: "37.9K", trending: false },
];


function Videocard({ title, thumbnail, duration, views, trending, onClick }) {
  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl overflow-hidden shadow-lg shadow-black/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-900/30 group-hover:-translate-y-1">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-7 h-7 md:w-9 md:h-9 text-black fill-black ml-1" />
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
          {duration}
        </div>

        {trending && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-0.5 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
            <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="hidden sm:inline">Trending</span>
          </div>
        )}
      </div>

      <div className="mt-2 px-1">
        <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-1 md:mb-2 leading-snug group-hover:text-purple-300 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-1 md:gap-2 text-zinc-400 text-xs md:text-sm">
          <Eye className="w-3 h-3 md:w-4 md:h-4" />
          <span className="font-medium">{views} views</span>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
    console.log('Playing video:', videoId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2 sm:mb-3">
          More  Video Collection
          </h1>
      
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {SAMPLE_VIDEOS.map((video) => (
            <Videocard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              trending={video.trending}
              onClick={() => handleVideoClick(video.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}