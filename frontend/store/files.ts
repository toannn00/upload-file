import { ActionTree, MutationTree, GetterTree } from "vuex";
import { STORE } from "~/constants/store";
import { FileData } from "~/types/api";

interface FilesState {
  needsRefresh: boolean;
  files: FileData[];
}

export const state = (): FilesState => ({
  needsRefresh: false,
  files: [],
});

export const mutations: MutationTree<FilesState> = {
  setFiles(state, files: FileData[]) {
    state.files = files;
  },
};

export const actions: ActionTree<FilesState, any> = {
  async fetchFiles({ dispatch, commit }, token: string) {
    try {
      const response = await this.$fileService.fetchFiles(token);
      if (response.success) {
        commit("setFiles", response.data.files);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(STORE.ACTIONS.AUTH.LOGOUT, null, { root: true });
      }
      throw error;
    }
  },

  async uploadFile(
    { dispatch },
    { file, token }: { file: File; token: string }
  ) {
    try {
      const response = await this.$fileService.uploadFile(file, token);

      if (response?.success) {
        await dispatch("fetchFiles", token);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(STORE.ACTIONS.AUTH.LOGOUT, null, { root: true });
      }
      throw error;
    }
  },
};

export const getters: GetterTree<FilesState, any> = {
  getFiles: (state) => state.files,
};
