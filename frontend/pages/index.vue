<template>
  <div>
    <v-row v-if="isLoading" justify="center" align="center">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mt-4"
      ></v-progress-circular>
    </v-row>
    <template v-else>
      <Login v-if="!isLoggedIn" />
      <template v-else>
        <FileUpload />
        <FileList class="mt-4" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { STORE_ACTIONS } from "~/constants/store";

@Component({
  name: "HomePage",
})
export default class HomePage extends Vue {
  private isLoading = true;

  get isLoggedIn(): boolean {
    return !!this.$store.state.auth.token;
  }

  mounted(): void {
    this.initAuth();
  }

  private async initAuth(): Promise<void> {
    try {
      if (process.client) {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          this.$store.dispatch(STORE_ACTIONS.AUTH.LOGIN, { token, email });
        }
      }
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
