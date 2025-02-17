<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <Nuxt />
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { SnackbarState } from "~/types/auth";

export default Vue.extend({
  name: "DefaultLayout",

  computed: {
    snackbar(): SnackbarState {
      return this.$store.state.auth.snackbar;
    },
  },
});
</script>
