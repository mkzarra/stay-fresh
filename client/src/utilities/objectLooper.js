export default (obj) => {
  const fetchedData = [];
  for (let key in obj) {
    fetchedData.push({ ...obj[key] });
  }
  return fetchedData;
}