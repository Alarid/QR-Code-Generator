<template>
  <figure class="image-wrapper" v-images-loaded:on.progress="imageProgress">
    <div class="spinner-wrapper d-flex align-items-center justify-content-center" v-if="!isLoaded">
      <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <img class="mx-auto qrcode" :src="url" alt="QR Code" v-show="isLoaded"/>
  </figure>
</template>

<script>
import imagesLoaded from 'vue-images-loaded';

const QRCODE_PLACEHOLDER = require('@/assets/qrcode_placeholder.png');

export default {
  name: 'QRCode',
  mounted() {
    if (this.imgSrc) {
      this.set(this.imgSrc);
    }
  },
  data() {
    return {
      url: QRCODE_PLACEHOLDER,
      isLoaded: true,
    };
  },
  props: {
    imgSrc: { type: String, required: false },
  },
  directives: {
    imagesLoaded,
  },
  methods: {
    reset() {
      this.url = QRCODE_PLACEHOLDER;
    },
    set(url) {
      this.isLoaded = false;
      this.url = `https://www.qrtag.net/api/qr_4.png?url=${url}`;
    },
    imageProgress(instance, image) {
      this.isLoaded = image.isLoaded;
    },
  },
};
</script>

<style scoped lang="scss">

img.qrcode {
  display: block;
  height: 100%;
}

.spinner-wrapper {
  height: 100%;
}
</style>
