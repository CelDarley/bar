<template>
  <div class="kitchen-container">
    <h1>Cozinha</h1>
    
    <div v-if="cartStore.orderHistory.length === 0" class="no-orders">
      <p>Não há pedidos para a cozinha no momento</p>
    </div>
    
    <div v-else class="orders-grid">
      <div v-for="order in cartStore.orderHistory" :key="order.number" class="order-card" :class="order.status">
        <div class="order-header">
          <h2>Pedido #{{ order.number }}</h2>
          <span class="order-time">{{ formatTime(order.createdAt) }}</span>
        </div>
        
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <span class="item-quantity">{{ item.quantity }}x</span>
            <span class="item-name">{{ item.name }}</span>
            <span v-if="item.notes" class="item-notes">{{ item.notes }}</span>
          </div>
        </div>
        
        <div class="order-actions">
          <button 
            v-if="order.status === 'preparing'"
            class="ready-btn"
            @click="markAsReady(order)"
          >
            Marcar como Pronto
          </button>
          <span v-else class="status-badge">
            {{ getStatusText(order.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('pt-BR', {
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

const markAsReady = (order) => {
  cartStore.updateOrderStatus('ready', order.number)
}
</script>

<style scoped>
.kitchen-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.no-orders {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-orders p {
  color: #666;
  font-size: 1.2rem;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.order-card:hover {
  transform: translateY(-5px);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.order-header h2 {
  color: #2c3e50;
  margin: 0;
}

.order-time {
  color: #666;
  font-size: 0.9rem;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.order-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: start;
}

.item-quantity {
  font-weight: bold;
  color: #2c3e50;
}

.item-name {
  color: #333;
}

.item-notes {
  grid-column: 2;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.order-actions {
  display: flex;
  justify-content: center;
}

.ready-btn {
  padding: 0.75rem 1.5rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.ready-btn:hover {
  background-color: #219a52;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.preparing .status-badge {
  background-color: #f39c12;
  color: white;
}

.ready .status-badge {
  background-color: #27ae60;
  color: white;
}

.delivered .status-badge {
  background-color: #3498db;
  color: white;
}
</style> 