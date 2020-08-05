<template>
  <div class="qrcodes-list mb-5">
    <h2>My QR Codes</h2>

    <!-- Sorting & filtering -->
    <div class="list-controls my-3">
      <form>
        <b-form-row>
          <b-form-group class="col-3">
            <label for="sortBy">Sort by:</label>
            <b-form-select v-model="sort" :options="sortOptions" id="sortBy" @change="changeSort "/>
          </b-form-group>

          <b-form-group class="col-3">
            <label for="folder">Folder:</label>
            <b-form-select v-model="folder" :options="foldersSelectOptions('All folders')"
              @change="changeSort" id="folder" />
          </b-form-group>
        </b-form-row>
      </form>
    </div>

    <!-- QR Codes list -->
    <div class="row" v-for="qrcode in qrcodes" :key="qrcode.id">
      <div class="col-auto">
        <QRCode :imgSrc="qrcode.url" />
      </div>
      <div class="col-auto">
        <h4>{{qrcode.title}}</h4>
        <div v-if="qrcode.folder" class="text-success font-weight-bold">
          <b-icon-folder-fill/> {{ folderName(qrcode.folder) }}
        </div>
        <a :href="qrcode.url"> {{qrcode.url}} </a> <br>
        <small class="date">{{printDate(qrcode.date)}}</small>
      </div>
      <div class="col-auto ml-auto">
        <b-button variant="danger" size="sm" @click="removeQRCode(qrcode.id)">
          <b-icon-trash/> Supprimer
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';
import moment from 'moment';
import foldersMixin from '@/mixins/foldersMixin';

export default {
  name: 'QRCodesList',
  data() {
    return {
      sort: 'date-desc',
      folder: null,
      qrcodes: [],
      sortOptions: [
        { value: 'date-desc', text: 'Date (newest first)', selected: true },
        { value: 'date-asc', text: 'Date (oldest first)' },
        { value: 'title', text: 'Title' },
      ],
    };
  },
  created() {
    this.getQRCodes();
  },
  methods: {
    removeQRCode(id) {
      this.$store.commit('removeQRCode', id);
    },
    printDate(d) {
      return moment(d).fromNow();
    },
    getQRCodes() {
      this.qrcodes = this.$store.getters.getQRCodes(this.sort, this.folder);
    },
    changeSort() {
      this.getQRCodes();
    },
    folderName(id) {
      const folder = this.$store.state.folders.filter((f) => f.id === id).pop();
      if (folder) {
        return folder.name;
      }
      console.error(`Folder with id ${id} not found`);
      return '';
    },
  },
  components: {
    QRCode,
  },
  mixins: [foldersMixin],
};
</script>

<style scoped lang="scss">
.qrcode {
  height: 150px;
}

.list-controls {
  label {
    font-weight: bold;
  }
}
</style>
