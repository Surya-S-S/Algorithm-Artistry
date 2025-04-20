const BubbleSort = (list) => {
  let len = list.length();
  let results = [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      list.select(j);
      list.select(j + 1);
      results.push(JSON.parse(list.serialize()));
      if (list.arr[j]?.value > list.arr[j + 1]?.value) {
        list.swap(j, j + 1);
        list.swapped(j);
        list.swapped(j + 1);
        results.push(JSON.parse(list.serialize()));
      }
      list.unselect(j);
      list.unselect(j + 1);
      results.push(JSON.parse(list.serialize()));
    }
    list.sorted(len - i - 1);
    results.push(JSON.parse(list.serialize()));
  }
  list.sorted(0);
  results.push(JSON.parse(list.serialize()));
  return results;
};

export default BubbleSort;
