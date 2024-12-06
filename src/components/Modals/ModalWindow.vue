<script>
import useModalStore from '@/stores/useModalStore.js'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: { useModalStore }
})

</script>
<template>
  <div ref="el">
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          class="modal-wrapper"
          @click.self="useModalStore().closeModal"
          v-if="useModalStore().modalState?.component"
        >
          <component :is="useModalStore().modalState?.component" v-bind="useModalStore().modalState?.props" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}
</style>
