<template>
  <footer class="footer">
    <div class="footer-in wrap">
      <NuxtLink to="/" class="logo" aria-label="Miboo Toys — на головну">
        <span class="logo-main">MiBOO</span>
        <span class="logo-sub">Toys</span>
      </NuxtLink>

      <nav class="links" aria-label="Навігація у футері">
        <NuxtLink to="/shop">Магазин</NuxtLink>
        <NuxtLink to="/#series">Серії</NuxtLink>
        <NuxtLink to="/activate">Активація коду</NuxtLink>
        <NuxtLink to="/where-to-buy">Де купити</NuxtLink>
      </nav>

      <div class="tag">MIBOO.TOYS ✦ УКРАЇНА</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--navy);
}

.footer-in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 22px;
  padding-bottom: 22px;
}

.logo { display: flex; align-items: baseline; gap: 5px; }
.logo-main { font: 800 20px/1 var(--font-display); color: #fff; }
.logo-sub { font: 700 11px/1 var(--font-display); color: #fff; }

.links {
  display: flex;
  gap: 26px;
  flex-wrap: wrap;
  font: 700 13px var(--font-body);
  color: #c7cff2;
}

.links a:hover { color: #fff; }

.tag {
  font: 800 12px var(--font-display);
  color: #8f97d8;
  letter-spacing: 0.14em;
}
</style>
