<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-card-text>
          <v-file-input
            v-model="file"
            :loading="loading"
            accept="*/*"
            label="Select a file"
            prepend-icon="mdi-file"
            :rules="[rules.maxSize]"
            @change="onFileChange"
          ></v-file-input>
          <v-btn
            block
            color="primary"
            :disabled="!file || !isValidFileSize"
            :loading="loading"
            @click="handleUpload"
            class="mt-4"
          >
            Upload File
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export default {
  name: "FileUpload",
  data() {
    return {
      file: null,
      loading: false,
      rules: {
        maxSize: (file) => {
          return (
            !file ||
            file.size <= MAX_SIZE ||
            "File size should be less than 5MB"
          );
        },
      },
    };
  },
  computed: {
    isValidFileSize() {
      return this.file && this.file.size <= MAX_SIZE;
    },
  },
  methods: {
    onFileChange(file) {
      this.file = file;
    },
    async handleUpload() {
      if (!this.file) return;

      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("file", this.file);

        const token = this.$store.state.auth.token;
        const response = await this.$axios.$post(
          "/api/files/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.success) {
          this.$store.dispatch("auth/showMessage", {
            message: "File uploaded successfully!",
            color: "success",
          });
          this.file = null;
          const fileListComponent = this.$parent.$children.find(
            (child) => child.$options.name === "FileList"
          );
          if (fileListComponent) {
            fileListComponent.fetchFiles();
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        this.$store.dispatch("auth/showMessage", {
          message: error.response?.data?.message || "Error uploading file",
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
