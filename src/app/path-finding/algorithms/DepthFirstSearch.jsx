const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const DepthFirstSearch = (i, j, m, n, grid, result) => {
  if (i < 0 || i >= m || j < 0 || j >= n) return false;
  if (grid?.matrix[i][j]?.value == 1 || grid?.matrix[i][j]?.value == 2)
    return false;
  if (i == grid?.x && j == grid?.y) return true;
  if (!(i == grid?.a && j == grid?.b)) grid.markVisited(i, j);
  result.push(JSON.parse(grid?.serialize()));
  for (let dir of dirs) {
    let ni = i + dir[0];
    let nj = j + dir[1];
    if (DepthFirstSearch(ni, nj, m, n, grid, result)) {
      if (!(i == grid?.a && j == grid?.b)) grid.markRoute(i, j);
      result.push(JSON.parse(grid?.serialize()));
      return true;
    }
  }
};

export default DepthFirstSearch;
