export function formatDate(originalDateString: string | null) {
  const originalDate = new Date(originalDateString as string);

  const formattedDate = `${String(originalDate.getFullYear()).slice(-4)}-${String(
    originalDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(originalDate.getDate()).padStart(2, '0')}`;

  return formattedDate;
}

export function generateBookingNumber() {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 12;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}