<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-card-title>Your Images</v-card-title>
        <v-card-text>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
            class="mb-4"
          ></v-progress-linear>
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
          <v-alert v-else-if="!loading" type="info" class="mt-4">
            No files uploaded yet.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { formatFileSize } from "~/utils/file.util";

@Component({
  name: "FileList",
})
export default class FileList extends Vue {
  private loading = false;
  private formatFileSize = (bytes: number): string => formatFileSize(bytes);

  get files() {
    return this.$store.getters["files/getFiles"];
  }

  mounted(): void {
    this.fetchFiles();
  }

  async fetchFiles(): Promise<void> {
    this.loading = true;
    try {
      const token = this.$store.state.auth.token;
      await this.$store.dispatch("files/fetchFiles", token);
    } catch (error: any) {
      console.error("Error fetching files:", error);
      this.$store.dispatch("auth/showMessage", {
        message: error.response?.data?.message || "Error fetching files",
        color: "error",
      });
    } finally {
      this.loading = false;
    }
  }
}
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
