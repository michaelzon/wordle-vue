import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import InfoModalWindow from '@/components/Modals/InfoModalWindow.vue';

const basicState = { component: shallowRef(null), props: {} };

export default defineStore('modal-store', {
  state: () => ({ modalState: basicState }), // holding reactive state of store
  actions: {
    openModal(payload) {
      const { props, component } = payload
      this.modalState = { component, props: props || {} };
      this.modalState = { component: shallowRef(component), props: props || {} };
    },
    closeModal() {
      this.modalState = basicState;
    },

    // if we want to open the same inner modal in different parts of the application, use this reusable action
    // while specifying the text as an argument
    openInfoModal(emoji, header, description, body, footer, handleAction) {
      this.openModal({ component: InfoModalWindow, props: { emoji: emoji, header: header, description: description, body: body, footer: footer, handleAction: handleAction }});
    },
  }, // listing possible mutations of the state
  getters: {} // taking real time data from state with performing any needed transformations
})
