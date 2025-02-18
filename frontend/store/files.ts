import { ActionTree, MutationTree, GetterTree } from "vuex";
import { FileService } from "~/services/file.service";

interface FilesState {
  needsRefresh: boolean;
  files: any[];
}

export const state = (): FilesState => ({
  needsRefresh: false,
  files: [],
});

export const mutations: MutationTree<FilesState> = {
  setFiles(state, files: any[]) {
    state.files = files;
  },
};

export const actions: ActionTree<FilesState, any> = {
  async fetchFiles({ commit }, token: string) {
    try {
      const fileService = new FileService(this.$axios);
      const response = await fileService.fetchFiles(token);

      if (response.success) {
        commit("setFiles", response.data.files);
      }
    } catch (error: any) {
      console.error("Error fetching files:", error);
      throw error;
    }
  },
};

export const getters: GetterTree<FilesState, any> = {
  getFiles: (state) => state.files,
};
