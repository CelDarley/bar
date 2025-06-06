<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Fechar Conta</h2>
        <button class="close-btn" @click="close">×</button>
      </div>

      <div class="modal-body">
        <div v-if="cartStore.orderHistory.length === 0" class="no-consumption">
          <p>Nada foi consumido</p>
        </div>
        <div v-else>
          <div class="order-history">
            <h3>Histórico de Pedidos</h3>
            <div v-for="order in cartStore.orderHistory" :key="order.number" class="order-item">
              <div class="order-header">
                <span class="order-number">Pedido #{{ order.number }}</span>
                <span class="order-date">{{ formatDate(order.createdAt) }}</span>
                <span class="order-status" :class="'status-' + order.status">
                  {{ getStatusText(order.status) }}
                </span>
              </div>
              <div class="order-items">
                <div v-for="item in order.items" :key="item.id" class="order-item-detail">
                  <span class="item-quantity">{{ item.quantity }}x</span>
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-price">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <div class="order-total">
                Total: R$ {{ order.total.toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="total-section">
            <div class="total-row">
              <span>Total Consumido:</span>
              <span>R$ {{ cartStore.totalSpent.toFixed(2) }}</span>
            </div>
            <div class="total-row">
              <span>Taxa de Serviço (10%):</span>
              <span>R$ {{ serviceFee.toFixed(2) }}</span>
            </div>
            <div class="total-row final">
              <span>Total a Pagar:</span>
              <span>R$ {{ totalWithFee.toFixed(2) }}</span>
            </div>
          </div>

          <div class="payment-options">
            <button class="pay-all-btn" @click="handlePayAll">
              Pagar Tudo
            </button>
            <button class="split-pay-btn" @click="handleSplitPayment">
              Dividir Conta
            </button>
            <button class="pay-individual-btn" @click="handleIndividualPayment">
              Pagar Individualmente
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="close">Cancelar</button>
        <button v-if="cartStore.orderHistory.length > 0" class="confirm-btn" @click="handleConfirm">Confirmar</button>
      </div>
    </div>
  </div>

  <CardReader 
    :show="showCardReader"
    @close="showCardReader = false"
    @read="handleCardRead"
  />

  <PaymentOptions 
    :show="showPaymentOptions"
    :amount="isSplitPayment ? remainingAmount : selectedItemsTotal || totalAmount"
    @close="handlePaymentClose"
    @select="handlePayment"
  />

  <SplitPaymentModal 
    :show="showSplitPayment"
    :total-amount="remainingAmount > 0 ? remainingAmount : totalAmount"
    @close="showSplitPayment = false"
    @confirm="handleSplitPaymentConfirm"
  />

  <PixQRCode 
    :show="showPixQRCode"
    :amount="isSplitPayment ? remainingAmount : selectedItemsTotal || totalAmount"
    @close="showPixQRCode = false"
    @confirm="handlePixPayment"
  />
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useCartStore } from '../stores/cart'
import PaymentOptions from './PaymentOptions.vue'
import SplitPaymentModal from './SplitPaymentModal.vue'
import PixQRCode from './PixQRCode.vue'
import CardReader from './CardReader.vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const showPaymentOptions = ref(false)
const isSplitPayment = ref(false)
const remainingAmount = ref(0)
const selectedItemsTotal = ref(0)
const showSplitPayment = ref(false)
const showPixQRCode = ref(false)
const lastSplitPaid = ref(0)
const showCardReader = ref(false)

// Calcula o valor total da conta
const totalAmount = computed(() => {
  return cartStore.orderHistory.reduce((total, order) => {
    return total + order.total
  }, 0)
})

const currentOrder = computed(() => {
  return cartStore.orderHistory[cartStore.orderHistory.length - 1]
})

const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status) => {
  const statusMap = {
    preparing: 'Em preparação',
    ready: 'Pronto',
    delivered: 'Entregue'
  }
  return statusMap[status]
}

const close = () => {
  showPaymentOptions.value = false
  showPixQRCode.value = false
  showSplitPayment.value = false
  remainingAmount.value = 0
  selectedItemsTotal.value = 0
  emit('close')
}

const handlePayAll = () => {
  isSplitPayment.value = false
  showPaymentOptions.value = true
}

const handleSplitPayment = () => {
  if (remainingAmount.value <= 0) {
    remainingAmount.value = totalAmount.value
  }
  showSplitPayment.value = true
}

const handleIndividualPayment = () => {
  console.log('Iniciando pagamento individual')
  showCardReader.value = true
}

