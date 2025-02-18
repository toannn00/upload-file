import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AuthResponse } from "~/types/api";

export class AuthService {
  constructor(private readonly axios: NuxtAxiosInstance) {}

  async authenticate(email: string, password: string): Promise<AuthResponse> {
    return await this.axios.$post("/api/auth/authenticate", {
      email,
      password,
    });
  }
}
