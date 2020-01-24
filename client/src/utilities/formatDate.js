export default (date) => {
  const dt = new Date(date);
  const month = dt.getMonth() < 9 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
  const numDate = dt.getDate() < 10 ? '0' + (dt.getDate() + 1) : (dt.getDate() + 1); 
  return dt.getFullYear() + "-" + month + "-" + numDate; 
}