const handleCardRead = () => {
  console.log('Cartão lido, mostrando opções de pagamento')
  showCardReader.value = false
  
  // Adiciona o pedido ao histórico com status 'preparando'
  const newOrder = {
    items: cartStore.cart,
    total: totalAmount.value,
    timestamp: new Date().toISOString(),
    status: 'preparando',
    number: cartStore.orderHistory.length + 1,
    createdAt: new Date().toISOString()
  }
  
  cartStore.addToOrderHistory(newOrder)
  
  // Limpa o carrinho e fecha o modal do carrinho
  cartStore.clearCart()
  cartStore.showCart = false
  
  // Fecha o modal principal
  emit('close')
  
  // Reseta todos os estados
  showPaymentOptions.value = false
  showPixQRCode.value = false
  showSplitPayment.value = false
  isSplitPayment.value = false
  remainingAmount.value = 0
  selectedItemsTotal.value = 0
  
  // Força a atualização do DOM
  nextTick(() => {
    // Mostra as opções de pagamento
    showPaymentOptions.value = true
  })
}

const handlePaymentClose = () => {
  showPaymentOptions.value = false
  if (!isSplitPayment.value) {
    close()
  }
}

const handlePayment = (method) => {
  if (method.option === 'pix') {
    showPaymentOptions.value = false
    showPixQRCode.value = true
  } else {
    // Simula o processamento do pagamento
    setTimeout(() => {
      showPaymentOptions.value = false
      showPixQRCode.value = false
    }, 1000)
  }
}

const handlePixPayment = () => {
  showPixQRCode.value = false
  
  // Simula o processamento do pagamento PIX
  setTimeout(() => {
    if (isSplitPayment.value) {
      remainingAmount.value -= lastSplitPaid.value
      
      if (remainingAmount.value <= 0) {
        // Fecha todos os modais e redireciona para o cardápio
        showPaymentOptions.value = false
        close()
        window.location.href = '/menu'
      } else {
        // Reabre o modal de divisão
        showSplitPayment.value = true
      }
    } else {
      // Fecha todos os modais e redireciona para o cardápio
      showPaymentOptions.value = false
      close()
      window.location.href = '/menu'
    }
  }, 1000)
}

const handleSplitPaymentConfirm = (data) => {
  lastSplitPaid.value = data.amount
  showPaymentOptions.value = true
  isSplitPayment.value = true
}

const serviceFee = computed(() => {
  return totalAmount.value * 0.1
})

const totalWithFee = computed(() => {
  return totalAmount.value + serviceFee.value
})

const handleConfirm = () => {
  // Implemente a lógica para confirmar o fechamento da conta
  console.log('Fechamento confirmado')
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
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 2rem;
}

.order-history {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.order-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.order-number {
  font-weight: bold;
  color: #2c3e50;
}

.order-date {
  color: #666;
  font-size: 0.9rem;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

.status-preparing {
  background: #f39c12;
  color: white;
}

.status-ready {
  background: #27ae60;
  color: white;
}

.status-delivered {
  background: #3498db;
  color: white;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-item-detail {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.item-quantity {
  color: #666;
  font-weight: bold;
}

.item-name {
  color: #333;
}

.item-price {
  font-weight: bold;
  color: #2c3e50;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #dee2e6;
  font-weight: bold;
  color: #2c3e50;
}

.total-section {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.total-row span {
  font-size: 0.9rem;
  color: #666;
}

.total-row final {
  font-weight: bold;
  color: #2c3e50;
}

.modal-footer {
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
  background-color: #27ae60;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

.confirm-btn:hover {
  background-color: #219a52;
}

.no-consumption {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
}

.no-consumption p {
  margin: 0;
  line-height: 1.5;
}

.payment-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.pay-all-btn,
.split-pay-btn,
.pay-individual-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pay-all-btn {
  background-color: #27ae60;
  color: white;
}

.split-pay-btn {
  background-color: #3498db;
  color: white;
}

.pay-individual-btn {
  background-color: #9b59b6;
  color: white;
}

.pay-all-btn:hover {
  background-color: #219a52;
}

.split-pay-btn:hover {
  background-color: #2980b9;
}

.pay-individual-btn:hover {
  background-color: #8e44ad;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1rem;
  }
  
  .payment-options {
    flex-direction: column;
  }
  
  .pay-all-btn,
  .split-pay-btn,
  .pay-individual-btn {
    width: 100%;
  }
}
</style> 