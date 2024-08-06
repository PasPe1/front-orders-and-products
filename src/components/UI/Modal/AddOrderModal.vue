<template>
  <div v-if="visibility" class="modal" style="display: block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ $t('addOrderModal.createOrder') }}</h4>
          <button type="button" @click="closeModal()" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <form class="modal-form">
            <CustomInput v-model="order.title" :placeholder="$t('addOrderModal.title')" />
            <CustomInput v-model="order.date" type="date" :placeholder="$t('addOrderModal.date')" />
            <CustomInput
              v-model="order.description"
              type="textarea"
              :placeholder="$t('addOrderModal.description')"
            />
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="createOrder()"
            :class="'btn btn-' + variant"
            :disabled="loading"
          >
            {{ $t('addOrderModal.create') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '../CustomInput/CustomInput.vue'

export default {
  name: 'AddOrderModal',
  components: {
    CustomInput
  },
  data() {
    return {
      order: {
        title: '',
        date: '',
        description: ''
      }
    }
  },
  props: {
    visibility: Boolean,
    variant: String,
    loading: Boolean
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
        description: ''
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
  flex-direction: column;
  align-items: start;
  width: 90%;
}
</style>
