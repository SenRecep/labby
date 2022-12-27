export const getLocalDate = () => {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
};
