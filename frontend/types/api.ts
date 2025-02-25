export interface UploadResponse {
  success: boolean;
  data?: {
    message?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
  };
}

export interface FileListComponent extends Vue {
  fetchFiles(): void;
}

export interface FileRules {
  maxSize: (file: File | null) => boolean | string;
  acceptedExtention: (file: File | null) => boolean | string;
}

export interface FileData {
  _id: string;
  url: string;
  originalName: string;
  format: string;
  size: number;
}
