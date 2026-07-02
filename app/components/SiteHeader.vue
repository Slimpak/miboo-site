<template>
  <header class="header">
    <div class="header-in wrap">
      <NuxtLink to="/" class="logo" aria-label="Miboo Toys — на головну">
        <span class="logo-main">MiBOO</span>
        <span class="logo-sub">Toys</span>
      </NuxtLink>

      <nav class="nav" aria-label="Основна навігація">
        <template v-for="item in NAV" :key="item.label">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="nav-link"
            :class="{ active: isActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="nav-link soon" :title="`${item.label} — скоро`">
            {{ item.label }} <span class="soon-badge">скоро</span>
          </span>
        </template>
      </nav>

      <div class="side">
        <div class="lang" title="Мова сайту">
          <span class="flag flag-ua" aria-label="Українська — активна мова">
            <span class="flag-ua-top" /><span class="flag-ua-bottom" />
          </span>
          <span class="flag flag-en" aria-label="English — скоро" title="English — скоро">
            <span class="en-v" /><span class="en-h" /><span class="en-v red" /><span class="en-h red" />
          </span>
        </div>

        <NuxtLink v-if="showCart" to="/shop" class="pill pill--outline pill--sm cart">
          Кошик · {{ cart }}
        </NuxtLink>
        <template v-else>
          <NuxtLink to="/where-to-buy" class="pill pill--outline pill--sm hide-sm">Де купити</NuxtLink>
          <NuxtLink to="/shop" class="pill pill--yellow pill--sm hide-sm">Купити онлайн</NuxtLink>
        </template>

        <button
          class="burger"
          :aria-expanded="menuOpen"
          aria-label="Меню"
          @click="menuOpen = !menuOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" class="mobile-menu" aria-label="Мобільна навігація">
        <template v-for="item in NAV" :key="item.label">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="mobile-link"
            :class="{ active: isActive(item.to) }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="mobile-link soon">{{ item.label }} <span class="soon-badge">скоро</span></span>
        </template>
        <div class="mobile-ctas">
          <NuxtLink to="/where-to-buy" class="pill pill--outline pill--md" @click="menuOpen = false">Де купити</NuxtLink>
          <NuxtLink to="/shop" class="pill pill--yellow pill--md" @click="menuOpen = false">Купити онлайн</NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const NAV: { label: string; to?: string }[] = [
  { label: 'Головна', to: '/' },
  { label: 'Магазин', to: '/shop' },
  { label: 'Серії', to: '/#series' },
  { label: 'Активувати код', to: '/activate' },
  { label: 'Про Miboo' },
  { label: 'Моя колекція' },
]

const route = useRoute()
const cart = useCart()
const menuOpen = ref(false)

const showCart = computed(() => route.path === '/shop' || cart.value > 0)

function isActive(to: string) {
  const path = to.split('#')[0] || '/'
  return to.includes('#') ? false : route.path === path
}

watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<style scoped>
.header {
  background: var(--bg);
  position: relative;
  z-index: 50;
}

.header-in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
}

/* logo */
.logo { display: flex; align-items: baseline; gap: 6px; flex: none; }
.logo-main { font: 800 26px/1 var(--font-display); color: var(--navy); }
.logo-sub { font: 700 14px/1 var(--font-display); color: var(--navy); }

/* nav */
.nav {
  display: flex;
  align-items: center;
  gap: 18px;
  font: 700 13.5px var(--font-body);
  color: var(--navy);
}

.nav-link { padding-bottom: 2px; border-bottom: 3px solid transparent; }
.nav-link.active { border-bottom-color: var(--yellow); }
.nav-link:hover:not(.soon) { border-bottom-color: var(--mint); }
.nav-link.soon { opacity: 0.45; display: inline-flex; align-items: center; gap: 5px; cursor: default; }

.soon-badge {
  font: 700 9px var(--font-body);
  background: #e7ecea;
  color: var(--gray);
  padding: 2px 6px;
  border-radius: 99px;
}

/* right side */
.side { display: flex; align-items: center; gap: 10px; flex: none; }

.lang {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #fff;
  border-radius: 999px;
  padding: 4px 6px;
}

.flag {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex: none;
  display: flex;
  flex-direction: column;
}

.flag-ua { border: 2px solid var(--navy); }
.flag-ua-top { flex: 1; background: #3b6fd6; }
.flag-ua-bottom { flex: 1; background: #f6ce3c; }

.flag-en { background: #2a4b9b; opacity: 0.45; }
.en-v { position: absolute; top: 0; bottom: 0; left: 9px; width: 6px; background: #fff; }
.en-h { position: absolute; left: 0; right: 0; top: 9px; height: 6px; background: #fff; }
.en-v.red { left: 10px; width: 4px; background: #d63a3a; }
.en-h.red { top: 10px; height: 4px; background: #d63a3a; }

/* burger */
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
}

.burger span {
  display: block;
  width: 18px;
  height: 2.5px;
  border-radius: 2px;
  background: var(--navy);
}

/* mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px clamp(20px, 5vw, 64px) 20px;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.mobile-link {
  font: 800 17px var(--font-body);
  color: var(--navy);
  padding: 10px 0;
}

.mobile-link.active { color: #b9860f; }
.mobile-link.soon { opacity: 0.45; }

.mobile-ctas { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }

.menu-enter-active, .menu-leave-active { transition: opacity 0.15s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; }

@media (max-width: 1023px) {
  .nav { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }
  .hide-sm { display: none; }
}
</style>
