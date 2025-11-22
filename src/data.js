// src/data.js
export const dailyPhrases = [
  { lang: "Español", text: "Te Adoro más que ayer, pero menos que mañana", flag: "Costa Rica" },
  { lang: "Español", text: "Eres mi razón para sonreír cada día", flag: "Costa Rica" },
  { lang: "Español", text: "Contando los segundos para verte otra vez", flag: "Costa Rica" },
  { lang: "English", text: "You are my favorite notification", flag: "USA" },
  { lang: "English", text: "I miss you more than coffee on Mondays", flag: "USA" },
  { lang: "English", text: "You make my heart skip a beat", flag: "USA" },
  { lang: "Italiano", text: "Ti adoro più della pizza", flag: "Italy" },
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
  // Semana 1 (antes del viaje)
  { week: 1, title: "Antes del viaje: Mi despedida", text: `Gracias… por tanto.\n\nPor tu paciencia, por tu cariño, por todo lo que me has dado sin pedir nada a cambio.\nGracias por quedarte cuando las cosas no fueron fáciles, por entenderme incluso cuando yo no supe explicarme, y por ser ese apoyo que, aunque no lo diga siempre, valoro más de lo que imaginas.\n\nSé que no he sido perfecto. He cometido errores, y a veces no supe cuidar lo que teníamos como debía. Pero también sé que cada paso, cada caída y cada momento contigo me ha hecho querer ser mejor, no solo para mí, sino para ti… para nosotros...\n\nNo somos novios ahora, y está bien. Entiendo que los dos tenemos metas, sueños y cosas que cumplir antes de pensar en eso otra vez. Y aunque este proceso sea lento, me hace feliz saber que seguimos intentándolo, que seguimos cuidando esto que sentimos, sin presiones, sin promesas vacías, solo con hechos y cariño verdadero.\n\nQuiero que sepas que admiro todo lo que haces, tu esfuerzo, tus ganas de salir adelante, y que me siento orgulloso de ti. Cuando te vayas a Estados, voy a extrañarte mucho, pero más que eso, voy a alegrarme por ti, porque te mereces todo lo bueno que te está pasando. Quiero que vivas esa experiencia, que crezcas, que disfrutes, y que cada cosa que logres allá te acerque más a tus metas.\n\nMientras tanto, yo seguiré aquí, trabajando en mí, en mis metas, y en convertirme en la persona que algún día pueda estar a tu lado con la certeza de que lo que tenemos es real, fuerte y maduro.\n\nGracias por no soltarme del todo. Por seguir siendo tú, con esa forma tan bonita de hacerme sentir en casa, incluso cuando todo cambia. Y sobre todo, gracias por creer en mí, en nosotros, y en lo que todavía puede ser.` },
  // Semana 2
  { week: 2, title: "Mes 2: Sigues siendo mi todo", text: `Hola mi princesa,\n\nA veces me despierto y miro tu foto hasta que se me llenan los ojos de lágrimas… pero también sonrío porque sé que sos real y sos mía.\n\nFaltan menos días para abrazarte.\nsweetie más que nunca.` },
  // Semana 3
  { week: 3, title: "Mes 3: Casi llegamos", text: `sweetie de mi vida,\n\nYa estamos en la recta final. Cada noche sueño con el día que te vea bajar del avión y corra a tus brazos.\n\nsweetie con toda mi alma.` },
  // Semana 4
  { week: 4, title: "¡VOLVÉS!", text: `¡MI sweetie VUELVE!\n\nYa no falta casi nada. Preparé todo: tu helado favorito, tu manta, nuestras series…\n\nTe espero con el corazón explotando de sweetie.\n\n¡sweetie para siempre! ♡♡♡` }
];

// Fecha en que Abi se fue (cambiar esta fecha)
export const departureDate = new Date("2025-11-20"); // ← CAMBIAR AQUI
export const returnDate = new Date("2026-03-20");    // ← 4 meses despuésb