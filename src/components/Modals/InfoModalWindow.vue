<template>
  <div class="modal">
    <div class="modal__emoji">{{ emoji }}</div>
    <div class="modal__header">
      <h4 class="modal__header-content">{{ header }}</h4>
    </div>
    <div class="modal__description">
      <p class="modal__description-content">{{ description }}</p>
    </div>
    <div class="modal__body">
      <p class="modal__body-content">{{ body }}</p>
    </div>
    <div class="modal__footer">
      <div class="modal__footer-content">
        <!--        <button class=modal__button} {children}</button>-->
        <button @click="handleAction()" class="modal__button">{{ footer }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import useModalStore from '@/stores/useModalStore.js'

const store = useModalStore()

const { emoji, header, description, body, footer, handleAction } = defineProps([
  'emoji',
  'header',
  'description',
  'body',
  'footer',
  'handleAction',
])

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})

const handleKeyPress = (e) => {
  if (e.key === 'Escape') {
    store.closeModal();
  }
  if (e.key === 'Enter') {
    handleAction();
  }
}
</script>

<style scoped>

.modal {
  background: #282626;
  place-self: start center;
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  padding: 0 1.5rem 2rem 1.5rem;
  margin-top: 12rem;
  width: 50%;
  color: white;
  border: none;
}

.modal__emoji {
  display: flex;
  font-size: 5rem;
  align-items: center;
  justify-content: center;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__header-content {
  margin: 0;
  font-size: 1.6rem;
  text-align: center;
}

.modal__description {
  text-align: center;
}

.modal__description-content {
  font-size: 1rem;
  margin: 0.8rem 0 0 0;
}

.modal__body {
  text-align: center;
}

.modal__body-content {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal__button {
  background: #3f82f7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  border-radius: 0.4rem;
  outline: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
