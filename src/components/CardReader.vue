<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Leitura do Cartão</h2>
      
      <div class="card-reader-container">
        <div class="card-reader">
          <div class="card-icon">💳</div>
          <div class="scan-animation"></div>
          <div class="scan-line"></div>
        </div>
        <p class="instructions">Aproxime seu cartão do leitor</p>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'read'])

let timer = null

const startTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
  
  timer = setTimeout(() => {
    emit('read')
    emit('close')
  }, 3000)
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    startTimer()
  }
}, { immediate: true })

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})

const close = () => {
  if (timer) {
    clearTimeout(timer)
  }
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.card-reader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.card-reader {
  position: relative;
  width: 200px;
  height: 200px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-icon {
  font-size: 3rem;
  animation: pulse 2s infinite;
}

.scan-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #27ae60;
  animation: scan 3s linear;
  z-index: 1;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #27ae60;
  animation: scan 3s linear;
}

@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
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

.instructions {
  color: #666;
  text-align: center;
  margin-top: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style> 