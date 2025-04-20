const SelectionSort = (list) => {
  let len = list.length();
  let results = [];
  for (let i = 0; i < len; i++) {
    let minIdx = i;
    list.select(i);
    results.push(JSON.parse(list.serialize()));
    for (let j = i + 1; j < len; j++) {
      list.select(j);
      results.push(JSON.parse(list.serialize()));
      if (list.arr[j]?.value < list.arr[minIdx]?.value) {
        if (minIdx != i) list.unselect(minIdx);
        minIdx = j;
        list.pivot(minIdx);
        results.push(JSON.parse(list.serialize()));
      } else {
        list.unselect(j);
        results.push(JSON.parse(list.serialize()));
      }
    }
    if (minIdx != i) {
      let tmp = list.arr[i];
      list.arr[i] = list.arr[minIdx];
      list.arr[minIdx] = tmp;
      list.pivot(i);
      results.push(JSON.parse(list.serialize()));
    }
    list.sorted(i);
    list.unselect(minIdx);
    results.push(JSON.parse(list.serialize()));
  }
  list.sorted(len - 1);
  results.push(JSON.parse(list.serialize()));
  return results;
};

export default SelectionSort;
