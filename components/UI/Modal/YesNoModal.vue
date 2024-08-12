<template>
  <div
    v-if="visibility"
    class="modal"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <p>{{ $t('YesNoModal.title') }}</p>
          <div
            class="modal-close"
            @click="closeModal()"
          >
            <img src="../../../assets/icons/cross.svg">
          </div>
        </div>
        <div class="modal-body">
          <slot :class="customClass" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="'btn'"
            :disabled="loading"
            @click="closeModal"
          >
            {{ $t('YesNoModal.cancel') }}
          </button>
          <CustomButton
            type="button"
            :on-click="deleteProduct"
            class="btn btn-light text-danger"
            :disabled="loading"
            :loading="loading"
          >
            <img
              class="btn_icon"
              src="../../../assets/icons/red-trash.svg"
            >
            <span class="text-danger">{{ $t('YesNoModal.delete') }}</span>
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Order, Product } from '@/store/types'

export default {
  name: 'YesNoModal',
  components: {
    CustomButton: defineAsyncComponent(() => import('@/components/UI/CustomButton/CustomButton.vue')),
  },
  props: {
    visibility: Boolean,
    variant: String,
    item: {
      type: Object as PropType<Product | Order>,
      required: true,
    },
    customClass: {
      type: String as PropType<string>,
      default: '',
    },
    loading: Boolean,
  },
  emits: ['close-modal', 'delete-product'],
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    deleteProduct() {
      this.$emit('delete-product', this.item)
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

.modal-footer {
  background-color: var(--primary-green-color);
  color: #fff;
}

.text-danger {
  color: red;
}

.btn_icon {
  height: 15px;
  width: auto;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.23);
  width: 25px;
  height: 25px;
  position: absolute;
  right: -10px;
  top: -10px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
