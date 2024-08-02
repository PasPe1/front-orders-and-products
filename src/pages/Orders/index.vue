<template>
  <div class="orders">
    <div class="orders_head">
      <p>orders</p>
    </div>
    <div class="orders_list">
      <OrderItem v-if="orders" v-for="order in orders" :key="order.id" :order="order"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, type PropType } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'Orders',
  components: {
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
    OrderItem: defineAsyncComponent(() => import('@/components/OrderItem/OrderItem.vue'))
  },
  computed: {
    ...mapState('orders', ['loading', 'orders'])
  },
  mounted() {
    this.$store.dispatch('orders/getOrders')
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
}
</style>
