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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MAX_FILE_SIZE } from "~/constants";
import { FileRules, FileListComponent, UploadResponse } from "~/types/api";
import "~/types/vue-augmentation";

@Component({
  name: "FileUpload",
})
export default class FileUpload extends Vue {
  private file: File | null = null;
  private loading = false;

  private rules: FileRules = {
    maxSize: (file: File | null) => {
      return (
        !file ||
        file.size <= MAX_FILE_SIZE ||
        "File size should be less than 5MB"
      );
    },
  };

  get isValidFileSize(): boolean {
    return !!this.file && this.file.size <= MAX_FILE_SIZE;
  }

  onFileChange(file: File | null): void {
    this.file = file;
  }

  async handleUpload(): Promise<void> {
    if (!this.file) return;

    this.loading = true;
    try {
      const formData = new FormData();
      formData.append("file", this.file);

      const token = this.$store.state.auth.token;
      const response = await this.$axios.$post<UploadResponse>(
        "/api/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.success) {
        this.$store.dispatch("auth/showMessage", {
          message: "File uploaded successfully!",
          color: "success",
        });
        this.file = null;

        const fileListComponent = this.$parent?.$children.find(
          (child): child is FileListComponent =>
            child.$options.name === "FileList"
        );

        if (fileListComponent?.fetchFiles) {
          fileListComponent.fetchFiles();
        }
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      this.$store.dispatch("auth/showMessage", {
        message: error.response?.data?.message || "Error uploading file",
        color: "error",
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
