<template>
  <div v-if="visibility" class="modal" style="display: block">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Create Product</h4>
          <button type="button" @click="closeModal()" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <form class="modal-form">
            <div>
              <CustomInput
                v-model="product.serialNumber"
                type="number"
                placeholder="serialNumber"
              />
              <CustomInput v-model="product.isNew" type="number" placeholder="isNew" />
              <!-- <CustomInput v-model="product.photo" type="file" placeholder="photo" /> -->
              <CustomInput v-model="product.title" placeholder="Title" />
              <CustomInput v-model="product.type" placeholder="type" />
              <CustomInput
                v-model="product.specification"
                type="number"
                placeholder="specification"
              />
            </div>
            <div>
              <CustomInput v-model="product.guarantee.start" type="date" placeholder="start" />
              <CustomInput v-model="product.guarantee.end" type="date" placeholder="End" />
              <CustomInput v-model="product.price[0].value" type="number" placeholder="price USD" />
              <CustomInput v-model="product.price[1].value" type="number" placeholder="price UAH" />
              <CustomInput v-model="product.sequence" type="number" placeholder="sequence" />
              <CustomInput v-model="product.date" type="date" placeholder="date" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="createProduct()" :class="'btn btn-' + variant">
            {{ 'Create' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '../CustomInput/CustomInput.vue'

export default {
  name: 'AddProductModal',
  components: {
    CustomInput
  },
  data() {
    return {
      product: {
        serialNumber: 0,
        isNew: 1,
        photo: '',
        title: '',
        type: '',
        specification: '',
        guarantee: {
          start: '',
          end: ''
        },
        price: [
          { value: 0, symbol: 'USD', isDefault: 0 },
          { value: 0, symbol: 'UAH', isDefault: 1 }
        ],
        sequence: 1,
        date: ''
      }
    }
  },
  props: {
    visibility: Boolean,
    variant: String
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetProduct()
    },
    createProduct() {
      this.$emit('create-product', this.product)
      this.resetProduct()
    },
    resetProduct() {
      this.product = {
        serialNumber: 0,
        isNew: 1,
        photo: '',
        title: '',
        type: '',
        specification: '',
        guarantee: {
          start: '',
          end: ''
        },
        price: [
          { value: 0, symbol: 'USD', isDefault: 0 },
          { value: 0, symbol: 'UAH', isDefault: 1 }
        ],
        sequence: 1,
        date: ''
      }
    }
  }
}
</script>

<style scoped>
.modal-body {
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-form {
  display: flex;
  flex-direction: row;
  /* align-items: start; */
  gap: 20px;
}
</style>
