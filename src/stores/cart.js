import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
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
        this.items.splice(index, 1)
      }
    },

    clearCart() {
      this.items = []
    }
  }
}) 