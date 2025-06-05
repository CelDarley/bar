<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Dividir Conta</h2>
      
      <div class="total-info">
        <span>Valor Total:</span>
        <span class="amount">R$ {{ totalAmount.toFixed(2) }}</span>
      </div>

      <div class="input-group">
        <label for="payment-amount">Valor a Pagar:</label>
        <div class="input-wrapper">
          <span class="currency">R$</span>
          <input 
            type="number" 
            id="payment-amount"
            v-model="paymentAmount"
            step="0.01"
            min="0"
            :max="totalAmount"
            placeholder="0,00"
            @input="validateAmount"
          >
        </div>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
        <button 
          class="confirm-btn" 
          @click="confirmPayment"
          :disabled="!isValidAmount"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: Boolean,
  totalAmount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])
const paymentAmount = ref('')
const isValidAmount = ref(false)

const validateAmount = () => {
  const amount = parseFloat(paymentAmount.value)
  isValidAmount.value = amount > 0 && amount <= props.totalAmount
}

const close = () => {
  paymentAmount.value = ''
  isValidAmount.value = false
  emit('close')
}

const confirmPayment = () => {
  emit('confirm', {
    amount: parseFloat(paymentAmount.value)
  })
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
  margin-bottom: 1.5rem;
  text-align: center;
}

.total-info {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-left: 0.5rem;
}

.input-group {
  margin-bottom: 2rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: bold;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 1rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1.1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.cancel-btn,
.confirm-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.confirm-btn {
  background-color: #3498db;
  color: white;
}

.confirm-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .confirm-btn {
    width: 100%;
  }
}
</style> 