export const projects = [
  {
    slug: "stepbystories",
    name: "StepByStories",
    category: "APP DE IDIOMAS",
    color: "purple",
    kind: "app para aprender idiomas",
    status: "publicada en iOS y Android",
    year: "2026",
    description:
      "Una app para aprender idiomas leyendo libros adaptados a tu nivel, con audio y herramientas de comprensión. La desarrollé y publiqué en iOS y Android, obteniendo los primeros usuarios y subscriptores pagos.",
    stack: "React Native · FastAPI · LLMs",
    images: [
      "stepbystories-1.png",
      "stepbystories-2.png",
      "stepbystories-3.png",
      "stepbystories-4.png",
    ],
    imageLabels: [
      "Selección de intereses de lectura",
      "Recomendaciones y categorías de libros",
      "Biblioteca personal",
      "Lectura con audio y traducción",
    ],
    links: [{ label: "Ver la app", href: "https://www.stepbystories.com" }],
  },
  {
    slug: "hydroengine",
    name: "HydroEngine",
    category: "MOTOR GRÁFICO",
    color: "mint",
    kind: "motor gráfico",
    status: "proyecto personal",
    year: "",
    description:
      "Un motor de videojuegos en C++ y OpenGL construido desde cero para entender cómo funcionan los sistemas gráficos, la arquitectura de motores y el desarrollo de bajo nivel.",
    stack: "C++ · OpenGL · ECS",
    images: ["hydroengine.png"],
    imageLabels: [
      "Editor de HydroEngine con una escena 3D y herramientas de depuración",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Alezito2008/HydroEngine/tree/Presentacion",
      },
    ],
  },
  {
    slug: "negocia",
    name: "NegocIA",
    category: "PLATANUS HACK",
    color: "amber",
    kind: "marketplace con agentes de IA",
    status: "hackathon, en equipo",
    year: "2026",
    description:
      "Una plataforma donde agentes de inteligencia artificial negocian entre sí para comprar y vender productos. Desarrollada durante Platanus Hack 2026.",
    stack: "RAG · Embeddings · TypeScript · Docker · React",
    images: ["negocia.png"],
    imageLabels: ["Marketplace de NegocIA con agentes que negocian productos"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/platanus-hack/platanus-hack-26-ar-team-19",
      },
    ],
  },
  {
    slug: "gravity-duel",
    name: "Gravity Duel",
    category: "GANADOR DEL ARCADE CHALLENGE",
    color: "green",
    kind: "juego arcade",
    status: "ganador del Arcade Challenge",
    year: "2026",
    description:
      "Un videojuego multijugador competitivo desarrollado para el Arcade Challenge de Platanus Hack. Ganador del Platanus Hack Arcade Challenge 2026.",
    stack: "1P vs IA · 2P local",
    images: ["gravity-duel.png"],
    imageLabels: ["Partida de Gravity Duel, un duelo espacial con gravedad"],
    links: [
      {
        label: "Jugar",
        href: "https://hack.platan.us/26/arcade/gravity-duel-final-ten",
      },
    ],
  },
  {
    slug: "traidx",
    name: "TraidX",
    category: "IA FINANCIERA",
    color: "mint",
    kind: "IA financiera",
    status: "en curso",
    year: "",
    description:
      "Estoy desarrollando una app que combina noticias, indicadores técnicos y datos del mercado para analizar inversiones.",
    stack: "Modelos predictivos · Python · Docker",
    images: ["traidx-1.png", "traidx-2.png", "traidx-3.png", "traidx-4.png"],
    imageLabels: [
      "Crear una inversión",
      "Configurar una estrategia",
      "Resumen de inversión",
      "Actividad y rendimiento",
    ],
    links: [
      { label: "GitHub", href: "https://www.stepbystories.com/" },
      {
        label: "Landing",
        href: "https://hack.platan.us/26/arcade/gravity-duel-final-ten",
      },
    ],
  },
] as const;

export type Project = (typeof projects)[number];
