// created parse date function 2022-05-10T22:57:28.000000Z
// created useDate composable 2022-05-10T22:57:28.000000Z

// created parse date function 2022-05-10T22:57:28.000000Z  return DateTimeFormat
export function parseDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export const useDateTime = (str: string): string => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
    // timeZone: 'Australia/Sydney',
  }).format(new Date(str));
};
// shows date format 1 second
export const useDate = (str: string): string => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeZone: 'Australia/Sydney',
  }).format(new Date(str));
};
