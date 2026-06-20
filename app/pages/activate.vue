<template>
  <div class="activate" :data-stage="stage">

    <!-- Subtle brand marquee background -->
    <div class="bg" aria-hidden="true">
      <div v-for="i in 9" :key="i" class="row" :class="`row-${i}`">
        <div class="track" :class="{ reverse: i % 2 === 0 }">
          <span class="track-inner">{{ bgText }}</span>
          <span class="track-inner">{{ bgText }}</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="header">
      <NuxtLink to="/" class="logo" aria-label="На головну">
        <span class="logo-text">Miboo</span>
        <span class="logo-drip-bar">
          <i class="logo-drip" style="--x:22%;--h:14px;--w:8px" />
          <i class="logo-drip" style="--x:46%;--h:22px;--w:10px" />
          <i class="logo-drip" style="--x:70%;--h:16px;--w:8px" />
        </span>
      </NuxtLink>
      <div class="badge"><span class="badge-dot" /> Демо</div>
    </header>

    <main class="main">

      <!-- ═══ STAGE: idle (enter code) ═══ -->
      <section v-if="stage === 'idle'" class="stage stage-idle">
        <div class="secret-card" aria-hidden="true">
          <span class="secret-q">?</span>
          <span class="secret-label">SECRET</span>
        </div>

        <h1 class="title">Активуй свій код</h1>
        <p class="subtitle">
          Введи код з картки всередині пакетика — і дізнайся,
          який рідкісний персонаж тобі випав.
        </p>

        <form class="code-form" @submit.prevent="activate">
          <input
            v-model="code"
            class="code-input"
            :class="{ shake }"
            type="text"
            inputmode="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="MIBOO-XXXXX"
            aria-label="Код з картки"
            @input="error = ''"
          />
          <button type="submit" class="cta cta-primary cta-block">
            Активувати код
          </button>
        </form>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="hints">
          <span class="hint-label">Спробуй для демо:</span>
          <div class="chips">
            <button v-for="c in demoCodes" :key="c" class="chip" @click="fill(c)">{{ c }}</button>
          </div>
        </div>
      </section>

      <!-- ═══ STAGE: opening (capsule + sparks) ═══ -->
      <section v-else-if="stage === 'opening'" class="stage stage-opening">
        <div class="capsule-stage">
          <div class="glow-burst" />
          <div class="sparks">
            <i
              v-for="(s, i) in sparks"
              :key="i"
              class="spark"
              :style="{ '--a': s.a + 'deg', '--d': s.d + 'px', '--delay': s.delay + 's', background: s.c }"
            />
          </div>
          <div class="capsule">
            <span class="cap-half cap-top" />
            <span class="cap-half cap-bottom" />
            <span class="cap-seam" />
          </div>
        </div>
        <p class="opening-text">Відкриваємо…</p>
      </section>

      <!-- ═══ STAGE: reveal (character) ═══ -->
      <section v-else-if="stage === 'reveal' && character" class="stage stage-reveal">
        <p class="reveal-kicker">Тобі випав ексклюзив!</p>

        <div class="hero" :class="{ glowing: character.glow }">
          <span class="hero-aura" :style="{ background: `radial-gradient(circle, ${character.color}66 0%, transparent 70%)` }" />
          <!-- Miboo creature, tinted to the character colour -->
          <svg class="creature" :class="{ glow: character.glow }" :style="{ color: character.color }" viewBox="0 0 120 154">
            <line x1="60" y1="22" x2="60" y2="6" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
            <circle class="bulb" cx="60" cy="7" r="7" />
            <rect x="18" y="24" width="84" height="112" rx="42" fill="currentColor" />
            <ellipse cx="60" cy="94" rx="30" ry="34" fill="rgba(255,255,255,.16)" />
            <circle cx="44" cy="72" r="9.5" fill="#fff" />
            <circle cx="76" cy="72" r="9.5" fill="#fff" />
            <circle cx="46" cy="74" r="4.6" fill="#0a0a0a" />
            <circle cx="78" cy="74" r="4.6" fill="#0a0a0a" />
            <path d="M50 95 q10 9 20 0" stroke="#0a0a0a" stroke-width="4" fill="none" stroke-linecap="round" />
            <circle cx="35" cy="88" r="5" fill="rgba(255,255,255,.32)" />
            <circle cx="85" cy="88" r="5" fill="rgba(255,255,255,.32)" />
            <ellipse cx="43" cy="138" rx="14" ry="8" fill="currentColor" />
            <ellipse cx="77" cy="138" rx="14" ry="8" fill="currentColor" />
          </svg>
        </div>

        <span class="rarity" :class="rarity.cls">
          <span class="rarity-dot" /> {{ rarity.label }}
        </span>

        <h2 class="char-name">{{ character.name }}</h2>
        <p class="char-meta">Серія «{{ character.series }}» · №{{ character.number }}</p>
        <p class="char-blurb">{{ character.blurb }}</p>

        <!-- Two ways to get the rare -->
        <div class="get-block">
          <button class="cta cta-primary cta-block" @click="addToCart('buy5')">
            <span class="cta-line">Купити 5 пакетів</span>
            <span class="cta-sub">{{ character.name }} у подарунок · 0 грн</span>
          </button>
          <button class="cta cta-ghost cta-block" @click="addToCart('order')">
            <span class="cta-line">Замовити окремо</span>
            <span class="cta-sub">200 грн</span>
          </button>
        </div>

        <button class="link-reset" @click="reset">← Активувати інший код</button>
      </section>

    </main>

    <!-- Cart confirmation (demo) -->
    <Transition name="fade">
      <div v-if="toast" class="modal-overlay" @click.self="toast = null">
        <div class="modal">
          <div class="modal-emoji">🎉</div>
          <p class="modal-text">{{ toast }}</p>
          <p class="modal-note">Це демо — кошик і оплата ще не підключені.</p>
          <button class="cta cta-primary cta-block" @click="toast = null">Зрозуміло</button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Miboo — Активуй код',
  bodyAttrs: { style: 'background:#05051a' },
})

