<template>
  <div class="container">
    <QRCodeGenerator/>
  </div>
</template>

<script>
import QRCodeGenerator from '@/components/QRCodeGenerator.vue';

export default {
  name: 'Home',
  components: {
    QRCodeGenerator,
  },
};
</script>
