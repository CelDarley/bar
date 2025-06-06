<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Leitura do Cartão</h2>
      
      <div class="nfc-animation">
        <div class="nfc-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <p>Aproxime o cartão do leitor NFC</p>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

// Simula a leitura do cartão NFC
const simulateNFCCard = () => {
  setTimeout(() => {
    emit('confirm', {
      total: 0 // O valor será calculado no CheckoutModal
    })
  }, 2000)
}

onMounted(() => {
  if (props.show) {
    simulateNFCCard()
  }
})

onUnmounted(() => {
  // Limpar qualquer listener ou timeout pendente
})
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
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.nfc-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.nfc-icon {
  width: 80px;
  height: 80px;
  color: #3498db;
  animation: pulse 2s infinite;
}

.nfc-icon svg {
  width: 100%;
  height: 100%;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

p {
  color: #666;
  font-size: 1.1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1rem;
  }
}
</style> 