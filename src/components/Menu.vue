<template>
  <div class="menu-container">
    <div class="menu">
      <h1>Nosso Cardápio</h1>
      <div class="dishes-grid">
        <div v-for="dish in dishes" :key="dish.id" class="dish-card" @click="openModal(dish)">
          <div class="image-container">
            <img :src="dish.image" :alt="dish.name">
          </div>
          <div class="dish-info">
            <h2>{{ dish.name }}</h2>
            <p>{{ dish.description }}</p>
            <span class="price">R$ {{ dish.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <Cart />

    <AddToCartModal
      :show="showModal"
      :dish="selectedDish"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cart from './Cart.vue'
import AddToCartModal from './AddToCartModal.vue'

const showModal = ref(false)
const selectedDish = ref(null)

const dishes = [
  {
    id: 1,
    name: 'Filé à Parmegiana',
    description: 'Filé empanado com molho de tomate e queijo derretido',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Risoto de Cogumelos',
    description: 'Risoto cremoso com mix de cogumelos frescos',
    price: 38.50,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Salada Caesar',
    description: 'Alface romana, croutons, parmesão e molho caesar',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Pasta Carbonara',
    description: 'Massa fresca com molho cremoso, bacon e queijo',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60'
  }
]

const openModal = (dish) => {
  selectedDish.value = dish
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedDish.value = null
}
</script>

<style scoped>
.menu-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.menu {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2.5rem;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 1rem;
}

.dish-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.dish-card:hover {
  transform: translateY(-5px);
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.dish-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.dish-card:hover img {
  transform: scale(1.05);
}

.dish-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.dish-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.dish-info p {
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: auto;
}

@media (max-width: 1024px) {
  .menu-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dishes-grid {
    grid-template-columns: 1fr;
  }
  
  .menu {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style> 