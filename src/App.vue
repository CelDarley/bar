<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/menu" class="nav-link">Cardápio</router-link>
      <router-link to="/calls" class="nav-link">Chamadas Clientes</router-link>
      <router-link to="/kitchen" class="nav-link">Cozinha</router-link>
      <router-link to="/settings" class="nav-link">Configurações</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #34495e;
}

.router-link-active {
  background-color: #34495e;
}
</style>
