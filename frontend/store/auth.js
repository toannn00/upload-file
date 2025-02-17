export const state = () => ({
  email: null,
  token: null,
  snackbar: {
    show: false,
    message: "",
    color: "success",
  },
});

export const mutations = {
  setAuth(state, { email, token }) {
    state.email = email;
    state.token = token;
  },
  clearAuth(state) {
    state.email = null;
    state.token = null;
  },
  showSnackbar(state, { message, color }) {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
  },
  hideSnackbar(state) {
    state.snackbar.show = false;
  },
};

export const actions = {
  login({ commit }, { email, token }) {
    if (process.client) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    }
    commit("setAuth", { email, token });
  },
  logout({ commit }) {
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
    commit("clearAuth");
  },
  initAuth({ commit }) {
    return new Promise((resolve) => {
      if (!process.client) {
        resolve();
        return;
      }

      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (token && email) {
        commit("setAuth", { email, token });
      }

      resolve();
    });
  },
  showMessage({ commit }, { message, color = "success" }) {
    commit("showSnackbar", { message, color });
    setTimeout(() => {
      commit("hideSnackbar");
    }, 2000);
  },
};
