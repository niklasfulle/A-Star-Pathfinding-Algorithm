function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if (random(1) < 0.35) {
        this.wall = true;
        if (this.i == 0 && this.j == 0) {
            this.wall = false;
        }
        if (this.i == cols - 1 && this.j == rows - 1) {
            this.wall = false;
        }
    }

    this.show = function (col) {
        fill(col);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1);
    };

    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;

        // right, left, bottom, top
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    };
}
