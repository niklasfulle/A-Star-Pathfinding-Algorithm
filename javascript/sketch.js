//var cols = 1920 / 20;
//var rows = 980 / 20;
var cols = 5;
var rows = 5;
var grid = new Array(cols);
var w, h;

var openSet = [];
var closedSet = [];

var start;
var end;

function setup() {
    //createCanvas(1920, 980);
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    console.log(grid);
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
    } else {
        // no solution
    }

    background(0);
    
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }
}
