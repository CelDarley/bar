<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Fechar Conta</h2>
      
      <div class="order-history">
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
            <span>Subtotal:</span>
            <span>R$ {{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div class="total-amount">
        <h3>Total Gasto</h3>
        <span class="amount">R$ {{ cartStore.totalSpent.toFixed(2) }}</span>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Fechar</button>
        <button class="clear-btn" @click="clearHistory">Limpar Histórico</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])
const cartStore = useCartStore()

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
  emit('close')
}

const clearHistory = () => {
  if (confirm('Tem certeza que deseja limpar o histórico de pedidos?')) {
    cartStore.clearOrderHistory()
    close()
  }
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

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
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

.total-amount {
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  border-radius: 8px;
}

.total-amount h3 {
  margin-bottom: 0.5rem;
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.clear-btn {
  background: #dc3545;
  color: white;
}

.clear-btn:hover {
  background: #c82333;
}
</style> 