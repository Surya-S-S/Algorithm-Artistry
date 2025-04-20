const PreviousSmallerElement = (list, stack) => {
  let results = [],
    stackViews = [];
  let res = [];
  let n = list.length();
  for (let i = 0; i < n; i++) {
    while (
      !stack.isEmpty() &&
      list.arr[stack.top().value]?.value >= list.arr[i]?.value
    ) {
      stack.pop();
      stackViews.push(stack.serialize());
      results.push(JSON.parse(JSON.stringify(res)));
    }
    if (stack.isEmpty()) res[i] = { value: "x" };
    else res[i] = list.arr[stack.top().value];
    stack.push({ value: i });
    stackViews.push(stack.serialize());
    results.push(JSON.parse(JSON.stringify(res)));
  }
  stackViews.push(stack.serialize());
  results.push(JSON.parse(JSON.stringify(res)));
  return { results, stackViews };
};

export default PreviousSmallerElement;
