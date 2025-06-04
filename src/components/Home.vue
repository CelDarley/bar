<template>
  <div class="home">
    <div class="banner">
      <h1>Bem-vindo ao Nosso Restaurante</h1>
      <div class="card-animation">
        <div class="card-icon">💳</div>
        <p>Aproxime seu cartão para abrir uma conta</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/menu')
  }, 4000)
})
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  color: white;
}

.banner {
  text-align: center;
}

.card-animation {
  margin-top: 2rem;
  animation: pulse 2s infinite;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style> 