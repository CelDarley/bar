import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    currentOrder: null,
    orderHistory: []
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    
    totalSpent: (state) => {
      return state.orderHistory.reduce((total, order) => {
        return total + order.total
      }, 0)
    }
  },

  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id && i.notes === item.notes)
      
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push({ ...item })
      }
    },

    removeItem(item) {
      const index = this.items.findIndex(i => i.id === item.id && i.notes === item.notes)
      if (index > -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--
        } else {
          this.items.splice(index, 1)
        }
      }
    },

    clearCart() {
      this.items = []
    },

    checkout() {
      if (this.items.length === 0) return null

      const orderNumber = Math.floor(Math.random() * 1000) + 1
      const order = {
        number: orderNumber,
        items: [...this.items],
        total: this.total,
        status: 'preparing',
        createdAt: new Date()
      }
      
      // Primeiro limpa o carrinho
      this.clearCart()
      
      // Depois atualiza o pedido atual e o histórico
      this.currentOrder = { ...order }
      this.orderHistory.push({ ...order })
      
      return orderNumber
    },

    updateOrderStatus(status, orderNumber) {
      // Atualiza o pedido atual se o número corresponder
      if (this.currentOrder && this.currentOrder.number === orderNumber) {
        this.currentOrder = { ...this.currentOrder, status }
      }
      
      // Atualiza o pedido no histórico
      const orderInHistory = this.orderHistory.find(o => o.number === orderNumber)
      if (orderInHistory) {
        const index = this.orderHistory.indexOf(orderInHistory)
        this.orderHistory[index] = { ...orderInHistory, status }
      }
    },

    clearOrderHistory() {
      this.orderHistory = []
      this.currentOrder = null
    }
  }
}) 