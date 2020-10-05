import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const validStartDate = (start, end) => {
  return end ? dayjs(start).isSameOrBefore(end) : true;
};

export const validEndDate = (start, end) => {
  return start ? dayjs(end).isSameOrAfter(start) : true;
};
