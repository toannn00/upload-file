import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "~/constants";

export const emailRules = [
  (email: string) => !!email || "Email is required",
  (email: string) => /.+@.+\..+/.test(email) || "Email must be valid",
];

export const passwordRules = [
  (password: string) => !!password || "Password is required",
  (password: string) =>
    password.length >= 6 || "Password must be at least 6 characters",
];

export const fileRules = {
  maxSize: (file: File | null) => {
    return (
      !file || file.size <= MAX_FILE_SIZE || "File size should be less than 5MB"
    );
  },
  acceptedExtention: (file: File | null) => {
    return (
      !file ||
      ACCEPTED_MIME_TYPES.includes(file.type) ||
      "File should be an image (jpg, jpeg, png, gif, svg)"
    );
  },
};
