<template>
  <div>
    <!-- ═══ Poster title + city filter ═══ -->
    <section class="head">
      <div class="wrap">
        <h1 class="poster-title head-title">Де купити<span style="color: var(--coral)">?</span></h1>
        <p class="head-sub">
          Секретки Miboo вже чекають у магазинах-партнерах. Обери місто — або замовляй онлайн.
        </p>
        <div class="chips">
          <button
            class="chip"
            :class="{ active: activeCity === null }"
            @click="activeCity = null"
          >Всі міста</button>
          <button
            v-for="city in CITIES"
            :key="city"
            class="chip"
            :class="{ active: activeCity === city }"
            @click="activeCity = city"
          >{{ city }}</button>
          <span class="chip chip-soon">твоє місто — скоро</span>
        </div>
      </div>
    </section>

    <!-- ═══ Stores + map ═══ -->
    <section class="stores-zone">
      <div class="wrap stores-grid">
        <div class="stores">
          <article
            v-for="(store, i) in filteredStores"
            :key="store.id"
            class="store"
            :class="{ hl: hovered === store.id }"
            @mouseenter="hovered = store.id"
            @mouseleave="hovered = null"
          >
            <div
              class="store-pin"
              :style="{ background: store.pinColor, color: store.pinTextColor }"
            >{{ i + 1 }}</div>
            <div class="store-info">
              <div class="store-name">{{ store.name }}</div>
              <div class="store-addr">
                {{ store.city }} · <span class="store-street">{{ store.address }}</span>
              </div>
              <div class="store-hours">{{ store.hours }}</div>
              <div class="store-tags">
                <span class="tag tag-secret">Секретки</span>
                <span v-if="store.hasBarrel" class="tag tag-barrel">Бочка «Набери сам»</span>
              </div>
            </div>
          </article>

          <p v-if="filteredStores.length === 0" class="empty">
            У цьому місті партнерів поки немає — замовляй онлайн, доставимо!
          </p>

          <p class="footnote">Адреси та назви — плейсхолдери, підставимо реальних партнерів</p>
        </div>

        <!-- map placeholder -->
        <div class="map">
          <span class="map-label">мапа: інтерактивний Google Maps embed</span>
          <button
            v-for="(store, i) in filteredStores"
            :key="store.id"
            class="map-pin"
            :class="{ hl: hovered === store.id }"
            :style="{
              top: `${store.pin.top}%`,
              left: `${store.pin.left}%`,
              background: store.pinColor,
              color: store.pinTextColor,
            }"
            :aria-label="`Магазин ${i + 1} · ${store.city}`"
            @mouseenter="hovered = store.id"
            @mouseleave="hovered = null"
          >{{ i + 1 }}</button>

          <div class="legend">
            <span class="legend-item"><span class="legend-dot" style="background: var(--teal)" /> є бочка</span>
            <span class="legend-item"><span class="legend-dot" style="background: var(--coral)" /> лише секретки</span>
          </div>
        </div>
      </div>

      <!-- online band -->
      <div class="wrap">
        <div class="online">
          <div class="online-star" aria-hidden="true">✦</div>
          <div class="online-info">
            <div class="online-title">Немає магазину поруч?</div>
            <div class="online-text">Замовляй онлайн — доставимо секретки та набори по всій Україні</div>
          </div>
          <NuxtLink to="/shop" class="pill pill--yellow pill--md">Купити онлайн</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { STORES, CITIES } from '~/data/stores'

useHead({ title: 'Де купити — Miboo Toys' })

definePageMeta({
  ticker: [
    { text: 'МАГАЗИНИ-ПАРТНЕРИ' },
    { text: 'ЗАМОВ ОНЛАЙН', color: '#F5B73A' },
    { text: 'ДОСТАВКА ПО ВСІЙ УКРАЇНІ' },
    { text: 'МАГАЗИНИ-ПАРТНЕРИ', color: '#F5A9BC' },
    { text: 'ЗАМОВ ОНЛАЙН' },
    { text: 'ДОСТАВКА ПО ВСІЙ УКРАЇНІ', color: '#9FE0C8' },
  ],
})

