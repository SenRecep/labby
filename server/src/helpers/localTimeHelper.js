import moment from "moment";
moment.locale("tr");
export const getLocalDate = () => {
  return moment().toDate();
};

export const getLocalMoment = () => {
  return moment();
};
