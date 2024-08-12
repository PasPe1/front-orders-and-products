<template>
  <div
    v-if="visibility"
    class="modal"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ $t('addOrderModal.createOrder') }}</h4>
          <button
            type="button"
            class="btn-close"
            @click.prevent="closeModal()"
          />
        </div>
        <div class="modal-body">
          <form class="modal-form">
            <div class="form-group">
              <CustomInput
                v-model="order.title"
                :placeholder="$t('addOrderModal.title')"
                :class="{ 'is-invalid': errors.title }"
              />
              <div
                v-if="errors.title"
                class="invalid-data"
              >
                {{ errors.title }}
              </div>
            </div>
            <div class="form-group">
              <CustomInput
                v-model="order.date"
                type="date"
                :placeholder="$t('addOrderModal.date')"
                :class="{ 'is-invalid': errors.date }"
              />
              <div
                v-if="errors.date"
                class="invalid-data"
              >
                {{ errors.description }}
              </div>
            </div>
            <div class="form-group">
              <CustomInput
                v-model="order.description"
                type="textarea"
                :placeholder="$t('addOrderModal.description')"
                :class="{ 'is-invalid': errors.description }"
              />
              <div
                v-if="errors.description"
                class="invalid-data"
              >
                {{ errors.description }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <CustomButton
            type="button"
            :on-click="createOrder"
            :class="'btn btn-' + variant"
            :loading="loading"
          >
            {{ $t('addOrderModal.create') }}
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOrderModal',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    CustomButton: defineAsyncComponent(() => import('@/components/UI/CustomButton/CustomButton.vue')),
  },
  props: {
    visibility: Boolean,
    variant: String,
    loading: Boolean,
  },
  emits: ['close-modal'],
  data() {
    return {
      order: {
        title: '',
        date: '',
        description: '',
      },
      errors: {
        title: '',
        date: '',
        description: '',
      },
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetOrder()
    },
    validate() {
      let isValid = true
      this.errors = {
        title: '',
        date: '',
        description: '',
      }

      if (!this.order.title.trim()) {
        this.errors.title = 'Title is required!'
        isValid = false
      }
      if (!this.order.date) {
        this.errors.date = 'Date is required!'
        isValid = false
      }
      if (!this.order.description.trim()) {
        this.errors.description = 'Description is required!'
        isValid = false
      }

      return isValid
    },
    async createOrder() {
      if (!this.validate()) {
        return
      }

      try {
        await this.$store.dispatch('orders/createOrder', this.order)
        this.$emit('close-modal')
        this.resetOrder()
      }
      catch (e) {
        console.log(e)
      }
    },
    resetOrder() {
      this.order = {
        title: '',
        date: '',
        description: '',
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
  flex-direction: column;
  align-items: start;
  width: 90%;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-data {
  color: #dc3545;
  font-size: 0.875em;
}
</style>
