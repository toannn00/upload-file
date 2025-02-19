<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-card-text>
          <v-file-input
            v-model="file"
            :loading="loading"
            accept="*/*"
            label="Select an image"
            :rules="[fileRules.acceptedExtention, fileRules.maxSize]"
            @change="onFileChange"
          ></v-file-input>
          <v-btn
            block
            color="primary"
            :disabled="!file || !isValidFileSize || !isValidFileExtention"
            :loading="loading"
            @click="handleUpload"
            class="mt-4"
          >
            Upload Image
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "~/constants";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "~/constants/messages";
import { STORE_ACTIONS } from "~/constants/store";
import { FileService } from "~/services/file.service";
import { fileRules } from "~/utils/validation.util";

@Component({
  name: "FileUpload",
})
export default class FileUpload extends Vue {
  private file: File | null = null;
  private loading = false;
  private fileService!: FileService;
  private fileRules = fileRules;

  created() {
    this.fileService = new FileService(this.$axios);
  }

  get isValidFileSize(): boolean {
    return !!this.file && this.file.size <= MAX_FILE_SIZE;
  }

  get isValidFileExtention(): boolean {
    return !!this.file && ACCEPTED_MIME_TYPES.includes(this.file.type);
  }

  onFileChange(file: File | null): void {
    this.file = file;
  }

  async handleUpload(): Promise<void> {
    if (!this.file) return;

    this.loading = true;
    try {
      const token = this.$store.state.auth.token;
      const response = await this.fileService.uploadFile(this.file, token);

      if (response?.success) {
        this.$store.dispatch(STORE_ACTIONS.SNACKBAR.SHOW_MESSAGE, {
          message: SUCCESS_MESSAGES.FILE_UPLOAD,
          color: "success",
        });
        this.file = null;

        await this.$store.dispatch(STORE_ACTIONS.FILES.FETCH, token);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      this.$store.dispatch(STORE_ACTIONS.SNACKBAR.SHOW_MESSAGE, {
        message: error.response?.data?.message || ERROR_MESSAGES.FILE_UPLOAD,
        color: "error",
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
