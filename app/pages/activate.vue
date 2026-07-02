<template>
  <div>
    <!-- ═══ Poster title ═══ -->
    <section class="head">
      <div class="wrap">
        <h1 class="poster-title head-title">
          Активуй
          <span class="q-circle"><span class="q-inner">?</span></span>
          код<span style="color: var(--teal)">.</span>
        </h1>
        <p class="head-sub">
          Код — на картці колекціонера з твоєї секретки. Кожен код одноразовий
          і відкриває доступ до секретного персонажа серії.
        </p>
      </div>
    </section>

    <!-- ═══ Stages ═══ -->
    <section class="stage-zone">
      <div class="wrap stage-wrap">

        <!-- ── СТАН 1 · введення ── -->
        <div v-if="stage === 'idle'" class="card card-idle">
          <div class="collector-card" aria-hidden="true">
            <span class="collector-logo">MiBOO</span>
            <span class="collector-code">MB-7F4K-92</span>
          </div>

          <h2 class="card-title">Введи код з картки</h2>

          <form class="code-form" @submit.prevent="activate">
            <div class="cells" :class="{ shake }">
              <input
                v-for="(_, i) in CODE_LENGTH"
                :key="i"
                ref="cellRefs"
                v-model="cells[i]"
                class="cell"
                :class="{ filled: !!cells[i] }"
                type="text"
                inputmode="text"
                autocomplete="off"
                autocapitalize="characters"
                spellcheck="false"
                maxlength="1"
                :aria-label="`Символ ${i + 1} з ${CODE_LENGTH}`"
                @input="onCellInput(i, $event)"
                @keydown="onCellKeydown(i, $event)"
                @paste.prevent="onPaste($event)"
              />
            </div>

            <p v-if="error" class="error" role="alert">{{ error }}</p>

            <button type="submit" class="pill pill--navy pill--md submit" :disabled="!codeComplete">
              Активувати
            </button>
          </form>

          <p class="hint">Кожен код — одноразовий</p>

          <div class="demo">
            <span class="demo-label">Спробуй для демо:</span>
            <div class="chips">
              <button
                v-for="c in DEMO_CODES"
                :key="c"
                class="chip"
                type="button"
                :title="`Серія «${CODES[c]!.hint}»`"
                @click="fill(c)"
              >{{ c }}</button>
            </div>
          </div>
        </div>

        <!-- ── СТАН 2 · інтрига ── -->
        <div v-else-if="stage === 'opening'" class="card card-opening">
          <div class="glow" aria-hidden="true" />
          <div class="capsule" aria-hidden="true">
            <div class="capsule-inner">?</div>
          </div>
          <div class="opening-text" role="status">Відкриваємо капсулу…</div>
          <div class="dots" aria-hidden="true">
            <span class="dot" /><span class="dot d2" /><span class="dot d3" />
          </div>
        </div>

        <!-- ── СТАН 3 · ексклюзив ── -->
        <div v-else-if="stage === 'reveal' && character" class="reveal-border">
          <div class="card card-reveal">
            <div class="reveal-badge">СЕКРЕТНИЙ ПЕРСОНАЖ</div>

            <RenderSlot :tone="revealSeries!.tone" :size="130" outer="var(--bg)">
              рендер:<br />секретний
            </RenderSlot>

            <h2 class="reveal-title">
              Тобі відкрився ексклюзив серії «{{ revealSeries!.name }}»!
            </h2>
            <div class="reveal-name" :style="{ color: revealSeries!.color }">
              {{ character.name }}
            </div>
            <p class="reveal-note">Цю фігурку не купити в магазині — лише через код</p>

            <div class="reveal-actions">
              <button class="pill pill--yellow pill--md" @click="buyExclusive">
                {{ bought ? 'Додано у кошик ✓' : 'Купити за 200 грн*' }}
              </button>
              <NuxtLink to="/shop#secrets" class="pill pill--outline pill--sm">
                Безкоштовно з бандлом «5 пакетиків»
              </NuxtLink>
              <button class="again" type="button" @click="reset">Активувати ще один код →</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CODES, DEMO_CODES, CODE_LENGTH } from '~/data/codes'
import { seriesById } from '~/data/series'
import type { ExclusiveCharacter } from '~/data/codes'

useHead({ title: 'Активація коду — Miboo Toys' })

