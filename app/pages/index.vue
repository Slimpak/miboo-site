<template>
  <div class="page">

    <!-- Scrolling background rows -->
    <div class="bg" aria-hidden="true">
      <div v-for="i in 11" :key="i" class="row" :class="`row-${i}`">
        <div class="track" :class="{ reverse: i % 2 === 0 }">
          <span class="track-inner">{{ bgText }}</span>
          <span class="track-inner">{{ bgText }}</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="header">
      <div class="logo">
        <span class="logo-text">Miboo</span>
        <div class="logo-drip-bar">
          <i class="logo-drip" style="--x:18%;--h:16px;--w:8px" />
          <i class="logo-drip" style="--x:32%;--h:26px;--w:11px" />
          <i class="logo-drip" style="--x:48%;--h:14px;--w:7px" />
          <i class="logo-drip" style="--x:62%;--h:22px;--w:9px" />
          <i class="logo-drip" style="--x:76%;--h:18px;--w:8px" />
        </div>
      </div>
      <div class="badge">
        <span class="badge-dot" />
        Concept draft
      </div>
    </header>

    <!-- Center content -->
    <main class="main">

      <!-- Sticker: black panel + drips as one unit -->
      <div class="sticker">
        <div class="sticker-body">
          <h1 class="cs">Coming<br>Soon</h1>
        </div>
        <div class="sticker-drips">
          <i class="drip" style="--x:8%;  --h:44px; --w:12px" />
          <i class="drip" style="--x:18%; --h:72px; --w:16px" />
          <i class="drip" style="--x:30%; --h:38px; --w:10px" />
          <i class="drip" style="--x:42%; --h:60px; --w:14px" />
          <i class="drip" style="--x:54%; --h:50px; --w:13px" />
          <i class="drip" style="--x:65%; --h:80px; --w:17px" />
          <i class="drip" style="--x:76%; --h:42px; --w:11px" />
          <i class="drip" style="--x:87%; --h:58px; --w:13px" />
          <i class="drip" style="--x:95%; --h:34px; --w:9px" />
        </div>
      </div>

      <p class="tagline">A playful collectible world is on the way.</p>

      <div class="actions">
        <button class="btn">
          Notify me
          <span class="btn-icon">
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M3 8h10M9 3l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <NuxtLink to="/activate" class="demo-link">Спробувати демо активації коду →</NuxtLink>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
const bgText = 'Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   Miboo  ≡   '
</script>

