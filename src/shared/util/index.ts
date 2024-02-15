export function formatDate(originalDateString: string | null) {
  const originalDate = new Date(originalDateString as string);

  const formattedDate = `${String(originalDate.getFullYear()).slice(-4)}-${String(
    originalDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(originalDate.getDate()).padStart(2, '0')}`;

  return formattedDate;
}
