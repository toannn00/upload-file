<template>
  <div>
    <client-only>
      <div v-if="mounted">
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
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",

  data() {
    return {
      isLoading: true,
      mounted: false,
    };
  },

  computed: {
    isLoggedIn(): boolean {
      return !!this.$store.state.auth.token;
    },
  },

  mounted() {
    this.mounted = true;
    this.initAuth();
  },

  methods: {
    async initAuth(): Promise<void> {
      try {
        if (process.client) {
          const token = localStorage.getItem("token");
          const email = localStorage.getItem("email");

          if (token && email) {
            this.$store.commit("auth/setAuth", { email, token });
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
