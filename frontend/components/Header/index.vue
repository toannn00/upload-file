<template>
  <div class="text-center my-8">
    <h1 class="text-h2 font-weight-bold">Image Uploader</h1>
    <p class="text-subtitle-1 mt-2">
      A tool to upload images and get a link to them.
    </p>
    <div v-if="email" class="mt-4">
      <p class="text-subtitle-2">
        Logged in as: {{ email }}
        <v-btn text small color="primary" @click="logout">Logout</v-btn>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Header",
})
export default class Header extends Vue {
  get email(): string | null {
    return this.$store.state.auth.email;
  }

  logout(): void {
    this.$store.dispatch("auth/logout");
  }
}
</script>
