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
import { Vue, Component } from 'vue-property-decorator'
import { SnackbarState } from '~/types/auth'

@Component({
  name: "DefaultLayout"
})
export default class DefaultLayout extends Vue {
  get snackbar(): SnackbarState {
    return this.$store.state.auth.snackbar
  }
}
</script>
