<template>
  <div class="calls-container">
    <h1>Chamadas Clientes</h1>
    
    <div class="tables-grid">
      <div v-for="table in tables" :key="table.number" class="table-card" :class="{ 'has-call': table.hasCall }">
        <div class="table-header">
          <h2>Mesa {{ table.number }}</h2>
          <span class="table-status" :class="table.status">
            {{ getStatusText(table.status) }}
          </span>
        </div>
        
        <div class="table-info">
          <div class="info-item">
            <span class="label">Tempo na mesa:</span>
            <span class="value">{{ table.timeAtTable }}</span>
          </div>
          <div class="info-item">
            <span class="label">Último pedido:</span>
            <span class="value">{{ table.lastOrder }}</span>
          </div>
          <div v-if="table.hasCall" class="info-item">
            <span class="label">Tipo de chamada:</span>
            <span class="value call-type" :class="table.callType">
              {{ getCallTypeText(table.callType) }}
            </span>
          </div>
        </div>
        
        <div class="table-actions">
          <button 
            v-if="table.hasCall"
            class="attend-btn"
            :class="table.callType"
            @click="attendCall(table)"
          >
            {{ getActionButtonText(table.callType) }}
          </button>
          <span v-else class="no-calls">
            Sem chamadas
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dados simulados para exemplo
const tables = ref([
  {
    number: 1,
    status: 'occupied',
    timeAtTable: '45 min',
    lastOrder: '15:30',
    hasCall: true,
    callType: 'payment'
  },
  {
    number: 2,
    status: 'occupied',
    timeAtTable: '30 min',
    lastOrder: '15:45',
    hasCall: false
  },
  {
    number: 3,
    status: 'free',
    timeAtTable: '-',
    lastOrder: '-',
    hasCall: false
  },
  {
    number: 4,
    status: 'occupied',
    timeAtTable: '60 min',
    lastOrder: '15:00',
    hasCall: true,
    callType: 'order'
  },
  {
    number: 5,
    status: 'occupied',
    timeAtTable: '20 min',
    lastOrder: '16:00',
    hasCall: false
  },
  {
    number: 6,
    status: 'free',
    timeAtTable: '-',
    lastOrder: '-',
    hasCall: false
  }
])

const getStatusText = (status) => {
  const statusMap = {
    free: 'Livre',
    occupied: 'Ocupada'
  }
  return statusMap[status]
}

const getCallTypeText = (type) => {
  const typeMap = {
    payment: 'Pagamento',
    order: 'Novo Pedido'
  }
  return typeMap[type]
}

const getActionButtonText = (type) => {
  const actionMap = {
    payment: 'Atender com Maquininha',
    order: 'Atender Pedido'
  }
  return actionMap[type]
}

const attendCall = (table) => {
  // Aqui você implementaria a lógica para atender a chamada
  table.hasCall = false
}
</script>

<style scoped>
.calls-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.tables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.table-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.table-card.has-call {
  border: 2px solid #e74c3c;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.table-header h2 {
  color: #2c3e50;
  margin: 0;
}

.table-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.table-status.free {
  background-color: #27ae60;
  color: white;
}

.table-status.occupied {
  background-color: #f39c12;
  color: white;
}

.table-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-weight: bold;
}

.table-actions {
  display: flex;
  justify-content: center;
}

.attend-btn {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.attend-btn:hover {
  background-color: #c0392b;
}

.no-calls {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.call-type {
  font-weight: bold;
}

.call-type.payment {
  color: #e74c3c;
}

.call-type.order {
  color: #3498db;
}

.attend-btn.payment {
  background-color: #e74c3c;
}

.attend-btn.order {
  background-color: #3498db;
}

.attend-btn.payment:hover {
  background-color: #c0392b;
}

.attend-btn.order:hover {
  background-color: #2980b9;
}
</style> 