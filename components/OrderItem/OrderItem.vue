<template>
  <div
    class="order_item"
    :class="{ active: active?.id === order.id, twisted: showProduct }"
    @click="$emit('set-active', order)"
  >
    <p
      v-if="!active"
      class="order_item_name"
    >
      {{ order.title }}
    </p>
    <div class="order_item_products-number">
      <div class="order_item_products-number_svg">
        <img src="../../assets/icons/hamburger-menu.svg">
      </div>
      <div class="order_item_products-number_count">
        <p class="order_item_products-number_count_number">
          {{ order.products.length }}
        </p>
        <p class="order_item_products-number_count_name">
          {{ $t('orders.orderItem.countProduct') }}
        </p>
      </div>
    </div>
    <div class="order_item_products_created-date">
      <p class="order_item_products_created-date_monthly">
        {{ formattedMonthDate }}
      </p>
      <p>{{ formattedAddedDate }}</p>
    </div>
    <div
      v-if="!active"
      class="order_item_price"
    >
      <p class="order_item_price_usd">
        {{ totalUSD }} $
      </p>
      <div class="order_item_price_uah">
        <p>{{ totalUAH }}</p>
        <p class="order_item_price_uah_symbol">
          UAH
        </p>
      </div>
    </div>
    <div
      v-if="!active"
      class="order_item_delete"
      @click.stop="openModal"
    >
      <img src="../../assets/icons/trash.svg">
    </div>
    <div
      v-else
      class="order_item_pin"
      :class="{ active: active?.id === order.id }"
    >
      <img
        class="order_item_pin_img"
        :class="{ active: active?.id === order.id }"
        src="../../assets/icons/right-arrow.svg"
      >
    </div>
  </div>
  <YesNoModal
    :item="order"
    :visibility="showModal"
    :loading="loading"
    @delete-product="deleteOrder"
    @close-modal="closeModal"
  >
    <div class="modal-item">
      <p>{{ order.title }}</p>
      <div class="order_item_products-number">
        <div class="order_item_products-number_svg">
          <img src="../../assets/icons/hamburger-menu.svg">
        </div>
        <div class="order_item_products-number_count">
          <p class="order_item_products-number_count_number">
            {{ order.products.length }}
          </p>
          <p class="order_item_products-number_count_name">
            {{ $t('orders.orderItem.countProduct') }}
          </p>
        </div>
      </div>
      <div class="order_item_products_created-date">
        <p class="order_item_products_created-date_monthly">
          {{ formattedMonthDate }}
        </p>
        <p>{{ formattedAddedDate }}</p>
      </div>
    </div>
  </YesNoModal>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineAsyncComponent, type PropType } from 'vue'
import { mapState } from 'vuex'
import type { Order } from '@/store/types'

export default {
  name: 'OrderItem',
  components: {
    YesNoModal: defineAsyncComponent(() => import('@/components/UI/Modal/YesNoModal.vue')),
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true,
    },
    active: {
      type: Object as PropType<Order | null>,
      required: true,
    },
    showProduct: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['set-active'],
  data() {
    return {
      totalUAH: 0,
      totalUSD: 0,
      showModal: false,
    }
  },
  computed: {
    ...mapState('orders', ['loading']),
    formattedAddedDate() {
      return this.formatDate(this.order.date, 'DD / MMM / YYYY')
    },
    formattedMonthDate() {
      return this.formatDate(this.order.date, 'DD / MM')
    },
  },
  watch: {
    order: {
      handler: 'calculateTotalPrices',
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async deleteOrder() {
      await this.$store.dispatch('orders/deleteOrder', this.order.id)
      await this.$store.dispatch('orders/getOrders')
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    calculateTotalPrices() {
      this.totalUSD = 0
      this.totalUAH = 0

      this.order.products.forEach((product) => {
        const usdPrice = product.price.find(p => p.symbol === 'USD')
        const uahPrice = product.price.find(p => p.symbol === 'UAH')

        if (usdPrice) {
          this.totalUSD += usdPrice.value
        }
        if (uahPrice) {
          this.totalUAH += uahPrice.value
        }
      })
    },
    formatDate(date: string, format: string): string {
      if (!date || !dayjs(date).isValid()) {
        return 'Invalid date'
      }

      return dayjs(date).format(format)
    },
  },
}
</script>

<style scoped>
.order_item {
  background-color: #fff;
  border: 1px solid #e3e8ea;
  border-radius: 7px;
  margin-bottom: 15px;
  padding: 10px;
  min-height: 60px;
  display: grid;
  align-items: center;
  grid-template-columns: 400px 1fr 1fr 1fr 40px;
  gap: 20px;
  transition: 0.5s;
  cursor: pointer;
  position: relative;
  padding-left: 30px;
}

.order_item:hover,
.order_item.active {
  box-shadow: 0px 2px 31px 0px rgba(0, 0, 0, 0.75);
}

.order_item.twisted {
  grid-template-columns: 1fr 1fr 70px;
}

.order_item_name {
  display: block;
  text-decoration: underline;
  text-decoration-color: rgb(104, 104, 104);
  color: #3f3f3f;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order_item_products-number {
  display: flex;
  align-items: center;
  margin: auto;
}

.order_item_products-number_svg {
  height: 40px;
  width: 40px;
  background-color: #fff;
  border: 1px solid #e3e8ea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.order_item_products-number_count_number {
  font-size: 20px;
}

.order_item_products-number_count_name {
  opacity: 0.6;
}

.order_item_delete {
  display: flex;
  justify-content: center;
  width: fit-content;
}

.order_item_pin {
  height: 100%;
  width: 0px;
  background-color: #e3e8ea;
  position: absolute;
  right: 0px;
  border-radius: 0px 7px 7px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}

.order_item_pin.active {
  width: 50px;
}

.order_item_pin_img {
  width: 0%;
}

.order_item_pin_img.active {
  width: auto;
}

.order_item_price_usd {
  font-size: 12px;
  opacity: 0.6;
  line-height: 4px;
}

.order_item_price_uah {
  display: flex;
  align-items: baseline;
}

.order_item_price_uah_symbol {
  font-size: 8px;
  font-weight: 600;
  margin-left: 5px;
}

.modal-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.order_item_products_created-date {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order_item_products_created-date_monthly {
  opacity: 0.6;
  font-size: 12px;
}
</style>
