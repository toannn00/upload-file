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
import { emailRules, passwordRules } from "~/utils/validation.util";
import { STORE } from "~/constants/store";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "~/constants/messages";

@Component({
  name: "Login",
})
export default class Login extends Vue {
  private valid = false;
  private loading = false;
  private email = "";
  private password = "";
  private emailRules = emailRules;
  private passwordRules = passwordRules;

  async handleSubmit(): Promise<void> {
    this.loading = true;

    try {
      await this.$store.dispatch(STORE.ACTIONS.AUTH.AUTHENTICATE, {
        email: this.email,
        password: this.password,
      });

      this.$store.dispatch(STORE.ACTIONS.SNACKBAR.SHOW_MESSAGE, {
        message: SUCCESS_MESSAGES.LOGIN,
        color: "success",
      });
    } catch (error) {
      console.error("Authentication error:", error);

      this.$store.dispatch(STORE.ACTIONS.SNACKBAR.SHOW_MESSAGE, {
        message: ERROR_MESSAGES.AUTH_FAILED,
        color: "error",
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
