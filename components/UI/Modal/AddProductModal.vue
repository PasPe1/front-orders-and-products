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
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.isNew"
                type="number"
                :placeholder="$t('AddProductModal.status')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.title"
                :placeholder="$t('AddProductModal.title')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.type"
                :placeholder="$t('AddProductModal.type')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.specification"
                :placeholder="$t('AddProductModal.specification')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
            </div>
            <div>
              <CustomInput
                v-model="product.guarantee.start"
                type="date"
                :placeholder="$t('AddProductModal.start')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.guarantee.end"
                type="date"
                :placeholder="$t('AddProductModal.end')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.price[0].value"
                type="number"
                :placeholder="$t('AddProductModal.priceUSD')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.price[1].value"
                type="number"
                :placeholder="$t('AddProductModal.priceUAH')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.sequence"
                type="number"
                :placeholder="$t('AddProductModal.sequence')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
              <CustomInput
                v-model="product.date"
                type="date"
                :placeholder="$t('AddProductModal.date')"
                :required="true"
                :class="{ 'is-invalid': !isValid.date }"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div
            v-if="formError"
            class="alert alert-danger"
          >
            {{ formError }}
          </div>
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
    orderId: Number,
  },
  emits: ['close-modal'],
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
      isValid: {
        serialNumber: true,
        isNew: true,
        photo: true,
        title: true,
        type: true,
        specification: true,
        guaranteeStart: true,
        guaranteeEnd: true,
        priceUSD: true,
        priceUAH: true,
        sequence: true,
        date: true,
      },
      formError: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetProduct()
    },
    validateForm() {
      this.formError = ''
      let valid = true

      for (const key in this.product) {
        if (key !== 'price' && key !== 'guarantee' && key !== 'photo') {
          if (this.product[key] === undefined || this.product[key] === null || this.product[key] === '') {
            this.isValid[key] = false
            valid = false
          }
          else {
            this.isValid[key] = true
          }
        }
      }

      if (!this.product.guarantee.start || !this.product.guarantee.end) {
        this.isValid.guaranteeStart = false
        this.isValid.guaranteeEnd = false
        valid = false
      }
      else {
        this.isValid.guaranteeStart = true
        this.isValid.guaranteeEnd = true
      }

      if (this.product.price[0] && (this.product.price[0].value !== undefined || this.product.price[0].value === 0)) {
        this.isValid.priceUSD = true
      }
      else {
        this.isValid.priceUSD = false
        valid = false
      }

      if (this.product.price[1] && (this.product.price[1].value !== undefined || this.product.price[1].value === 0)) {
        this.isValid.priceUAH = true
      }
      else {
        this.isValid.priceUAH = false
        valid = false
      }

      if (!this.product.date) {
        this.isValid.date = false
        valid = false
      }
      else {
        this.isValid.date = true
      }

      if (!valid) {
        this.formError = this.$t('AddProductModal.validationError')
      }

      return valid
    },
    async createProduct() {
      console.log('this.validateForm()', this.validateForm(), this.product)
      if (!this.validateForm()) return

      try {
        await this.$store.dispatch('products/createProduct', { ...this.product, orderId: this.orderId })
        this.$emit('close-modal')
        this.resetProduct()
        await this.$store.dispatch('orders/getOrders')
      }
      catch (e) {
        console.log(e)
      }
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
      this.isValid = {
        serialNumber: true,
        isNew: true,
        photo: true,
        title: true,
        type: true,
        specification: true,
        guaranteeStart: true,
        guaranteeEnd: true,
        priceUSD: true,
        priceUAH: true,
        sequence: true,
        date: true,
      }
      this.formError = ''
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

.modal-footer {
  min-height: 90px;
  background-color: var(--grey-color);
}
</style>
