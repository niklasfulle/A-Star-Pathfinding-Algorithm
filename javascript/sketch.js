var cols = parseInt(1920 / 20);
var rows = parseInt(1080 / 20);
var grid = new Array(cols);

// percentage of walls in the grid
var randomWall = 0.4;
// allows the start and end points to be random or not
var randomStartEnd = false;
// allows the algorithm to move diagonally
var allowDiagonals = true;

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;

var path = [];

function setup() {
    createCanvas(1920, 1080);
    frameRate(120);

    w = width / cols;
    h = height / rows;

    // Making a 2D array
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    // Filling the 2D array with Spot objects
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    // Add all the neighbors for each Spot object
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    // Start and end points for A* algorithm (random or not)
    if (randomStartEnd) {
        start = grid[floor(random(cols))][floor(random(rows))];
        end = grid[floor(random(cols))][floor(random(rows))];
        start.wall = false;
        end.wall = false;
    } else {
        start = grid[0][0];
        end = grid[cols - 1][rows - 1];
        freeStartAndEnd();
    }
    openSet.push(start);
    background(255);
}

function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if (current === end) {
            noLoop();
            console.log("DONE!");
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + heuristic(neighbor, current);

                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        console.log("no solution");
        noLoop();
        return;
    }

    background(255);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(255);
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 50, 0, 200));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(255, 255, 0, 200));
    }

    // Find the path by working backwards
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(color(0, 0, 255));
    strokeWeight(w / 2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
    }
    endShape();
    end.show(color(0, 255, 0));
    start.show(color(255, 0, 0));
}

// Function to delete element from the array
function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

// Function to calculate the heuristic value (distance between two points)
function heuristic(a, b) {
    if (allowDiagonals) {
        return dist(a.x, a.y, b.x, b.y);
    } else {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }
}

// Function to free start and end points from walls
function freeStartAndEnd() {
    start.wall = false;
    end.wall = false;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            grid[i][j].wall = false;
        }
    }

    for (var i = cols - 3; i < cols; i++) {
        for (var j = rows - 3; j < rows; j++) {
            grid[i][j].wall = false;
        }
    }
}