const bgText = 'Miboo  ✦   Miboo  ✦   Miboo  ✦   Miboo  ✦   Miboo  ✦   Miboo  ✦   Miboo  ✦   Miboo  ✦   '

/* ─── Demo "database" (client-side only, no backend) ─── */
type Rarity = 'common' | 'rare' | 'super'
interface Character {
  name: string; series: string; number: string
  rarity: Rarity; color: string; glow: boolean; blurb: string
}

const CHARACTERS: Record<string, Character> = {
  draco: { name: 'Драко', series: 'Сяйво', number: '07', rarity: 'super', color: '#f97316', glow: true,
    blurb: 'Вогняний дракончик, що світиться у темряві.' },
  luma:  { name: 'Люма', series: 'Сяйво', number: '03', rarity: 'rare', color: '#8b5cff', glow: true,
    blurb: 'Зоряний привид, який приносить удачу.' },
  coro:  { name: 'Коро', series: 'Сяйво', number: '09', rarity: 'super', color: '#ffd23f', glow: true,
    blurb: 'Золотий металік — найрідкісніший у серії.' },
  pip:   { name: 'Піп', series: 'Ліс', number: '01', rarity: 'common', color: '#38bdf8', glow: false,
    blurb: 'Маленький водяний бешкетник.' },
}

// code → character key
const CODES: Record<string, string> = {
  'MIBOO-GLOW1': 'draco',
  'AB12-CD34': 'luma',
  'GOLD-9999': 'coro',
  'PIP-0001': 'pip',
}

const RARITY: Record<Rarity, { label: string; cls: string }> = {
  common: { label: 'Звичайний', cls: 'common' },
  rare:   { label: 'Рідкісний', cls: 'rare' },
  super:  { label: 'Супер-рідкісний', cls: 'super' },
}

// Codes shown as demo hints. USED-0001 is pre-activated to demo the error path.
const demoCodes = ['MIBOO-GLOW1', 'AB12-CD34', 'GOLD-9999', 'USED-0001']
const USED_SEED = ['USED-0001']
const STORE_KEY = 'miboo_used_codes'

/* ─── Static spark burst (deterministic → SSR-safe) ─── */
const sparkColors = ['#f97316', '#ffd23f', '#8b5cff', '#38bdf8', '#ffffff']
const sparks = Array.from({ length: 18 }, (_, i) => ({
  a: i * 20,
  d: 92 + (i % 5) * 20,
  delay: (i % 4) * 0.04,
  c: sparkColors[i % sparkColors.length],
}))

/* ─── State ─── */
const stage = ref<'idle' | 'opening' | 'reveal'>('idle')
const code = ref('')
const error = ref('')
const shake = ref(false)
const character = ref<Character | null>(null)
const toast = ref<string | null>(null)
const rarity = computed(() => RARITY[character.value?.rarity ?? 'common'])

let timer: ReturnType<typeof setTimeout> | null = null

