import { AuthState, AuthPayload } from "~/types/auth";

export const state = (): AuthState => ({
  email: null,
  token: null,
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
};
