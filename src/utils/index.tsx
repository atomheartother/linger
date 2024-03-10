export function truncateFileName(filename: string) {
  const idx = filename.lastIndexOf('.');
  return filename.substring(
    0,
    filename.length * Number(idx === -1) + idx * Number(idx !== -1),
  );
}

function padNumber(n: number) {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
}

export function duration(n: number) {
  const int = Math.round(n);
  const minutes = Math.floor(int / 60);
  const seconds = int % 60;
  return `${minutes}:${padNumber(seconds)}`;
}
