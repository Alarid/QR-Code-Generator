import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qrcodes: [],
    folders: [],
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
    addFolder(state, folder) {
      state.folders.push(folder);
      localStorage.setItem('folders', JSON.stringify(state.folders));
    },
    removeFolder(state, id) {
      state.folders = state.folders.filter((folder) => folder.id !== id);
      localStorage.setItem('folders', JSON.stringify(state.folders));
    },
    initialiseStore(state) {
      const qrcodes = localStorage.getItem('qrcodes');
      if (qrcodes) {
        state.qrcodes = JSON.parse(qrcodes);
      }

      const folders = localStorage.getItem('folders');
      if (folders) {
        state.folders = JSON.parse(folders);
      }
    },
  },
  getters: {
    all(state) {
      return state.qrcodes;
    },
    getQRCodes: (state) => (sort, folderId) => {
      let qrcodes = state.qrcodes.slice();

      // Filter on folder
      if (folderId) {
        qrcodes = qrcodes.filter((qrcode) => qrcode.folder === folderId);
      }

      if (sort === 'date-asc') {
        // Sort by date asc (oldest first)
        qrcodes.sort((q1, q2) => moment(q1.date) - moment(q2.date));
      } else if (sort === 'title') {
        // Sort by title
        qrcodes.sort((q1, q2) => q2.title < q1.title);
      } else {
        // Default sort : date desc (newest first)
        qrcodes.sort((q1, q2) => moment(q2.date) - moment(q1.date));
      }

      return qrcodes;
    },
    getFolders: (state) => state.folders.sort((f1, f2) => f2.name < f1.name),
  },
  actions: {
    saveQRCode(context, qrc) {
      const qrcode = qrc;
      qrcode.id = uuidv4();
      qrcode.date = new Date();
      context.commit('addQRCode', qrcode);
    },
    createFolder(context, n) {
      const folder = { id: uuidv4(), name: n };
      context.commit('addFolder', folder);
      return folder.id;
    },
  },
  modules: {
  },
});
