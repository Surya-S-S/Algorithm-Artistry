const partition = (list, s, e, results) => {
  let pivot = s;
  let l = s + 1,
    r = e;
  while (l <= r) {
    list.select(l);
    list.select(r);
    results.push(JSON.parse(list.serialize()));
    if (list.arr[l]?.value <= list.arr[pivot]?.value) l++;
    else if (list.arr[r]?.value > list.arr[pivot]?.value) r--;
    else {
      list.swap(l, r);
      list.swapped(l);
      list.swapped(r);
      l++;
      r--;
    }
    results.push(JSON.parse(list.serialize()));
  }
  for (let i = s; i <= e; i++) {
    if (i != r) list.unselect(i);
  }
  results.push(JSON.parse(list.serialize()));
  list.swap(pivot, r);
  list.unselect(pivot);
  list.sorted(r);
  results.push(JSON.parse(list.serialize()));
  return r;
};

const randomizePivot = (list, l, r, results) => {
  let random = l + Math.floor(Math.random() * (r - l));
  list.select(l);
  list.select(random);
  results.push(JSON.parse(list.serialize()));
  list.swap(l, random);
  list.pivot(l);
  list.unselect(random);
  results.push(JSON.parse(list.serialize()));
};

const sort = (list, l, r, results) => {
  if (l < r) {
    randomizePivot(list, l, r, results);
    let p = partition(list, l, r, results);
    sort(list, l, p - 1, results);
    sort(list, p + 1, r, results);
  }
};

const QuickSort = (list) => {
  let len = list.length();
  let results = [];
  sort(list, 0, len - 1, results);
  for (let i = 0; i < len; i++) {
    list.sorted(i);
    results.push(JSON.parse(list.serialize()));
  }
  return results;
};

export default QuickSort;
