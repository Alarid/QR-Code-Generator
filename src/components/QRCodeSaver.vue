<template>
  <div class="qrcode-saver">
    <div class="mt-5 row">
      <div class="col-4">
        <QRCode :imgSrc="qrcode.url" class="qrcode" />
      </div>
      <div class="col-8">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="url">URL</label>
            <input type="url" id="url" class="form-control form-control-lg" disabled
              :value="qrcode.url">
          </div>

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control form-control-lg"
              v-model="qrcode.title">
          </div>

          <button type="submit" class="btn btn-warning btn-lg mr-3">Save</button>
          <button type="cancel" class="btn btn-secondary btn-lg" @click="cancel">Cancel</button>
        </form>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error">
      {{error}}
    </div>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';

export default {
  name: 'QRCodeSaver',
  data() {
    return {
      qrcode: {
        title: '',
        url: this.$route.params.url,
      },
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        console.log(`Saving qrcode ${this.qrcode.title} - ${this.qrcode.url} `);
        this.$store.dispatch('saveQRCode', this.qrcode)
          .then(() => this.$router.push('/'));
      }
    },
    validate() {
      this.errors = [];
      if (this.qrcode.title.trim().length === 0) {
        this.errors.push('Title cannot be empty');
      }
      return this.errors.length === 0;
    },
    cancel() {
      this.$router.push('/');
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
