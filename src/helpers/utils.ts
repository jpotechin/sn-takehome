export function handleCurrency(value: number, currencyCode: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(value);
}

export function handleDate(date: string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

export function daysBetween(date1: string, date2: string) {
  // Convert both dates to milliseconds
  const date1_ms = new Date(date1).getTime();
  const date2_ms = new Date(date2).getTime();

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date2_ms - date1_ms);

  // Convert back to days and return
  return Math.floor(difference_ms / (1000 * 60 * 60 * 24));
}

export function handleStatus(
  paidInFull: string | boolean | null,
  cancelledAt: string | boolean | null,
): string {
  if (cancelledAt && paidInFull) return "Paid (Cancelled)";
  if (cancelledAt) return "Cancelled";
  if (paidInFull) return "Paid";
  return "Unpaid";
}
