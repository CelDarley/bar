<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Forma de Pagamento</h2>
      
      <div class="payment-methods">
        <button 
          v-for="method in paymentMethods" 
          :key="method.option"
          class="payment-method"
          @click="selectMethod(method)"
        >
          <span class="method-icon">{{ method.icon }}</span>
          <span class="method-name">{{ method.name }}</span>
        </button>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  amount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'select'])

const paymentMethods = [
  { name: 'Cartão de Crédito', icon: '💳', option: 'credit' },
  { name: 'Cartão de Débito', icon: '💳', option: 'debit' },
  { name: 'PIX', icon: '📱', option: 'pix' },
  { name: 'Dinheiro', icon: '💵', option: 'cash' }
]

const close = () => {
  emit('close')
}

const selectMethod = (method) => {
  emit('select', method)
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
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.payment-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.method-icon {
  font-size: 2rem;
}

.method-name {
  color: #2c3e50;
  font-weight: 500;
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
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
}
</style> 