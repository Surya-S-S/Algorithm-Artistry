const BinarySearch = (list, x) => {
  let len = list.length();
  let results = [];
  list.arr = list.arr.sort((a, b) => a.value - b.value);
  results.push(JSON.parse(list.serialize()));
  let l = 0,
    r = len - 1;
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    for (let i = l; i <= r; i++) list.select(i);
    results.push(JSON.parse(list.serialize()));
    if (list.arr[mid]?.value < x) {
      for (let i = l; i <= mid; i++) list.unselect(i);
      list.unmatched(mid);
      l = mid + 1;
    } else if (list.arr[mid]?.value > x) {
      for (let i = mid; i <= r; i++) list.unselect(i);
      list.unmatched(mid);
      r = mid - 1;
    } else {
      list.matched(mid);
      break;
    }
    results.push(JSON.parse(list.serialize()));
  }
  results.push(JSON.parse(list.serialize()));
  return results;
};

export default BinarySearch;
