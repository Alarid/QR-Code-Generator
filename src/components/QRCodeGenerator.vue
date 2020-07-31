<template>
  <div class="qrcode-generator mt-5">
    <h1 class="text-center">QR Code Generator</h1>

    <img class="w-25 d-block mx-auto my-5" :src="qrcode.imgSrc" alt="QR Code"/>

    <form class="w-50 mx-auto my-5" @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="url" class="form-control form-control-lg" placeholder="URL"
          v-model="qrcode.url">
      </div>

      <button type="submit" class="btn btn-primary btn-lg w-100">Generate</button>
    </form>

    <div class="alert alert-danger w-50 mx-auto" role="alert" v-for="error in errors" :key="error">
      {{error}}
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'QRCodeGenerator',
  data() {
    return {
      qrcode: {
        url: '',
        imgSrc: require('@/assets/qrcode_placeholder.png'), /* eslint-disable-line global-require */
      },
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      console.log('on submit');
      if (this.validate()) {
        // axios.get(`https://www.qrtag.net/api/qr_4.png?url=${this.qrcode.url}`)
        //   .then((response) => { this.qrcode.imgSrc = response.data; })
        //   .catch((error) => console.log(error));
        this.qrcode.imgSrc = `https://www.qrtag.net/api/qr_4.png?url=${this.qrcode.url}`;
        console.log('ok');
      }
    },
    validate() {
      this.errors = [];
      if (this.qrcode.url.trim().length === 0) {
        this.errors.push('The URL is required to generate your QR Code');
      }
      return this.errors.length === 0;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
