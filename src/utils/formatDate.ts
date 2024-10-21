import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

interface IFormatDate {
  value?: string | Date;
}

export const daysify = (date?: Date | string | undefined | number, opts?: dayjs.OptionType) =>
  dayjs(date, opts);

export const substractTimezone = (date: Date | string) => {
  const offset = dayjs().utcOffset() / 60;

  return dayjs(date).add(offset, 'hours');
};
export const substractTimezoneIso = (date: Date | string) => substractTimezone(date).toISOString();

export const formatDate = ({ value }: IFormatDate) => {
  if (!value) return '';

  return substractTimezone(value).format('DD/MM/YYYY hh:mm A');
};

export const humanizeDate = (date: Date | string) =>
  daysify(new Date()).to(date, false).toLocaleUpperCase();
