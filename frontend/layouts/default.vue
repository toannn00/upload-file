<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <client-only>
          <template v-if="!isLoading">
            <Login v-if="!isLoggedIn" />
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
        <Nuxt v-if="!$nuxt.error" />
        <error v-else :error="$nuxt.error" />
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
  mounted() {
    // Set loading to false after a short delay to ensure auth state is loaded
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
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
