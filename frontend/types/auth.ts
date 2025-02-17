export interface SnackbarState {
  show: boolean;
  message: string;
  color: string;
}

export interface AuthState {
  email: string | null;
  token: string | null;
  snackbar: SnackbarState;
}

export interface AuthPayload {
  email: string;
  token: string;
}

export interface MessagePayload {
  message: string;
  color: string;
}
