<template>
  <div>
    <!-- ═══ Poster hero ═══ -->
    <section class="hero">
      <div class="wrap">
        <h1 class="poster-title hero-title">
          Unbox
          <span class="hero-circle" style="background: var(--teal)">
            <RenderSlot :tone="tropikTone" :size="circleSize" outer="transparent" />
          </span>
          your<br />
          next <span style="color: var(--teal)">tiny</span>
          <span class="hero-circle" style="background: var(--yellow)">
            <RenderSlot :tone="sonceTone" :size="circleSize" outer="transparent" />
          </span>
          <br />
          <span style="color: var(--coral)">friend</span><span style="color: var(--lavender)">.</span>
        </h1>

        <div class="hero-bottom">
          <div class="hero-ctas">
            <NuxtLink to="/shop" class="pill pill--navy pill--lg">Купити онлайн</NuxtLink>
            <NuxtLink to="/activate" class="pill pill--outline pill--lg">Активувати код</NuxtLink>
          </div>
          <p class="hero-note">
            Колекційні flexi-фігурки 5,5 см з рухомими сегментами.
            У кожній секретці — картка з кодом на ексклюзив.
          </p>
        </div>
      </div>
    </section>

    <ScallopDivider from="var(--bg)" to="var(--teal)" />

    <!-- ═══ Два способи ═══ -->
    <section class="ways">
      <div class="wrap ways-grid">
        <div class="way">
          <div class="way-num" style="color: var(--pink)">01</div>
          <h2 class="way-title">Секретка — сюрприз</h2>
          <p class="way-text">
            Непрозорий пакетик: випадкова фігурка серії та картка колекціонера
            з унікальним кодом. Єдиний шлях до рідкісних і секретних «?».
          </p>
          <div class="way-actions">
            <NuxtLink to="/shop#secrets" class="pill pill--white pill--md">До секреток</NuxtLink>
            <span class="way-price">149 грн*</span>
          </div>
        </div>

        <div class="ways-sep" aria-hidden="true" />

        <div class="way">
          <div class="way-num" style="color: var(--yellow)">02</div>
          <h2 class="way-title">Набери сам — точний вибір</h2>
          <p class="way-text">
            Обери улюблених з відкритих бочок — вони наповнять твій пакет.
            5 фігурок — 250 грн, повний пакет — 600 грн. Лише звичайні.
          </p>
          <div class="way-actions">
            <NuxtLink to="/shop#build" class="pill pill--outline-white pill--md">Зібрати пакет</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <ScallopDivider from="var(--teal)" to="#FFFFFF" />

    <!-- ═══ Як це працює ═══ -->
    <section class="how">
      <div class="wrap">
        <h2 class="section-title">Як це працює</h2>
        <div class="steps">
          <div v-for="step in STEPS" :key="step.n" class="step">
            <div class="step-num" :style="step.style">{{ step.n }}</div>
            <div class="step-title">{{ step.title }}</div>
            <div class="step-text">{{ step.text }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Серії ═══ -->
    <section id="series" class="series">
      <div class="wrap">
        <div class="series-head">
          <h2 class="section-title">Чотири серії. Збери всіх!</h2>
          <NuxtLink to="/shop#secrets" class="series-all">Всі серії →</NuxtLink>
        </div>

        <div class="arches">
          <div
            v-for="(s, i) in SERIES"
            :key="s.id"
            class="arch"
            :class="{ shifted: i % 2 === 1 }"
            :style="{ background: s.color }"
          >
            <RenderSlot :tone="s.tone" :size="96" />
            <div class="arch-name" :style="{ color: s.onColor }">«{{ s.name }}»</div>
            <div class="arch-badge" :style="{ background: s.badgeBg, color: s.badgeColor }">
              {{ s.figures }} фігурок
            </div>
          </div>

          <div class="arch arch-secret">
            <div class="secret-circle">?</div>
            <div class="arch-name" style="color: #fff">Секретні</div>
            <div class="arch-badge arch-badge-rainbow">тільки з коду</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Де купити teaser ═══ -->
    <section class="near">
      <div class="wrap near-grid">
        <div class="near-info">
          <h2 class="poster-title near-title">Miboo вже поруч<span style="color: var(--teal)">.</span></h2>
          <p class="near-text">
            Секретки та бочки «Набери сам» — у магазинах-партнерах твого міста.
            Або замовляй онлайн з доставкою по всій Україні.
          </p>
          <div class="near-ctas">
            <NuxtLink to="/where-to-buy" class="pill pill--navy pill--md">Де купити</NuxtLink>
            <NuxtLink to="/shop" class="pill pill--outline pill--md">Купити онлайн</NuxtLink>
          </div>
        </div>

        <NuxtLink to="/where-to-buy" class="near-map" aria-label="Мапа магазинів-партнерів">
          <span class="near-map-label">мапа магазинів-партнерів</span>
          <span class="near-pin" style="top: 34%; left: 28%; background: var(--coral)" />
          <span class="near-pin" style="top: 58%; left: 52%; background: var(--teal)" />
          <span class="near-pin" style="top: 26%; left: 66%; background: var(--yellow)" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SERIES, seriesById } from '~/data/series'

useHead({ title: 'Miboo Toys — колекційні flexi-фігурки' })

const tropikTone = seriesById('tropik')!.tone
const sonceTone = seriesById('sonce')!.tone

const circleSize = 104

