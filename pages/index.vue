<template>
  <div class="orders">
    <div class="orders_head">
      <div
        class="orders_head_circle-button"
        @click="openModal"
      >
        <div><img src="/assets//icons/white-cross.svg"></div>
      </div>
      <h3 class="orders_head_title">
        {{ $t('orders.orders') }} / {{ orders.length }}
      </h3>
    </div>
    <div class="orders_list">
      <div
        v-if="orders"
        class="orders_list_item"
        :class="{ active: showProduct }"
      >
        <OrderItem
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :active="activeOrder"
          :show-product="showProduct"
          @set-active="setActiveOrder(order)"
        />
        <div v-if="loading">
          <Spinner />
        </div>
        <div v-if="!loading && orders.length === 0">
          <h3>{{ $t('orders.noOrders') }}</h3>
        </div>
      </div>
      <OrderInfo
        v-if="activeOrder"
        :order="activeOrder"
        @reset-order="resetActiveOrder"
      />
    </div>
    <AddOrderModal
      variant="success"
      :visibility="showModal"
      :loading="loading"
      @close-modal="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import type { Order } from '../store/types'

definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})

export default defineComponent({
  name: 'Orders',
  components: {
    OrderItem: defineAsyncComponent(() => import('../../components/OrderItem/OrderItem.vue')),
    AddOrderModal: defineAsyncComponent(() => import('../../components/UI/Modal/AddOrderModal.vue')),
    OrderInfo: defineAsyncComponent(() => import('../../components/OrderInfo/OrderInfo.vue')),
    Spinner: defineAsyncComponent(() => import('~/components/UI/Spinner/Spinner.vue')),
  },
  setup() {
    const store = useStore()
    const showModal = ref(false)
    const showProduct = ref(false)
    const activeOrder = ref<Order | null>(null)

    const orders = computed(() => store.state.orders.orders)
    const loading = computed(() => store.state.orders.loading)

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    const setActiveOrder = (order: Order) => {
      activeOrder.value = order
      showProduct.value = true
    }

    const resetActiveOrder = () => {
      activeOrder.value = null
      showProduct.value = false
      store.commit('products/cleareProducts')
    }

    onMounted(() => {
      store.dispatch('orders/getOrders')
    })

    return {
      showModal,
      showProduct,
      activeOrder,
      orders,
      loading,
      openModal,
      closeModal,
      setActiveOrder,
      resetActiveOrder,
    }
  },
})
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

.orders_head_title {
  padding: 0px;
  margin-bottom: 0px;
}
</style>
