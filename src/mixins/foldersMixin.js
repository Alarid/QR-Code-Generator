export default {
  methods: {
    foldersSelectOptions(defaultOption = 'Select a folder') {
      const folders = this.$store.getters.getFolders;
      let options = [{ value: null, text: defaultOption }];
      if (folders.length > 0) {
        options = options.concat(folders.map((f) => ({ value: f.id, text: f.name })));
      } else {
        options = options.concat([{ text: 'No folders found', disabled: true }]);
      }
      return options;
    },
  },
};
