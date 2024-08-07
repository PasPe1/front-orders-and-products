<template>
  <div class="product">
    <div
      class="product_item_dots"
      :class="{ repair: product.isNew === 0 }"
    />
    <img
      class="product_item_photo"
      src="../../assets/icons/monitor.jpg"
    >
    <div class="product_item_name">
      <RedirectLink
        class="product_item_name_redirect"
        :to="`products/${product.id}`"
        :text="product.title"
      />
      <p class="product_item_serial-number">
        {{ product.serialNumber }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '~/store/types'

export default {
  name: 'ProductHead',
  components: {
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue')),
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
}
</script>

<style scoped>
.product {
  display: grid;
  align-items: center;
  gap: 10px;
  transition: 0.5s;
  grid-template-columns: 50px 100px 300px;
}

.product_item_dots {
  margin: auto;
}

.product_item_photo {
  max-height: 50px;
  width: auto;
  display: flex;
  margin: auto;
}

.product_item_dots {
  height: 10px;
  width: 10px;
  background-color: var(--primary-green-color);
  border-radius: 50%;
}

.product_item_name_redirect {
  display: block;
  text-decoration: underline;
  text-decoration-color: rgb(104, 104, 104);
  color: #3f3f3f;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item_serial-number {
  font-size: 12px;
  opacity: 0.6;
}
</style>
