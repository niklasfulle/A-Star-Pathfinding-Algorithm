function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function (col) {
        fill(col);
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1);
    };
}
