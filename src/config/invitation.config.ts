export const invitationConfig = {
  client: {
    name: "Gredmarie",
    eventType: "XV Años",
    finalPhrase: "“Hay noches que se olvidan… y hay noches que brillan para siempre. Después de tanto soñarla, por fin llegó el momento de vivir la mía. Acompáñame a convertirla en un recuerdo inolvidable”",
  },
  event: {
    date: new Date('2026-07-24T19:00:00'), // Fecha 24 de Julio 2026
    receptionTime: '19:30',
    locationName: 'Ciudad Jardín (Salón De Eventos)',
    locationAddress: 'Av. Moscú 7245, Santa Cruz de la Sierra',
    locationUrl: 'https://maps.app.goo.gl/XNWiXKXeVsG69yDH9?g_st=ic'
  },
  parents: {
    topLabel: 'Con la bendición de Dios y el amor de mis padres',
    motherName: 'Liliana Magaly Roca',
    fatherName: 'Limber Alba',
    godparents: [] as { role: string; couple: string }[], // Dejar vacío si no hay padrinos explícitos
    invitationText: 'Acompáñanos a celebrar el comienzo de una nueva etapa...',
  },
  itinerary: [
    { time: '19:00', title: 'Bienvenida', description: 'Recepción inicial.', icon: 'sparkles' },
    { time: '19:30', title: 'Recepción Social', description: 'Hora de llegada!.', icon: 'martini' },
    { time: '21:00', title: 'Ceremonia', description: 'Ceremonia principal.', icon: 'heart' },
    { time: '21:40', title: 'Sesión de Fotos', description: 'Capturando recuerdos.', icon: 'camera' },
    { time: '22:00', title: 'Cena', description: 'Disfrutemos juntos.', icon: 'utensils' },
    { time: '22:30', title: '¡Todos a la pista!', description: 'A bailar.', icon: 'music' },
    { time: '23:30', title: 'Hora Loca', description: 'Fiesta temática.', icon: 'sparkles' },
    { time: '00:00', title: 'Torta', description: 'Momento dulce.', icon: 'cake' },
    { time: '03:00', title: 'Hasta pronto', description: 'Gracias por acompañarnos.', icon: 'heart' },
  ],
  dressCode: {
    description: 'Código de Vestimenta Formal',
    notes: 'Colores reservados para la quinceañera: Plateado, azul, celeste.',
    colors: ['#C0C0C0', '#0000FF', '#87CEEB'] // Plateado, Azul, Celeste
  },
  giftRegistry: {
    message: 'Tu presencia es mi mejor regalo. Si deseas tener un detalle, puedes usar el siguiente código QR:',
    qrImage: '/images/qr-gift.png', // Placeholder para la imagen del QR
  },
  music: {
    ambientTrack: '/audio/iloveit.mp3', // Placeholder para audio
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/0', // Playlist real
    suggestLabel: 'Sugiéreme una canción',
  },
  rsvp: {
    webhookUrl: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '',
    successMessage: '¡Gracias por confirmar tu asistencia!',
  },
  theme: {
    colors: {
      primary: "#050505", // Fondo oscuro (elegancia nocturna)
      secondary: "#ffffff", 
      accent: "#1e3a8a", // Azul oscuro
      gold: "#C0C0C0", // Plateado como color principal de acento
      text: "#ffffff"
    },
    fonts: {
      display: "var(--font-display)",
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
    },
  },
  assets: {
    heroBackground: "/hero/copa_azul_fondo.png", // Imagen de fondo real de Vania-Tania para probar
    decorations: {
      stars: "/images/decorations/stars.png", // Placeholder
    },
    envelope: {
      base: "/invitation/sobre_completo_gredmarie.png",
      leftFlap: "/invitation/sobre_lado_izquierdo_gredmarie.webp",
      rightFlap: "/invitation/sobre_lado_derecho_gredmarie.webp",
      seal: "/invitation/broche_gredmarie.png",
    },
    info:{
      qr: "/qr/fffa26f8-4f04-4da5-8a35-94c2e793ee91.jpeg"
    }
  },
};
