<template>
  <div v-if="show" class="status-bar">
    <div class="status-content">
      <div class="order-info">
        <div class="order-details">
          <div class="order-header">
            <span class="order-number">Pedido #{{ orderNumber }}</span>
            <button class="order-switch" @click="switchOrder">
              <span class="order-count">{{ currentOrderIndex + 1 }}/{{ totalOrders }}</span>
              <span class="switch-icon">↔</span>
            </button>
          </div>
          <span class="order-items">{{ orderItems }}</span>
        </div>
        <span class="status" :class="statusClass">{{ statusText }}</span>
      </div>
      <div class="status-steps">
        <div class="step" :class="{ active: isStepActive('preparing') }">
          <div class="step-icon">📝</div>
          <span>Pedido feito</span>
        </div>
        <div class="step-line" :class="{ active: isStepActive('ready') || isStepActive('delivered') }"></div>
        <div class="step" :class="{ active: isStepActive('ready') || isStepActive('delivered') }">
          <div class="step-icon">👨‍🍳</div>
          <span>Em produção</span>
        </div>
        <div class="step-line" :class="{ active: isStepActive('delivered') }"></div>
        <div class="step" :class="{ active: isStepActive('delivered') }">
          <div class="step-icon">✅</div>
          <span>Finalizado</span>
        </div>
        <div class="step-line" :class="{ active: isStepActive('delivered') }"></div>
        <div class="step" :class="{ active: isStepActive('delivered') }">
          <div class="step-icon">🎉</div>
          <span>Entregue</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const currentOrderIndex = ref(0)

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'preparing',
    validator: (value) => ['preparing', 'ready', 'delivered'].includes(value)
  }
})

const emit = defineEmits(['update:orderNumber'])

const totalOrders = computed(() => {
  return cartStore.orderHistory.filter(order => order.status !== 'delivered').length
})

const switchOrder = () => {
  currentOrderIndex.value = (currentOrderIndex.value + 1) % totalOrders.value
  const newOrder = cartStore.orderHistory[currentOrderIndex.value]
  if (newOrder) {
    emit('update:orderNumber', newOrder.number)
  }
}

const orderItems = computed(() => {
  const order = cartStore.orderHistory.find(o => o.number === props.orderNumber)
  if (!order) return ''
  
  const items = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')
  return items
})

const statusText = computed(() => {
  const statusMap = {
    preparing: 'Pedido feito',
    ready: 'Em produção',
    delivered: 'Entregue'
  }
  return statusMap[props.status]
})

const statusClass = computed(() => {
  return `status-${props.status}`
})

const isStepActive = (stepStatus) => {
  const statusOrder = ['preparing', 'ready', 'delivered']
  const currentIndex = statusOrder.indexOf(props.status)
  const stepIndex = statusOrder.indexOf(stepStatus)
  return currentIndex >= stepIndex
}

// Observa mudanças no status para forçar a reatividade
watch(() => props.status, (newStatus) => {
  console.log('Status atualizado:', newStatus)
  if (newStatus === 'delivered') {
    // Remove o pedido da lista após 2 segundos
    setTimeout(() => {
      emit('update:orderNumber', null)
    }, 2000)
  }
})
</script>

<style scoped>
.status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
  color: white;
  padding: 0.5rem;
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

.status-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.order-number {
  font-weight: bold;
  font-size: 1rem;
}

.order-switch {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 1rem;
  color: white;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.order-switch:hover {
  background: rgba(255, 255, 255, 0.2);
}

.order-count {
  font-size: 0.9rem;
}

.switch-icon {
  font-size: 1.2rem;
}

.order-items {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

.status-preparing {
  background: #f39c12;
}

.status-ready {
  background: #27ae60;
}

.status-delivered {
  background: #3498db;
}

.status-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 2rem;
  margin-bottom: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 1;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.step.active {
  opacity: 1;
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.step.active .step-icon {
  background: #27ae60;
  transform: scale(1.1);
}

.step span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.step.active span {
  color: white;
  font-weight: bold;
}

.step-line {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 1rem;
  position: relative;
  overflow: hidden;
}

.step-line.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #27ae60;
  transition: width 0.5s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style> 