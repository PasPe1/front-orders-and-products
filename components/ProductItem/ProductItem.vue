<template>
  <div
    :key="product.id"
    class="products_list_item"
  >
    <ProductHead :product="product" />
    <div class="products_list_item_date">
      <p class="products_list_item_date_label">
        {{ $t('products.productItem.from') }}
      </p>
      <p>{{ formattedStartDate }}</p>
      <p class="products_list_item_date_label">
        {{ $t('products.productItem.to') }}
      </p>
      <p>{{ formattedEndDate }}</p>
    </div>
    <div class="products_list_item_stat">
      <p
        class="products_list_item_status"
        :class="{ repair: product.isNew === 0 }"
      >
        {{
          product.isNew
            ? $t('products.productItem.status.available')
            : $t('products.productItem.status.repair')
        }}
      </p>
    </div>
    <div class="products_list_item_used-status">
      <p>
        {{
          product.isNew
            ? $t('products.productItem.usedStatus.new')
            : $t('products.productItem.usedStatus.used')
        }}
      </p>
    </div>
    <div class="products_list_item_price">
      <p class="products_list_item_price_usd">
        {{ product.price[0].value }} $
      </p>
      <div class="products_list_item_price_uah">
        <p>{{ product.price[1].value }}</p>
        <p class="products_list_item_price_uah_symbol">
          UAH
        </p>
      </div>
    </div>
    <div class="products_list_item_created-date">
      <p>{{ formattedAddedDate }}</p>
    </div>
    <div
      class="products_list_item_delete"
      @click="openModal"
    >
      <img src="/assets/icons/trash.svg">
    </div>
    <YesNoModal
      :item="product"
      :visibility="visibility"
      :loading="loading"
      @delete-product="deleteProduct"
      @close-modal="closeModal"
    >
      <ProductHead :product="product" />
    </YesNoModal>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineAsyncComponent, type PropType } from 'vue'
import { mapState } from 'vuex'
import type { Product } from '@/store/types'

export default {
  name: 'ProductItem',
  components: {
    YesNoModal: defineAsyncComponent(() => import('@/components/UI/Modal/YesNoModal.vue')),
    ProductHead: defineAsyncComponent(() => import('@/components/ProductHead/ProductHead.vue')),
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  data() {
    return {
      visibility: false,
    }
  },
  computed: {
    ...mapState('products', ['loading']),
    formattedStartDate() {
      return this.formatDate(this.product.guarantee.start)
    },
    formattedEndDate() {
      return this.formatDate(this.product.guarantee.end)
    },
    formattedAddedDate() {
      return this.formatDate(this.product.date)
    },
  },
  methods: {
    async deleteProduct() {
      await this.$store.dispatch('products/deleteProduct', this.product.id)
      await this.$store.dispatch('products/getProducts')
    },
    formatDate(date: string): string {
      if (!date || !dayjs(date).isValid()) {
        return 'Invalid date'
      }

      return dayjs(date).format('DD / MM / YYYY')
    },
    openModal() {
      this.visibility = true
    },
    closeModal() {
      this.visibility = false
    },
  },
}
</script>

<style scoped>
.products_list_item {
  background-color: #fff;
  border: 1px solid #e3e8ea;
  border-radius: 7px;
  margin-bottom: 15px;
  padding: 10px;
  min-height: 60px;
  display: grid;
  align-items: center;
  gap: 10px;
  transition: 0.5s;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 40px;
}

.products_list_item:hover {
  box-shadow: 0px 2px 31px 0px rgba(0, 0, 0, 0.75);
}

.products_list_item_photo {
  max-height: 50px;
  width: auto;
  display: flex;
  margin: auto;
}

.products_list_item_dots {
  height: 10px;
  width: 10px;
  background-color: var(--primary-green-color);
  border-radius: 50%;
}

.products_list_item_date,
.products_list_item_price,
.products_list_item_dots {
  margin: auto;
}

.products_list_item_date {
  display: grid;
  grid-template-columns: 30px 1fr;
}

.products_list_item_date_label {
  font-size: 12px;
  align-self: flex-end;
  opacity: 0.6;
}

.products_list_item_name_redirect {
  display: block;
  text-decoration: underline;
  text-decoration-color: rgb(104, 104, 104);
  color: #3f3f3f;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products_list_item_serial-number {
  font-size: 12px;
  opacity: 0.6;
}

.products_list_item_dots.repair {
  background-color: #3f3f3f;
}

.products_list_item_status {
  color: var(--primary-green-color);
}

.products_list_item_status.repair {
  color: #3f3f3f;
}

.products_list_item_price_usd {
  font-size: 12px;
  opacity: 0.6;
  line-height: 4px;
}

.products_list_item_price_uah {
  display: flex;
  align-items: baseline;
}

.products_list_item_price_uah_symbol {
  font-size: 8px;
  font-weight: 600;
  margin-left: 5px;
}

.products_list_item_delete {
  cursor: pointer;
}

.modal-item {
  width: 100%;
  display: grid;
  grid-template-columns: 50px 100px 1fr;
}
</style>
