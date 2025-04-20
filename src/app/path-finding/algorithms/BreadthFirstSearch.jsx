import { Queue } from "@/utils/Queue";

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const queue = new Queue();
const parent = {};
const key = (x, y) => `${x},${y}`;

const BreadthFirstSearch = (i, j, m, n, grid, result) => {
  parent[key(i, j)] = null;
  queue.push({ a: i, b: j });
  while (!queue.isEmpty()) {
    const s = queue.size();
    for (let i = 0; i < s; i++) {
      const node = queue.front();
      queue.pop();
      const l = dirs.length;
      for (let k = 0; k < l; k++) {
        const x = node?.a,
          nx = x + dirs[k][0];
        const y = node?.b,
          ny = y + dirs[k][1];
        if (0 <= nx && nx < m && 0 <= ny && ny < n) {
          if (nx == grid?.a && ny == grid?.b) continue;
          if (
            grid?.matrix[nx][ny]?.value != 1 &&
            grid?.matrix[nx][ny]?.value != 2
          ) {
            if (nx == grid?.x && ny == grid?.y) {
              grid.markRoute(nx, ny);
              result.push(JSON.parse(grid?.serialize()));
              parent[key(nx, ny)] = { x: node.a, y: node.b };
              let target = { x: nx, y: ny };
              backTrack(target, grid, result);
              return;
            }
            grid.markVisited(nx, ny);
            result.push(JSON.parse(grid?.serialize()));
            queue.push({ a: nx, b: ny });
            parent[key(nx, ny)] = { x: node.a, y: node.b };
          }
        }
      }
    }
  }
};

const backTrack = (target, grid, result) => {
  let current = target;
  while (current) {
    const { x, y } = current;
    if (
      !(x === grid?.a && y === grid?.b) &&
      !(x === grid?.x && y === grid?.y)
    ) {
      grid.markRoute(x, y);
      result.push(JSON.parse(grid?.serialize()));
    }
    current = parent[key(x, y)];
  }
};

export default BreadthFirstSearch;
