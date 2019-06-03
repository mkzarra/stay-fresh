export default (date) => {
  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dt = new Date(date);
  return m[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear(); 
}