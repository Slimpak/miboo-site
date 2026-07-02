<template>
  <div>
    <!-- ═══ Poster title + toggle ═══ -->
    <section class="head">
      <div class="wrap">
        <h1 class="poster-title head-title">
          Мага<span style="color: var(--teal)">з</span>ин<span style="color: var(--coral)">.</span>
        </h1>
        <div class="toggle-row">
          <div class="toggle">
            <a
              href="#secrets"
              class="toggle-btn"
              :class="{ active: tab === 'secrets' }"
              @click="tab = 'secrets'"
            >Секретка · сюрприз</a>
            <a
              href="#build"
              class="toggle-btn"
              :class="{ active: tab === 'build' }"
              @click="tab = 'build'"
            >Набери сам · обери своїх</a>
          </div>
          <span class="toggle-hint">обидва формати — нижче на одній сторінці</span>
        </div>
      </div>
    </section>

    <!-- ═══ Секретки ═══ -->
    <section id="secrets" class="secrets">
      <div class="wrap secrets-in">
        <div class="arches">
          <div
            v-for="(s, i) in SERIES"
            :key="s.id"
            class="arch"
            :class="{ shifted: i % 2 === 1 }"
            :style="{ background: s.color }"
          >
            <RenderSlot :tone="s.tone" :size="120" />
            <div class="arch-name" :style="{ color: s.onColor }">Секретка «{{ s.name }}»</div>
            <div class="arch-sub" :style="{ color: s.onColor, opacity: 0.85 }">
              1 з {{ s.figures }} фігурок + картка з кодом
            </div>
            <div class="arch-buy">
              <span class="arch-price">149 грн*</span>
              <button class="pill pill--navy pill--sm" @click="addToCart(`secret-${s.id}`)">
                {{ justAdded === `secret-${s.id}` ? 'Додано ✓' : 'У кошик' }}
              </button>
            </div>
          </div>
        </div>

        <!-- бандл -->
        <div class="bundle">
          <div class="bundle-x">×5</div>
          <div class="bundle-info">
            <div class="bundle-title">Бандл «5 пакетиків» — ексклюзив у подарунок</div>
            <div class="bundle-text">
              5 секреток будь-яких серій + <b>ексклюзивна фігурка безкоштовно</b> —
              та сама, що відкривається кодом
            </div>
          </div>
          <div class="bundle-buy">
            <span class="bundle-price">699 грн*</span>
            <button class="pill pill--yellow pill--md" @click="addToCart('bundle')">
              {{ justAdded === 'bundle' ? 'Додано ✓' : 'Взяти бандл' }}
            </button>
          </div>
        </div>

        <p class="footnote">* ціни — плейсхолдери, фінальні узгодимо окремо</p>
      </div>
    </section>

    <ScallopDivider from="var(--bg)" to="var(--teal)" />

    <!-- ═══ Набери сам ═══ -->
    <section id="build" class="build">
      <div class="wrap">
        <div class="build-head">
          <h2 class="build-title">Набери сам</h2>
          <span class="build-hint">рідкісні та секретні тут не водяться — вони лише в секретках</span>
        </div>

        <div class="build-grid">
          <!-- бочка -->
          <div class="barrel">
            <div class="barrel-head">
              <div class="barrel-title">Бочка · серія «{{ activeSeries.name }}»</div>
              <div class="barrel-tabs">
                <button
                  v-for="s in SERIES"
                  :key="s.id"
                  class="barrel-tab"
                  :class="{ active: s.id === activeSeriesId }"
                  @click="activeSeriesId = s.id"
                >{{ s.name }}</button>
              </div>
            </div>

            <div class="figures">
              <div
                v-for="f in activeFigures"
                :key="f.id"
                class="figure"
                :class="{ picked: countInPack(f.id) > 0 }"
              >
                <span v-if="countInPack(f.id) > 1" class="figure-count">×{{ countInPack(f.id) }}</span>
                <RenderSlot :tone="activeSeries.tone" :size="66" outer="transparent" />
                <div class="figure-name">{{ f.name }}</div>
                <button
                  class="figure-add"
                  :disabled="packFull"
                  :aria-label="`Додати «${f.name}» у пакет`"
                  @click="addFigure(f)"
                >+</button>
              </div>

              <div class="figure figure-rare">
                <div class="rare-circle">?</div>
                <div class="rare-text">рідкісні — в секретках</div>
              </div>
            </div>
          </div>

          <!-- пакет -->
          <div class="pack">
            <div class="pack-title">Твій пакет</div>

            <div class="pack-slots" :class="{ full: mode === 'full' }">
              <button
                v-for="(slot, i) in packSlots"
                :key="i"
                class="pack-slot"
                :class="{ filled: !!slot }"
                :disabled="!slot"
                :aria-label="slot ? `Прибрати «${slot.name}»` : 'Порожній слот'"
                :title="slot ? `${slot.name} — прибрати` : ''"
                @click="slot && removeAt(i)"
              >
                <RenderSlot
                  v-if="slot"
                  :tone="seriesById(slot.seriesId)!.tone"
                  :size="mode === 'full' ? 40 : 42"
                  outer="transparent"
                  label=""
                />
              </button>
            </div>

            <div class="pack-progress">Обрано {{ pack.length }} з {{ capacity }}</div>

            <div class="pack-options">
              <button
                class="pack-option"
                :class="{ active: mode === 'five' }"
                @click="setMode('five')"
              >
                <span class="pack-option-check" :class="{ on: mode === 'five' }">
                  <template v-if="mode === 'five'">✓</template>
                </span>
                <span class="pack-option-label">5 фігурок на вибір</span>
                <span class="pack-option-price">250 грн</span>
              </button>
              <button
                class="pack-option"
                :class="{ active: mode === 'full' }"
                @click="setMode('full')"
              >
                <span class="pack-option-check" :class="{ on: mode === 'full' }">
                  <template v-if="mode === 'full'">✓</template>
                </span>
                <span class="pack-option-label">Повний пакет · наповни весь</span>
                <span class="pack-option-price">600 грн</span>
              </button>
            </div>

            <button
              class="pill pill--yellow pill--md pack-submit"
              :disabled="pack.length === 0"
              @click="addPackToCart"
            >
              {{ packButtonLabel }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SERIES, seriesById } from '~/data/series'
