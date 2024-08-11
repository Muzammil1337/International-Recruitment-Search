export const calculateMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let yearsDiff = end.getFullYear() - start.getFullYear();
  let monthsDiff = end.getMonth() - start.getMonth();

  // Adjust for partial months
  if (end.getDate() < start.getDate()) {
    monthsDiff--;
  }

  return yearsDiff * 12 + monthsDiff;
};

export const calculateYears = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let yearsDiff = end.getFullYear() - start.getFullYear();
  if (
    end.getMonth() < start.getMonth() ||
    (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
  ) {
    yearsDiff--;
  }
  return yearsDiff;
};
