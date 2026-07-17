// Datos falsos para la maqueta. Nada de esto es real.

export type Oficio =
  | "Albañil"
  | "Electricista"
  | "Plomero"
  | "Gasista"
  | "Pintor";

export const OFICIO_EMOJI: Record<Oficio, string> = {
  Albañil: "🧱",
  Electricista: "⚡",
  Plomero: "🔧",
  Gasista: "🔥",
  Pintor: "🎨",
};

export type Profesional = {
  id: string;
  nombre: string;
  oficio: Oficio;
  barrio: string;
  rating: number;
  trabajos: number;
  verificado: boolean;
  matriculado: boolean;
  disponible: string;
  respondeEn: string;
  aniosExp: number;
  radioKm: number;
  precioDesde: number;
  especialidades: string[];
  herramientas: string[];
  garantia: string;
  recomendadoPor: number;
  avatar: string; // gradiente css
  inicial: string;
  // posición aproximada en el "mapa" (0-100)
  mapX: number;
  mapY: number;
  bio: string;
};

export type Trabajo = {
  id: string;
  profId: string;
  titulo: string;
  descripcion: string;
  barrio: string;
  oficio: Oficio;
  precioRango: string;
  duracion: string;
  materiales: string;
  fecha: string;
  foto: string; // gradiente css
  review: { texto: string; autor: string; rating: number };
};

