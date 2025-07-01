# ReelMind AI Movie Recommender

## Intelligent Movie and Series Recommendations Powered by AI

ReelMind is a full-stack web application that leverages Google Gemini AI to provide personalized movie and series recommendations. Users can input their preferences, including similar titles, genres, mood, and advanced criteria, to receive tailored suggestions for both movies and TV series.

The application consists of a Next.js frontend for a dynamic user interface and an Express.js backend that handles AI model interactions (via Google Gemini) and fetches movie data (from TMDB).

## Features

* **Personalized Recommendations:** Get movie and series suggestions based on your unique preferences.
* **Flexible Input:**
    * Input titles you already like for similar recommendations.
    * Select from a wide range of genres.
    * Specify your current mood.
    * Choose a preferred language for recommendations.
* **Advanced Filtering:** (Optional)
    * Exclude specific criteria (e.g., "no horror", "avoid 80s movies").
    * Suggest keywords or themes (e.g., "time travel", "dystopian future").
    * Mention preferred cast or crew.
    * Specify runtime preferences (e.g., "short movie", "miniseries").
* **Intuitive UI:** A clean, responsive, and visually appealing interface built with Next.js and Tailwind CSS.
* **Dynamic Quote Carousel:** Enjoy classic movie quotes while interacting with the app.
* **Separate Backend:** A robust Express.js backend isolates AI logic and API key handling.

## Technologies Used

### Frontend

* **Next.js 14 (React Framework):** For building the user interface and server-side rendering capabilities.
* **TypeScript:** For type safety and improved code quality.
* **Tailwind CSS:** For rapid and efficient styling.
* **Lucide React:** For beautiful and customizable icons.
* **Shadcn/ui:** For accessible and customizable UI components.
* **Vercel:** For seamless frontend deployment.

### Backend

* **Node.js & Express.js:** For building the RESTful API.
* **Google Gemini API:** The core AI model for generating recommendations based on user input.
* **TMDB API (The Movie Database):** For fetching movie and series details (posters, descriptions, ratings) to enrich AI recommendations.
* **dotenv:** For managing environment variables securely.
* **Render:** For reliable backend deployment.

## Project Structure (Monorepo)

This project uses a monorepo structure, containing both the frontend and backend applications in separate directories.

```
.
├── backend/
│   ├── .env                 # Environment variables for backend (TMDB_API_KEY, etc.)
│   ├── app.js               # Main Express.js application
│   ├── package.json         # Backend dependencies
│   ├── package-lock.json    # Backend dependency lock file
│   └── ...
└── frontend/                # This is your Next.js application (what you named reelmind-movie-rec)
    ├── .next/               # Next.js build output
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx         # Main frontend component (ReelMind)
    │   ├── RecommendationCard.tsx
    │   └── BuyMeACoffeeButton.tsx
    ├── components/
    │   ├── ui/
    │   └── ...
    ├── hooks/
    ├── lib/
    ├── public/
    ├── styles/
    ├── .gitignore
    ├── components.json      # Shadcn/ui configuration
    ├── favicon.ico
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json         # Frontend dependencies
    ├── package-lock.json    # Frontend dependency lock file
    ├── pnpm-lock.yaml       # (If you are using pnpm, otherwise package-lock.json/yarn.lock)
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    └── tsconfig.json
```

**Note:** The screenshots show the `frontend-2\reelmind-movie-rec` path. In this `README`, we'll assume the root of your frontend project is simply `frontend` for clarity in instructions, matching the Vercel root directory setting.

## Getting Started (Local Development)

To run this project locally, you will need Node.js installed.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd reelmind-ai-movie-recommender # Or whatever your project's root folder is named
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install Dependencies:
Use npm as per your package-lock.json in the backend.

```bash
npm install
```

Configure Environment Variables:
Create a `.env` file in the backend directory.

```
# .env in backend/
TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE
GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
PORT=5000 # Or any desired port
```

