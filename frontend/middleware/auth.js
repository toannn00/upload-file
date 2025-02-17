export default function ({ store }) {
  if (process.client) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email && !store.state.auth.token) {
      store.commit("auth/setAuth", { email, token });
    }
  }
}