export const profesionales: Profesional[] = [
  {
    id: "carlos-gomez",
    nombre: "Carlos Gómez",
    oficio: "Electricista",
    barrio: "Los Hornos",
    rating: 4.8,
    trabajos: 73,
    verificado: true,
    matriculado: true,
    disponible: "Disponible mañana",
    respondeEn: "Responde en ~20 min",
    aniosExp: 14,
    radioKm: 15,
    precioDesde: 18000,
    especialidades: ["Recableados", "Tableros y térmicas", "Urgencias"],
    herramientas: ["Pinza amperométrica", "Detector de tensión", "Escalera 6m"],
    garantia: "6 meses sobre instalación",
    recomendadoPor: 8,
    avatar: "linear-gradient(135deg,#f59e0b,#ea580c)",
    inicial: "CG",
    mapX: 62,
    mapY: 58,
    bio: "Electricista matriculado. Recableados completos, tableros y urgencias. Trabajo prolijo y a tiempo.",
  },
  {
    id: "ramon-fernandez",
    nombre: "Ramón Fernández",
    oficio: "Albañil",
    barrio: "Tolosa",
    rating: 4.9,
    trabajos: 112,
    verificado: true,
    matriculado: false,
    disponible: "Agenda para la semana que viene",
    respondeEn: "Responde en ~1 h",
    aniosExp: 22,
    radioKm: 20,
    precioDesde: 25000,
    especialidades: ["Parrillas", "Contrapisos", "Revoques", "Muros"],
    herramientas: ["Hormigonera", "Nivel láser", "Andamios"],
    garantia: "1 año sobre estructura",
    recomendadoPor: 12,
    avatar: "linear-gradient(135deg,#f97316,#b91c1c)",
    inicial: "RF",
    mapX: 40,
    mapY: 28,
    bio: "22 años levantando paredes en La Plata. Parrillas, contrapisos y ampliaciones. Presupuesto sin cargo.",
  },
  {
    id: "lucia-moreno",
    nombre: "Lucía Moreno",
    oficio: "Pintor",
    barrio: "Villa Elvira",
    rating: 4.7,
    trabajos: 54,
    verificado: true,
    matriculado: false,
    disponible: "Disponible esta semana",
    respondeEn: "Responde en ~40 min",
    aniosExp: 9,
    radioKm: 12,
    precioDesde: 12000,
    especialidades: ["Interiores", "Frentes", "Impermeabilización"],
    herramientas: ["Pistola airless", "Andamio", "Hidrolavadora"],
    garantia: "6 meses sobre pintura",
    recomendadoPor: 5,
    avatar: "linear-gradient(135deg,#38bdf8,#6366f1)",
    inicial: "LM",
    mapX: 74,
    mapY: 44,
    bio: "Pintura de interiores y frentes. Prolija, limpia y a tiempo. Trabajo con y sin materiales.",
  },
  {
    id: "juan-perez",
    nombre: "Juan Pérez",
    oficio: "Plomero",
    barrio: "Casco Urbano",
    rating: 4.6,
    trabajos: 88,
    verificado: true,
    matriculado: true,
    disponible: "Atiende urgencias hoy",
    respondeEn: "Responde en ~15 min",
    aniosExp: 17,
    radioKm: 18,
    precioDesde: 15000,
    especialidades: ["Pérdidas", "Destapaciones", "Termotanques"],
    herramientas: ["Máquina destapadora", "Soldadora de caños", "Cámara de inspección"],
    garantia: "3 meses sobre reparación",
    recomendadoPor: 9,
    avatar: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
    inicial: "JP",
    mapX: 50,
    mapY: 48,
    bio: "Plomero matriculado. Urgencias, pérdidas y termotanques. Voy el mismo día.",
  },
  {
    id: "diego-sosa",
    nombre: "Diego Sosa",
    oficio: "Gasista",
    barrio: "City Bell",
    rating: 4.9,
    trabajos: 61,
    verificado: true,
    matriculado: true,
    disponible: "Disponible en 2 días",
    respondeEn: "Responde en ~30 min",
    aniosExp: 19,
    radioKm: 25,
    precioDesde: 20000,
    especialidades: ["Matrícula gas", "Calefones", "Estufas", "Finales de obra"],
    herramientas: ["Detector de fugas", "Manómetro", "Soldadora"],
    garantia: "Certificado y matrícula incluidos",
    recomendadoPor: 7,
    avatar: "linear-gradient(135deg,#fb7185,#e11d48)",
    inicial: "DS",
    mapX: 22,
    mapY: 66,
    bio: "Gasista matriculado. Calefones, estufas y finales de obra con certificado habilitante.",
  },
  {
    id: "marta-quiroga",
    nombre: "Marta Quiroga",
    oficio: "Electricista",
    barrio: "Berisso",
    rating: 4.5,
    trabajos: 37,
    verificado: false,
    matriculado: false,
    disponible: "Disponible esta semana",
    respondeEn: "Responde en ~2 h",
    aniosExp: 6,
    radioKm: 10,
    precioDesde: 14000,
    especialidades: ["Instalación de luces", "Enchufes", "Pequeñas reformas"],
    herramientas: ["Taladro", "Pelacables", "Tester"],
    garantia: "3 meses",
    recomendadoPor: 3,
    avatar: "linear-gradient(135deg,#a3e635,#16a34a)",
    inicial: "MQ",
    mapX: 78,
    mapY: 74,
    bio: "Instalaciones chicas y reparaciones en el día. Presupuesto rápido por WhatsApp.",
  },
];

