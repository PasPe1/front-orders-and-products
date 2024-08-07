<template>
  <div class="products">
    <div class="products_head">
      <h3 class="products_head_title">
        {{ $t('products.products') }} / {{ products.length }}
      </h3>
      <div class="products_head_filter">
        <CustomSelectInput
          v-model="type"
          class="products_head_filter_input"
          type="select"
          :placeholder="$t('products.type')"
        />
        <CustomSelectInput
          v-model="specification"
          class="products_head_filter_input"
          :placeholder="$t('products.specification')"
          type="select"
        />
      </div>
    </div>
    <div
      v-if="products"
      class="products_list"
    >
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})

export default {
  name: 'Products',
  components: {
    ProductItem: defineAsyncComponent(() => import('@/components/ProductItem/ProductItem.vue')),
    CustomSelectInput: defineAsyncComponent(() => import('@/components/UI/CustomSelectInput/CustomSelectInput.vue')),
  },
  setup() {
    const store = useStore()

    const type = ''
    const specification = ''
    const showModal = ref(true)

    const products = computed(() => store.state.products.products)
    const loading = computed(() => store.state.products.loading)

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    onMounted(() => {
      store.dispatch('products/getProducts')
    })

    return {
      type,
      specification,
      showModal,
      products,
      loading,
      openModal,
      closeModal,
    }
  },
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
