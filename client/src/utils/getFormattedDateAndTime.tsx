export function getFormattedDateAndTime(date) {
  const originalDate = new Date(date);

  // Get the day and determine the suffix (st, nd, rd, th)
  const day = originalDate.getDate();
  const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };

  // Get the month in short form (e.g., Dec)
  const month = originalDate.toLocaleString("default", { month: "short" });

  // Get the full year
  const year = originalDate.getFullYear();

  // Get the hours and minutes
  let hours = originalDate.getHours();
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');

  // Determine AM or PM and adjust hours for 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  // Format the date and time string
  const formatted = `${day}${daySuffix(day)} ${month}, ${year} - ${hours}:${minutes}${ampm}`;

  return formatted;
}
