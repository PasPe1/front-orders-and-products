<template>
  <div class="orders_list_item">
    <div>
      <p>{{ order.title }}</p>
    </div>
    <div>
      <p>{{ order.products.length }}</p>
    </div>
    <div>
      <p>{{ order.date }}</p>
    </div>
    <div>
      <p>{{ `${totalUSD} USD` }}</p>
      <p>{{ `${totalUAH} UAH` }}</p>
    </div>
    <div>
      <CustomButton text="Delete" :onClick="deleteOrder" :disabled="loading"/>
    </div>
  </div>
</template>

<script lang="ts">
import type { Order } from '@/store/types';
import type { PropType } from 'vue';
import CustomButton from '../UI/CustomButton/CustomButton.vue';
import { mapState } from 'vuex';

  export default {
    name: 'OrderItem',
    components: {
      CustomButton
    },
    data() {
      return {
        totalUAH: 0,
        totalUSD: 0
      }
    },
    props: {
      order: {
        type: Object as PropType<Order>,
        required: true
      }
    },
    computed: {
      ...mapState('orders', ['loading'])
    },
    mounted() {
      this.calculateTotalPrices()
    },
    methods: {
      async deleteOrder() {
        await this.$store.dispatch('orders/deleteOrder', this.order.id)
        await this.$store.dispatch('orders/getOrders')
      },
      calculateTotalPrices() {

        this.order.products.forEach(product => {
            const usdPrice = product.price.find(p => p.symbol === 'USD');
            const uahPrice = product.price.find(p => p.symbol === 'UAH');

            if (usdPrice) {
                this.totalUSD += usdPrice.value;
            }
            if (uahPrice) {
                this.totalUAH += uahPrice.value;
            }
        });
      }
    }
  }
</script>

<style scoped>

.orders_list_item {
  background-color: #fff;
  border: 1px solid #e3e8ea;
  border-radius: 7px;
  margin-bottom: 15px;
  padding: 10px;
  min-height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  transition: 0.5s;
}

.orders_list_item:hover {
  box-shadow: 0px 2px 31px 0px rgba(0,0,0,0.75);
}
</style>