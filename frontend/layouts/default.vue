<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <div v-if="isLoading">
          <v-row justify="center" align="center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="mt-4"
            ></v-progress-circular>
          </v-row>
        </div>
        <div v-else>
          <Login v-if="!isLoggedIn" />
          <div v-else>
            <FileUpload />
            <FileList class="mt-4" />
          </div>
        </div>
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
  async beforeMount() {
    try {
      if (process.client) {
        await this.$store.dispatch("auth/initAuth");
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
