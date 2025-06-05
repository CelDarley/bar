<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Pagamento via PIX</h2>
      
      <div class="qr-code-container">
        <div class="qr-code">
          <!-- Aqui você pode adicionar a imagem do QR code gerado -->
          <div class="placeholder-qr">
            <i class="fas fa-qrcode"></i>
            <span>QR Code do PIX</span>
          </div>
        </div>
        
        <div class="pix-info">
          <p>Escaneie o QR code acima com seu aplicativo de pagamento</p>
          <p class="amount">Valor: R$ {{ amount.toFixed(2) }}</p>
        </div>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
        <button class="confirm-btn" @click="confirmPayment">
          Confirmar Pagamento
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  amount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

const confirmPayment = () => {
  emit('confirm')
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

.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #dee2e6;
}

.placeholder-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.placeholder-qr i {
  font-size: 3rem;
}

.pix-info {
  text-align: center;
}

.pix-info p {
  color: #666;
  margin-bottom: 0.5rem;
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
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

.cancel-btn:hover {
  background-color: #c0392b;
}

.confirm-btn:hover {
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