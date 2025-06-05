<template>
  <div class="menu-container">
    <div class="menu">
      <h1>Nosso Cardápio</h1>
      
      <div v-for="category in categories" :key="category.id" class="category-section">
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="dishes-grid">
          <div v-for="dish in category.dishes" :key="dish.id" class="dish-card" @click="openModal(dish)">
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
    </div>

    <Cart />

    <AddToCartModal
      :show="showModal"
      :dish="selectedDish"
      @close="closeModal"
    />

    <button class="call-waiter-btn" @click="callWaiter">
      <span class="waiter-icon">🛎️</span>
      <span class="waiter-text">Chamar Garçom</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cart from './Cart.vue'
import AddToCartModal from './AddToCartModal.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const showModal = ref(false)
const selectedDish = ref(null)

const categories = [
  {
    id: 1,
    name: 'Entradas',
    dishes: [
      {
        id: 1,
        name: 'Salada Caesar',
        description: 'Alface romana, croutons, parmesão e molho caesar',
        price: 32.90,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 2,
        name: 'Bruschetta',
        description: 'Pão italiano torrado com tomate, manjericão e azeite',
        price: 28.50,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: 2,
    name: 'Pratos Principais',
    dishes: [
      {
        id: 3,
        name: 'Filé à Parmegiana',
        description: 'Filé empanado com molho de tomate e queijo derretido',
        price: 45.90,
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 4,
        name: 'Risoto de Cogumelos',
        description: 'Risoto cremoso com mix de cogumelos frescos',
        price: 38.50,
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 5,
        name: 'Pasta Carbonara',
        description: 'Massa fresca com molho cremoso, bacon e queijo',
        price: 42.90,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: 3,
    name: 'Sobremesas',
    dishes: [
      {
        id: 6,
        name: 'Tiramisù',
        description: 'Sobremesa italiana com café, mascarpone e cacau',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 7,
        name: 'Cheesecake',
        description: 'Torta de queijo com calda de frutas vermelhas',
        price: 22.50,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: 4,
    name: 'Bebidas',
    dishes: [
      {
        id: 8,
        name: 'Caipirinha',
        description: 'Cachaça, limão, açúcar e gelo',
        price: 18.90,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 9,
        name: 'Vinho Tinto',
        description: 'Taça de vinho tinto seco',
        price: 16.90,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 10,
        name: 'Água Mineral',
        description: 'Garrafa de 500ml',
        price: 6.90,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60'
      }
    ]
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

const callWaiter = () => {
  // Adiciona uma chamada ao histórico de chamadas
  cartStore.addCustomerCall({
    type: 'waiter',
    table: 'Mesa 1', // Em um sistema real, isso viria do contexto da mesa
    status: 'pending',
    createdAt: new Date()
  })
  
  // Mostra uma mensagem de confirmação
  alert('Garçom chamado! Ele chegará em breve.')
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

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
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
  height: 200px;
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

.call-waiter-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.call-waiter-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.waiter-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .call-waiter-btn {
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .waiter-icon {
    font-size: 1.2rem;
  }
}
</style> 