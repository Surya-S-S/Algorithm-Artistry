const merge = (list, l, m, r, results) => {
  for (let i = l; i <= r; i++) list.select(i);
  results.push(JSON.parse(list.serialize()));
  let l1 = l,
    r1 = m;
  let l2 = m + 1,
    r2 = r;
  if (list.arr[r1]?.value <= list.arr[l2]?.value) {
    return;
  }
  while (l1 <= r1 && l2 <= r2) {
    if (list.arr[l1]?.value <= list.arr[l2]?.value) {
      l1++;
    } else {
      let value = list.arr[l2];
      let idx = l2;
      while (idx != l1) {
        list.arr[idx] = list.arr[idx - 1];
        idx--;
      }
      list.arr[l1] = value;
      list.swapped(l1);
      results.push(JSON.parse(list.serialize()));
      l1++;
      l2++;
      r1++;
    }
  }
};

const sort = (list, l, r, results) => {
  if (l < r) {
    let m = l + Math.floor((r - l) / 2);
    sort(list, l, m, results);
    sort(list, m + 1, r, results);
    merge(list, l, m, r, results);
    for (let i = l; i <= r; i++) list.unselect(i);
    results.push(JSON.parse(list.serialize()));
  }
};

const MergeSort = (list) => {
  let len = list.length();
  let results = [];
  sort(list, 0, len - 1, results);
  for (let i = 0; i < len; i++) {
    list.sorted(i);
    results.push(JSON.parse(list.serialize()));
  }
  return results;
};

export default MergeSort;
