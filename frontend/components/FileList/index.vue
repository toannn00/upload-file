<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-card-title>Your Files</v-card-title>
        <v-card-text>
          <v-list v-if="files.length > 0">
            <v-list-item v-for="file in files" :key="file._id">
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="file.url" target="_blank" class="file-link">
                    {{ file.originalName }}
                  </a>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Format: {{ file.format }} | Size:
                  {{ formatFileSize(file.size) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-alert v-else type="info" class="mt-4">
            No files uploaded yet.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FileList",
  data() {
    return {
      files: [],
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const token = this.$store.state.auth.token;
        const response = await this.$axios.$get("/api/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.success) {
          this.files = response.data.files;
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        this.$store.dispatch("auth/showMessage", {
          message: error.response?.data?.message || "Error fetching files",
          color: "error",
        });
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },
  },
};
</script>

<style scoped>
.file-link {
  text-decoration: none;
  color: #1976d2;
}
.file-link:hover {
  text-decoration: underline;
}
</style>
