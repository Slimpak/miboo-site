// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Miboo Toys — колекційні flexi-фігурки',
      htmlAttrs: { lang: 'uk' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Колекційні flexi-фігурки Miboo 5,5 см з рухомими сегментами. У кожній секретці — картка з кодом на ексклюзивного персонажа.',
        },
        { name: 'theme-color', content: '#272563' },
        { property: 'og:title', content: 'Miboo Toys — колекційні flexi-фігурки' },
        {
          property: 'og:description',
          content: 'Unbox your next tiny friend. Секретки-сюрпризи, серії, активація кодів.',
        },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
})
