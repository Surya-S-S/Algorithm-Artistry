const merge = (arr, l, m, r, results) => {
  for (let i = l; i <= r; i++) arr[i].style = "selectedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
  let l1 = l,
    r1 = m;
  let l2 = m + 1,
    r2 = r;
  if (arr[r1]?.value <= arr[l2]?.value) {
    return;
  }
  while (l1 <= r1 && l2 <= r2) {
    if (arr[l1]?.value <= arr[l2]?.value) {
      l1++;
    } else {
      let value = arr[l2];
      let idx = l2;
      while (idx != l1) {
        arr[idx] = arr[idx - 1];
        idx--;
      }
      arr[l1] = value;
      arr[l1].style = "swappedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      l1++;
      l2++;
      r1++;
    }
  }
};

const sort = (arr, l, r, results) => {
  if (l < r) {
    let m = l + Math.floor((r - l) / 2);
    sort(arr, l, m, results);
    sort(arr, m + 1, r, results);
    merge(arr, l, m, r, results);
    for (let i = l; i <= r; i++) arr[i].style = "unselectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
};

const MergeSort = (arr) => {
  let len = arr.length;
  let results = [];
  sort(arr, 0, len - 1, results);
  for (let i = 0; i < len; i++) {
    arr[i].style = "sortedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  return results;
};

export default MergeSort;