import { figuresBySeries, type Figure } from '~/data/figures'

useHead({ title: 'Магазин — Miboo Toys' })

definePageMeta({
  ticker: [
    { text: 'СЕКРЕТКА — СЮРПРИЗ' },
    { text: 'НАБЕРИ САМ — ТОЧНИЙ ВИБІР', color: '#F5B73A' },
    { text: '5 ПАКЕТИКІВ = ЕКСКЛЮЗИВ У ПОДАРУНОК' },
    { text: 'СЕКРЕТКА — СЮРПРИЗ', color: '#F5A9BC' },
    { text: 'НАБЕРИ САМ — ТОЧНИЙ ВИБІР' },
    { text: '5 ПАКЕТИКІВ = ЕКСКЛЮЗИВ', color: '#9FE0C8' },
  ],
})

const cart = useCart()
const tab = ref<'secrets' | 'build'>('secrets')

/* — кошик-мокап + коротке підтвердження на кнопці — */
const justAdded = ref('')
let addedTimer: ReturnType<typeof setTimeout> | undefined

function addToCart(id: string) {
  cart.value++
  justAdded.value = id
  clearTimeout(addedTimer)
  addedTimer = setTimeout(() => { justAdded.value = '' }, 1400)
}

/* — бочка — */
const activeSeriesId = ref('tropik')
const activeSeries = computed(() => seriesById(activeSeriesId.value)!)
const activeFigures = computed(() => figuresBySeries(activeSeriesId.value))

/* — конструктор пакета — */
const FULL_PACK = 12
const mode = ref<'five' | 'full'>('five')
const pack = ref<Figure[]>([])

const capacity = computed(() => (mode.value === 'five' ? 5 : FULL_PACK))
const packFull = computed(() => pack.value.length >= capacity.value)
const packSlots = computed(() =>
  Array.from({ length: capacity.value }, (_, i) => pack.value[i] ?? null),
)

const countInPack = (figureId: string) => pack.value.filter((f) => f.id === figureId).length

function addFigure(f: Figure) {
  if (!packFull.value) pack.value.push(f)
}

function removeAt(i: number) {
  pack.value.splice(i, 1)
}

function setMode(m: 'five' | 'full') {
  mode.value = m
  if (pack.value.length > capacity.value) pack.value = pack.value.slice(0, capacity.value)
}

const packButtonLabel = computed(() => {
  if (pack.value.length === 0) return 'Обери фігурки з бочки'
  if (!packFull.value) return `Додати пакет у кошик · ще ${capacity.value - pack.value.length}`
  return justAdded.value === 'pack' ? 'Додано ✓' : 'Додати пакет у кошик'
})

function addPackToCart() {
  if (pack.value.length === 0) return
  addToCart('pack')
  pack.value = []
}
</script>

<style scoped>
/* ─── Head ─── */
.head { background: var(--bg); padding: clamp(28px, 3.5vw, 44px) 0 clamp(28px, 3vw, 40px); }

.head-title { font-size: clamp(52px, 7.5vw, 96px); }

.toggle-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.toggle {
  display: flex;
  background: #fff;
  border-radius: 999px;
  padding: 6px;
  box-shadow: 0 2px 10px rgba(30, 50, 45, 0.08);
  flex-wrap: wrap;
}