* **TMDB_API_KEY:** Obtain this from The Movie Database (TMDB) API.
* **GEMINI_API_KEY:** Obtain this from Google AI Studio / Gemini API.

Start the Backend Server:

```bash
npm start
```

The backend server should now be running on `http://localhost:5000` (or your specified PORT).

### 3. Frontend Setup

Open a new terminal window/tab and navigate to the frontend directory:

```bash
cd ../frontend # Go back to root, then into frontend
# Or if you're already in the project root:
# cd frontend
```

Install Dependencies:
Use npm for consistency and to avoid ERESOLVE issues, even if you have pnpm-lock.yaml.

```bash
npm install --legacy-peer-deps
```

Configure Environment Variables:
Create a `.env.local` file in the frontend directory.

```
# .env.local in frontend/
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

* **NEXT_PUBLIC_BACKEND_URL:** This should point to your locally running backend server.

Start the Frontend Development Server:

```bash
npm run dev
```

The frontend application should now be accessible at `http://localhost:3000` (or another port if 3000 is taken).

## Deployment

This project uses Render for backend deployment and Vercel for frontend deployment.

### Backend Deployment (Render)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository containing the monorepo.
   - **Root Directory:** Set this to `backend`. This tells Render to treat the backend folder as the root of your service.
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (this should match your start script in `backend/package.json`)
   - **Node Version:** Ensure it matches your local Node.js version (e.g., 18, 20).

2. **Environment Variables:** Add the following:
   - `TMDB_API_KEY`: Your TMDB API key.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - (Render automatically handles the PORT variable).

3. **Deploy:** Render will automatically build and deploy your backend service. Once deployed, note down the public URL provided by Render (e.g., `https://your-backend-name.onrender.com`). This URL is crucial for your frontend.

### Frontend Deployment (Vercel)

1. **Create a new Project on Vercel:**
   - Connect your GitHub repository containing the monorepo.
   - **Framework Preset:** Next.js
   - **Root Directory:** Set this to `frontend`. This tells Vercel to look inside the frontend folder for your Next.js project.
   - **Build Command:** `next build` (default)
   - **Output Directory:** Next.js default
   - **Install Command:** Click "Override" and enter: `npm install --legacy-peer-deps` (This resolves ERESOLVE dependency conflicts).

2. **Environment Variables:** Add the following:
   - **Name:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** Paste the public URL of your deployed Render backend (e.g., `https://your-backend-name.onrender.com`).
   - **Scope:** Ensure this is set to "All Environments".

3. **Deploy:** Vercel will build and deploy your frontend application. Once deployed, your ReelMind app will be live at the Vercel provided URL (e.g., `https://your-project-name.vercel.app`).

## Usage

1. **Access the Application:** Open the deployed Vercel URL in your browser.

2. **Enter Preferences:**
   - **"I like shows/movies similar to:"** Type in titles of movies or series you enjoy.
   - **"Choose your genres:"** Click on genre buttons to select multiple genres.
   - **"What's your mood?"** Select a mood that fits what you want to watch.
   - **"Language:"** Choose your preferred language for recommendations.
   - **"Other preferences:"** Add any general preferences like "light-hearted", "visually stunning", etc.

3. **Advanced Options (Optional):** Click "Show Advanced Options" to reveal more granular controls:
   - **"Exclude:"** Specify what you don't want to see (e.g., "no horror", "avoid 80s movies").
   - **"Keywords/Themes:"** Enter specific themes (e.g., "time travel", "dystopian future").
   - **"Cast/Crew Preferences:"** Mention actors or directors you like.
   - **"Runtime Preference:"** Indicate desired length (e.g., "short movie", "miniseries").

4. **Get Recommendations:** Click the "Get Recommendations" button.

5. **View Results:** The AI will process your request and display recommended movies and series, complete with descriptions, ratings, and links to TMDB for more details.

## Contributing

If you'd like to contribute to ReelMind, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## Contact

**Made by Nihal.**

* **Email:** nihalnoormpm01@gmail.com
* **GitHub:** github.com/nihalnoor01
