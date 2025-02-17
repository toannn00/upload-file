<template>
  <div class="text-center my-8">
    <h1 class="text-h2 font-weight-bold">File Uploader</h1>
    <p class="text-subtitle-1 mt-2">
      A tool to upload files and get a link to them.
    </p>
    <div v-if="email" class="mt-4">
      <p class="text-subtitle-2">
        Logged in as: {{ email }}
        <v-btn text small color="primary" @click="logout">Logout</v-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    email() {
      return this.$store.state.auth.email;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
