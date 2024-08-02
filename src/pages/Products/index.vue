<template>
  <div class="products">
    <div class="products_head">
      <h3>Products / {{ products.length }}</h3>
      <CustomInput class="products_head_search" v-model="type" placeholder="Type" />
      <CustomInput class="products_head_search" v-model="specification" placeholder="Specification" />
    </div>
    <div class="products_list">
      <ProductItem v-if="products" v-for="(product) in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import CustomInput from '@/components/UI/CustomInput/CustomInput.vue';
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'Products',
  components: {
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
    ProductItem: defineAsyncComponent(() => import('@/components/ProductItem/ProductItem.vue'))
  },
  data() {
    return {
      type: '',
      specification: ''
    }
  },
  computed: {
    ...mapState('products', ['loading', 'products'])
  },
  mounted() {
    this.$store.dispatch('products/getProducts')
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
