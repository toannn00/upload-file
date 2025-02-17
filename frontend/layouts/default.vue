<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <client-only>
          <template v-if="!isLoading">
            <template v-if="!isLoggedIn">
              <Login />
            </template>
            <template v-else>
              <FileUpload />
              <FileList class="mt-4" />
            </template>
          </template>
          <v-row v-else justify="center" align="center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="mt-4"
            ></v-progress-circular>
          </v-row>
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
      console.log("Starting auth initialization...");
      console.log("Current auth state:", {
        token: this.$store.state.auth.token,
        email: this.$store.state.auth.email,
      });

      if (process.client) {
        console.log("localStorage values:", {
          token: localStorage.getItem("token"),
          email: localStorage.getItem("email"),
        });
      }

      await this.$store.dispatch("auth/initAuth");

      console.log("After initialization auth state:", {
        token: this.$store.state.auth.token,
        email: this.$store.state.auth.email,
      });

      console.log("isLoggedIn:", this.isLoggedIn);
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
