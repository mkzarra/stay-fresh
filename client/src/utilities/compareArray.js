export default function (arr1, arr2) {
  const comparedArray = [];
  const n = arr1.length >= arr2.length ? arr1.length : arr2.length
  for (let i = 0; i < n; i++) {
    if (arr1[i] === arr2[i]) comparedArray.push(arr1[i]);
  }
  return comparedArray;
}

/*

function (arr1, arr2) {
  const comparedArray = [];
  arr1.forEach(e1 => arr2.forEach(e2 => {
    if (e1 === e2) {
      return comparedArray.push(e1);
    }
  }));
  return comparedArray;
}

function array_equals(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

*/