const STEPS = [
  { n: '1', style: { color: 'var(--teal)' }, title: 'Купи секретку', text: 'Онлайн або в магазині-партнері' },
  { n: '2', style: { color: 'var(--coral)' }, title: 'Відкрий пакетик', text: 'Хто там — дізнаєшся тільки відкривши' },
  { n: '3', style: { color: 'var(--lavender)' }, title: 'Знайди картку', text: 'Всередині — картка з унікальним кодом' },
  { n: '4', style: { color: 'var(--yellow)' }, title: 'Активуй на сайті', text: '10 секунд — і готово' },
  {
    n: '5',
    style: {
      background: 'linear-gradient(105deg, #F0A0B4, #E5B96A, #5BBFA0, #7FA9E8, #B490E0)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      color: 'transparent',
    },
    title: 'Отримай ексклюзив',
    text: 'Доступ до секретного персонажа',
  },
]
</script>

<style scoped>
/* ─── Hero ─── */
.hero {
  background: var(--bg);
  padding: clamp(28px, 4vw, 48px) 0 8px;
}

.hero-title {
  font-size: clamp(44px, 8.4vw, 108px);
  line-height: 1.02;
}

.hero-circle {
  display: inline-flex;
  width: 0.96em;
  height: 0.96em;
  border-radius: 50%;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  margin: 0 0.04em;
}

.hero-circle :deep(.slot) {
  width: 100% !important;
  height: 100% !important;
}

.hero-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: clamp(20px, 2.5vw, 28px);
  padding-bottom: clamp(20px, 2.5vw, 28px);
  flex-wrap: wrap;
}

.hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

.hero-note {
  font: 600 14px/1.6 var(--font-body);
  color: var(--muted);
  max-width: 380px;
  text-align: right;
}

/* ─── Два способи ─── */
.ways { background: var(--teal); padding: clamp(40px, 5vw, 64px) 0; }

.ways-grid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
}

.ways-sep { background: rgba(255, 255, 255, 0.35); }

.way {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}

.way:first-child { padding-right: 48px; }
.way:last-child { padding-left: 48px; }

.way-num { font: 800 clamp(56px, 7vw, 88px)/1 var(--font-display); }
.way-title { font: 900 clamp(24px, 2.4vw, 30px) var(--font-body); color: #fff; }
.way-text { font: 600 15px/1.65 var(--font-body); color: #e2f9f5; }

.way-actions { display: flex; align-items: center; gap: 14px; margin-top: 8px; }
.way-price { font: 800 15px var(--font-body); color: #fff; }

/* ─── Як це працює ─── */
.how { background: #fff; padding: clamp(40px, 4.5vw, 56px) 0; }

.steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 30px;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 22px;
  border-left: 1px solid var(--line);
}

.step:first-child { padding-left: 0; border-left: none; }
.step:last-child { padding-right: 0; }

.step-num { font: 800 56px/1 var(--font-display); }
.step-title { font: 800 16px var(--font-body); color: var(--navy); }
.step-text { font: 600 13px/1.5 var(--font-body); color: var(--muted); }

/* ─── Серії ─── */
.series { background: var(--bg); padding: clamp(40px, 4.5vw, 56px) 0 clamp(44px, 5vw, 64px); }

.series-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
}

.series-all { font: 800 15px var(--font-body); color: var(--navy); }
.series-all:hover { color: var(--teal); }

.arches { display: flex; gap: 14px; }

.arch {
  flex: 1;
  border-radius: 120px 120px 24px 24px;
  padding: 20px 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.arch.shifted { margin-top: 24px; }

.arch-name { font: 900 18px var(--font-body); text-align: center; }

.arch-badge {
  font: 800 11px var(--font-body);
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
}

.arch-secret { background: var(--navy); }

.secret-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--navy-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 44px var(--font-display);
  color: #8f97d8;
}

.arch-badge-rainbow { background: var(--rainbow); color: var(--navy); }

/* ─── Де купити teaser ─── */
.near { background: #fff; padding: clamp(44px, 5vw, 64px) 0; }

.near-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(28px, 4vw, 48px);
  align-items: center;
}

.near-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.near-title { font-size: clamp(34px, 4.4vw, 56px); line-height: 1.05; }

.near-text { font: 600 15px/1.65 var(--font-body); color: var(--muted); max-width: 480px; }

.near-ctas { display: flex; gap: 12px; margin-top: 6px; flex-wrap: wrap; }

.near-map {
  position: relative;
  display: block;
  height: 300px;
  border-radius: 24px;
  background: repeating-linear-gradient(45deg, #e3f3f0 0 12px, #f3fbf9 12px 24px);
  border: 2px dashed #a9d2ca;
  overflow: hidden;
}

.near-map-label {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #fff;
  font: 600 11px ui-monospace, Menlo, monospace;
  color: #5f968d;
  padding: 6px 10px;
  border-radius: 8px;
}

.near-pin {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(30, 50, 45, 0.25);
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .hero-note { text-align: left; }

  .ways-grid { grid-template-columns: 1fr; gap: 36px; }
  .ways-sep { display: none; }
  .way:first-child { padding-right: 0; }
  .way:last-child { padding-left: 0; }

  .steps { grid-template-columns: repeat(2, 1fr); gap: 24px 0; }
  .step { border-left: none; padding: 0; }

  .arches {
    overflow-x: auto;
    padding-bottom: 12px;
    scroll-snap-type: x mandatory;
  }
  .arch { flex: 0 0 180px; scroll-snap-align: start; }
  .arch.shifted { margin-top: 0; }

  .near-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .steps { grid-template-columns: 1fr; }
}
</style>
