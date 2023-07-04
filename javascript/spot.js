function Spot(x, y) {
    // Location x ,y on the grid
    this.x = x;
    this.y = y;

    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];

    this.previous = undefined;

    this.wall = false;
    if (random(1) < randomWall) {
        this.wall = true;
    }

    this.show = function (col) {
        if (this.wall) {
            fill(0);
            noStroke();
            if (allowDiagonals) {
                ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2 + 4, h / 2 + 4);
            } else {
                rect(this.x * w, this.y * h, w, h);
            }
        } else if (col) {
            fill(col);
            noStroke();
            rect(this.x * w, this.y * h, w, h);
        }
    };

    this.addNeighbors = function (grid) {
        var x = this.x;
        var y = this.y;

        // right, left, bottom, top
        if (x < cols - 1) {
            this.neighbors.push(grid[x + 1][y]);
        }
        if (x > 0) {
            this.neighbors.push(grid[x - 1][y]);
        }
        if (y < rows - 1) {
            this.neighbors.push(grid[x][y + 1]);
        }
        if (y > 0) {
            this.neighbors.push(grid[x][y - 1]);
        }

        // diagonals
        if (allowDiagonals) {
            if (x > 0 && y > 0) {
                this.neighbors.push(grid[x - 1][y - 1]);
            }
            if (x < cols - 1 && y > 0) {
                this.neighbors.push(grid[x + 1][y - 1]);
            }
            if (x > 0 && y < rows - 1) {
                this.neighbors.push(grid[x - 1][y + 1]);
            }
            if (x < cols - 1 && y < rows - 1) {
                this.neighbors.push(grid[x + 1][y + 1]);
            }
        }
    };
}
