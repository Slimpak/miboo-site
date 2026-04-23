// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Miboo — Coming Soon',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Barlow+Condensed:ital,wght@1,700;1,800&family=Inter:wght@400;500;600&display=swap',
        },
      ],
      meta: [
        { name: 'description', content: 'Miboo is coming soon. A playful collectible world is on the way.' },
        { name: 'theme-color', content: '#07071e' },
      ],
    },
  },
})
