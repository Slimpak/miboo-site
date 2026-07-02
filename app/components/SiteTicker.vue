<template>
  <div class="ticker" aria-hidden="true">
    <div class="track">
      <span v-for="n in 2" :key="n" class="chunk">
        <template v-for="(item, i) in items" :key="i">
          <span :style="item.color ? { color: item.color } : undefined">{{ item.text }}</span>
          <span class="sep">✦</span>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TickerItem {
  text: string
  color?: string
}

defineProps<{ items: TickerItem[] }>()
</script>

<style scoped>
.ticker {
  background: var(--navy);
  padding: 10px 0;
  overflow: hidden;
  white-space: nowrap;
}

.track {
  display: inline-flex;
  animation: ticker-scroll 40s linear infinite;
}

.chunk {
  display: inline-flex;
  align-items: center;
  flex: none;
  font: 800 13px var(--font-display);
  color: #fff;
  letter-spacing: 0.14em;
}

.sep {
  color: #fff;
  padding: 0 18px;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
}
</style>
