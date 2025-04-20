const TrappingRainwater = (list) => {
  let len = list.length();
  let results = [];
  let maxLeft = list?.arr[0];
  list.selectLeft(0);
  let maxRight = list?.arr[len - 1];
  list.selectRight(len - 1);
  let l = 1,
    r = len - 2;
  let water = 0;
  while (l <= r) {
    let currLeft = list?.arr[l];
    list.selectLeft(l);
    let currRight = list?.arr[r];
    list.selectRight(r);
    results.push(JSON.parse(list.serialize()));
    if (maxLeft?.value < maxRight?.value) {
      if (currLeft?.value < maxLeft?.value) {
        let fillWater = maxLeft?.value - currLeft?.value;
        water += fillWater;
        currLeft.fill = fillWater;
      } else {
        maxLeft = currLeft;
        list.mark(l);
      }
      l++;
    } else {
      if (currRight?.value < maxRight?.value) {
        let fillWater = maxRight?.value - currRight?.value;
        water += fillWater;
        currRight.fill = fillWater;
      } else {
        maxRight = currRight;
        list.mark(r);
      }
      r--;
    }
    results.push(JSON.parse(list.serialize()));
  }
  return results;
};

export default TrappingRainwater;
