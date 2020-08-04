<template>
  <div class="qrcode-save">
    <QRCodeSaver/>
  </div>
</template>

<script>
import QRCodeSaver from '@/components/QRCodeSaver.vue';

export default {
  name: 'QRCodeSave',
  components: {
    QRCodeSaver,
  },
};
</script>
