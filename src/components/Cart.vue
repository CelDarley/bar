<template>
  <div class="cart-container">
    <h2>Seu Pedido</h2>
    <div class="cart">
      <h1>Seu Pedido</h1>
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Seu pedido está vazio</p>
        <router-link to="/menu" class="menu-link">Ver Menu</router-link>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p v-if="item.notes" class="notes">{{ item.notes }}</p>
          </div>
          
          <div class="item-quantity">
            <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
          </div>
          
          <div class="item-price">
            R$ {{ (item.price * item.quantity).toFixed(2) }}
          </div>
          
          <button @click="removeItem(item)" class="remove-btn">
            Remover
          </button>
        </div>

        <div class="cart-total">
          <h2>Total: R$ {{ cartStore.total.toFixed(2) }}</h2>
          <button class="checkout-btn" @click="checkout">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const increaseQuantity = (item) => {
  cartStore.addItem({
    ...item,
    quantity: 1
  })
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.removeItem(item)
  }
}

const removeItem = (item) => {
  cartStore.removeItem(item)
}

const checkout = () => {
  // Aqui você pode implementar a lógica de finalização do pedido
  alert('Pedido finalizado com sucesso!')
  cartStore.clearCart()
}
</script>

<style scoped>
.cart-container {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.cart {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 1rem;
}

.menu-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.menu-link:hover {
  background-color: #34495e;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.item-info h3 {
  margin: 0;
  color: #333;
}

.notes {
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: none;
  background-color: #e9ecef;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quantity-btn:hover {
  background-color: #dee2e6;
}

.item-price {
  font-weight: bold;
  color: #2c3e50;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c82333;
}

.cart-total {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #dee2e6;
  text-align: right;
}

.cart-total h2 {
  margin-bottom: 1rem;
  color: #333;
}

.checkout-btn {
  padding: 1rem 2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .item-quantity {
    justify-content: center;
  }

  .remove-btn {
    width: 100%;
  }
}
</style> 