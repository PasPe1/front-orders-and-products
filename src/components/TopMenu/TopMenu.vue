<template>
    <div class="container">
      <h1>Inventory</h1>
      <div>
        <CustomInput v-model="text" placeholder="product name"/>
      </div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
  name: "TopMenu",
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    onClick(this) {
      console.log('this.loading')
    }
  }
}
</script>

<style scoped>
.container {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  /* position: fixed; */
  /* top: 0; */
  width: 100%;
  padding: 10px;
  position: relative;
  z-index: 2;
  /* flex-direction: row; */
  box-shadow: 13px 0px 10px 15px rgba(34, 34, 34, 0.096);
}

.nav-item-link {
    text-decoration: none;
    color: black;
    font-weight: 600;
    line-height: 16px;
}
</style>