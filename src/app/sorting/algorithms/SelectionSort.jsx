const SelectionSort = (arr) => {
  let len = arr.length;
  let results = [];
  for (let i = 0; i < len; i++) {
    let minIdx = i;
    arr[i].style = "selectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
    for (let j = i + 1; j < len; j++) {
      arr[j].style = "selectedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      if (arr[j]?.value < arr[minIdx]?.value) {
        if (minIdx != i) arr[minIdx].style = "unselectedBlock";
        minIdx = j;
        arr[minIdx].style = "pivotBlock";
        results.push(JSON.parse(JSON.stringify(arr)));
      } else {
        arr[j].style = "unselectedBlock";
        results.push(JSON.parse(JSON.stringify(arr)));
      }
    }
    if (minIdx != i) {
      let tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;
      arr[i].style = "pivotBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
    }
    arr[i].style = "sortedBlock";
    arr[minIdx].style = "unselectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  arr[len - 1].style = "sortedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
  return results;
};

export default SelectionSort;
