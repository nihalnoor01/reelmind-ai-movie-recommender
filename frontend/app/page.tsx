"use client"

import type React from "react"
import { useState, useEffect } from "react"
// Correct import path for BuyMeACoffeeButton if it's in components/
import BuyMeACoffeeButton from '../app/BuyMeACoffeeButton';
import {
  Search,
  Sparkles,
  Film,
  Play,
  Users,
  Zap,
  Heart,
  Brain,
  Coffee,
  Moon,
  Flame,
  Smile,
  Drama,
  ActivityIcon as Action, // Alias ActivityIcon to Action
  Github, // Import Github icon
  Mail, // Import Mail icon
  Phone, // Import Phone icon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RecommendationCard from "./RecommendationCard"

interface Recommendation {
  title: string
  type: string
  genre: string
  description: string
  vote_average: number | string
  poster_path?: string
  tmdb_url?: string
}

interface RecommendationResponse {
  movies: Recommendation[]
  series: Recommendation[]
}

const genreOptions = [
  { value: "Action", icon: Action, color: "from-red-600 to-red-800" },
  { value: "Adventure", icon: Zap, color: "from-emerald-600 to-emerald-800" },
  { value: "Animation", icon: Sparkles, color: "from-purple-600 to-purple-800" },
  { value: "Comedy", icon: Smile, color: "from-yellow-600 to-yellow-800" },
  { value: "Crime", icon: Drama, color: "from-gray-600 to-cyan-800" },
  { value: "Documentary", icon: Film, color: "from-blue-600 to-blue-800" },
  { value: "Drama", icon: Drama, color: "from-indigo-600 to-indigo-800" },
  { value: "Family", icon: Heart, color: "from-pink-600 to-pink-800" },
  { value: "Fantasy", icon: Sparkles, color: "from-violet-600 to-violet-800" },
  { value: "Horror", icon: Moon, color: "from-slate-700 to-emerald-900" },
  { value: "Mystery", icon: Search, color: "from-slate-600 to-violet-800" },
  { value: "Romance", icon: Heart, color: "from-rose-600 to-rose-800" },
  { value: "Sci-Fi", icon: Zap, color: "from-cyan-600 to-cyan-800" },
  { value: "Thriller", icon: Flame, color: "from-orange-600 to-orange-800" },
]

const moodOptions = [
  { value: "Light and Funny", icon: Smile, color: "text-yellow-400" },
  { value: "Dark and Thought-Provoking", icon: Brain, color: "text-purple-400" },
  { value: "Epic Adventure", icon: Zap, color: "text-emerald-400" },
  { value: "Heartwarming and Uplifting", icon: Heart, color: "text-pink-400" },
  { value: "Suspenseful and Thrilling", icon: Flame, color: "text-orange-400" },
  { value: "Action-Packed", icon: Action, color: "text-red-400" },
  { value: "Relaxing and Chill", icon: Coffee, color: "text-blue-400" },
  { value: "Family-Friendly", icon: Users, color: "text-green-400" },
]

const movieQuotes = [
  '"Here\'s looking at you, kid." - Casablanca',
  '"May the Force be with you." - Star Wars',
  '"I\'ll be back." - The Terminator',
  '"Life is like a box of chocolates." - Forrest Gump',
  '"You can\'t handle the truth!" - A Few Good Men',
  '"Frankly, my dear, I don\'t give a damn." - Gone with the Wind',
  '"There\'s no place like home." - The Wizard of Oz',
  '"I\'m gonna make him an offer he can\'t refuse." - The Godfather',
  '"Go ahead, make my day." - Sudden Impact',
  '"Show me the money!" - Jerry Maguire',
  '"Houston, we have a problem." - Apollo 13',
  '"Keep your friends close, but your enemies closer." - The Godfather Part II',
  '"I see dead people." - The Sixth Sense',
  '"Nobody puts Baby in a corner." - Dirty Dancing',
  '"I feel the need... the need for speed!" - Top Gun',
  '"You\'re gonna need a bigger boat." - Jaws',
  '"Say hello to my little friend!" - Scarface',
  '"Hasta la vista, baby." - Terminator 2',
  '"I\'m king of the world!" - Titanic',
  '"My precious." - The Lord of the Rings',
  '"Why so serious?" - The Dark Knight',
  '"Elementary, my dear Watson." - Sherlock Holmes films',
  '"Toto, I\'ve a feeling we\'re not in Kansas anymore." - The Wizard of Oz',
  '"Bond. James Bond." - James Bond films',
  '"You talkin\' to me?" - Taxi Driver',
  '"Here\'s Johnny!" - The Shining',
  '"I\'ll have what she\'s having." - When Harry Met Sally',
  '"Roads? Where we\'re going we don\'t need roads." - Back to the Future',
  '"E.T. phone home." - E.T.',
  '"The first rule of ***** **** is: You do not talk about ***** ****." - ***** ****',
  '"Wax on, wax off." - The Karate Kid',
  '"I\'m not bad. I\'m just drawn that way." - Who Framed Roger Rabbit',
  '"You had me at hello." - Jerry Maguire',
  '"I\'m too old for this." - Lethal Weapon',
  '"Carpe diem. Seize the day, boys." - Dead Poets Society',
  '"After all, tomorrow is another day!" - Gone with the Wind',
  '"You\'re my boy, Blue!" - Old School',
  '"I am serious, and don\'t call me Shirley." - Airplane!',
  '"To infinity and beyond!" - Toy Story',
  '"Just keep swimming." - Finding Nemo',
  '"Ohana means family." - Lilo & Stitch',
  '"I\'m not a smart man, but I know what love is." - Forrest Gump',
  '"Great Scott!" - Back to the Future',
  '"Yippee-ki-yay!" - Die Hard',
  '"I\'m the king of the world!" - Titanic'
];

export default function ReelMind() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState("")
  const [similarLikes, setSimilarLikes] = useState("")
  const [otherSuggestions, setOtherSuggestions] = useState("")
  const [language, setLanguage] = useState("English")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [excludeCriteria, setExcludeCriteria] = useState("")
  const [keywordsThemes, setKeywordsThemes] = useState("")
  const [castCrew, setCastCrew] = useState("")
  const [runtimeEpisodeCount, setRuntimeEpisodeCount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null)
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % movieQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!similarLikes && selectedGenres.length === 0 && !otherSuggestions && !selectedMood) {
      setError("Please provide some preferences to get recommendations.")
      return
    }

    setIsLoading(true)
    setError("")
    setRecommendations(null)

    // Prepare the payload for your backend
    const payload = {
      similar_likes: similarLikes,
      genre: selectedGenres.join(", "),
      other_suggestions: otherSuggestions,
      language: language,
      mood: selectedMood,
      exclude_criteria: excludeCriteria,
      keywords_themes: keywordsThemes,
      cast_crew: castCrew,
      runtime_episode_count: runtimeEpisodeCount,
    }

    try {
      console.log("Sending request to backend with payload:", payload)

      const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'; // Add this line at the beginning of your handleSubmit function or above it if needed globally in the component.

      const response = await fetch(`${BACKEND_BASE_URL}/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Server responded with status ${response.status}`)
      }

      const data = await response.json()
      console.log("Received recommendations from backend:", data)
      setRecommendations(data)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      setError(
        `Failed to get recommendations: ${error instanceof Error ? error.message : "Unknown error"}. Make sure your backend server is running on http://localhost:5000`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-stone-100 relative overflow-hidden">
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23A8A8A8' fillOpacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated Spotlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-purple-800/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-gray-700/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1000ms" }}
      ></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="text-center py-16 px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Film className="w-12 h-12 text-purple-400 animate-spin-slow" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-stone-200 via-purple-300 to-stone-200 bg-clip-text text-transparent font-orbitron">
              ReelMind
            </h1>
            <Film className="w-12 h-12 text-stone-300 animate-spin-slow" />
          </div>
          <p className="text-xl md:text-2xl text-stone-300 mb-8 font-light">Let AI script your next binge</p>

          {/* Movie Quote Carousel */}
          <div className="h-8 mb-8">
            <p className="text-purple-300 italic transition-opacity duration-1000 font-medium">
              {movieQuotes[currentQuote]}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {/* Recommendation Form */}
          <div className="backdrop-blur-xl bg-gray-800/30 rounded-3xl border border-gray-600/30 p-8 mb-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Similar Likes */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />I like shows/movies similar to:
                </label>
                <Input
                  value={similarLikes}
                  onChange={(e) => setSimilarLikes(e.target.value)}
                  placeholder="e.g., The Office, Inception, Breaking Bad"
                  className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 h-12 text-lg backdrop-blur-sm focus:border-purple-400"
                />
              </div>

              {/* Genre Selection */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-stone-200 flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Choose your genres:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {genreOptions.map((genre) => {
                    const Icon = genre.icon
                    const isSelected = selectedGenres.includes(genre.value)
                    return (
                      <button
                        key={genre.value}
                        type="button"
                        onClick={() => toggleGenre(genre.value)}
                        className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                          isSelected
                            ? `bg-gradient-to-r ${genre.color} border-gray-500/60 shadow-lg scale-105`
                            : "bg-gray-800/40 border-gray-600/40 hover:bg-gray-700/50 hover:border-gray-500/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{genre.value}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Mood Selection */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-stone-200 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  What's your mood?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {moodOptions.map((mood) => {
                    const Icon = mood.icon
                    const isSelected = selectedMood === mood.value
                    return (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setSelectedMood(isSelected ? "" : mood.value)}
                        className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                          isSelected
                            ? "bg-gray-700/60 border-gray-500/60 shadow-lg"
                            : "bg-gray-800/40 border-gray-600/40 hover:bg-gray-700/50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${mood.color}`} />
                        <span className="text-sm font-medium">{mood.value}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Language and Other Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-stone-200">Language:</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-stone-100 h-12 focus:border-purple-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600/50">
                      {["English", "Spanish", "French", "German", "Japanese", "Korean", "Hindi", "Mandarin"].map(
                        (lang) => (
                          <SelectItem key={lang} value={lang} className="text-stone-100 hover:bg-gray-700/50">
                            {lang}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-lg font-semibold text-stone-200">Other preferences:</label>
                  <Textarea
                    value={otherSuggestions}
                    onChange={(e) => setOtherSuggestions(e.target.value)}
                    placeholder="e.g., light-hearted, visually stunning, complex plot"
                    className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 min-h-[48px] backdrop-blur-sm focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="bg-gray-800/50 border-gray-600/50 text-stone-100 hover:bg-gray-700/50 hover:border-gray-500/50"
                >
                  {showAdvanced ? "Hide" : "Show"} Advanced Options
                </Button>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="space-y-6 p-6 rounded-2xl bg-gray-800/30 border border-gray-600/30">
                  <h3 className="text-xl font-semibold text-center text-purple-300">Advanced Preferences</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-stone-300">Exclude:</label>
                      <Textarea
                        value={excludeCriteria}
                        onChange={(e) => setExcludeCriteria(e.target.value)}
                        placeholder="e.g., no horror, avoid 80s movies"
                        className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-stone-300">Keywords/Themes:</label>
                      <Input
                        value={keywordsThemes}
                        onChange={(e) => setKeywordsThemes(e.target.value)}
                        placeholder="e.g., time travel, dystopian future"
                        className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-stone-300">Cast/Crew Preferences:</label>
                      <Input
                        value={castCrew}
                        onChange={(e) => setCastCrew(e.target.value)}
                        placeholder="e.g., Leonardo DiCaprio, Quentin Tarantino"
                        className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-stone-300">Runtime Preference:</label>
                      <Input
                        value={runtimeEpisodeCount}
                        onChange={(e) => setRuntimeEpisodeCount(e.target.value)}
                        placeholder="e.g., short movie, miniseries"
                        className="bg-gray-800/50 border-gray-600/50 text-stone-100 placeholder-gray-400 focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-stone-100 px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-600/50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-stone-300/30 border-t-stone-100 rounded-full animate-spin"></div>
                      Generating Recommendations...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Get Recommendations
                      <Play className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="backdrop-blur-xl bg-red-900/30 border border-red-700/50 rounded-2xl p-6 mb-8 text-center">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Recommendations */}
          {recommendations && (
            <div className="space-y-12">
              {/* Movies Section */}
              {recommendations.movies && recommendations.movies.length > 0 && (
                <div className="backdrop-blur-xl bg-gray-800/20 rounded-3xl border border-gray-600/30 p-8">
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-stone-200 to-purple-300 bg-clip-text text-transparent flex items-center justify-center gap-3">
                    <Film className="w-8 h-8 text-purple-400" />
                    Movies
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {recommendations.movies.map((movie, index) => (
                      <RecommendationCard key={index} item={movie} />
                    ))}
                  </div>
                </div>
              )}

              {/* Series Section */}
              {recommendations.series && recommendations.series.length > 0 && (
                <div className="backdrop-blur-xl bg-gray-800/20 rounded-3xl border border-gray-600/30 p-8">
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 to-stone-200 bg-clip-text text-transparent flex items-center justify-center gap-3">
                    <Play className="w-8 h-8 text-stone-300" />
                    Series
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {recommendations.series.map((series, index) => (
                      <RecommendationCard key={index} item={series} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="backdrop-blur-xl bg-gray-800/20 border-t border-gray-600/30 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Film className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-semibold bg-gradient-to-r from-stone-200 to-purple-300 bg-clip-text text-transparent">
                ReelMind
              </span>
              <Film className="w-6 h-6 text-stone-300" />
            </div>
            <p className="text-stone-400 mb-2">Powered by Google Gemini &amp; TMDB</p>
            <p className="text-sm text-stone-500">Made by Nihal.</p>
            <BuyMeACoffeeButton />

            {/* Contact Me Section */}
            <div className="mt-6 pt-4 border-t border-gray-700/50 flex flex-col items-center justify-center gap-3 text-stone-400">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Connect with me:</h3>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <a href="mailto:nihalnoormpm01@gmail.com" className="hover:text-stone-300 transition-colors duration-200">
                  nihalnoormpm01@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-blue-400" />
                <a
                  href="https://github.com/nihalnoor01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-300 hover:underline transition-colors duration-200"
                >
                  github.com/nihalnoor01
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}