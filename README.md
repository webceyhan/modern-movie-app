# Modern Movie App 🎬

A modern movie search and discovery app built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Appwrite**. Search for movies, view trending searches, and enjoy a fast, responsive UI.

---

## Features

- 🔍 **Search** thousands of movies via [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- 📈 **Trending Searches** tracked and displayed using [Appwrite](https://appwrite.io/)
- ⚡ **Debounced Search** for efficient API usage
- 🎨 **Modern UI** with [Tailwind CSS 4](https://tailwindcss.com/)
- 🌀 **Loading Spinner** and error handling
- 🏆 **Responsive Design** for all devices

---

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/) (database & trending search tracking)
- [react-use](https://github.com/streamich/react-use) (for debouncing)
- [TMDb API](https://www.themoviedb.org/documentation/api) (movie data)

---

## Project Structure

```plaintext
src
├── components
│   ├── common
│   ├── layout
│   └── movies
├── hooks
├── pages
├── services
├── styles
└── utils
```

- **components/**: Reusable components, further categorized into:
  - **common/**: Generic components like buttons, inputs, etc.
  - **layout/**: Components for layout structure, e.g., headers, footers.
  - **movies/**: Movie-specific components, e.g., movie cards, modals.
- **hooks/**: Custom React hooks.
- **pages/**: Page components for routing.
- **services/**: API calls and business logic.
- **styles/**: Global styles and Tailwind CSS configurations.
- **utils/**: Utility functions and constants.

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/movie-app.git
   cd movie-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your Appwrite and TMDb credentials:

   ```env
   VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   VITE_APPWRITE_PROJECT=your-appwrite-project-id
   VITE_TMDB_API_KEY=your-tmdb-api-key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to see the app in action.

---

## Contributing

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature/YourFeature`
3. **Make your changes**
4. **Commit your changes**: `git commit -m 'Add some feature'`
5. **Push to the branch**: `git push origin feature/YourFeature`
6. **Open a pull request**

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that compiles to clean JavaScript output.
- [Vite](https://vitejs.dev/) - Next generation, front-end toolchain.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs.
- [Appwrite](https://appwrite.io/) - The open-source backend server for web, mobile & flutter developers.
- [TMDb API](https://www.themoviedb.org/documentation/api) - The Movie Database API for movie data.
