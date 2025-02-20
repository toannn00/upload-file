export const STORE = {
  ACTIONS: {
    AUTH: {
      LOGIN: "auth/login",
      LOGOUT: "auth/logout",
      AUTHENTICATE: "auth/authenticate",
    },
    FILES: {
      FETCH: "files/fetchFiles",
      UPLOAD: "files/uploadFile",
    },
    SNACKBAR: {
      SHOW_MESSAGE: "snackbar/showMessage",
    },
  },
  GETTERS: {
    FILES: {
      GET_FILES: "files/getFiles",
    },
  },
};