.toggle-btn {
  font: 800 15px var(--font-body);
  color: var(--muted);
  padding: 13px 26px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.toggle-btn.active { background: var(--navy); color: #fff; }

.toggle-hint { font: 600 13px var(--font-body); color: var(--gray); }

/* ─── Секретки ─── */
.secrets { background: var(--bg); scroll-margin-top: 16px; }

.secrets-in {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-bottom: clamp(36px, 4.5vw, 56px);
}

.arches { display: flex; gap: 16px; }

.arch {
  flex: 1;
  border-radius: 130px 130px 26px 26px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.arch.shifted { margin-top: 26px; }

.arch-name { font: 900 20px var(--font-body); text-align: center; }
.arch-sub { font: 700 12.5px var(--font-body); text-align: center; }

.arch-buy { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; justify-content: center; }

.arch-price {
  background: #fff;
  color: var(--navy);
  font: 900 15px var(--font-body);
  padding: 9px 16px;
  border-radius: 999px;
}

/* бандл */
.bundle {
  background: var(--navy);
  border-radius: 26px;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.bundle-x { font: 800 64px/1 var(--font-display); color: var(--yellow); flex: none; }

.bundle-info { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 260px; }
.bundle-title { font: 900 24px var(--font-body); color: #fff; }
.bundle-text { font: 600 14px/1.5 var(--font-body); color: #c7cff2; }
.bundle-text b { color: #fff; }

.bundle-buy { display: flex; align-items: center; gap: 14px; flex: none; flex-wrap: wrap; }

.bundle-price {
  background: var(--rainbow);
  color: var(--navy);
  font: 900 18px var(--font-body);
  padding: 12px 20px;
  border-radius: 999px;
}

.footnote { font: 600 12px var(--font-body); color: var(--gray); }

/* ─── Набери сам ─── */
.build { background: var(--teal); padding: clamp(40px, 4.5vw, 56px) 0 clamp(44px, 5vw, 64px); scroll-margin-top: 16px; }

.build-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.build-title { font: 800 clamp(38px, 4.6vw, 60px)/1 var(--font-display); color: #fff; }
.build-hint { font: 700 14px var(--font-body); color: #d9f6f2; }

.build-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 28px;
  align-items: start;
}

/* бочка */
.barrel {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.barrel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.barrel-title { font: 800 17px var(--font-body); color: #fff; }

.barrel-tabs { display: flex; gap: 8px; flex-wrap: wrap; }

.barrel-tab {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  font: 800 12px var(--font-body);
  padding: 6px 14px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.barrel-tab.active { background: #fff; color: var(--navy); }

.figures {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.figure {
  position: relative;
  background: #fff;
  border: 3px solid #fff;
  border-radius: 60px 60px 16px 16px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.figure.picked { border-color: var(--yellow); }

.figure-count {
  position: absolute;
  top: -10px;
  right: -6px;
  background: var(--yellow);
  color: var(--navy);
  font: 800 11px var(--font-body);
  padding: 3px 9px;
  border-radius: 999px;
}

.figure-name { font: 800 12px var(--font-body); color: var(--navy); text-align: center; }

.figure-add {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--navy);
  font: 800 15px var(--font-body);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease;
}

.figure-add:hover:not(:disabled) { transform: scale(1.15); }
.figure-add:disabled { opacity: 0.4; cursor: default; }

.figure-rare {
  background: rgba(255, 255, 255, 0.18);
  border: 2px dashed rgba(255, 255, 255, 0.55);
  justify-content: center;
}

.rare-circle {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 28px var(--font-display);
  color: #fff;
}

.rare-text { font: 800 11px/1.3 var(--font-body); color: #fff; text-align: center; }

/* пакет */
.pack {
  background: #fff;
  border-radius: 130px 130px 28px 28px;
  padding: 34px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  position: sticky;
  top: 16px;
}

.pack-title { font: 800 26px var(--font-display); color: var(--navy); }

.pack-slots { display: flex; justify-content: center; gap: 9px; flex-wrap: wrap; max-width: 340px; }

.pack-slot {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px dashed #c9d6d1;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.pack-slot.filled { border-style: solid; border-color: var(--teal); background: var(--bg); cursor: pointer; }
.pack-slot:disabled { cursor: default; }

.pack-slots.full .pack-slot { width: 44px; height: 44px; }

.pack-progress { font: 700 13px var(--font-body); color: var(--muted); }

.pack-options { display: flex; flex-direction: column; gap: 10px; width: 100%; }

.pack-option {
  background: var(--bg);
  border: 2px solid var(--bg);
  border-radius: 16px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  transition: border-color 0.15s ease;
}

.pack-option.active { border-color: var(--teal); }

.pack-option-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #c9d6d1;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 11px var(--font-body);
  color: #fff;
}

.pack-option-check.on { border: none; background: var(--teal); }

.pack-option-label { font: 800 14px var(--font-body); color: var(--navy); flex: 1; }
.pack-option:not(.active) .pack-option-label { color: var(--muted); }

.pack-option-price { font: 900 15px var(--font-body); color: var(--navy); }
.pack-option:not(.active) .pack-option-price { color: var(--muted); }

.pack-submit { width: 100%; }
.pack-submit:disabled { opacity: 0.55; cursor: default; transform: none !important; }

/* ─── Responsive ─── */
@media (max-width: 1023px) {
  .arches { flex-wrap: wrap; }
  .arch { flex: 1 1 40%; }
  .arch.shifted { margin-top: 0; }

  .build-grid { grid-template-columns: 1fr; }
  .pack { position: static; }
  .figures { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 560px) {
  .arch { flex: 1 1 100%; }
  .figures { grid-template-columns: repeat(2, 1fr); }
  .bundle { padding: 24px; gap: 18px; }
}
</style>
