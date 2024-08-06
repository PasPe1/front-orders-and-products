<template>
  <div class="orders">
    <div class="orders_head">
      <div class="orders_head_circle-button" @click="openModal">
        <div><img src="../../assets//icons/white-cross.svg" /></div>
      </div>
      <h3>{{ $t('orders.orders') }} / {{ orders.length }}</h3>
    </div>
    <div class="orders_list">
      <div v-if="orders" class="orders_list_item" :class="{ active: showProduct }">
        <OrderItem
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :active="activeOrder"
          :showProduct="showProduct"
          @setActive="setActiveOrder(order)"
        />
      </div>
      <OrderInfo v-if="activeOrder" :order="activeOrder" @reset-order="resetActiveOrder" />
    </div>
    <AddOrderModal
      variant="success"
      :visibility="showModal"
      :loading="loading"
      @close-modal="closeModal"
      @create-order="createOrder"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'
import AddOrderModal from '@/components/UI/Modal/AddOrderModal.vue'
import type { Order } from '@/store/types'
import OrderInfo from '@/components/OrderInfo/OrderInfo.vue'

export default {
  name: 'Orders',
  components: {
    OrderItem: defineAsyncComponent(() => import('@/components/OrderItem/OrderItem.vue')),
    AddOrderModal,
    OrderInfo
  },
  data() {
    return {
      showModal: false,
      showProduct: false,
      activeOrder: null as Order | null
    }
  },
  computed: {
    ...mapState('orders', ['loading', 'orders'])
  },
  mounted() {
    this.$store.dispatch('orders/getOrders')
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async createOrder(order: Order) {
      try {
        await this.$store.dispatch('orders/createOrder', order)
        this.closeModal()
      } catch (e) {
        console.log(e)
      }
    },
    setActiveOrder(order: Order) {
      this.activeOrder = order
      this.showProduct = true
    },
    resetActiveOrder() {
      this.activeOrder = null
      this.showProduct = false
      this.$store.commit('products/cleareProducts')
    }
  }
}
</script>

<style scoped>
.orders {
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: auto;
}

.orders_head {
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
}

.orders_list {
  width: 100%;
  display: flex;
  justify-content: center;
}

.orders_list_item {
  width: 100%;
}

.orders_list_item.active {
  width: 50%;
  margin-right: 30px;
}

.orders_head_circle-button {
  width: 30px;
  height: 30px;
  background-color: var(--green-dark-color);
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
}

.orders_head_circle-button div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--primary-green-color);
  box-shadow: 2px 5px 9px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
