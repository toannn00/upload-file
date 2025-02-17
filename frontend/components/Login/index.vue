<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-alert
        v-if="error"
        type="error"
        dismissible
        @input="error = null"
        class="mb-4"
      >
        {{ error }}
      </v-alert>
      <v-alert
        v-if="successMessage"
        type="success"
        dismissible
        @input="successMessage = null"
        class="mb-4"
      >
        {{ successMessage }}
      </v-alert>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
              outlined
              :disabled="loading"
              hide-details="auto"
              class="mb-4"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
              outlined
              :disabled="loading"
              hide-details="auto"
              class="mb-4"
            />
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              block
              @click="handleSubmit"
            >
              Login/Register
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      email: "",
      password: "",
      error: null,
      successMessage: null,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.auth.token;
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        const response = await this.$axios.$post("/api/auth/authenticate", {
          email: this.email,
          password: this.password,
        });

        if (response.success && response.data.token) {
          await this.$store.dispatch("auth/login", {
            email: this.email,
            token: response.data.token,
          });
          this.$store.dispatch("auth/showMessage", {
            message: "Successfully logged in!",
            color: "success",
          });
          if (this.$refs.form) {
            this.$refs.form.reset();
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        if (error.response) {
          this.$store.dispatch("auth/showMessage", {
            message: error.response.data.message || "Authentication failed",
            color: "error",
          });
        } else {
          this.$store.dispatch("auth/showMessage", {
            message: "An error occurred while trying to authenticate",
            color: "error",
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
