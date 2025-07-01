import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes (important for frontend-backend communication)
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Configure Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not found in environment variables. Please set it.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Configure TMDB API
const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY not found in environment variables. Please set it.");
}
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 is a good size for posters
const TMDB_WEB_URL = 'https://www.themoviedb.org'; // Base URL for the TMDB website

// Helper function to fetch movie/series details from TMDB
async function getTmdbDetails(title, type) {
    if (!TMDB_API_KEY) return { poster_path: null, vote_average: null, tmdb_id: null, tmdb_url: null };

    try {
        const searchPath = type.toLowerCase() === 'movie' ? 'movie' : 'tv';
        const searchRes = await axios.get(`${TMDB_BASE_URL}/search/${searchPath}`, {
            params: {
                api_key: TMDB_API_KEY,
                query: title,
                language: 'en-US'
            }
        });

        if (searchRes.data.results.length > 0) {
            const media = searchRes.data.results[0]; // Take the first result
            const tmdb_id = media.id;
            const tmdb_url = tmdb_id ? `${TMDB_WEB_URL}/${searchPath}/${tmdb_id}` : null;

            return {
                poster_path: media.poster_path ? `${TMDB_IMAGE_BASE_URL}${media.poster_path}` : null,
                vote_average: media.vote_average ? media.vote_average.toFixed(1) : 'N/A', // Format to one decimal
                tmdb_id: tmdb_id, // Return the TMDB ID
                tmdb_url: tmdb_url // Return the direct TMDB URL
            };
        }
    } catch (tmdbError) {
        console.error(`Error fetching TMDB details for ${title} (${type}):`, tmdbError.message);
        if (tmdbError.response) {
            console.error('TMDB API Error Response Data:', tmdbError.response.data);
        }
    }
    return { poster_path: null, vote_average: null, tmdb_id: null, tmdb_url: null }; // Return nulls if not found or error
}