const activeCity = ref<string | null>(null)
const hovered = ref<number | null>(null)

const filteredStores = computed(() =>
  activeCity.value ? STORES.filter((s) => s.city === activeCity.value) : STORES,
)
</script>

<style scoped>
/* ─── Head ─── */
.head { background: var(--bg); padding: clamp(28px, 3.5vw, 44px) 0 8px; }

.head-title { font-size: clamp(44px, 7.2vw, 92px); }

.head-sub {
  font: 600 15px/1.6 var(--font-body);
  color: var(--muted);
  max-width: 520px;
  margin-top: 16px;
}

.chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }

.chip {
  background: #fff;
  color: var(--navy);
  font: 800 13px var(--font-body);
  padding: 10px 20px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.chip:hover:not(.active):not(.chip-soon) { background: #eaf8f6; }
.chip.active { background: var(--navy); color: #fff; }

.chip-soon {
  background: transparent;
  border: 2px dashed #c9d6d1;
  color: var(--gray);
  padding: 8px 18px;
  cursor: default;
}

/* ─── Stores + map ─── */
.stores-zone { background: var(--bg); padding: 32px 0 clamp(40px, 4.5vw, 56px); }

.stores-grid {
  display: grid;
  grid-template-columns: 430px 1fr;
  gap: 24px;
  align-items: start;
  margin-bottom: clamp(28px, 4vw, 48px);
}

.stores { display: flex; flex-direction: column; gap: 12px; }

.store {
  background: #fff;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  box-shadow: 0 2px 10px rgba(30, 50, 45, 0.06);
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.store.hl { border-color: var(--teal); transform: translateX(4px); }

.store-pin {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font: 800 16px var(--font-display);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.store-info { display: flex; flex-direction: column; gap: 5px; }

.store-name { font: 600 13px ui-monospace, Menlo, monospace; color: var(--gray); }
.store-addr { font: 800 15px var(--font-body); color: var(--navy); }
.store-street { font: 600 13px ui-monospace, Menlo, monospace; color: var(--gray); }
.store-hours { font: 600 12.5px var(--font-body); color: var(--muted); }

.store-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.tag { font: 800 10.5px var(--font-body); padding: 4px 10px; border-radius: 999px; }
.tag-secret { background: #eaf8f6; color: #1e8a7c; }
.tag-barrel { background: #fdf6e7; color: #a8802a; }

.empty { font: 700 14px/1.5 var(--font-body); color: var(--muted); padding: 12px 4px; }

.footnote { font: 600 11.5px var(--font-body); color: var(--gray); }

/* map */
.map {
  position: relative;
  height: 520px;
  border-radius: 28px;
  background: repeating-linear-gradient(45deg, #e3f3f0 0 14px, #f3fbf9 14px 28px);
  border: 2px dashed #a9d2ca;
  overflow: hidden;
}

.map-label {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #fff;
  font: 600 11px ui-monospace, Menlo, monospace;
  color: #5f968d;
  padding: 7px 12px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(30, 50, 45, 0.1);
}

.map-pin {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 6px 14px rgba(30, 50, 45, 0.25);
  font: 800 15px var(--font-display);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: scale 0.15s ease;
}

.map-pin.hl { scale: 1.25; z-index: 2; }

.legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(30, 50, 45, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font: 700 11px var(--font-body);
  color: var(--navy);
}

.legend-dot { width: 12px; height: 12px; border-radius: 50%; }

/* online band */
.online {
  background: var(--navy);
  border-radius: 26px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.online-star { font: 800 54px/1 var(--font-display); color: var(--yellow); flex: none; }

.online-info { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 240px; }
.online-title { font: 900 24px var(--font-body); color: #fff; }
.online-text { font: 600 14px/1.5 var(--font-body); color: #c7cff2; }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .stores-grid { grid-template-columns: 1fr; }
  .map { height: 380px; order: -1; }
  .online { padding: 24px; gap: 18px; }
}
</style>
