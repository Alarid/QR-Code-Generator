<template>
  <div class="home">
    <QRCodeGenerator/>
    <hr/>
    <QRCodesList v-if="atLeastOneQRCode"/>
  </div>
</template>

<script>
import QRCodeGenerator from '@/components/QRCodeGenerator.vue';
import QRCodesList from '@/components/QRCodesList.vue';

export default {
  name: 'Home',
  components: {
    QRCodeGenerator,
    QRCodesList,
  },
  computed: {
    atLeastOneQRCode() {
      return this.$store.state.qrcodes.length > 0;
    },
  },
};
</script>
