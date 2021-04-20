function Snake(){
    this.xspeed = 0;
    this.yspeed = 0;

    this.tail = [];
    this.tail[0] = createVector(0,0);

    this.show = function(){
        fill(255);
        for(i=0; i<this.tail.length; i++){
            rect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
    }

    this.move = function () {
        tailLenght = this.tail.length;
        endx = this.tail[tailLenght-1].x;
        endy = this.tail[tailLenght-1].y;
        headx = this.tail[0].x;
        heady = this.tail[0].y;
        
        //dies
        if(headx<0 || headx>cols*scale-scale || heady<0 || heady>rows*scale-scale){
            startGame();
        }
        for(i=1; i<tailLenght; i++){
            if (headx == this.tail[i].x && heady == this.tail[i].y) {
                startGame();
            }
        }

        //move
        for(i=tailLenght-1; i>0; i--){
            this.tail[i].x = this.tail[i-1].x;
            this.tail[i].y = this.tail[i-1].y;
        }

        this.tail[0].x += this.xspeed * scale;
        this.tail[0].y += this.yspeed * scale;

        //eats
        if(headx == food.x && heady == food.y){
            //end of tail remains, and body already moved forward
            this.tail[tailLenght] = createVector(endx, endy);
            food = new Food();
        }

        
    }
}



function Food(){
    this.x = floor(random(cols)) * scale;
    this.y = floor(random(rows)) * scale;
  
    this.show = function(){
        fill(255,0,0);
        rect(this.x, this.y, scale, scale);
    }
  }