import { defineStore } from 'pinia'

const basicState = { component: null, props: {} }

export default defineStore('modal-store', {
  state: () => ({ modalState: basicState }), // holding reactive state of store
  actions: {
    openModal(payload) {
      const { props, component } = payload
      this.modalState = { component, props: props || {} }

    },
    closeModal() {
      this.modalState = basicState
    }
  }, // listing possible mutations of the state
  getters: {} // taking real time data from state with performing any needed transformations
})
