<template>
  <transition name="fade">
    <div v-if="visible" :class="['toast', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    type: {
      type: String,
      default: 'success', // or 'error'
    },
    visible: Boolean,
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 9999;
  padding: 16px 24px;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s;
}
.toast.success {
  background: #16a34a;
}
.toast.error {
  background: #dc2626;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
