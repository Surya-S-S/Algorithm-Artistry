export class Grid {
  constructor(m, n) {
    this.matrix = Array(m)
      .fill()
      .map(() => Array(n).fill({ value: 0, style: "greyCell" }));

    for (let i = 0; i < m * n * 0.3; i++) {
      this.matrix[Math.floor(Math.random() * m - 1) + 1][
        Math.floor(Math.random() * n - 1)
      ] = { value: 1, style: "blackCell" };
    }
    this.a = Math.floor(Math.random() * m - 1) + 1;
    this.b = Math.floor(Math.random() * n - 1);
    while (this.matrix[this.a][this.b]?.value == 1) {
      this.a = Math.floor(Math.random() * m - 1) + 1;
      this.b = Math.floor(Math.random() * n - 1);
    }
    this.matrix[this.a][this.b] = { value: 0, style: "greenCell" };
    this.x = Math.floor(Math.random() * m - 1) + 1;
    this.y = Math.floor(Math.random() * n - 1);
    while (
      this.matrix[this.x][this.y]?.value == 1 ||
      (this.x == this.a && this.y == this.b)
    ) {
      this.x = Math.floor(Math.random() * m - 1) + 1;
      this.y = Math.floor(Math.random() * n - 1);
    }
    this.matrix[this.x][this.y] = { value: 0, style: "redCell" };
  }

  serialize = () => JSON.stringify(this.matrix);

  getValue = (i, j) => {
    return this.matrix[i][j];
  };

  markVisited = (i, j) => (this.matrix[i][j] = { value: 2, style: "blueCell" });

  markRoute = (i, j) => (this.matrix[i][j] = { value: 2, style: "yellowCell" });
}
