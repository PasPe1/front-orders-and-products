<template>
  <div class="products">
    <div class="products_head">
      <h3 class="products_head_title">{{ $t('products.products') }} / {{ products.length }}</h3>
      <div class="products_head_filter">
        <CustomSelectInput
          class="products_head_filter_input"
          v-model="type"
          type="select"
          :placeholder="$t('products.type')"
        />
        <CustomSelectInput
          class="products_head_filter_input"
          v-model="specification"
          :placeholder="$t('products.specification')"
          type="select"
        />
      </div>
    </div>
    <div v-if="products" class="products_list">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'Products',
  components: {
    ProductItem: defineAsyncComponent(() => import('@/components/ProductItem/ProductItem.vue')),
    CustomSelectInput: defineAsyncComponent(
      () => import('@/components/UI/CustomSelectInput/CustomSelectInput.vue')
    )
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
  display: flex;
}

.products_head_title {
  padding: 0px;
  margin-bottom: 0px;
}

.products_head_filter {
  display: flex;
}
</style>
