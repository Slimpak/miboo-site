<template>
  <div class="scallop" :style="{ background: from }" aria-hidden="true">
    <div v-for="n in 40" :key="n" class="dot" :style="{ background: to }" />
  </div>
</template>

<script setup lang="ts">
/** Фестонний перехід: тло `from`, півкола кольору `to` наступної секції. */
defineProps<{ from: string; to: string }>()
</script>

<style scoped>
.scallop {
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 34px;
}

.dot {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  flex: none;
  transform: translateY(17px);
}
</style>
