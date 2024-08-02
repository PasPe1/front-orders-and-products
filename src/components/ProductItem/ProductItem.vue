<template>
  <div :key="product.id" class="products_list_item">
    <div class="products_list_item_dots" :class="{ repair: product.isNew === 0 }"></div>
    <img class="products_list_item_photo" :src="product.photo"/>
    <div>
       <RedirectLink :to="`products/${product.id}`" :text="product.title"/>
      <p>{{ product.serialNumber }}</p>
    </div>
    <div>
      <p>{{ product.guarantee.start }}</p>
      <p>{{ product.guarantee.end }}</p>
    </div>
    <div>
      <p class="products_list_item_status" :class="{ repair: product.isNew === 0 }">{{ product.isNew ? 'Свободен' : 'В ремонте' }}</p>
    </div>
    <div>
      <p>{{ product.price[0].value }}</p>
      <p>{{ product.price[1].value }}</p>
    </div>
    <div>
      <p>{{ product.date }}</p>
    </div>
    <div>
      <CustomButton text="Delete" :onClick="deleteProduct" :disabled="loading"/>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '@/store/types';
import { defineAsyncComponent, type PropType } from 'vue';
import { mapState } from 'vuex';

  export default {
    name: 'ProductItem',
    components: {
      CustomButton: defineAsyncComponent(() => import('@/components/UI/CustomButton/CustomButton.vue')),
      RedirectLink: defineAsyncComponent(() => import('@/components/UI/RedirectLink/RedirectLink.vue')),
    },
    props: {
      product: {
        type: Object as PropType<Product>,
        required: true
      }
    },
    computed: {
      ...mapState('products', ['loading'])
    },
    methods: {
      async deleteProduct() {
        await this.$store.dispatch('products/deleteProduct', this.product.id)
        await this.$store.dispatch('products/getProducts');
      }
    }
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
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  transition: 0.5s;
}

.products_list_item:hover {
  box-shadow: 0px 2px 31px 0px rgba(0,0,0,0.75);
}

.products_list_item_photo {
  max-height: 70px;
  width: auto;
}

.products_list_item_dots {
  height: 10px;
  width: 10px;
  background-color: var(--primary-green-color);
  border-radius: 50%;
}

.products_list_item_dots.repair {
  background-color: #3f3f3f;
}

.products_list_item_status {
  color: #3f3f3f;
}

.products_list_item_status.repair {
  color: var(--primary-green-color);
}
</style>