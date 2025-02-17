export default async function ({ store, app }) {
  if (process.client) {
    await new Promise((resolve) => {
      if (document.readyState !== "loading") {
        resolve();
      } else {
        document.addEventListener("DOMContentLoaded", resolve);
      }
    });

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      store.commit("auth/setAuth", { email, token });
    }
  }
}
