class Point{
    constructor(context, x, y, size){
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(){
        this.context.fillRect(this.x - 5, this.y - 5, this.size, this.size);
    }
}