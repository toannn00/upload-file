import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { UploadResponse, FileData } from "~/types/api";

export class FileService {
  constructor(private readonly axios: NuxtAxiosInstance) {}

  async uploadFile(file: File, token: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return await this.axios.$post<UploadResponse>(
      "/api/files/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async fetchFiles(
    token: string
  ): Promise<{ success: boolean; data: { files: FileData[] } }> {
    return await this.axios.$get("/api/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
