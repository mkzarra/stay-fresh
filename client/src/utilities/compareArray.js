export default function (arr1, arr2) {
  const comparedArray = [];
  arr1.forEach(e1 => arr2.forEach(e2 => {
    if (e1 === e2) {
      return comparedArray.push(e1);
    }
  }));
  return comparedArray;
}