# MovieApp 🎬

A modern, responsive movie browsing app built with **React** and **Vite**.

## Features

- 🎬 Browse a curated list of top-rated movies
- 🔍 Search movies by title, director, or genre
- 🏷️ Filter by genre
- 📊 Sort by rating, year, or title
- 📄 Detailed movie view with overview, runtime, and director info
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js ≥ 20.19.0

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS Custom Properties (no external UI libraries)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # App header with logo
│   ├── SearchBar.jsx    # Search input
│   ├── MovieCard.jsx    # Movie thumbnail card
│   ├── MovieGrid.jsx    # Responsive grid of cards
│   └── MovieDetail.jsx  # Full movie detail view
├── data/
│   └── mockMovies.js    # Built-in movie dataset
├── App.jsx              # Root component with state logic
├── App.css              # All component styles
└── main.jsx             # Entry point
```
