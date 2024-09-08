const InsertionSort = (arr) => {
  let len = arr.length;
  let results = [];
  for (let i = 1; i < len; i++) {
    let j = i;
    arr[i].style = "selectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
    while (j >= 0 && arr[j - 1]?.value > arr[j]?.value) {
      arr[j].style = "selectedBlock";
      arr[j - 1].style = "selectedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      let tmp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = tmp;
      arr[j].style = "swappedBlock";
      arr[j - 1].style = "swappedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      arr[j].style = "unselectedBlock";
      arr[j - 1].style = "unselectedBlock";
      results.push(JSON.parse(JSON.stringify(arr)));
      j--;
    }
  }
  for (let i = 0; i < len; i++) {
    arr[len - i - 1].style = "sortedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  return results;
};

export default InsertionSort;