// API Endpoint for Recommendations
app.post('/recommendations', async (req, res) => {
    try {
        // Destructure new advanced parameters
        const {
            similar_likes,
            genre,
            other_suggestions,
            language,
            mood, // New
            exclude_criteria, // New
            keywords_themes, // New
            cast_crew, // New
            runtime_episode_count // New
        } = req.body;

        // Build prompt parts conditionally for advanced fields
        let advancedPreferences = '';
        if (mood) advancedPreferences += `- Desired Mood: ${mood}\n`;
        if (exclude_criteria) advancedPreferences += `- Exclude (genres, keywords, themes, years): ${exclude_criteria}\n`;
        if (keywords_themes) advancedPreferences += `- Specific Keywords/Themes: ${keywords_themes}\n`;
        if (cast_crew) advancedPreferences += `- Preferred/Disliked Cast/Crew: ${cast_crew}\n`;
        if (runtime_episode_count) advancedPreferences += `- Run-time/Episode Count Preference: ${runtime_episode_count}\n`;


        const prompt = `
        You are an expert movie and series recommender. Based on the user's preferences, provide **12 movie recommendations** and **12 series recommendations**.
        
        User Preferences:
        - Similar shows/movies liked: ${similar_likes || "none specified"}
        - Desired genre(s): ${genre || "any"}
        - Other suggestions/preferences: ${other_suggestions || "none specified"}
        - Language for recommendations: ${language || "English"}
        ${advancedPreferences}

        For each recommendation, provide the following details in a structured way:
        Title | Type (Movie/Series) | Primary Genre | Brief Description (max 2 sentences)

        Ensure a good variety of recommendations. Avoid repeating titles.
        
        Start the movie list with "### Movies:" and the series list with "### Series:".
        Each recommendation should be on a new line and follow the exact format: "Title | Type | Primary Genre | Brief Description".

        Example for Movies:
        1. Inception | Movie | Sci-Fi | A thief who steals corporate secrets through dream-sharing technology.
        2. The Dark Knight | Movie | Action | Batman confronts the Joker, a criminal mastermind threatening Gotham City.

        Example for Series:
        1. Breaking Bad | Series | Crime Drama | A high school chemistry teacher turns to manufacturing and selling methamphetamine.
        2. Stranger Things | Series | Sci-Fi Horror | A group of kids investigates supernatural occurrences in their town.

        Now, generate the recommendations:
        `;

        console.log("\n--- Sending prompt to Gemini ---");
        console.log(prompt);
        console.log("--- End of Prompt ---\n");

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const recommendationsText = response.text();

        console.log("\n--- Received from Gemini (Raw Text) ---");
        console.log(recommendationsText);
        console.log("--- End of Raw Text ---\n");

        // --- Parsing the Gemini Response ---
        const rawMovies = [];
        const rawSeries = [];
        let currentSection = null;

        const lines = recommendationsText.trim().split('\n');

        console.log("Attempting to parse lines...");
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
                continue;
            }

            if (trimmedLine.startsWith("### Movies:")) {
                currentSection = "movies";
                console.log("Found Movies section.");
                continue;
            } else if (trimmedLine.startsWith("### Series:")) {
                currentSection = "series";
                console.log("Found Series section.");
                continue;
            }

            if (currentSection) {
                let cleanLine = trimmedLine;
                if (trimmedLine.match(/^\d+\.\s*/)) {
                    cleanLine = trimmedLine.substring(trimmedLine.indexOf('.') + 1).trim();
                }
                const parts = cleanLine.split(/\s*\|\s*/);

                console.log(`Processing section '${currentSection}', Line: "${trimmedLine}"`);
                console.log(`Cleaned Line: "${cleanLine}"`);
                console.log(`Split Parts (${parts.length}):`, parts);

                if (parts.length >= 4) {
                    const item = {
                        title: parts[0].trim(),
                        type: parts[1].trim(),
                        genre: parts[2].trim(),
                        description: parts.slice(3).join(' | ').trim()
                    };
                    if (currentSection === "movies") {
                        rawMovies.push(item);
                    } else if (currentSection === "series") {
                        rawSeries.push(item);
                    }
                    console.log(`Successfully parsed: ${item.title}`);
                } else {
                    console.warn(`Could not parse line (incorrect number of parts): "${trimmedLine}"`);
                }
            } else {
                console.log(`Skipping line before section header: "${trimmedLine}"`);
            }
        }
        console.log(`Parsing complete. Raw Movies found: ${rawMovies.length}, Raw Series found: ${rawSeries.length}`);

        // --- Fetch TMDB details for each item ---
        const moviesWithDetails = await Promise.all(rawMovies.map(async (movie) => {
            const details = await getTmdbDetails(movie.title, 'movie');
            return { ...movie, ...details }; // Merge TMDB details including tmdb_id and tmdb_url
        }));

        const seriesWithDetails = await Promise.all(rawSeries.map(async (seriesItem) => {
            const details = await getTmdbDetails(seriesItem.title, 'series');
            return { ...seriesItem, ...details }; // Merge TMDB details including tmdb_id and tmdb_url
        }));

        console.log(`Movies with TMDB details: ${moviesWithDetails.length}, Series with TMDB details: ${seriesWithDetails.length}`);

        res.json({ movies: moviesWithDetails, series: seriesWithDetails });

    } catch (error) {
        console.error('\n--- Error fetching recommendations ---');
        console.error('Error message:', error.message);

        if (error.response) {
            const errorResponseData = error.response.data;
            console.error('Full API Error Response (if available):', errorResponseData);
            if (errorResponseData && errorResponseData.candidates && errorResponseData.candidates.length > 0) {
                console.error('Gemini API error details (finish reason):', errorResponseData.candidates[0].finishReason);
                console.error('Gemini API error details (safety ratings):', errorResponseData.candidates[0].safetyRatings);
            } else if (errorResponseData && errorResponseData.error) {
                 console.error('Google API error:', errorResponseData.error);
            }
        } else if (error.cause) {
            console.error('Error cause (e.g., network error):', error.cause);
        }
        console.error('--- End of Error ---');

        res.status(500).json({
            error: "Failed to generate recommendations. Please try again or refine your prompt.",
            details: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});