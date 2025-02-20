import { Plugin } from "@nuxt/types";
import { FileService } from "~/services/file.service";
import { AuthService } from "~/services/auth.service";

declare module "vue/types/vue" {
  interface Vue {
    $fileService: FileService;
    $authService: AuthService;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $fileService: FileService;
    $authService: AuthService;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $fileService: FileService;
    $authService: AuthService;
  }
}

const servicesPlugin: Plugin = ({ $axios }, inject) => {
  const fileService = new FileService($axios);
  const authService = new AuthService($axios);

  inject("fileService", fileService);
  inject("authService", authService);
};

export default servicesPlugin;
