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
            <CustomInput
              v-model="order.title"
              :placeholder="$t('addOrderModal.title')"
            />
            <CustomInput
              v-model="order.date"
              type="date"
              :placeholder="$t('addOrderModal.date')"
            />
            <CustomInput
              v-model="order.description"
              type="textarea"
              :placeholder="$t('addOrderModal.description')"
            />
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
  emits: ['close-modal', 'create-order'],
  data() {
    return {
      order: {
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
    createOrder() {
      this.$emit('create-order', this.order)
      this.resetOrder()
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
</style>
