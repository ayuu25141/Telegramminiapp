// import { useState } from 'react';
// import { Play, Eye, Clock, TrendingUp } from "lucide-react";
// import API from "../api/axiosconfig";
// import { useEffect} from "react";
// import { useNavigate } from "react-router-dom"


// function Videocard({
//   title,
//   thumbnail,
//   duration,
//   views,
//   category,
//   tags,
//   onClick
  
// }) {
//   return (
//     <div
//       className="group cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="relative aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl overflow-hidden shadow-lg shadow-black/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-900/30 group-hover:-translate-y-1">
//         <img
//           src={thumbnail}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

//         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//           <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
//             <Play className="w-7 h-7 md:w-9 md:h-9 text-black fill-black ml-1" />
//           </div>
//         </div>

//         <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
//           <Clock className="w-3 h-3 text-white md:w-3.5 md:h-3.5" />
//           {formatDuration(duration)}
//         </div>

//         {trending && (
//           <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-0.5 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
//             <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
//             <span className="hidden sm:inline">Trending</span>
//           </div>
//         )}
//       </div>

//       <div className="mt-2 px-1">
//         <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-1 md:mb-2 leading-snug group-hover:text-purple-300 transition-colors duration-200">
//           {title}
//         </h3>
//         <div className="flex items-center gap-1 md:gap-2 text-zinc-400 text-xs md:text-sm">
//           <Eye className="w-3 h-3 md:w-4 md:h-4" />
//           <span className="font-medium">{views} views</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [selectedVideo, setSelectedVideo] = useState(null);
// const [videos, setVideos] = useState([]);
// const [loading, setLoading] = useState(true);
// const navigate = useNavigate();



// useEffect(() => {

//   API.get("/homepagevideos")
//     .then((res) => {

//       setVideos(res.data.videos || [])
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//     .finally(() => {
//       setLoading(false)
//     })

// }, [])
// const handleVideoClick = (videoId) => {

//   navigate(`/collection/${videoId}`)

// };
// function formatDuration(seconds) {

//   if (!seconds) return "0:00"

//   const mins = Math.floor(seconds / 60)
//   const secs = seconds % 60

//   return `${mins}:${secs.toString().padStart(2, "0")}`
// }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
//       <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         <header className="mb-8 sm:mb-12">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2 sm:mb-3">
//             Video Collection
//           </h1>
//           <p className="text-zinc-400 text-base sm:text-lg">Discover amazing content curated just for you</p>
//         </header>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//           {videos.map((video) => (
//      <Videocard
//   key={video.id}
//   title={video.title}
//   thumbnail={video.thumbnail_url}
//   duration={video.duration_seconds}
//   views={video.views}
//   category={video.category}
//   tags={video.tags}
//   onClick={() => handleVideoClick(video.id)}
// />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react'
import { Play, Eye, Clock } from "lucide-react"
import API from "../api/axiosconfig"
import { useNavigate } from "react-router-dom"

// ─────────────────────────────────────────────
// Duration Format
// ─────────────────────────────────────────────
function formatDuration(seconds) {

  if (!seconds) return "0:00"

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// ─────────────────────────────────────────────
// Video Card
// ─────────────────────────────────────────────
function Videocard({
  title,
  thumbnail,
  duration,
  views,
  category,
  tags,
  onClick
}) {

  return (

    <div
      className="group cursor-pointer"
      onClick={onClick}
    >

      {/* Thumbnail */}
      <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-[1.02]">

        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">

          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">

            <Play className="w-8 h-8 text-black fill-black ml-1" />

          </div>

        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 rounded text-xs text-white flex items-center gap-1">

          <Clock className="w-3 h-3" />

          {formatDuration(duration)}

        </div>

      </div>

      {/* Info */}
      <div className="mt-3">

        {/* Title */}
        <h2 className="text-white font-semibold text-sm md:text-base line-clamp-2">
          {title}
        </h2>

        {/* Views */}
        <div className="flex items-center gap-1 text-zinc-400 text-xs mt-2">

          <Eye className="w-3 h-3" />

          <span>{views} views</span>

        </div>

        {/* Category */}
        {
          category && (

            <div className="mt-2">

              <span className="text-xs bg-purple-700/40 text-purple-200 px-2 py-1 rounded">

                {category}

              </span>

            </div>

          )
        }

        {/* Tags */}
        {
          tags?.length > 0 && (

            <div className="flex flex-wrap gap-1 mt-2">

              {
                tags.map((tag, index) => (

                  <span
                    key={index}
                    className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  )
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function Home() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Fetch videos
  useEffect(() => {

    API.get("/homepagevideos")
      .then((res) => {

        setVideos(res.data.videos || [])

      })
      .catch((err) => {

        console.log(err)

      })
      .finally(() => {

        setLoading(false)

      })

  }, [])

  // Click video
  const handleVideoClick = (videoId) => {

    navigate(`/collection/${videoId}`)

  }

  // Loading
  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black">

      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">

            Video Collection

          </h1>

          <p className="text-zinc-400">

            Discover amazing content curated for you

          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            videos.map((video) => (

              <Videocard
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail_url}
                duration={video.duration_seconds}
                views={video.views}
                category={video.category}
                tags={video.tags}
                onClick={() => handleVideoClick(video.id)}
              />

            ))
          }

        </div>

      </div>

    </div>
  )
}