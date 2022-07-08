import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

export const formatDay = (date: string | Date) => dayjs(date).format('D');
export const formatWeek = (date: string | Date) => dayjs(date).format('w');
export const formatMonth = (date: string | Date) => dayjs(date).format('MMM')[0];
export const formatDateString = (date: string | Date, format: string) => dayjs(date).format(format);
