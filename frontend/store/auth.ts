import { ActionTree } from "vuex";
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

export const actions: ActionTree<AuthState, any> = {
  async authenticate(
    { dispatch },
    { email, password }: { email: string; password: string }
  ) {
    try {
      const response = await this.$authService.authenticate(email, password);

      if (response.success && response.data?.token) {
        await dispatch("login", {
          email,
          token: response.data.token,
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      throw error;
    }
  },

  login({ commit }, payload: AuthPayload): void {
    if (process.client) {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("email", payload.email);
    }
    commit("setAuth", payload);
  },

  logout({ commit }): void {
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
    commit("clearAuth");
  },
};
