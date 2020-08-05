<template>
  <div class="qrcode-saver">
    <div class="mt-5 row">
      <!-- QR Code Image -->
      <div class="col-4">
        <QRCode :imgSrc="qrcode.url" class="qrcode" />
      </div>

      <!-- Form -->
      <div class="col-8">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="url">URL</label>
            <input type="url" id="url" class="form-control" disabled
              :value="qrcode.url">
          </div>

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control"
              v-model="qrcode.title">
          </div>

          <b-form-group>
            <label for="folder">Folder</label>
            <span class="float-right">
              <a href="#" class="text-success" v-b-modal.modalCreateFolder>
                <b-icon-plus-circle-fill/> Create a new folder
              </a>
            </span>
            <b-form-select v-model="qrcode.folder"
              :options="foldersSelectOptions('Select a folder for you QR Code')" />
          </b-form-group>

          <b-button type="submit" variant="warning" class="mr-3 px-3"> Save </b-button>
          <b-button variant="outline-secondary" @click="cancel" class="px-3"> Cancel </b-button>
        </form>
      </div>
    </div>

    <!-- Alerts -->
    <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error">
      {{error}}
    </div>

    <!-- New folder modal -->
    <b-modal id="modalCreateFolder" title="Create new folder" ref="modal"
      @show="resetModal" @hidden="resetModal" @ok="handleOk"
      ok-variant="success" cancel-variant="outline-secondary">
      <form ref="folderForm" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="folderNameState" label="Name" label-for="folderName"
          invalid-feedback="Name is required">
          <b-form-input id="folderName" v-model="folderName" :state="folderNameState"
            autofocus required />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';
import foldersMixin from '@/mixins/foldersMixin';

export default {
  name: 'QRCodeSaver',
  data() {
    return {
      qrcode: {
        title: '',
        url: this.$route.params.url,
        folder: null,
      },
      folderNameState: null,
      folderName: '',
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
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
    checkFormValidity() {
      const valid = this.$refs.folderForm.checkValidity();
      this.folderNameState = valid;
      return valid;
    },
    resetModal() {
      this.folderName = '';
      this.folderNameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$store.dispatch('createFolder', this.folderName)
        .then((id) => {
          this.qrcode.folder = id;
          this.$bvModal.hide('modalCreateFolder');
        });
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
  height: 250px;
}

form label {
  font-weight: bold;
}
</style>
