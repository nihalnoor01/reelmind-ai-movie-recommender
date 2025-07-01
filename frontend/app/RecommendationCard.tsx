import type React from "react"

interface RecommendationCardProps {
  item: {
    title: string
    type: string
    genre: string
    description: string
    vote_average: number | string
    poster_path?: string
    tmdb_url?: string
  }
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800/40 backdrop-blur-md border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300 hover:transform hover:scale-105 max-w-sm mx-auto">
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={item.poster_path || "/placeholder.svg?height=3000&width=2000"}
          alt={item.title}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-stone-100 mb-3 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-stone-300 mb-3 font-medium">
          {item.type} - {item.genre}
        </p>
        <p className="text-sm text-stone-400 line-clamp-4 mb-4 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
          <span className="text-yellow-400 flex items-center font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.104-1.292 4.491c-.23.791.69 1.334 1.348.978l3.109-2.253 3.109 2.253c.658.356 1.576-.187 1.348-.978l-1.292-4.491 3.62-3.104c.635-.544.297-1.584-.536-1.651l-4.752-.381-1.83-4.401z"
                clipRule="evenodd"
              />
            </svg>
            {item.vote_average}
          </span>
          {item.tmdb_url && (
            <a
              href={item.tmdb_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors duration-200 hover:underline"
            >
              More Info
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard
