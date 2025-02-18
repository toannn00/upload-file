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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import "~/types/vue-augmentation";

@Component({
  name: "Login",
})
export default class Login extends Vue {
  private valid = false;
  private loading = false;
  private email = "";
  private password = "";
  private error: string | null = null;
  private successMessage: string | null = null;

  private emailRules = [
    (email: string) => !!email || "Email is required",
    (email: string) => /.+@.+\..+/.test(email) || "Email must be valid",
  ];

  private passwordRules = [
    (password: string) => !!password || "Password is required",
    (password: string) =>
      password.length >= 6 || "Password must be at least 6 characters",
  ];

  get isLoggedIn(): boolean {
    return !!this.$store.state.auth.token;
  }

  async handleSubmit(): Promise<void> {
    if (!this.$refs.form || !(this.$refs.form as any).validate()) return;

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
          (this.$refs.form as any).reset();
        }
      }
    } catch (error: any) {
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
  }
}
</script>
