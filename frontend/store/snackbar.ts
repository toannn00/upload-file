import { SnackbarState, MessagePayload } from "~/types/auth";
import { ActionTree } from "vuex";

export const state = (): SnackbarState => ({
  show: false,
  message: "",
  color: "success",
});

export const mutations = {
  showSnackbar(
    state: SnackbarState,
    { message, color = "success" }: MessagePayload
  ): void {
    state.show = true;
    state.message = message;
    state.color = color;
  },
  hideSnackbar(state: SnackbarState): void {
    state.show = false;
  },
};

export const actions: ActionTree<SnackbarState, any> = {
  showMessage({ commit }: { commit: Function }, payload: MessagePayload): void {
    const { message, color = "success" } = payload;
    commit("showSnackbar", { message, color });
    setTimeout(() => commit("hideSnackbar"), 2000);
  },
};
