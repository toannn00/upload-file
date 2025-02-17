<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <client-only>
          <Login v-if="!isLoggedIn" />
          <template v-if="isLoggedIn">
            <FileUpload />
            <FileList class="mt-4" />
          </template>
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
