<template>
  <div v-if="show" class="status-bar">
    <div class="status-content">
      <div class="order-info">
        <span class="order-number">Pedido #{{ orderNumber }}</span>
        <span class="status" :class="statusClass">{{ statusText }}</span>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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

const statusText = computed(() => {
  const statusMap = {
    preparing: 'Em preparação',
    ready: 'Pronto',
    delivered: 'Entregue'
  }
  return statusMap[props.status]
})

const statusClass = computed(() => {
  return `status-${props.status}`
})

const progressWidth = computed(() => {
  const progressMap = {
    preparing: '33%',
    ready: '66%',
    delivered: '100%'
  }
  return progressMap[props.status]
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

.order-number {
  font-weight: bold;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
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

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #fff;
  transition: width 0.3s ease;
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