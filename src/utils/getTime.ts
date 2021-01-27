export function getTime(time: number): string {
  let hr = (new Date(time).getHours() + 24) % 24;
  let mins = new Date(time).getMinutes();
  let displayMin = mins.toString();
  if (mins < 10) {
    displayMin = '0' + mins.toString();
  }

  let mid = 'AM';
  if (hr === 0) {
    hr = 12;
  } else if (hr > 12) {
    hr %= 12;
    mid = 'PM';
  }
  return hr + ':' + displayMin + ' ' + mid;
}
