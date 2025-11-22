// src/data.js
export const dailyPhrases = [
  { lang: "Español", text: "Te Adoro más que ayer, pero menos que mañana", flag: "Costa Rica" },
  { lang: "Español", text: "Eres mi razón para sonreír cada día", flag: "Costa Rica" },
  { lang: "Español", text: "Contando los segundos para verte otra vez", flag: "Costa Rica" },
  { lang: "English", text: "You are my favorite notification", flag: "USA" },
  { lang: "English", text: "I miss you more than coffee on Mondays", flag: "USA" },
  { lang: "English", text: "You make my heart skip a beat", flag: "USA" },
  { lang: "Italiano", text: "Ti amo più della pizza", flag: "Italy" },
  { lang: "Italiano", text: "Sei il mio pensiero felice", flag: "Italy" },
  { lang: "Italiano", text: "Mi manchi come il sole d’inverno", flag: "Italy" },
  { lang: "日本語", text: "君がいないと寂しいよ", flag: "Japan" },
  { lang: "日本語", text: "あなたの笑顔が恋しい", flag: "Japan" },
  { lang: "日本語", text: "毎日君を思っている", flag: "Japan" },
  { lang: "한국어", text: "너무 보고 싶어", flag: "South Korea" },
  { lang: "한국어", text: "네 생각만 해도 행복해", flag: "South Korea" },
  { lang: "한국어", text: "하루 종일 네가 그리워", flag: "South Korea" },
  { lang: "中文", text: "我想你想到发疯", flag: "China" },
  { lang: "中文", text: "没有你我很难过", flag: "China" },
  { lang: "中文", text: "每天都在想你", flag: "China" },
  { lang: "Français", text: "Tu me manques terriblement", flag: "France" },
  { lang: "Français", text: "Je pense à toi chaque instant", flag: "France" },
  { lang: "Français", text: "Ton sourire me manque", flag: "France" },
  // Agregá todas las que quieras
];

export const weeklyLetters = [
  // Semana 1 (mes 1)
  { week: 1, title: "Mes 1: El comienzo de la espera", text: `Mi amor,\n\nYa pasó el primer mes sin verte y aunque duele, cada día me doy cuenta lo fuerte que es nuestro amor. Te extraño con todo mi corazón, pero sé que esto solo nos va a hacer más fuertes.\n\nTe amo infinito.\n— Tu persona ♡` },
  // Semana 2
  { week: 2, title: "Mes 2: Sigues siendo mi todo", text: `Hola mi princesa,\n\nA veces me despierto y miro tu foto hasta que se me llenan los ojos de lágrimas… pero también sonrío porque sé que sos real y sos mía.\n\nFaltan menos días para abrazarte.\nTe amo más que nunca.` },
  // Semana 3
  { week: 3, title: "Mes 3: Casi llegamos", text: `Amor de mi vida,\n\nYa estamos en la recta final. Cada noche sueño con el día que te vea bajar del avión y corra a tus brazos.\n\nTe amo con toda mi alma.` },
  // Semana 4
  { week: 4, title: "¡VOLVÉS!", text: `¡MI AMOR VUELVE!\n\nYa no falta casi nada. Preparé todo: tu helado favorito, tu manta, nuestras series…\n\nTe espero con el corazón explotando de amor.\n\n¡Te amo para siempre! ♡♡♡` }
];

// Fecha en que Abi se fue (cambiar esta fecha)
export const departureDate = new Date("2025-11-20"); // ← CAMBIAR AQUI
export const returnDate = new Date("2026-03-20");    // ← 4 meses después