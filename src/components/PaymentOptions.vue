<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Escolha a Forma de Pagamento</h2>
      
      <div class="payment-options">
        <button class="payment-option" @click="showPixQRCode = true">
          <span class="icon">📱</span>
          <span class="text">PIX</span>
        </button>
        
        <button class="payment-option" @click="selectPayment('card')">
          <span class="icon">💳</span>
          <span class="text">Cartão</span>
        </button>
        
        <button class="payment-option" @click="selectPayment('cash')">
          <span class="icon">💵</span>
          <span class="text">Dinheiro</span>
        </button>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Voltar</button>
      </div>
    </div>
  </div>

  <PixQRCode 
    :show="showPixQRCode"
    @close="showPixQRCode = false"
    @confirm="handlePixPayment"
  />
</template>

<script setup>
import { ref } from 'vue'
import PixQRCode from './PixQRCode.vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'select'])
const showPixQRCode = ref(false)

const close = () => {
  emit('close')
}

const selectPayment = (method) => {
  emit('select', method)
  close()
}

const handlePixPayment = () => {
  alert('Conta fechada e paga')
  emit('select', 'pix')
  close()
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
  max-width: 500px;
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.payment-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 2px solid #eee;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-option:hover {
  border-color: #2c3e50;
  transform: translateY(-2px);
}

.icon {
  font-size: 2rem;
}

.text {
  font-weight: bold;
  color: #2c3e50;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style> 