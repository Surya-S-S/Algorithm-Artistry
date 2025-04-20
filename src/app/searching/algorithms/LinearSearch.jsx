const LinearSearch = (list, x) => {
  let len = list.length();
  let results = [];
  for (let i = 0; i < len; i++) {
    list.select(i);
    results.push(JSON.parse(list.serialize()));
    if (list.arr[i]?.value == x) {
      list.matched(i);
      break;
    } else list.unmatched(i);
    results.push(JSON.parse(list.serialize()));
  }
  results.push(JSON.parse(list.serialize()));
  return results;
};

export default LinearSearch;
