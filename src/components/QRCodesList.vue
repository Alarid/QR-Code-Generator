<template>
  <div class="qrcodes-list">
    <h2>My QR Codes</h2>
    <p>Here is a list of your saved QR Codes</p>
    <div class="row" v-for="qrcode in qrcodes" :key="qrcode.id">
      <div class="col-auto">
        <QRCode :imgSrc="qrcode.url" />
      </div>
      <div class="col-auto">
        <h4>{{qrcode.title}}</h4>
        <a :href="qrcode.url"> {{qrcode.url}} </a>
      </div>
      <div class="col-auto ml-auto">
        <button type="button" class="btn btn-danger" @click="removeQRCode(qrcode.id)">
          <b-icon-trash/> Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';

export default {
  name: 'QRCodesList',
  computed: {
    qrcodes() {
      return this.$store.state.qrcodes;
    },
  },
  methods: {
    removeQRCode(id) {
      this.$store.commit('removeQRCode', id);
    },
  },
  components: {
    QRCode,
  },
};
</script>

<style scoped lang="scss">
.qrcode {
  height: 150px;
}
</style>