definePageMeta({
  ticker: [
    { text: 'ЗНАЙШОВ КАРТКУ?' },
    { text: 'АКТИВУЙ КОД', color: '#F5B73A' },
    { text: 'ВІДКРИЙ СЕКРЕТНОГО ПЕРСОНАЖА' },
    { text: 'ЗНАЙШОВ КАРТКУ?', color: '#F5A9BC' },
    { text: 'АКТИВУЙ КОД' },
    { text: 'ВІДКРИЙ СЕКРЕТНОГО ПЕРСОНАЖА', color: '#9FE0C8' },
  ],
})

type Stage = 'idle' | 'opening' | 'reveal'

const stage = ref<Stage>('idle')
const cells = ref<string[]>(Array(CODE_LENGTH).fill(''))
const cellRefs = ref<HTMLInputElement[]>([])
const error = ref('')
const shake = ref(false)
const character = ref<ExclusiveCharacter | null>(null)
const bought = ref(false)

const cart = useCart()
let openTimer: ReturnType<typeof setTimeout> | undefined

const code = computed(() => cells.value.join('').toUpperCase())
const codeComplete = computed(() => code.value.length === CODE_LENGTH)
const revealSeries = computed(() =>
  character.value ? seriesById(character.value.seriesId) : undefined,
)

/* — посегментний ввід — */
function onCellInput(i: number, e: Event) {
  error.value = ''
  const input = e.target as HTMLInputElement
  const v = input.value.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9]/g, '').toUpperCase()
  cells.value[i] = v.slice(-1)
  if (v && i < CODE_LENGTH - 1) cellRefs.value[i + 1]?.focus()
}

function onCellKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !cells.value[i] && i > 0) {
    cells.value[i - 1] = ''
    cellRefs.value[i - 1]?.focus()
  } else if (e.key === 'ArrowLeft' && i > 0) {
    cellRefs.value[i - 1]?.focus()
  } else if (e.key === 'ArrowRight' && i < CODE_LENGTH - 1) {
    cellRefs.value[i + 1]?.focus()
  }
}

function onPaste(e: ClipboardEvent) {
  const text = (e.clipboardData?.getData('text') ?? '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, CODE_LENGTH)
  if (!text) return
  cells.value = Array.from({ length: CODE_LENGTH }, (_, i) => text[i] ?? '')
  cellRefs.value[Math.min(text.length, CODE_LENGTH - 1)]?.focus()
  error.value = ''
}

function fill(c: string) {
  cells.value = c.split('')
  error.value = ''
  cellRefs.value[CODE_LENGTH - 1]?.focus()
}

/* — активація — */
function activate() {
  const hit = CODES[code.value]
  if (!hit) {
    error.value = 'Код не знайдено. Перевір символи на картці й спробуй ще раз.'
    shake.value = true
    setTimeout(() => { shake.value = false }, 500)
    return
  }
  character.value = hit
  stage.value = 'opening'
  openTimer = setTimeout(() => { stage.value = 'reveal' }, 2600)
}

function buyExclusive() {
  if (bought.value) return
  cart.value++
  bought.value = true
}

function reset() {
  stage.value = 'idle'
  cells.value = Array(CODE_LENGTH).fill('')
  character.value = null
  error.value = ''
  bought.value = false
  nextTick(() => cellRefs.value[0]?.focus())
}

onBeforeUnmount(() => clearTimeout(openTimer))
</script>

<style scoped>
/* ─── Head ─── */
.head { background: var(--bg); padding: clamp(28px, 3.5vw, 44px) 0 12px; }

.head-title { font-size: clamp(44px, 7.2vw, 92px); }

.q-circle {
  display: inline-flex;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  padding: 0.045em;
  background: var(--rainbow-conic);
  vertical-align: middle;
  margin: 0 0.05em;
}

.q-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 0.44em var(--font-display);
  color: #fff;
}

.head-sub {
  font: 600 15px/1.6 var(--font-body);
  color: var(--muted);
  max-width: 520px;
  margin-top: 16px;
}

/* ─── Stage zone ─── */
.stage-zone { background: var(--bg); padding: 36px 0 clamp(44px, 5vw, 64px); flex: 1; }

.stage-wrap { display: flex; justify-content: center; }

.card {
  background: #fff;
  border-radius: 130px 130px 26px 26px;
  padding: 40px 26px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: min(460px, 100%);
  min-height: 440px;
}