function getUsed(): string[] {
  if (!import.meta.client) return [...USED_SEED]
  try {
    const stored = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    return [...USED_SEED, ...stored]
  } catch {
    return [...USED_SEED]
  }
}

function markUsed(c: string) {
  if (!import.meta.client) return
  try {
    const stored = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    if (!stored.includes(c)) stored.push(c)
    localStorage.setItem(STORE_KEY, JSON.stringify(stored))
  } catch { /* ignore */ }
}

function fail(msg: string) {
  error.value = msg
  shake.value = false
  // restart shake animation
  requestAnimationFrame(() => { shake.value = true })
}

function activate() {
  const c = code.value.trim().toUpperCase()
  if (!c) return

  if (getUsed().includes(c)) {
    fail('Цей код вже активований 😮 Один код — одна активація.')
    return
  }
  const key = CODES[c]
  if (!key) {
    fail('Такого коду не існує. Перевір картку 🔎')
    return
  }

  error.value = ''
  stage.value = 'opening'
  timer = setTimeout(() => {
    character.value = CHARACTERS[key]
    markUsed(c)
    stage.value = 'reveal'
  }, 2600)
}

function fill(c: string) {
  code.value = c
  error.value = ''
}

function addToCart(kind: 'buy5' | 'order') {
  const name = character.value?.name ?? ''
  toast.value = kind === 'buy5'
    ? `Кошик: 5 пакетів + ${name} безкоштовно 🎁`
    : `Кошик: ${name} за 200 грн`
}

function reset() {
  if (timer) clearTimeout(timer)
  stage.value = 'idle'
  character.value = null
  code.value = ''
  error.value = ''
}

onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
</script>

