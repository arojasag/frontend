// Import icons from your icon library (e.g., lucide-react)
import {
  Sparkles,
  UsersRound,
  Pizza,
  Origami,
  Volleyball,
  Plane,
  BriefcaseBusiness,
  Computer,
  Earth,
  Gamepad2,
  BoomBox,
  HeartCrack,
  Music2,
} from "lucide-react";

export const footerLinks = [
  {
    title: "Compañía",
    links: [
      { name: "Nosotros", href: "#" },
      { name: "Funcionalidades", href: "#" },
      { name: "Contáctanos", href: "#" },
      { name: "Planes", href: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { name: "Términos de servicio", href: "#" },
      { name: "Política de privacidad", href: "#" },
      { name: "Preguntas frecuentes", href: "#" },
    ],
  },
];

export const FIELD_NAMES = {
  fullName: "Nombre Completo",
  email: "Correo Electrónico",
  password: "Contraseña",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
};

export const FIELD_PLACEHOLDERS = {
  fullName: "Escribe tu nombre completo",
  email: "Escribe tu correo electrónico",
  password: "Escribe tu contraseña",
};

export const sampleEvents = [
  {
    id: 1,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!, Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
  {
    id: 2,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
  {
    id: 3,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
  {
    id: 4,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
  {
    id: 5,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
  {
    id: 6,
    title: "Coffee + Friday Language exchange meeting La Castellana",
    description:
      "Un espacio mensual para practicar idiomas, conocer nuevas personas y compartir un café en La Castellana. ¡Trae tu mejor actitud!",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // imagen estática o de CDN
    place: "Café Aroma, La Castellana, Bogotá",
    starts_at: "2025-06-06T19:00:00-05:00", // viernes, 6 de junio de 2025, 7:00 PM (hora Colombia)
    ends_at: "2025-06-06T21:00:00-05:00", // hasta las 9:00 PM
    capacity: 30,
  },
];

export const featuredEvents = [
  {
    id: 1,
    title: "Fiesta Universitaria de Bienvenida",
    description: "Ven y conoce nuevos amigos este viernes!",
    imageUrl: "/assets/ilustracion-de-la-ciudad-del-anime.jpg",
  },
  {
    id: 2,
    title: "Taller de Emprendimiento Universitario",
    description: "Descubre cómo empezar tu proyecto con éxito.",
    imageUrl: "/assets/fondo-de-arte-digital-de-japon (1).jpg",
  },
  {
    id: 3,
    title: "Noche Cultural Internacional",
    description: "Disfruta comida y música de diferentes países.",
    imageUrl: "/assets/fondo-de-arte-digital-de-japon.jpg",
  },
];

export const sampleGroups = [
  {
    id: 1,
    name: "AWS Cloud Club at UDFJC",
    description:
      "AWS Cloud Club at Universidad Distrital Francisco José de Caldas is a student-led, student-organized group for cloud enthusiasts.",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg", // Asegúrate de tener esta imagen en tu carpeta pública
    isVerified: true,
    isOpen: true,
  },
  {
    id: 2,
    name: "Club de Robótica U. Nacional",
    description:
      "Espacio para estudiantes apasionados por la robótica, automatización y competencias nacionales e internacionales.",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg",
    isVerified: false,
    isOpen: true,
  },
  {
    id: 3,
    name: "Círculo de Lectura y Filosofía",
    description:
      "Un grupo abierto para explorar textos filosóficos, novelas y ensayos críticos con discusiones cada semana.",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg",
    isVerified: true,
    isOpen: false,
  },
  // ...otros grupos
];

export const samplecategories = [
  { id: 1, name: "Todos", icon: Sparkles, href: "/search/groups?category=todos" },
  {
    id: 2,
    name: "Nuevos Eventos",
    icon: UsersRound,
    href: "/search/groups?category=nuevos-eventos",
  },
  {
    id: 3,
    name: "Actividades sociales",
    icon: Pizza,
    href: "/search/groups?category=actividades-sociales",
  },
  {
    id: 4,
    name: "Aficiones",
    icon: Origami,
    href: "/search/groups?category=aficiones",
  },
  {
    id: 5,
    name: "Deportes",
    icon: Volleyball,
    href: "/search/groups?category=deportes",
  },
  {
    id: 6,
    name: "Viajes",
    icon: Plane,
    href: "/search/groups?category=viajes",
  },
  {
    id: 7,
    name: "Negocios",
    icon: BriefcaseBusiness,
    href: "/search/groups?category=negocios",
  },
  {
    id: 8,
    name: "Tecnología",
    icon: Computer,
    href: "/search/groups?category=tecnologia",
  },
  {
    id: 9,
    name: "Comunidad",
    icon: Earth,
    href: "/search/groups?category=comunidad",
  },
  {
    id: 10,
    name: "Juegos",
    icon: Gamepad2,
    href: "/search/groups?category=juegos",
  },
  {
    id: 11,
    name: "Baile",
    icon: BoomBox,
    href: "/search/groups?category=baile",
  },
  {
    id: 12,
    name: "Apoyo",
    icon: HeartCrack,
    href: "/search/groups?category=apoyo",
  },
  {
    id: 13,
    name: "Música",
    icon: Music2,
    href: "/search/groups?category=musica",
  },
];
