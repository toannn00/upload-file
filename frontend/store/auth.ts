import { AuthState, AuthPayload, MessagePayload } from "~/types/auth";

export const state = (): AuthState => ({
  email: null,
  token: null,
  snackbar: {
    show: false,
    message: "",
    color: "success",
  },
});

export const mutations = {
  setAuth(state: AuthState, { email, token }: AuthPayload): void {
    state.email = email;
    state.token = token;
  },
  clearAuth(state: AuthState): void {
    state.email = null;
    state.token = null;
  },
  showSnackbar(
    state: AuthState,
    { message, color = "success" }: MessagePayload
  ): void {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
  },
  hideSnackbar(state: AuthState): void {
    state.snackbar.show = false;
  },
};

export const actions = {
  login({ commit }: { commit: Function }, payload: AuthPayload): void {
    if (process.client) {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("email", payload.email);
    }
    commit("setAuth", payload);
  },
  logout({ commit }: { commit: Function }): void {
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
    commit("clearAuth");
  },
  showMessage({ commit }: { commit: Function }, payload: MessagePayload): void {
    const { message, color = "success" } = payload;
    commit("showSnackbar", { message, color });
    setTimeout(() => commit("hideSnackbar"), 2000);
  },
};
