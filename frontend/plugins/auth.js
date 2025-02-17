export default function ({ store, app }) {
  if (process.client) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      store.commit("auth/setAuth", { email, token });
    }
  }
}
