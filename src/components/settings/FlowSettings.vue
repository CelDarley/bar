<template>
  <div class="flow-settings">
    <h1>Configuração de Fluxos</h1>
    
    <div class="settings-section">
      <div class="setting-card">
        <div class="setting-header">
          <h2>Leitura do Cartão</h2>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              id="cardReadingToggle" 
              v-model="settings.cardReadingPerOrder"
            >
            <label for="cardReadingToggle"></label>
          </div>
        </div>
        
        <p class="setting-description">
          {{ settings.cardReadingPerOrder 
            ? 'O sistema irá solicitar a leitura do cartão ao final de cada pedido para individualizar a conta.' 
            : 'O sistema irá solicitar a leitura do cartão apenas no momento do pagamento.' 
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  cardReadingPerOrder: false
})
</script>

<style scoped>
.flow-settings {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.settings-section {
  display: grid;
  gap: 1.5rem;
}

.setting-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.setting-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.25rem;
}

.setting-description {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* Toggle Switch Styles */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background-color: #27ae60;
}

.toggle-switch input:checked + label:before {
  transform: translateX(26px);
}

@media (max-width: 768px) {
  .flow-settings {
    padding: 1rem;
  }
  
  .setting-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .toggle-switch {
    align-self: flex-end;
  }
}
</style> 