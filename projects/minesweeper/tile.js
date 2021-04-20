function Tile(i, j) {
    this.i = i;
    this.j = j;
    this.x = this.i * scale;
    this.y = this.j * scale;

    this.mine = false;
    this.revealed = false;
    this.flag = false;
    this.minesAround = -1;

    this.show = function () {
        if (this.revealed) {
            if (this.mine) {
                if (win) {
                    fill(0, 255, 0, 90);
                } else {
                    fill(255, 0, 0, 90);
                }
            } else {
                stroke(255);
                fill(255);
                textAlign(CENTER);
                x = this.x + scale / 2;
                y = this.y + scale / 1.5;
                text(this.minesAround, x, y);

                fill(0, 0, 0, 50);
            }
        } else if (this.flag) {
            fill(0, 0, 255, 50);
        } else { fill(51); }

        stroke(255);
        rect(this.x, this.y, scale, scale);
    }

    this.reveal = function () {
        this.revealed = true;

        if (this.mine) { gameOver(); }
        else{
            this.minesAround = 0;
            for (i = this.i - 1; i <= this.i + 1; i++){
                for (j = this.j - 1; j <= this.j + 1; j++){
                    if (i >= 0 && i < cols && j >= 0 && j < rows) {
                        if (grid[i][j].mine) { this.minesAround++;}
                    }
                }
            }

            if (this.minesAround == 0) {
                for (i = this.i-1; i <= this.i+1; i++){
                    for (j = this.j - 1; j <= this.j + 1; j++) {
                        if (i >= 0 && i < cols && j >= 0 && j < rows) {
                            if (!grid[i][j].revealed) {
                                grid[i][j].reveal();
                            }
                        }
                    }
                }
            }
        }
    }
}