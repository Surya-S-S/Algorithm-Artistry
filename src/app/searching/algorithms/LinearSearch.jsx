const LinearSearch = (arr, x) => {
  let len = arr.length;
  let results = [];
  for (let i = 0; i < len; i++) {
    arr[i].style = "selectedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
    if (arr[i]?.value == x) {
      arr[i].style = "matchedBlock";
      break;
    } else arr[i].style = "unmatchedBlock";
    results.push(JSON.parse(JSON.stringify(arr)));
  }
  results.push(JSON.parse(JSON.stringify(arr)));
  return results;
};

export default LinearSearch;
