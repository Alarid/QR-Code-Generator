<template>
  <div class="qrcode-generator mt-5">
    <QRCode ref="qrcodeImg" class="my-5 qrcode"/>

    <form class="my-5 w-75 d-block mx-auto" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">URL</div>
            </div>
            <input type="url" class="form-control form-control-lg" placeholder="Paste your URL here"
              v-model="qrcode.url">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button type="submit" class="btn btn-primary btn-lg mb-3 w-100">
            Generate
          </button>
        </div>

        <div class="col-6">
          <button type="button" class="btn btn-warning btn-lg w-100 mb-3"
            :disabled="!qrcode.generated" @click="saveQRCode(qrcode.url)">
            Save...
          </button>
        </div>
      </div>
    </form>

    <div class="alert alert-danger w-50 mx-auto" role="alert" v-for="error in errors" :key="error">
      {{error}}
    </div>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';

export default {
  name: 'QRCodeGenerator',
  data() {
    return {
      qrcode: {
        url: '',
        generated: false,
      },
      errors: [],
    };
  },
  watch: {
    /* eslint-disable-next-line func-names, no-unused-vars */
    'qrcode.url': function (newUrl, oldUrl) {
      this.qrcode.generated = false;
      this.$refs.qrcodeImg.reset();
    },
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$refs.qrcodeImg.set(this.qrcode.url);
        this.qrcode.generated = true;
      }
    },
    validate() {
      this.errors = [];
      if (this.qrcode.url.trim().length === 0) {
        this.errors.push('The URL is required to generate your QR Code');
      }
      return this.errors.length === 0;
    },
    saveQRCode(url) {
      this.$router.push({
        name: 'Save QR Code',
        params: { url },
      });
    },
  },
  components: {
    QRCode,
  },
};
</script>

<style scoped lang="scss">
.qrcode {
  height: 250px;
}
</style>
