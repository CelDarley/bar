<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Adicionar ao Pedido</h2>
      <div class="dish-info">
        <img :src="dish.image" :alt="dish.name">
        <h3>{{ dish.name }}</h3>
        <p class="price">R$ {{ dish.price.toFixed(2) }}</p>
      </div>
      
      <div class="form-group">
        <label for="quantity">Quantidade:</label>
        <div class="quantity-control">
          <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <input type="number" id="quantity" v-model.number="quantity" min="1">
          <button @click="increaseQuantity">+</button>
        </div>
      </div>

      <div class="form-group">
        <label for="notes">Observações:</label>
        <textarea id="notes" v-model="notes" placeholder="Ex: Sem cebola, bem passado..."></textarea>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancelar</button>
        <button class="add-btn" @click="addToCart">Adicionar ao Pedido</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  show: Boolean,
  dish: Object
})

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const quantity = ref(1)
const notes = ref('')

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  cartStore.addItem({
    ...props.dish,
    quantity: quantity.value,
    notes: notes.value
  })
  close()
}

const close = () => {
  quantity.value = 1
  notes.value = ''
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.dish-info {
  text-align: center;
  margin-bottom: 2rem;
}

.dish-info img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.dish-info h3 {
  margin: 0.5rem 0;
  color: #333;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-control button {
  width: 40px;
  height: 40px;
  border: none;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 1.25rem;
  cursor: pointer;
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="number"] {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.add-btn {
  background: #4CAF50;
  color: white;
}

.add-btn:hover {
  background: #45a049;
}
</style> 