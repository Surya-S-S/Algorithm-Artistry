const InsertionSort = (list) => {
  let len = list.length();
  let results = [];
  for (let i = 1; i < len; i++) {
    let j = i;
    list.select(i);
    results.push(JSON.parse(list.serialize()));
    while (j >= 0 && list.arr[j - 1]?.value > list.arr[j]?.value) {
      list.select(j);
      list.select(j - 1);
      results.push(JSON.parse(list.serialize()));
      list.swap(j, j - 1);
      list.swapped(j);
      list.swapped(j - 1);
      results.push(JSON.parse(list.serialize()));
      list.unselect(j);
      list.unselect(j - 1);
      results.push(JSON.parse(list.serialize()));
      j--;
    }
  }
  for (let i = 0; i < len; i++) {
    list.sorted(len - i - 1);
    results.push(JSON.parse(list.serialize()));
  }
  return results;
};

export default InsertionSort;
