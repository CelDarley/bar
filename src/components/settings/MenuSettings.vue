<template>
  <div class="menu-settings">
    <h1>Gestão de Cardápio</h1>

    <div class="menu-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'categories' }"
        @click="activeTab = 'categories'"
      >
        Categorias
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'items' }"
        @click="activeTab = 'items'"
      >
        Itens
      </button>
    </div>

    <!-- Seção de Categorias -->
    <div v-if="activeTab === 'categories'" class="categories-section">
      <div class="section-header">
        <h2>Categorias de Itens</h2>
        <button class="add-btn" @click="showAddCategoryModal = true">
          + Nova Categoria
        </button>
      </div>

      <div class="categories-list">
        <div v-for="category in categories" :key="category.id" class="category-item">
          <div class="category-info">
            <span class="category-name">{{ category.name }}</span>
            <span class="category-status" :class="{ active: category.active }">
              {{ category.active ? 'Ativo' : 'Inativo' }}
            </span>
          </div>
          <div class="category-actions">
            <button class="edit-btn" @click="editCategory(category)">✏️</button>
            <button class="delete-btn" @click="deleteCategory(category)">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Itens -->
    <div v-if="activeTab === 'items'" class="items-section">
      <div class="section-header">
        <h2>Cadastro de Itens</h2>
        <button class="add-btn" @click="showAddItemModal = true">
          + Novo Item
        </button>
      </div>

      <div class="items-list">
        <div v-for="item in items" :key="item.id" class="item-card">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-category">{{ item.category }}</p>
            <p class="item-price">R$ {{ item.price.toFixed(2) }}</p>
            <div class="item-components">
              <span v-for="(component, index) in item.components" :key="index">
                {{ component }}
              </span>
            </div>
            <div v-if="item.optionalItems && item.optionalItems.length > 0" class="item-optional">
              <p class="optional-title">Itens Opcionais:</p>
              <div class="item-components">
                <span v-for="(optional, index) in item.optionalItems" :key="index" class="optional-item">
                  {{ optional }}
                </span>
              </div>
            </div>
          </div>
          <div class="item-actions">
            <button class="edit-btn" @click="editItem(item)">✏️</button>
            <button class="delete-btn" @click="deleteItem(item)">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Categoria -->
    <div v-if="showAddCategoryModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingCategory ? 'Editar Categoria' : 'Nova Categoria' }}</h3>
        <form @submit.prevent="saveCategory">
          <div class="form-group">
            <label for="categoryName">Nome da Categoria</label>
            <input 
              type="text" 
              id="categoryName" 
              v-model="categoryForm.name" 
              required
            >
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="categoryForm.active"
              >
              Ativo
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeCategoryModal">Cancelar</button>
            <button type="submit" class="save-btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Item -->
    <div v-if="showAddItemModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingItem ? 'Editar Item' : 'Novo Item' }}</h3>
        <form @submit.prevent="saveItem">
          <div class="form-group">
            <label for="itemName">Nome do Item</label>
            <input 
              type="text" 
              id="itemName" 
              v-model="itemForm.name" 
              required
            >
          </div>

          <div class="form-group">
            <label for="itemCategory">Categoria</label>
            <select 
              id="itemCategory" 
              v-model="itemForm.category" 
              required
            >
              <option value="">Selecione uma categoria</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="itemPrice">Preço</label>
            <input 
              type="number" 
              id="itemPrice" 
              v-model="itemForm.price" 
              step="0.01" 
              min="0" 
              required
            >
          </div>

          <div class="form-group">
            <label>Componentes</label>
            <div class="components-list">
              <div v-for="(component, index) in itemForm.components" :key="index" class="component-item">
                <input 
                  type="text" 
                  v-model="itemForm.components[index]" 
                  placeholder="Nome do componente"
                  required
                >
                <button 
                  type="button" 
                  class="remove-btn" 
                  @click="removeComponent(index)"
                >
                  🗑️
                </button>
              </div>
            </div>
            <button 
              type="button" 
              class="add-component-btn" 
              @click="addComponent"
            >
              + Adicionar Componente
            </button>
          </div>

          <div class="form-group">
            <label>Itens Opcionais</label>
            <div class="components-list">
              <div v-for="(item, index) in itemForm.optionalItems" :key="index" class="component-item">
                <input 
                  type="text" 
                  v-model="itemForm.optionalItems[index]" 
                  placeholder="Nome do item opcional"
                >
                <button 
                  type="button" 
                  class="remove-btn" 
                  @click="removeOptionalItem(index)"
                >
                  🗑️
                </button>
              </div>
            </div>
            <button 
              type="button" 
              class="add-component-btn" 
              @click="addOptionalItem"
            >
              + Adicionar Item Opcional
            </button>
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeItemModal">Cancelar</button>
            <button type="submit" class="save-btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('categories')
const showAddCategoryModal = ref(false)
const showAddItemModal = ref(false)
const editingCategory = ref(null)
const editingItem = ref(null)

