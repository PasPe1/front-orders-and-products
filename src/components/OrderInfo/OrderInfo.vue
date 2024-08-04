<template>
  <div class="order-info">
    <div class="order-info_close" @click="resetOrder">
      <img src="../../assets/icons/cross.svg" />
    </div>
    <div class="order-info_head">
      <h5>{{ order.title }}</h5>
      <div class="order-info_add-product" @click="openModal">
        <div class="order-info_add-product_circle">
          <img src="../../assets/icons/white-cross.svg" />
        </div>
        <p>Add product</p>
      </div>
    </div>
    <div class="order-info_product-list">
      <div class="order-info_product-list_item" v-for="product in products" :key="product.id">
        <div
          class="order-info_product-list_item_dot"
          :class="{ repair: product.isNew === 0 }"
        ></div>
        <img class="order-info_item_photo" src="../../assets/icons/monitor.jpg" />
        <div>
          <RedirectLink
            class="order-info_product_title"
            :to="`products/${product.id}`"
            :text="product.title"
          />
          <p class="order-info_product_serial-number">{{ product.serialNumber }}</p>
        </div>
        <div>
          <p class="order-info_product-list_item_status" :class="{ repair: product.isNew === 0 }">
            {{ product.isNew ? 'Свободен' : 'В ремонте' }}
          </p>
        </div>
        <div class="orders_list_item_delete" @click="deleteProduct(product.id)">
          <img src="../../assets/icons/trash.svg" />
        </div>
      </div>
    </div>
    <AddProductModal
      :visibility="showModal"
      variant="success"
      @close-modal="closeModal"
      @create-product="createProduct"
    />
  </div>
</template>

<script lang="ts">
import type { Order, Product } from '@/store/types'
import type { PropType } from 'vue'
import { mapState } from 'vuex'
import AddProductModal from '../UI/Modal/AddProductModal.vue'
import RedirectLink from '../UI/RedirectLink/RedirectLink.vue'

export default {
  name: 'OrderInfo',
  components: {
    AddProductModal,
    RedirectLink
  },
  data() {
    return {
      showModal: false
    }
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    }
  },
  computed: {
    ...mapState('products', ['loading', 'products'])
  },
  mounted() {
    this.$store.dispatch('products/getProductsByOrderId', this.order.id)
  },
  watch: {
    order(newOrder) {
      if (newOrder.id) {
        this.$store.dispatch('products/getProductsByOrderId', newOrder.id)
      }
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    resetOrder() {
      this.$emit('reset-order')
    },
    async deleteProduct(id: number) {
      await this.$store.dispatch('products/deleteProduct', id)
      await this.$store.dispatch('products/getProducts')
      await this.$store.dispatch('orders/getOrders')
    },
    async createProduct(product: Product) {
      try {
        product.orderId = this.order.id
        console.log('product', product)
        await this.$store.dispatch('products/createProduct', product)
        await this.$store.dispatch('orders/getOrders')
      } catch (e) {
        console.log(e)
      }
    }
  }
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
}

.order-info_head {
  padding: 20px;
  padding-bottom: 10px;
}

.order-info_add-product {
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

/* .order-info_item_title {
  display: block;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */

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

.order-info_product-list_item {
  background-color: rgb(255, 255, 255);
  height: 50px;
  border: 1px solid #e3e8ea;
  padding: 10px;
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
</style>
