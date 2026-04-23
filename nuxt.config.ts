// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Miboo — Coming Soon',
      meta: [
        { name: 'description', content: 'Miboo is coming soon. Stay tuned.' },
        { name: 'theme-color', content: '#07070f' },
      ],
    },
  },
})
