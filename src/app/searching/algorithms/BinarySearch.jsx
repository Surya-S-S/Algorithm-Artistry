const BinarySearch = (arr, x) => {
  let len = arr.length;
  let results = [];
  arr = arr.sort((a, b) => a.value - b.value);
  results.push(JSON.parse(JSON.stringify(arr)));
  let l = 0,
    r = len - 1;
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    for (let i = l; i <= r; i++) arr[i].style = "selectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
    if (arr[mid]?.value < x) {
      for (let i = l; i <= mid; i++) arr[i].style = "unselectedBlock";
      arr[mid].style = "unmatchedBlock";
      l = mid + 1;
    } else if (arr[mid]?.value > x) {
      for (let i = mid; i <= r; i++) arr[i].style = "unselectedBlock";
      arr[mid].style = "unmatchedBlock";
      r = mid - 1;
    } else {
      arr[mid].style = "matchedBlock";
      break;
    }
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  results.push(JSON.parse(JSON.stringify(arr)));
  return results;
};

export default BinarySearch;
