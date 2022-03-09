export const valid = {
  nickname: (word: string) => {
    return word.length >= 2;
  },

  email: (email: string) => {
    return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(email);
  },

  password: (password: string) => {
    return password.length >= 8;
  },
};
