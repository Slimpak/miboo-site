<template>
  <div class="site">
    <SiteTicker :items="ticker" />
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import type { TickerItem } from '~/components/SiteTicker.vue'

const route = useRoute()

const DEFAULT_TICKER: TickerItem[] = [
  { text: 'UNBOX YOUR NEXT TINY FRIEND' },
  { text: 'ЗБЕРИ ВСІХ', color: '#F5B73A' },
  { text: 'ПОЛЮЙ НА СЕКРЕТНИХ «?»' },
  { text: 'У КОЖНІЙ СЕКРЕТЦІ — КОД', color: '#F5A9BC' },
  { text: 'UNBOX YOUR NEXT TINY FRIEND' },
  { text: 'ЗБЕРИ ВСІХ', color: '#9FE0C8' },
]

const ticker = computed(() => (route.meta.ticker as TickerItem[] | undefined) ?? DEFAULT_TICKER)
</script>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
