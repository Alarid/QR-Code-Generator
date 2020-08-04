import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qrcodes: [],
  },
  mutations: {
    addQRCode(state, qrcode) {
      state.qrcodes.push(qrcode);
      localStorage.setItem('qrcodes', JSON.stringify(state.qrcodes));
    },
    removeQRCode(state, id) {
      state.qrcodes = state.qrcodes.filter((qrcode) => qrcode.id !== id);
      localStorage.setItem('qrcodes', JSON.stringify(state.qrcodes));
    },
    initialiseStore(state) {
      const qrcodes = localStorage.getItem('qrcodes');
      if (qrcodes) {
        state.qrcodes = JSON.parse(qrcodes);
      }
    },
  },
  getters: {
    all(state) {
      return state.qrcodes;
    },
  },
  actions: {
    saveQRCode(context, qrc) {
      const qrcode = qrc;
      qrcode.id = uuidv4();
      qrcode.date = new Date();
      context.commit('addQRCode', qrcode);
    },
  },
  modules: {
  },
});
