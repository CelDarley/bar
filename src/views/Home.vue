<template>
  <div class="home">
    <div class="hero">
      <h1>Bem-vindo ao Nosso Bar</h1>
      <p>Descubra os melhores sabores e momentos</p>
      <router-link to="/menu" class="cta-button">
        Ver Cardápio
      </router-link>
    </div>

    <div class="features">
      <div class="feature">
        <h2>Cardápio Variado</h2>
        <p>Oferecemos uma ampla seleção de pratos e bebidas para todos os gostos</p>
      </div>

      <div class="feature">
        <h2>Ambiente Acolhedor</h2>
        <p>Um espaço confortável e agradável para você e seus amigos</p>
      </div>

      <div class="feature">
        <h2>Atendimento de Qualidade</h2>
        <p>Nossa equipe está pronta para proporcionar a melhor experiência</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente Home
</script>

<style scoped>
.home {
  min-height: calc(100vh - 64px);
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&auto=format&fit=crop&q=60');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #34495e;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature p {
  color: #666;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .features {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
}
</style> 