export const trabajos: Trabajo[] = [
  {
    id: "t1",
    profId: "ramon-fernandez",
    titulo: "Terminamos esta parrilla en Tolosa",
    descripcion:
      "Parrilla de ladrillo visto con mesada y guardado de leña. Se hizo contrapiso nuevo y campana de tiro balanceado.",
    barrio: "Tolosa",
    oficio: "Albañil",
    precioRango: "$380.000 – $460.000",
    duracion: "4 días",
    materiales: "Ladrillo visto, hierro, cemento, refractarios",
    fecha: "Hace 2 días",
    foto: "linear-gradient(135deg,#fb923c,#7c2d12)",
    review: {
      texto: "Impecable el laburo. Prolijo, puntual y dejó todo limpio. Recontra recomendado.",
      autor: "Sofía R.",
      rating: 5,
    },
  },
  {
    id: "t2",
    profId: "carlos-gomez",
    titulo: "Recableado completo de una casa en Villa Elvira",
    descripcion:
      "Se cambió tablero, térmicas y todo el cableado antiguo por uno nuevo con disyuntor. Casa de 3 ambientes.",
    barrio: "Villa Elvira",
    oficio: "Electricista",
    precioRango: "$210.000 – $280.000",
    duracion: "2 días",
    materiales: "Cable, tablero, térmicas, disyuntor",
    fecha: "Hace 3 días",
    foto: "linear-gradient(135deg,#fbbf24,#b45309)",
    review: {
      texto: "Quedó todo funcionando perfecto y explicó cada cosa. Un genio.",
      autor: "Martín L.",
      rating: 5,
    },
  },
  {
    id: "t3",
    profId: "juan-perez",
    titulo: "Cambio de termotanque y reparación de pérdida",
    descripcion:
      "Pérdida en la conexión del termotanque. Se cambió el equipo por uno nuevo y se rehízo la instalación de agua caliente.",
    barrio: "Casco Urbano",
    oficio: "Plomero",
    precioRango: "$90.000 – $130.000",
    duracion: "1 día",
    materiales: "Termotanque, caños, uniones",
    fecha: "Hace 5 días",
    foto: "linear-gradient(135deg,#38bdf8,#075985)",
    review: {
      texto: "Vino el mismo día que lo llamé. Rápido y honesto con el precio.",
      autor: "Andrea P.",
      rating: 4,
    },
  },
  {
    id: "t4",
    profId: "lucia-moreno",
    titulo: "Pintura completa de living y frente",
    descripcion:
      "Interior en látex lavable y frente con impermeabilizante. Se hizo enduido y lijado previo. Colores elegidos con el cliente.",
    barrio: "Villa Elvira",
    oficio: "Pintor",
    precioRango: "$150.000 – $220.000",
    duracion: "3 días",
    materiales: "Látex lavable, enduido, impermeabilizante",
    fecha: "Hace 1 semana",
    foto: "linear-gradient(135deg,#818cf8,#3730a3)",
    review: {
      texto: "Dejó todo cubierto y prolijísimo. El frente quedó como nuevo.",
      autor: "Gabriel M.",
      rating: 5,
    },
  },
  {
    id: "t5",
    profId: "diego-sosa",
    titulo: "Instalación de calefón y final de obra",
    descripcion:
      "Colocación de calefón, prueba de hermeticidad y certificado de gas para el final de obra. Todo con matrícula.",
    barrio: "City Bell",
    oficio: "Gasista",
    precioRango: "$120.000 – $170.000",
    duracion: "1 día",
    materiales: "Calefón, caño epoxi, llaves de paso",
    fecha: "Hace 1 semana",
    foto: "linear-gradient(135deg,#fb7185,#9f1239)",
    review: {
      texto: "Muy profesional, dejó el certificado en mano. Tranquilidad total.",
      autor: "Verónica T.",
      rating: 5,
    },
  },
  {
    id: "t6",
    profId: "ramon-fernandez",
    titulo: "Contrapiso y carpeta para ampliación",
    descripcion:
      "Base para una habitación nueva de 16 m². Contrapiso, carpeta niveladora y previsión para el piso cerámico.",
    barrio: "Tolosa",
    oficio: "Albañil",
    precioRango: "$260.000 – $320.000",
    duracion: "3 días",
    materiales: "Cemento, arena, malla, hierro",
    fecha: "Hace 2 semanas",
    foto: "linear-gradient(135deg,#facc15,#78350f)",
    review: {
      texto: "Nivelado perfecto. Cumplió con el presupuesto sin sorpresas.",
      autor: "Hernán C.",
      rating: 5,
    },
  },
];

export function getProfesional(id: string) {
  return profesionales.find((p) => p.id === id);
}

export function trabajosDeProfesional(id: string) {
  return trabajos.filter((t) => t.profId === id);
}
