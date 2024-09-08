const swap = (arr, a, b) => {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
};

const partition = (arr, s, e, results) => {
  let pivot = s;
  let l = s + 1,
    r = e;
  while (l <= r) {
    arr[l].style = "selectedBlock";
    arr[r].style = "selectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
    if (arr[l]?.value <= arr[pivot]?.value) l++;
    else if (arr[r]?.value > arr[pivot]?.value) r--;
    else {
      swap(arr, l, r);
      l++;
      r--;
    }
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  for (let i = s; i <= e; i++) {
    if (i != r) arr[i].style = "unselectedBlock";
  }
  results.push(JSON.parse(JSON.stringify(arr)));
  swap(arr, pivot, r);
  arr[pivot].style = "unselectedBlock";
  arr[r].style = "sortedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
  return r;
};

const randomizePivot = (arr, l, r, results) => {
  let random = l + Math.floor(Math.random() * (r - l));
  arr[l].style = "selectedBlock";
  arr[random].style = "selectedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
  swap(arr, l, random);
  arr[l].style = "pivotBlock";
  arr[random].style = "unselectedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
};

const sort = (arr, l, r, results) => {
  if (l < r) {
    randomizePivot(arr, l, r, results);
    let p = partition(arr, l, r, results);
    sort(arr, l, p - 1, results);
    sort(arr, p + 1, r, results);
  }
};

const QuickSort = (arr) => {
  let len = arr.length;
  let results = [];
  sort(arr, 0, len - 1, results);
  for (let i = 0; i < len; i++) {
    arr[i].style = "sortedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  return results;
};

export default QuickSort;
