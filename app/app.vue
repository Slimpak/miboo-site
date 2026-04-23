<template>
  <div class="container">
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <main class="content">
      <div class="logo">Miboo</div>
      <h1 class="headline">Coming Soon</h1>
      <p class="tagline">Something exciting is on its way. Stay tuned.</p>

      <form v-if="!submitted" class="form" @submit.prevent="handleSubmit">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="input"
        />
        <button type="submit" class="button">Notify me</button>
      </form>
      <p v-else class="thanks">Thank you! We'll keep you posted. ✦</p>
    </main>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const submitted = ref(false)

function handleSubmit() {
  if (email.value) {
    submitted.value = true
  }
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #07070f;
  position: relative;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}

.blob-1 {
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, #7c3aed, #4f46e5);
  top: -220px;
  left: -120px;
  animation: float-1 14s ease-in-out infinite;
}

.blob-2 {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, #ec4899, #8b5cf6);
  bottom: -160px;
  right: -120px;
  animation: float-2 16s ease-in-out infinite;
}

.blob-3 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #06b6d4, #3b82f6);
  top: 50%;
  left: 50%;
  animation: float-3 18s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.06); }
  66% { transform: translate(-25px, 25px) scale(0.95); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-35px, 35px) scale(0.94); }
  66% { transform: translate(30px, -30px) scale(1.05); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  33% { transform: translate(calc(-50% + 35px), calc(-50% - 35px)) scale(1.06); }
  66% { transform: translate(calc(-50% - 25px), calc(-50% + 25px)) scale(0.95); }
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
}

.logo {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1.75rem;
}

.headline {
  font-size: clamp(3.5rem, 11vw, 8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.45));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 2.75rem;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.65;
}

.form {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.input {
  padding: 0.9rem 1.3rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 0.95rem;
  width: 280px;
  outline: none;
  backdrop-filter: blur(12px);
  transition: border-color 0.2s;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.input:focus {
  border-color: rgba(255, 255, 255, 0.38);
}

.button {
  padding: 0.9rem 1.8rem;
  border-radius: 14px;
  border: none;
  background: #ffffff;
  color: #07070f;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.button:hover {
  opacity: 0.88;
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0);
}

.thanks {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  padding: 0.9rem 0;
  letter-spacing: 0.01em;
}
</style>
