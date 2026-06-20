<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// Root wrapper. Pages live in app/pages/.
</script>

<style>
/* ─── Global reset + base (shared by all pages) ─── */
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Barlow+Condensed:ital,wght@1,700;1,800&family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #05051a;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}
</style>
