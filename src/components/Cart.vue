<template>
  <div class="page-container">
    <OrderStatusBar
      v-if="cartStore.currentOrder"
      :show="true"
      :order-number="cartStore.currentOrder.number"
      :status="cartStore.currentOrder.status"
      @update:order-number="handleOrderChange"
    />
    
    <main class="main-content">
      <h1 class="page-title">Seu Pedido</h1>
      
      <div class="cart">
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <p>Seu pedido está vazio</p>
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
            <div class="cart-actions">
              <button class="checkout-btn" @click="handleCheckout">
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>

        <div class="cart-actions-container">
          <button class="close-account-btn" @click="showCheckoutModal = true">
            Fechar Conta
          </button>
        </div>
      </div>
    </main>

    <CheckoutModal
      :show="showCheckoutModal"
      @close="showCheckoutModal = false"
    />

    <PaymentOptions
      :show="showPaymentOptions"
      @close="showPaymentOptions = false"
      @select="handlePayment"
    />

    <CardReader
      :show="showCardReader"
      @close="handleCardReaderClose"
      @card-read="handleCardRead"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import OrderStatusBar from './OrderStatusBar.vue'
import CheckoutModal from './CheckoutModal.vue'
import PaymentOptions from './PaymentOptions.vue'
import CardReader from './CardReader.vue'

const router = useRouter()
const cartStore = useCartStore()
const showCheckoutModal = ref(false)
const showPaymentOptions = ref(false)
const showCardReader = ref(false)

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

const handleCheckout = () => {
  const orderNumber = cartStore.checkout()
  if (orderNumber) {
    // Simular atualizações de status (em um sistema real, isso viria do backend)
    setTimeout(() => {
      cartStore.updateOrderStatus('ready', orderNumber)
    }, 5000)
    
    setTimeout(() => {
      cartStore.updateOrderStatus('delivered', orderNumber)
    }, 10000)
  }
}

const handleCardReaderClose = () => {
  showCardReader.value = false
}

const handleCardRead = (cardData) => {
  showCardReader.value = false
  const orderNumber = cartStore.checkout()
  if (orderNumber) {
    // Simular atualizações de status (em um sistema real, isso viria do backend)
    setTimeout(() => {
      cartStore.updateOrderStatus('ready', orderNumber)
    }, 5000)
    
    setTimeout(() => {
      cartStore.updateOrderStatus('delivered', orderNumber)
    }, 10000)
  }
}

const handlePayment = (method) => {
  if (method.option === 'card') {
    showCardReader.value = true
    return
  }
  
  const orderNumber = cartStore.checkout()
  if (orderNumber) {
    // Simular atualizações de status (em um sistema real, isso viria do backend)
    setTimeout(() => {
      cartStore.updateOrderStatus('ready', orderNumber)
    }, 5000)
    
    setTimeout(() => {
      cartStore.updateOrderStatus('delivered', orderNumber)
    }, 10000)
  }
  showPaymentOptions.value = false
}

const handleOrderChange = (newOrderNumber) => {
  if (newOrderNumber === null) {
    cartStore.currentOrder = null
    return
  }
  
  const order = cartStore.orderHistory.find(o => o.number === newOrderNumber)
  if (order) {
    cartStore.currentOrder = { ...order }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.main-content {
  padding: 2rem;
  padding-top: v-bind('cartStore.currentOrder ? "8rem" : "2rem"');
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-cart {
  text-align: center;
  padding: 2rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 1rem;
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

.cart-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

.cart-actions-container {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #dee2e6;
  text-align: center;
}

.close-account-btn {
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.close-account-btn:hover {
  background-color: #34495e;
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