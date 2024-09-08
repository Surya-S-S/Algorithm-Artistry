const BubbleSort = (arr) => {
  let len = arr.length;
  let results = [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      arr[j].style = "selectedBlock";
      arr[j + 1].style = "selectedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      if (arr[j]?.value > arr[j + 1]?.value) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        arr[j].style = "swappedBlock";
        arr[j + 1].style = "swappedBlock";
        results.push(JSON.parse(JSON.stringify(arr)));
      }
      arr[j].style = "unselectedBlock";
      arr[j + 1].style = "unselectedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
    }
    arr[len - i - 1].style = "sortedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  arr[0].style = "sortedBlock";
  results.push(JSON.parse(JSON.stringify(arr)));
  return results;
};

export default BubbleSort;
