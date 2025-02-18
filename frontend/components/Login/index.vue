<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
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
import { AuthService } from "~/services/auth.service";
import { emailRules, passwordRules } from "~/utils/validation.util";

@Component({
  name: "Login",
})
export default class Login extends Vue {
  private valid = false;
  private loading = false;
  private email = "";
  private password = "";
  private authService!: AuthService;

  created() {
    this.authService = new AuthService(this.$axios);
  }

  private emailRules = emailRules;
  private passwordRules = passwordRules;

  async handleSubmit(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.authService.authenticate(
        this.email,
        this.password
      );

      if (response.success && response.data?.token) {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          token: response.data.token,
        });
        this.$store.dispatch("auth/showMessage", {
          message: "Successfully logged in!",
          color: "success",
        });
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
