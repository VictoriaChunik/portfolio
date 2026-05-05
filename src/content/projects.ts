export const projects = [
  {
    id: "code-review-ai",
    title: "Code Review AI",
    desc: "AI-инструмент для анализа кода с рекомендациями. Поддерживает JS, TS, Python, CSS, HTML.",
    tags: ["Next.js 15", "TypeScript", "DeepSeek V3", "Tailwind"],
    demo: "https://code-review-ai-xi.vercel.app",
    github: "https://github.com/VictoriaChunik/code-review-ai",
  },
  {
    id: "weather-app",
    title: "Weather App",
    desc: "Погода для любого города с динамическими фонами, анимациями и геолокацией.",
    tags: ["Vanilla JS", "OpenWeatherMap API", "Geolocation", "CSS3"],
    demo: null,
    github: "https://github.com/VictoriaChunik/weather-app",
  },
  {
    id: "pet-shop",
    title: "Pet Shop",
    desc: "Интернет-магазин питомцев с корзиной, фильтрами, поиском и LocalStorage.",
    tags: ["Vanilla JS", "LocalStorage", "CSS Grid", "Flexbox"],
    demo: null,
    github: "https://github.com/VictoriaChunik/pet-shop",
  },
  {
    id: "movie-list",
    title: "Movie List App",
    desc: "Список фильмов с добавлением, удалением и сохранением данных. MVC архитектура.",
    tags: ["Vanilla JS", "MVC", "LocalStorage", "ES6+"],
    demo: null,
    github: "https://github.com/VictoriaChunik/movie-list",
  },
  {
    id: "form-validator",
    title: "Form Validator",
    desc: "Форма регистрации с живой валидацией, индикатором силы пароля и Glassmorphism UI.",
    tags: ["Vanilla JS", "Regex", "CSS3", "DOM API"],
    demo: null,
    github: "https://github.com/VictoriaChunik/form-validator",
  },
  {
    id: "aquaflow-gallery",
    title: "AquaFlow Gallery",
    desc: "Галерея с плавными переходами, автопрокруткой и управлением с клавиатуры.",
    tags: ["Vanilla JS", "CSS3", "ES6+", "Font Awesome"],
    demo: null,
    github: "https://github.com/VictoriaChunik/aquaflow-gallery",
  },
];

export type Project = typeof projects[number];