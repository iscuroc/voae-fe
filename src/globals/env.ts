export const ENV = {
  URL_BACK:
    import.meta.env.CF_PAGES_BRANCH === "staging"
      ? import.meta.env.VITE_URL_BACK_STAGING
      : import.meta.env.VITE_URL_BACK,
};
