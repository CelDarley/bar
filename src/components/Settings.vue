<template>
  <div class="settings-container">
    <h1>Configurações</h1>
    
    <div class="settings-grid">
      <router-link to="/settings/themes" class="settings-card">
        <div class="card-icon">🎨</div>
        <h2>Configuração de Temas</h2>
        <p>Personalize as cores e estilos do sistema</p>
      </router-link>

      <router-link to="/settings/flows" class="settings-card">
        <div class="card-icon">🔄</div>
        <h2>Configuração de Fluxos</h2>
        <p>Gerencie os fluxos de atendimento e pedidos</p>
      </router-link>

      <router-link to="/settings/tables" class="settings-card">
        <div class="card-icon">🪑</div>
        <h2>Configurar Mesas</h2>
        <p>Configure o layout e status das mesas</p>
      </router-link>

      <router-link to="/settings/payments" class="settings-card">
        <div class="card-icon">💳</div>
        <h2>Configuração de Pagamentos</h2>
        <p>Gerencie métodos de pagamento e taxas</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Componente de configurações
</script>

<style scoped>
.settings-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.settings-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.settings-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.settings-card h2 {
  color: #2c3e50;
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

.settings-card p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .settings-container {
    padding: 1rem;
  }
}
</style> 