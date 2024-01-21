export function formatDate(originalDateString: string) {
  const originalDate = new Date(originalDateString);

  const formattedDate = `${String(originalDate.getFullYear()).slice(-4)}-${String(
    originalDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(originalDate.getDate()).padStart(2, '0')}`;

  return formattedDate;
}