/* ── стан 1 ── */
.collector-card {
  width: 150px;
  height: 96px;
  border-radius: 12px;
  background: var(--rainbow);
  transform: rotate(-4deg);
  box-shadow: 0 10px 24px rgba(30, 50, 45, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: none;
}

.collector-logo { font: 800 13px var(--font-display); color: var(--navy); }

.collector-code {
  font: 700 11px ui-monospace, Menlo, monospace;
  color: var(--navy);
  background: rgba(255, 255, 255, 0.6);
  padding: 3px 10px;
  border-radius: 6px;
}

.card-title { font: 800 20px var(--font-body); color: var(--navy); text-align: center; }

.code-form { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }

.cells { display: flex; gap: 7px; }

.cell {
  width: 38px;
  height: 48px;
  border-radius: 10px;
  background: var(--bg);
  border: 2px solid #dde6e2;
  text-align: center;
  font: 800 20px var(--font-display);
  color: var(--navy);
  text-transform: uppercase;
  outline: none;
  transition: border-color 0.15s ease;
  padding: 0;
}

.cell:focus { border-color: var(--yellow); }
.cell.filled { border-color: var(--teal); }

.cells.shake { animation: shake 0.4s ease; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.error {
  font: 700 13px/1.4 var(--font-body);
  color: var(--coral);
  text-align: center;
  max-width: 320px;
}

.submit { padding-left: 40px; padding-right: 40px; }
.submit:disabled { opacity: 0.5; cursor: default; transform: none !important; }

.hint { font: 600 12px var(--font-body); color: var(--gray); }

.demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--line);
  width: 100%;
}

.demo-label { font: 600 12px var(--font-body); color: var(--gray); }

.chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }

.chip {
  font: 700 12px ui-monospace, Menlo, monospace;
  color: var(--navy);
  background: var(--bg);
  border: 1px solid #dde6e2;
  padding: 6px 12px;
  border-radius: 999px;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.chip:hover { border-color: var(--teal); background: #eaf8f6; }

/* ── стан 2 ── */
.card-opening {
  background: var(--navy);
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 183, 58, 0.22) 0%, rgba(39, 37, 99, 0) 70%);
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
}

.capsule {
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  padding: 4px;
  background: var(--rainbow-conic);
  animation: wobble 0.5s ease-in-out infinite;
}

@keyframes wobble {
  0%, 100% { transform: rotate(-2.5deg); }
  50% { transform: rotate(2.5deg); }
}

.capsule-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--navy-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 64px var(--font-display);
  color: #fff;
}

.opening-text { font: 800 20px var(--font-body); color: #fff; position: relative; }

.dots { display: flex; gap: 8px; }

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--yellow);
  animation: blink 1.2s ease-in-out infinite;
}

.dot.d2 { animation-delay: 0.2s; }
.dot.d3 { animation-delay: 0.4s; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

/* ── стан 3 ── */
.reveal-border {
  border-radius: 130px 130px 26px 26px;
  padding: 3px;
  background: var(--rainbow);
  width: min(466px, 100%);
  display: flex;
  animation: reveal-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes reveal-in {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.card-reveal {
  border-radius: 127px 127px 23px 23px;
  padding: 34px 24px 26px;
  gap: 13px;
  min-height: 434px;
  flex: 1;
  width: auto;
}

.reveal-badge {
  background: var(--rainbow);
  color: var(--navy);
  font: 800 11px var(--font-body);
  padding: 5px 14px;
  border-radius: 999px;
  letter-spacing: 0.04em;
}

.reveal-title { font: 800 20px/1.3 var(--font-body); color: var(--navy); text-align: center; }

.reveal-name { font: 800 24px var(--font-display); text-align: center; }

.reveal-note { font: 600 12.5px/1.5 var(--font-body); color: var(--muted); text-align: center; }

.reveal-actions {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
  margin-top: auto;
  align-items: stretch;
}

.reveal-actions .pill { width: 100%; }

.again {
  font: 700 13px var(--font-body);
  color: var(--muted);
  padding: 8px;
  transition: color 0.15s ease;
}

.again:hover { color: var(--navy); }

/* ─── Responsive ─── */
@media (max-width: 420px) {
  .cells { gap: 5px; }
  .cell { width: 34px; height: 44px; font-size: 18px; }
  .card { padding: 32px 18px 24px; border-radius: 90px 90px 22px 22px; }
  .reveal-border { border-radius: 90px 90px 22px 22px; }
  .card-reveal { border-radius: 87px 87px 19px 19px; }
}
</style>