<style scoped>
/* ─── Layout ─── */
.activate {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background:
    radial-gradient(ellipse 90% 70% at 28% 40%, rgba(30, 30, 180, 0.55) 0%, transparent 65%),
    radial-gradient(ellipse 60% 50% at 75% 60%, rgba(120, 30, 180, 0.32) 0%, transparent 60%),
    radial-gradient(ellipse 120% 120% at 50% 50%, #0c0c50 0%, #08083a 40%, #050528 75%, #030318 100%);
}

/* ─── Background marquee ─── */
.bg {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
}
.row {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: clamp(1.4rem, 2.8vw, 2.4rem);
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.row-1 { color: #5566ff; opacity: 0.20; }
.row-2 { color: #7755ee; opacity: 0.16; }
.row-3 { color: #4455ee; opacity: 0.22; }
.row-4 { color: #dd6622; opacity: 0.20; }
.row-5 { color: #6644dd; opacity: 0.16; }
.row-6 { color: #4466ff; opacity: 0.22; }
.row-7 { color: #8844ee; opacity: 0.16; }
.row-8 { color: #ee7722; opacity: 0.18; }
.row-9 { color: #5577ff; opacity: 0.20; }
.track { display: flex; animation: scroll-left 34s linear infinite; }
.track.reverse { animation: scroll-right 40s linear infinite; }
.track-inner { flex-shrink: 0; }
@keyframes scroll-left  { from { transform: translateX(0); }     to { transform: translateX(-50%); } }
@keyframes scroll-right { from { transform: translateX(-50%); }  to { transform: translateX(0); } }

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
.logo { display: inline-flex; flex-direction: column; text-decoration: none; }
.logo-text {
  background: #0a0a0a;
  color: #fff;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 1.45rem;
  padding: 0.5rem 1.25rem 0.6rem;
  border-radius: 12px 12px 0 0;
  line-height: 1;
}
.logo-drip-bar { height: 8px; background: #0a0a0a; border-radius: 0 0 4px 4px; position: relative; }
.logo-drip {
  position: absolute; top: 100%; left: var(--x);
  width: var(--w); height: var(--h);
  background: #0a0a0a;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  transform: translateX(-50%);
}
.logo-drip::after {
  content: ''; position: absolute; bottom: -3px; left: 50%; transform: translateX(-50%);
  width: calc(var(--w) + 2px); height: calc(var(--w) + 2px); border-radius: 50%; background: #0a0a0a;
}
.badge {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(8, 8, 28, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem; font-weight: 500;
  padding: 0.42rem 1rem; border-radius: 999px;
  backdrop-filter: blur(12px); margin-top: 0.15rem;
}
.badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #f97316; }

/* ─── Main / stages ─── */
.main {
  position: relative;
  z-index: 10;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem 3.5rem;
}
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 440px;
  animation: pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes pop {
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── Idle: secret card + form ─── */
.secret-card {
  width: 116px;
  height: 158px;
  border-radius: 20px;
  background: linear-gradient(150deg, #f97316 0%, #c026d3 55%, #6d28d9 100%);
  box-shadow: 0 18px 40px rgba(109, 40, 217, 0.45), inset 0 2px 8px rgba(255, 255, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(-6deg);
  animation: float 4s ease-in-out infinite;
  margin-bottom: 1.75rem;
}
.secret-card::before,
.secret-card::after {
  content: '✦';
  position: absolute;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
}
.secret-card::before { top: 10px; right: 12px; }
.secret-card::after  { bottom: 12px; left: 12px; font-size: 0.8rem; }
.secret-q {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 4.5rem;
  color: #fff;
  line-height: 1;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.18);
}
.secret-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.18em;
  font-size: 0.85rem;
  color: #fff;
  margin-top: 0.25rem;
}
@keyframes float {
  0%, 100% { transform: rotate(-6deg) translateY(0); }
  50%      { transform: rotate(-4deg) translateY(-10px); }
}

.title {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 8vw, 2.9rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.subtitle {
  color: rgba(255, 255, 255, 0.62);
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0.85rem;
  max-width: 360px;
}

.code-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.75rem;
}
.code-input {
  width: 100%;
  background: rgba(8, 8, 28, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  color: #fff;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 0.08em;
  padding: 1rem 1.1rem;
  text-transform: uppercase;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  outline: none;
}
.code-input::placeholder { color: rgba(255, 255, 255, 0.3); letter-spacing: 0.1em; }
.code-input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.18);
}
.code-input.shake { animation: shake 0.4s ease; border-color: #fb7185; }
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

.error {
  color: #fda4af;
  font-size: 0.92rem;
  margin-top: 0.9rem;
  line-height: 1.45;
  max-width: 340px;
}

.hints { margin-top: 1.75rem; }
.hint-label {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.6rem;
}
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.chip {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.78);
  font-family: 'Fredoka', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
}
.chip:hover { background: rgba(249, 115, 22, 0.2); color: #fff; transform: translateY(-1px); }

/* ─── Opening: capsule + sparks ─── */
.stage-opening { gap: 2rem; }
.capsule-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.capsule {
  position: relative;
  width: 150px;
  height: 150px;
  animation:
    capDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both,
    capShake 0.42s ease-in-out 0.65s 2;
}
.cap-half { position: absolute; left: 0; width: 150px; height: 75px; }
.cap-top {
  top: 0;
  border-radius: 75px 75px 0 0;
  background: linear-gradient(180deg, #fb923c 0%, #f97316 100%);
  box-shadow: inset 0 6px 14px rgba(255, 255, 255, 0.45), inset 0 -4px 10px rgba(0, 0, 0, 0.2);
  animation: capOpenTop 0.7s cubic-bezier(0.5, 0, 0.3, 1) 1.5s forwards;
}
.cap-bottom {
  top: 75px;
  border-radius: 0 0 75px 75px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(220, 230, 255, 0.6) 100%);
  box-shadow: inset 0 -6px 14px rgba(120, 120, 200, 0.35);
  animation: capOpenBottom 0.7s cubic-bezier(0.5, 0, 0.3, 1) 1.5s forwards;
}
.cap-seam {
  position: absolute;
  top: 68px;
  left: -4px;
  width: 158px;
  height: 14px;
  border-radius: 7px;
  background: #0a0a0a;
  z-index: 2;
  animation: capSeam 0.4s ease 1.5s forwards;
}
@keyframes capDrop {
  from { transform: translateY(-180px) scale(0.6); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes capShake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-9deg); }
  75% { transform: rotate(9deg); }
}
@keyframes capOpenTop {
  to { transform: translateY(-150px) rotate(-28deg); opacity: 0; }
}
@keyframes capOpenBottom {
  to { transform: translateY(150px) rotate(20deg); opacity: 0; }
}
@keyframes capSeam {
  to { transform: scaleX(1.4); opacity: 0; }
}

.glow-burst {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 240, 200, 0.95) 0%, rgba(249, 115, 22, 0.5) 35%, transparent 70%);
  opacity: 0;
  animation: burst 0.85s ease-out 1.5s forwards;
}
@keyframes burst {
  0%   { opacity: 0; transform: scale(0.2); }
  35%  { opacity: 0.95; }
  100% { opacity: 0; transform: scale(2.6); }
}

.sparks { position: absolute; inset: 0; pointer-events: none; }
.spark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0;
  animation: sparkFly 0.9s ease-out forwards;
  animation-delay: calc(1.55s + var(--delay));
}
@keyframes sparkFly {
  0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateX(0) scale(1.2); opacity: 0; }
  15%  { opacity: 1; }
  100% { transform: translate(-50%, -50%) rotate(var(--a)) translateX(var(--d)) scale(0.3); opacity: 0; }
}
.opening-text {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
  animation: pulseText 1.2s ease-in-out infinite;
}
@keyframes pulseText {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}

/* ─── Reveal ─── */
.reveal-kicker {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #f97316;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}
.hero {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-aura {
  position: absolute;
  inset: -10%;
  border-radius: 50%;
  filter: blur(6px);
}
.hero.glowing .hero-aura { animation: auraPulse 2.6s ease-in-out infinite; }
@keyframes auraPulse {
  0%, 100% { opacity: 0.7; transform: scale(0.95); }
  50%      { opacity: 1; transform: scale(1.08); }
}
.creature {
  position: relative;
  width: 150px;
  height: auto;
  animation: floatChar 3.4s ease-in-out infinite;
}
.creature.glow { filter: drop-shadow(0 0 14px currentColor); }
.bulb { fill: #fff; }
.creature.glow .bulb { animation: bulbBlink 1.8s ease-in-out infinite; }
@keyframes bulbBlink {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
@keyframes floatChar {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}

.rarity {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  padding: 0.4rem 0.95rem;
  border-radius: 999px;
  margin-top: 0.4rem;
}
.rarity-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.rarity.common { color: #93c5fd; background: rgba(59, 130, 246, 0.16); border: 1px solid rgba(147, 197, 253, 0.4); }
.rarity.rare   { color: #c4b5fd; background: rgba(139, 92, 255, 0.18); border: 1px solid rgba(196, 181, 253, 0.45); }
.rarity.super  {
  color: #ffe08a;
  background: linear-gradient(100deg, rgba(255, 210, 63, 0.22), rgba(249, 115, 22, 0.22));
  border: 1px solid rgba(255, 224, 138, 0.55);
  box-shadow: 0 0 18px rgba(255, 210, 63, 0.3);
}

.char-name {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(2.4rem, 10vw, 3.4rem);
  line-height: 1;
  margin-top: 0.7rem;
}
.char-meta {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin-top: 0.4rem;
  letter-spacing: 0.01em;
}
.char-blurb {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.92rem;
  line-height: 1.55;
  margin-top: 0.6rem;
  max-width: 320px;
}

.get-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1.6rem;
}

/* ─── Buttons ─── */
.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  padding: 0.9rem 1.4rem;
  transition: transform 0.15s ease, filter 0.15s ease, background 0.15s ease;
}
.cta-block { width: 100%; }
.cta-line { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 1.05rem; }
.cta-sub { font-size: 0.82rem; opacity: 0.85; }
.cta-primary { background: #f97316; color: #fff; box-shadow: 0 10px 26px rgba(249, 115, 22, 0.35); }
.cta-primary:hover { transform: translateY(-2px); filter: brightness(1.08); }
.cta-primary:active { transform: translateY(0); filter: brightness(0.94); }
.cta-ghost {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
}
.cta-ghost:hover { background: rgba(255, 255, 255, 0.12); transform: translateY(-2px); }

.link-reset {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1.4rem;
  padding: 0.4rem;
  transition: color 0.15s ease;
}
.link-reset:hover { color: #fff; }

/* ─── Modal (cart confirmation) ─── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(3, 3, 18, 0.7);
  backdrop-filter: blur(6px);
}
.modal {
  width: 100%;
  max-width: 360px;
  background: #0f0f30;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 1.8rem 1.6rem;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  animation: pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.modal-emoji { font-size: 2.6rem; }
.modal-text {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
  margin: 0.6rem 0 0.5rem;
  line-height: 1.4;
}
.modal-note { color: rgba(255, 255, 255, 0.5); font-size: 0.85rem; margin-bottom: 1.3rem; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .row { font-size: clamp(1rem, 4vw, 1.5rem); }
  .header { padding: 1rem 1.25rem; }
}
@media (max-width: 480px) {
  .subtitle { font-size: 0.92rem; }
  .secret-card { width: 100px; height: 138px; }
  .secret-q { font-size: 3.8rem; }
}

/* Respect reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .track, .track.reverse, .secret-card, .creature, .hero.glowing .hero-aura,
  .opening-text, .creature.glow .bulb { animation: none !important; }
}
</style>
