<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Root wrapper. Pages live in app/pages/, shared chrome in app/layouts/default.vue.
</script>

<style>
/* ─── Global reset + design tokens (poster direction) ─── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --navy: #272563;
  --navy-deep: #1E1D4E;
  --navy-soft: #33327A;
  --teal: #2BC4B4;
  --yellow: #F5B73A;
  --coral: #EA6A6E;
  --lavender: #B79CE4;
  --pink: #F5A9BC;
  --mint: #9FE0C8;
  --bg: #F4F8F7;
  --muted: #56618F;
  --gray: #8A93A8;
  --line: #E8EEF2;
  --rainbow: linear-gradient(105deg, #FFD9E1, #FFEFC9, #D4F4DC, #CDE4FF, #E8D7FF);
  --rainbow-conic: conic-gradient(#FFD9E1, #FFEFC9, #D4F4DC, #CDE4FF, #E8D7FF, #FFD9E1);
  --font-display: 'Baloo 2', 'Nunito', sans-serif;
  --font-body: 'Nunito', system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--navy);
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
  border: none;
  background: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ─── Shared pill buttons ─── */
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.15s ease, filter 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.pill:is(a, button):hover { transform: translateY(-2px); filter: brightness(1.05); }
.pill:is(a, button):active { transform: translateY(0); filter: brightness(0.95); }

.pill--navy { background: var(--navy); color: #fff; }
.pill--yellow { background: var(--yellow); color: var(--navy); }
.pill--white { background: #fff; color: var(--navy); }
.pill--outline { border: 2px solid var(--navy); color: var(--navy); background: transparent; }
.pill--outline-white { border: 2px solid #fff; color: #fff; background: transparent; }

.pill--lg { font-size: 16px; padding: 15px 28px; }
.pill--md { font-size: 14px; padding: 13px 24px; }
.pill--sm { font-size: 13px; padding: 11px 18px; }
.pill--outline.pill--lg { padding: 13px 26px; }
.pill--outline.pill--md { padding: 11px 22px; }
.pill--outline.pill--sm { padding: 9px 16px; }

/* ─── Layout helpers ─── */
.wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: clamp(20px, 5vw, 64px);
  padding-right: clamp(20px, 5vw, 64px);
}

.section-title {
  font: 900 clamp(26px, 3.4vw, 34px) var(--font-body);
  color: var(--navy);
}

.poster-title {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -0.01em;
  line-height: 1.04;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