<style scoped>
/* ─── Page ─── */
.page {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  /* Electric blue radial gradient — matches the vibrant blue glow in the ref */
  background:
    radial-gradient(ellipse 90% 70% at 28% 50%, rgba(30, 30, 180, 0.55) 0%, transparent 65%),
    radial-gradient(ellipse 60% 50% at 75% 55%, rgba(80, 20, 160, 0.3) 0%, transparent 60%),
    radial-gradient(ellipse 120% 120% at 50% 50%, #0c0c50 0%, #08083a 40%, #050528 75%, #030318 100%);
}

/* ─── Scrolling background ─── */
.bg {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  user-select: none;
}

.row {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: clamp(1.5rem, 2.8vw, 2.6rem);
  white-space: nowrap;
  letter-spacing: 0.04em;
}

/* Alternating blue/purple rows with 2 orange accent rows */
.row-1  { color: #5566ff; opacity: 0.28; }
.row-2  { color: #7755ee; opacity: 0.22; }
.row-3  { color: #4455ee; opacity: 0.30; }
.row-4  { color: #dd6622; opacity: 0.28; }
.row-5  { color: #6644dd; opacity: 0.24; }
.row-6  { color: #4466ff; opacity: 0.32; }
.row-7  { color: #8844ee; opacity: 0.22; }
.row-8  { color: #ee7722; opacity: 0.26; }
.row-9  { color: #5577ff; opacity: 0.28; }
.row-10 { color: #6655ee; opacity: 0.24; }
.row-11 { color: #3355dd; opacity: 0.30; }

.track {
  display: flex;
  animation: scroll-left 32s linear infinite;
}

.track.reverse {
  animation: scroll-right 38s linear infinite;
}

.track-inner {
  flex-shrink: 0;
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes scroll-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* ─── Header ─── */
.header {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 1.4rem 1.75rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

/* ─── Logo ─── */
.logo {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
}

.logo-text {
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 1.45rem;
  padding: 0.5rem 1.25rem 0.6rem;
  border-radius: 12px 12px 0 0;
  line-height: 1;
  display: block;
}

/* Thin bar at the base of the logo that the drips hang from */
.logo-drip-bar {
  height: 8px;
  background: #0a0a0a;
  border-radius: 0 0 4px 4px;
  position: relative;
  overflow: visible;
}

.logo-drip {
  position: absolute;
  top: 100%;
  left: var(--x);
  width: var(--w);
  height: var(--h);
  background: #0a0a0a;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  transform: translateX(-50%);
  display: block;
}

.logo-drip::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(var(--w) + 2px);
  height: calc(var(--w) + 2px);
  border-radius: 50%;
  background: #0a0a0a;
}

/* ─── Badge ─── */
.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(8, 8, 28, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.42rem 1rem;
  border-radius: 999px;
  backdrop-filter: blur(12px);
  letter-spacing: 0.01em;
  margin-top: 0.15rem;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f97316;
  flex-shrink: 0;
}

/* ─── Main ─── */
.main {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 2rem 5rem;
  animation: fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Sticker (black panel + drips as one unit) ─── */
.sticker {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

.sticker-body {
  background: #0a0a0a;
  border-radius: 28px 28px 0 0;
  padding: 1.25rem 2.5rem 1.5rem;
}

.cs {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(5rem, 13vw, 10.5rem);
  line-height: 0.9;
  color: #ffffff;
  -webkit-text-stroke: clamp(6px, 1vw, 10px) #0a0a0a;
  paint-order: stroke fill;
  letter-spacing: -0.01em;
}

/* The drip bar — black strip that the drips hang from */
.sticker-drips {
  background: #0a0a0a;
  position: relative;
  height: 16px; /* thick base */
  border-radius: 0 0 8px 8px;
  overflow: visible;
}

/* Drips hang down from the sticker-drips bar */
.drip {
  position: absolute;
  top: 100%;
  left: var(--x);
  width: var(--w);
  height: var(--h);
  background: #0a0a0a;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  transform: translateX(-50%);
  display: block;
}

.drip::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(var(--w) + 3px);
  height: calc(var(--w) + 3px);
  border-radius: 50%;
  background: #0a0a0a;
}

/* ─── Tagline ─── */
.tagline {
  color: rgba(255, 255, 255, 0.65);
  font-size: 1rem;
  text-align: center;
  max-width: 360px;
  line-height: 1.65;
  margin-top: 1rem;
}

/* ─── Button ─── */
.btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: #f97316;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.65rem 0.65rem 0.65rem 1.75rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
  letter-spacing: 0.01em;
}

.btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.btn:active {
  transform: translateY(0);
  filter: brightness(0.93);
}

.btn-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #111111;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─── Actions (button + demo link) ─── */
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.demo-link {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.92rem;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
  padding-bottom: 2px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.demo-link:hover {
  color: #ffffff;
  border-color: #f97316;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .row { font-size: clamp(1.1rem, 4vw, 1.7rem); opacity: 0.18; }
  .header { padding: 1rem 1.25rem; }
  .sticker-body { padding: 1rem 1.5rem 1.25rem; }
  .main { gap: 1.5rem; padding-bottom: 3rem; }
  .cs { -webkit-text-stroke: clamp(5px, 1.5vw, 8px) #0a0a0a; }
}

@media (max-width: 480px) {
  .tagline { font-size: 0.9rem; max-width: 280px; }
  .btn { font-size: 0.93rem; padding: 0.6rem 0.6rem 0.6rem 1.4rem; }
  .btn-icon { width: 34px; height: 34px; }
}
</style>
