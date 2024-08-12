<template>
  <div class="order-info">
    <div
      class="order-info_close"
      @click="resetOrder"
    >
      <img src="../../assets/icons/cross.svg">
    </div>
    <div class="order-info_head">
      <h5>{{ order.title }}</h5>
      <div
        class="order-info_add-product"
        @click="openModal"
      >
        <div class="order-info_add-product_circle">
          <img src="../../assets/icons/white-cross.svg">
        </div>
        <p>{{ $t('orders.orderInfo.addProduct') }}</p>
      </div>
    </div>
    <div class="order-info_product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="order-info_product-list_item"
      >
        <div
          class="order-info_product-list_item_dot"
          :class="{ repair: product.isNew === 0 }"
        />
        <img
          class="order-info_item_photo"
          src="../../assets/icons/monitor.jpg"
        >
        <div>
          <RedirectLink
            class="order-info_product_title"
            :to="`products/${product.id}`"
            :text="product.title"
          />
          <p class="order-info_product_serial-number">
            {{ product.serialNumber }}
          </p>
        </div>
        <div>
          <p
            class="order-info_product-list_item_status"
            :class="{ repair: product.isNew === 0 }"
          >
            {{
              product.isNew
                ? $t('orders.orderInfo.status.available')
                : $t('orders.orderInfo.status.repair')
            }}
          </p>
        </div>
        <div
          class="orders_list_item_delete"
          @click="openDeleteModal(product)"
        >
          <img src="../../assets/icons/trash.svg">
        </div>
      </div>
      <div
        v-if="loading"
        class="products-loader"
      >
        <Spinner />
      </div>
      <div
        v-if="!loading && products.length === 0"
        class="empty-products"
      >
        <h3>{{ $t('products.noProducts') }}</h3>
      </div>
    </div>
    <YesNoModal
      v-if="selectedProduct"
      :custom-class="'order-info_product_title'"
      :item="selectedProduct"
      :visibility="showDeleteModal"
      :loading="loading"
      @delete-product="deleteProduct"
      @close-modal="closeDeleteModal"
    >
      <div class="modal-item">
        <div
          class="order-info_product-list_item_dot"
          :class="{ repair: selectedProduct.isNew === 0 }"
        />
        <img
          class="order-info_item_photo"
          src="../../assets/icons/monitor.jpg"
        >
        <div>
          <RedirectLink
            class="order-info_product_title"
            :to="`products/${selectedProduct.id}`"
            :text="selectedProduct.title"
          />
          <p class="order-info_product_serial-number">
            {{ selectedProduct.serialNumber }}
          </p>
        </div>
        <div>
          <p
            class="order-info_product-list_item_status"
            :class="{ repair: selectedProduct.isNew === 0 }"
          >
            {{
              selectedProduct.isNew
                ? $t('orders.orderInfo.status.available')
                : $t('orders.orderInfo.status.repair')
            }}
          </p>
        </div>
      </div>
    </YesNoModal>
    <AddProductModal
      :visibility="showModal"
      :loading="loading"
      variant="success"
      :order-id="order.id"
      @close-modal="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, type PropType } from 'vue'
import { mapState } from 'vuex'
import type { Order, Product } from '@/store/types'

export default {
  name: 'OrderInfo',
  components: {
    AddProductModal: defineAsyncComponent(
      () => import('@/components/UI/Modal/AddProductModal.vue'),
    ),
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue'),
    ),
    YesNoModal: defineAsyncComponent(() => import('@/components/UI/Modal/YesNoModal.vue')),
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true,
    },
  },
  emits: ['reset-order'],
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedProduct: null as Product | null,
    }
  },
  computed: {
    ...mapState('products', ['loading', 'products']),
  },
  watch: {
    order(newOrder) {
      if (newOrder.id) {
        this.$store.dispatch('products/getProductsByOrderId', newOrder.id)
      }
    },
  },
  mounted() {
    this.$store.dispatch('products/getProductsByOrderId', this.order.id)
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    openDeleteModal(product: Product) {
      console.log('openDeleteModalopenDeleteModal')
      this.selectedProduct = product
      this.showDeleteModal = true
    },
    closeDeleteModal() {
      this.showDeleteModal = false
      this.selectedProduct = null
    },
    resetOrder() {
      this.$emit('reset-order')
    },
    async deleteProduct(product: Product) {
      try {
        await this.$store.dispatch('products/deleteProduct', product.id)
        this.closeDeleteModal()
      }
      catch (e) {
        console.log(e)
      }
      await this.$store.dispatch('products/getProducts')
      await this.$store.dispatch('orders/getOrders')
    },
  },
}
</script>

<style scoped>
.order-info {
  width: 100%;
  background-color: #fff;
  border: 1px solid #e3e8ea;
  border-radius: 7px;
  position: relative;
  padding-bottom: 10px;
  height: fit-content;
  min-height: 200px;
}

.order-info_head {
  padding: 20px;
  padding-bottom: 10px;
  overflow-wrap: anywhere;
}

.order-info_add-product {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  cursor: pointer;
  color: var(--primary-green-color);
}

.order-info_add-product_circle {
  height: 15px;
  width: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--primary-green-color);
}

.order-info_add-product p {
  line-height: 12px;
  font-size: 11px;
  color: var(--primary-green-color);
}

.order-info_item_photo {
  max-height: 30px;
  width: auto;
  margin: auto;
}

.order-info_product_title {
  display: block;
  text-decoration: underline;
  text-decoration-color: rgb(104, 104, 104);
  color: #3f3f3f;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 600;
}

.order-info_product_serial-number {
  font-weight: 600;
  font-size: 8px;
  opacity: 0.6;
}

.empty-products,
.products-loader {
  display: flex;
  justify-content: center;
}

.order-info_product-list_item {
  background-color: rgb(255, 255, 255);
  height: 50px;
  border: 1px solid #e3e8ea;
  display: grid;
  grid-template-columns: 50px 100px 200px 1fr 30px;
  align-items: center;
  gap: 15px;
}

.order-info_product-list_item_dot {
  height: 10px;
  width: 10px;
  background-color: var(--primary-green-color);
  border-radius: 50%;
  margin: auto;
}

.order-info_product-list_item_dot.repair {
  background-color: #3f3f3f;
}

.order-info_product-list_item_status {
  color: var(--primary-green-color);
  margin: auto;
  width: fit-content;
}

.order-info_product-list_item_status.repair {
  color: #3f3f3f;
}

.order-info_close {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.23);
  width: 25px;
  height: 25px;
  position: absolute;
  right: -10px;
  top: -10px;
  background-color: #fff;
  cursor: pointer;
}

.orders_list_item_delete {
  cursor: pointer;
}

.modal-item {
  width: 100%;
  display: grid;
  grid-template-columns: 50px 100px 150px 1fr;
  gap: 20px;
}
</style>
