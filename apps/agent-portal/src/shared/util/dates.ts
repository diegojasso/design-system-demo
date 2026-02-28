import { format } from "date-fns";

export function getNextIsoDates(days: number, fromDate: Date = new Date()): string[] {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

export function formatIsoDateMmDdYyyy(isoDate: string): string {
  try {
    return format(new Date(isoDate), "MM/dd/yyyy");
  } catch {
    return isoDate;
  }
}

