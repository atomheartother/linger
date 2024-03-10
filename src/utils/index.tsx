export function truncateFileName(filename: string) {
  const idx = filename.lastIndexOf('.');
  return filename.substring(
    0,
    filename.length * Number(idx === -1) + idx * Number(idx !== -1),
  );
}
