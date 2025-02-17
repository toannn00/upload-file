<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <client-only>
          <template>
            <div v-if="isLoading">
              <v-row justify="center" align="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mt-4"
                ></v-progress-circular>
              </v-row>
            </div>
            <template v-else>
              <Login v-if="!isLoggedIn" />
              <template v-else>
                <FileUpload />
                <FileList class="mt-4" />
              </template>
            </template>
          </template>
        </client-only>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      isLoading: true,
    };
  },
  async created() {
    try {
      if (process.client) {
        // Clear any existing auth state first
        this.$store.commit("auth/clearAuth");

        // Then initialize from localStorage
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          this.$store.commit("auth/setAuth", { email, token });
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    snackbar() {
      return this.$store.state.auth.snackbar;
    },
    isLoggedIn() {
      return !!this.$store.state.auth.token;
    },
  },
};
</script>
