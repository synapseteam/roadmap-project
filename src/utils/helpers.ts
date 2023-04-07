import dayjs from "dayjs";

export const commonDateFormats = {
  dateFormat: "MM/DD/YYYY",
  dateTime: "MM/DD/YYYY hh:mm A",
  timeDate: "hh:mm A - MM/DD/YYYY",
  timeDateWithSpace: "hh:mm A MM/DD/YYYY",
  time: "hh:mm A",
  monthDateFormat: "MMM DD, YYYY",
};
export const parseISOString = (s: string) => {
  const date = new Date(s);
  return dayjs(date).format(commonDateFormats.monthDateFormat);
};
