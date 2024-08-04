<template>
  <div class="products">
    <div class="products_head">
      <h3>Products / {{ products.length }}</h3>
      <CustomInput class="products_head_search" v-model="type" placeholder="Type" />
      <CustomInput
        class="products_head_search"
        v-model="specification"
        placeholder="Specification"
      />
    </div>
    <div v-if="products" class="products_list">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
    <AddOrderModal v-if="showModal" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'
import AddOrderModal from '@/components/UI/Modal/AddOrderModal.vue'

export default {
  name: 'Products',
  components: {
    ProductItem: defineAsyncComponent(() => import('@/components/ProductItem/ProductItem.vue')),
    AddOrderModal
  },
  data() {
    return {
      type: '',
      specification: '',
      showModal: true
    }
  },
  computed: {
    ...mapState('products', ['loading', 'products'])
  },
  mounted() {
    this.$store.dispatch('products/getProducts')
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.products {
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: auto;
}

.products_head {
  margin-bottom: 30px;
}
</style>
