<template>
  <div
    class="slot"
    :style="{ width: `${size}px`, height: `${size}px`, background: outer }"
  >
    <div
      class="ph"
      :style="{
        width: `${inner}px`,
        height: `${inner}px`,
        background: `repeating-linear-gradient(45deg, ${tone.a} 0 7px, ${tone.b} 7px 14px)`,
        borderColor: tone.dash,
        color: tone.text,
      }"
    >
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RenderTone } from '~/data/series'

/**
 * Круглий плейсхолдер під рендер фігурки. Коли з'являться реальні
 * зображення — міняємо розмітку лише тут.
 */
const props = withDefaults(
  defineProps<{
    tone: RenderTone
    size?: number
    /** Колір зовнішнього кола-підкладки. */
    outer?: string
    label?: string
  }>(),
  { size: 96, outer: '#FFFFFF', label: 'рендер' },
)

const inner = computed(() => Math.round(props.size * 0.76))
</script>

<style scoped>
.slot {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.ph {
  border-radius: 50%;
  border: 2px dashed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font: 600 8px/1.4 ui-monospace, Menlo, monospace;
}
</style>
