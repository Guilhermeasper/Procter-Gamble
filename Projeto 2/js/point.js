class Point{
    constructor(context, x, y, size){
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(){
        this.context.fillRect(this.x - this.size, this.y - this.size, this.size, this.size);
    }
}