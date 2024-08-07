<template>
  <div
    v-if="visibility"
    class="modal"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ $t('AddProductModal.createProduct') }}</h4>
          <button
            type="button"
            class="btn-close"
            @click="closeModal()"
          />
        </div>
        <div class="modal-body">
          <form class="modal-form">
            <div>
              <CustomInput
                v-model="product.serialNumber"
                type="number"
                :placeholder="$t('AddProductModal.serialNumber')"
              />
              <CustomInput
                v-model="product.isNew"
                type="number"
                :placeholder="$t('AddProductModal.status')"
              />
              <CustomInput
                v-model="product.title"
                :placeholder="$t('AddProductModal.title')"
              />
              <CustomInput
                v-model="product.type"
                :placeholder="$t('AddProductModal.type')"
              />
              <CustomInput
                v-model="product.specification"
                type="number"
                :placeholder="$t('AddProductModal.specification')"
              />
            </div>
            <div>
              <CustomInput
                v-model="product.guarantee.start"
                type="date"
                :placeholder="$t('AddProductModal.start')"
              />
              <CustomInput
                v-model="product.guarantee.end"
                type="date"
                :placeholder="$t('AddProductModal.end')"
              />
              <CustomInput
                v-model="product.price[0].value"
                type="number"
                :placeholder="$t('AddProductModal.priceUSD')"
              />
              <CustomInput
                v-model="product.price[1].value"
                type="number"
                :placeholder="$t('AddProductModal.priceUAH')"
              />
              <CustomInput
                v-model="product.sequence"
                type="number"
                :placeholder="$t('AddProductModal.sequence')"
              />
              <CustomInput
                v-model="product.date"
                type="date"
                :placeholder="$t('AddProductModal.date')"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <CustomButton
            type="submit"
            :on-click="createProduct"
            :class="'btn btn-' + variant"
            :disabled="loading"
            :loading="loading"
          >
            {{ $t('AddProductModal.create') }}
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProductModal',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    CustomButton: defineAsyncComponent(() => import('@/components/UI/CustomButton/CustomButton.vue')),
  },
  props: {
    visibility: Boolean,
    variant: String,
    loading: Boolean,
  },
  emits: ['close-modal', 'create-product'],
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
          end: '',
        },
        price: [
          { value: 0, symbol: 'USD', isDefault: 0 },
          { value: 0, symbol: 'UAH', isDefault: 1 },
        ],
        sequence: 1,
        date: '',
      },
    }
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
          end: '',
        },
        price: [
          { value: 0, symbol: 'USD', isDefault: 0 },
          { value: 0, symbol: 'UAH', isDefault: 1 },
        ],
        sequence: 1,
        date: '',
      }
    },
  },
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
  gap: 20px;
}
</style>
