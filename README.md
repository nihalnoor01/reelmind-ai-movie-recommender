# 🎮 ReelMind AI Movie Recommender

> *Intelligent Movie and Series Recommendations Powered by AI*

**ReelMind** is a full-stack web application that leverages **Google Gemini AI** to provide **personalized movie and series recommendations**. Users can input their preferences — like genres, moods, keywords, and more — and receive tailored recommendations, powered by AI and enriched using TMDB data.

---

## 🚀 Features

* 🎯 **Personalized Recommendations** based on user preferences
* 🎮 **Flexible Input**:

  * Mention similar titles you enjoy
  * Select genres, mood, and language
* 🧠 **Advanced Filters**:

  * Exclude unwanted genres, years, themes
  * Add keywords/themes like *"time travel"*, *"feel-good"*
  * Filter by cast/crew or runtime
* 💡 **Dynamic Quote Carousel** for a cinematic experience
* 🌙 **Dark Mode UI** with beautiful design using Tailwind + Glassmorphism
* 🔐 **Secure Backend** with environment variables & API key management

---

## 🛠️ Tech Stack

### Frontend – `Next.js` (in `/frontend`)

* **Next.js 14** – React Framework
* **TypeScript**
* **Tailwind CSS** – Styling
* **Lucide React** – Icon set
* **shadcn/ui** – Pre-built UI components
* **Deployed via Vercel**

### Backend – `Express.js` (in `/backend`)

* **Node.js** + **Express**
* **Google Gemini API** – Core AI logic
* **TMDB API** – Fetch metadata like posters, ratings, etc.
* **dotenv** – Environment variables
* **Deployed via Render**

---

## 📁 Project Structure (Monorepo)

```
reelmind-ai-movie-recommender/
├── backend/                # Express.js backend
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── ...
└── frontend/               # Next.js frontend
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── ...
    ├── components/
    ├── hooks/
    ├── lib/
    ├── public/
    ├── styles/
    ├── .env.local
    ├── next.config.mjs
    ├── tailwind.config.ts
    └── package.json
```

---

## 🧑‍💻 Getting Started (Local Dev)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reelmind-ai-movie-recommender.git
cd reelmind-ai-movie-recommender
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### ➕ Add `.env` in `/backend`:

```env
TMDB_API_KEY=your_tmdb_key_here
GEMINI_API_KEY=your_google_gemini_key_here
PORT=5000
```

Start the backend server:

```bash
npm start
```

Server should now be running on `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install --legacy-peer-deps
```

#### ➕ Add `.env.local` in `/frontend`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

Visit your app at `http://localhost:3000`.

---

## ☁️ Deployment Guide

### ✅ Backend on Render

1. **New Web Service**
2. Root: `backend/`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment:

   * `TMDB_API_KEY=...`
   * `GEMINI_API_KEY=...`
6. Note the public backend URL (e.g., `https://your-api.onrender.com`)

---

### ✅ Frontend on Vercel

1. **New Project**
2. Root: `frontend/`
3. Build: `next build` (default)
4. Override Install: `npm install --legacy-peer-deps`
5. Environment Variable:

   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-api.onrender.com
   ```

Deployed app will be live at `https://your-app.vercel.app`.

---

## 💻 Usage Instructions

1. **Visit App** on your deployed Vercel URL
2. **Enter Your Preferences**:

   * Titles you like
   * Genres, mood, language
   * (Optional) Advanced filters: exclude themes, keywords, cast, runtime
3. **Click Get Recommendations**
4. **Explore the Suggestions**: See posters, ratings, and direct TMDB links

---

## 🤝 Contributing

1. Fork the repo
2. `git checkout -b feature/your-feature`
3. Make your changes
4. `git commit -m "Add your feature"`
5. `git push origin feature/your-feature`
6. Open a PR

---

## 📬 Contact

**👤 Nihal Noor**

* 📧 Email: [nihalnoormpm01@gmail.com](mailto:nihalnoormpm01@gmail.com)
* 💻 GitHub: [@nihalnoor01](https://github.com/nihalnoor01)

---

## 🌟 Like the Project?

If this project helped you or inspired you, consider giving it a ⭐ on GitHub and sharing it with others!