// Formulário de categoria
const categoryForm = ref({
  name: '',
  active: true
})

// Formulário de item
const itemForm = ref({
  name: '',
  category: '',
  price: 0,
  components: [''],
  optionalItems: ['']
})

// Dados simulados
const categories = ref([
  { id: 1, name: 'Bebidas', active: true },
  { id: 2, name: 'Pratos Principais', active: true },
  { id: 3, name: 'Sobremesas', active: false }
])

const items = ref([
  { id: 1, name: 'Coca-Cola', category: 'Bebidas', price: 6.00 },
  { id: 2, name: 'X-Burger', category: 'Pratos Principais', price: 25.00 },
  { id: 3, name: 'Pudim', category: 'Sobremesas', price: 12.00 }
])

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = { ...category }
  showAddCategoryModal.value = true
}

const deleteCategory = (category) => {
  if (confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
    categories.value = categories.value.filter(c => c.id !== category.id)
  }
}

const saveCategory = () => {
  if (editingCategory.value) {
    // Atualizar categoria existente
    const index = categories.value.findIndex(c => c.id === editingCategory.value.id)
    categories.value[index] = { ...editingCategory.value, ...categoryForm.value }
  } else {
    // Adicionar nova categoria
    const newCategory = {
      id: Date.now(),
      ...categoryForm.value
    }
    categories.value.push(newCategory)
  }
  closeCategoryModal()
}

const closeCategoryModal = () => {
  showAddCategoryModal.value = false
  editingCategory.value = null
  categoryForm.value = { name: '', active: true }
}

const addComponent = () => {
  itemForm.value.components.push('')
}

const removeComponent = (index) => {
  itemForm.value.components.splice(index, 1)
}

const addOptionalItem = () => {
  itemForm.value.optionalItems.push('')
}

const removeOptionalItem = (index) => {
  itemForm.value.optionalItems.splice(index, 1)
}

const editItem = (item) => {
  editingItem.value = item
  itemForm.value = {
    name: item.name,
    category: item.category,
    price: item.price,
    components: item.components || [''],
    optionalItems: item.optionalItems || ['']
  }
  showAddItemModal.value = true
}

const saveItem = () => {
  // Filtrar componentes vazios
  const filteredComponents = itemForm.value.components.filter(c => c.trim() !== '')
  const filteredOptionalItems = itemForm.value.optionalItems.filter(i => i.trim() !== '')
  
  if (editingItem.value) {
    // Atualizar item existente
    const index = items.value.findIndex(i => i.id === editingItem.value.id)
    items.value[index] = {
      ...editingItem.value,
      ...itemForm.value,
      components: filteredComponents,
      optionalItems: filteredOptionalItems
    }
  } else {
    // Adicionar novo item
    const newItem = {
      id: Date.now(),
      ...itemForm.value,
      components: filteredComponents,
      optionalItems: filteredOptionalItems
    }
    items.value.push(newItem)
  }
  closeItemModal()
}

const closeItemModal = () => {
  showAddItemModal.value = false
  editingItem.value = null
  itemForm.value = {
    name: '',
    category: '',
    price: 0,
    components: [''],
    optionalItems: ['']
  }
}

const deleteItem = (item) => {
  if (confirm(`Tem certeza que deseja excluir o item "${item.name}"?`)) {
    items.value = items.value.filter(i => i.id !== item.id)
  }
}
</script>

<style scoped>
.menu-settings {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.menu-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background-color: #f5f5f5;
  color: #666;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background-color: #2c3e50;
  color: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #2c3e50;
  margin: 0;
}

.categories-list,
.items-list {
  display: grid;
  gap: 1rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-name {
  font-weight: bold;
  color: #2c3e50;
}

.category-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  background-color: #e74c3c;
  color: white;
}

.category-status.active {
  background-color: #27ae60;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-info h3 {
  margin: 0;
  color: #2c3e50;
}

.item-category {
  color: #666;
  margin: 0.25rem 0;
}

.item-price {
  color: #2c3e50;
  font-weight: bold;
  margin: 0;
}

.category-actions,
.item-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: transform 0.2s;
}

.edit-btn:hover,
.delete-btn:hover {
  transform: scale(1.1);
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #219a52;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input[type="text"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn,
.save-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.save-btn {
  background-color: #27ae60;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

.save-btn:hover {
  background-color: #219a52;
}

select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
}

.components-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.component-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.component-item input {
  flex: 1;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.1);
}

.add-component-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border: 1px dashed #ddd;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-component-btn:hover {
  background-color: #eee;
  border-color: #ccc;
}

.item-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-components {
  font-size: 0.9rem;
  color: #666;
}

.item-components span {
  background-color: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.item-optional {
  margin-top: 0.5rem;
}

.optional-title {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.25rem 0;
}

.optional-item {
  background-color: #e8f5e9 !important;
  border: 1px dashed #4caf50;
}

@media (max-width: 768px) {
  .menu-settings {
    padding: 1rem;
  }
  
  .category-info,
  .item-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 