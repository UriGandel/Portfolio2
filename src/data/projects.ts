export interface Project {
  slug: string;
  name: string;
  kind: string;
  status: string;
  year: string;
  description: string;
  stack: string;
  featured?: boolean;
  outputLabel: string;
  output: [string, string][];
  images: string[];
  imageLabels: string[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: "stepbystories",
    name: "StepByStories",
    kind: "app para aprender idiomas",
    status: "publicada en iOS y Android",
    year: "2026",
    description:
      "Una app para aprender idiomas leyendo libros adaptados a tu nivel, con audio y herramientas de comprensión. La desarrollé y publiqué en iOS y Android, obteniendo los primeros usuarios y subscriptores pagos.",
    stack: "React Native · FastAPI · LLMs",
    featured: true,
    outputLabel: "historial",
    output: [
      ["2026-07", "publicada en iOS"],
      ["2026-07-31", "pico de 48 usuarios activos en un día"],
      ["2026-08-13", "publicada en Android"],
      ["2026-08-13", "primera suscripción paga"],
      ["idiomas", "6: inglés, español, francés, alemán, italiano, portugués"],
      ["niveles", "A1 a C2"],
      ["stack", "React Native · Expo · FastAPI · PostgreSQL · LLMs"],
    ],
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
    links: [{ label: "ver la app", href: "https://www.stepbystories.com" }],
  },
  {
    slug: "hydroengine",
    name: "HydroEngine",
    kind: "motor gráfico",
    status: "proyecto personal",
    year: "",
    description:
      "Un motor de videojuegos en C++ y OpenGL construido desde cero para entender cómo funcionan los sistemas gráficos, la arquitectura de motores y el desarrollo de bajo nivel.",
    stack: "C++ · OpenGL · ECS",
    outputLabel: "dependencias",
    output: [
      ["GLFW", "ventanas y entrada"],
      ["GLAD", "funciones de OpenGL"],
      ["GLM", "matemática 3D"],
      ["Assimp", "importación de modelos"],
      ["ImGui", "interfaz del editor"],
      ["arquitectura", "Entity Component System"],
    ],
    images: ["hydroengine.png"],
    imageLabels: [
      "Editor de HydroEngine con una escena 3D y herramientas de depuración",
    ],
    links: [
      {
        label: "github",
        href: "https://github.com/Alezito2008/HydroEngine/tree/Presentacion",
      },
    ],
  },
  {
    slug: "negocia",
    name: "NegocIA",
    kind: "marketplace con agentes de IA",
    status: "hackathon, en equipo",
    year: "2026",
    description:
      "Una plataforma donde agentes de inteligencia artificial negocian entre sí para comprar y vender productos. Desarrollada durante Platanus Hack 2026.",
    stack: "TypeScript · React · RAG",
    outputLabel: "flujo",
    output: [
      ["1", "el comprador describe qué busca y su presupuesto"],
      ["2", "búsqueda semántica con embeddings y pgvector"],
      ["3", "agente comprador y agente vendedor ofertan y contraofertan"],
      ["4", "una persona revisa el acuerdo"],
      ["stack", "Next.js · Express · TypeScript · PostgreSQL · Prisma"],
    ],
    images: ["negocia.png"],
    imageLabels: ["Marketplace de NegocIA con agentes que negocian productos"],
    links: [
      {
        label: "github",
        href: "https://github.com/platanus-hack/platanus-hack-26-ar-team-19",
      },
    ],
  },
  {
    slug: "gravity-duel",
    name: "Gravity Duel",
    kind: "juego arcade",
    status: "ganador del Arcade Challenge",
    year: "2026",
    description:
      "Un videojuego multijugador competitivo desarrollado para el Arcade Challenge de Platanus Hack.",
    stack: "1P vs IA · 2P local",
    outputLabel: "resultado",
    output: [
      ["competencia", "Arcade Challenge, Platanus Hack 2026"],
      ["puesto", "ganador"],
      ["selección", "100 desarrolladores entre más de 400 postulantes"],
      ["modos", "1P vs IA · 2P local"],
    ],
    images: ["gravity-duel.png"],
    imageLabels: ["Partida de Gravity Duel, un duelo espacial con gravedad"],
    links: [
      {
        label: "jugar",
        href: "https://hack.platan.us/26/arcade/gravity-duel-final-ten",
      },
    ],
  },
  {
    slug: "traidx",
    name: "TraidX",
    kind: "IA financiera",
    status: "en curso",
    year: "",
    description:
      "Estoy desarrollando una app que combina noticias, indicadores técnicos y datos del mercado para analizar inversiones.",
    stack: "Python · Docker",
    outputLabel: "experimento",
    output: [
      ["clases", "3"],
      ["acierto", "52 %"],
      ["referencia", "33 %"],
      ["modelos", "XGBoost · ElasticNet · PatchTST · FinBERT"],
      ["estado", "en curso; el acierto no implica rentabilidad"],
    ],
    images: ["traidx-1.png", "traidx-2.png", "traidx-3.png", "traidx-4.png"],
    imageLabels: [
      "Crear una inversión",
      "Configurar una estrategia",
      "Resumen de inversión",
      "Actividad y rendimiento",
    ],
    links: [
      { label: "github", href: "https://www.stepbystories.com/" },
      {
        label: "landing",
        href: "https://hack.platan.us/26/arcade/gravity-duel-final-ten",
      },
    ],
  },
  {
    slug: "womens-healthbench",
    name: "Women’s HealthBench",
    kind: "benchmark de modelos",
    status: "hackathon",
    year: "2026",
    description:
      "Un benchmark para evaluar modelos de IA con datos de salud femenina. Hecho en el Hack-Nation Global AI Hackathon, julio de 2026.",
    stack: "evaluación con macro-F1",
    outputLabel: "evaluación",
    output: [
      ["v0.1", "macro-F1 0,307"],
      ["v0.2", "macro-F1 0,270"],
      ["participantes", "42"],
      ["días de datos", "5.398"],
    ],
    images: [],
    imageLabels: [],
    links: [],
  },
];
