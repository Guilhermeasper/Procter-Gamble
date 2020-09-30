class Circle {
  float x;
  float y;
  float radius;
  float angle;
  float speed;
  float xPerm;
  float yPerm;
  
  Circle(float x, float y, float radius, float speed){
    this.x = x;
    this.y = y;
    this.xPerm = x;
    this.yPerm = y;
    this.radius = radius;
    this.angle = 0;
    this.speed = speed;
  }
  
  void move() {
    this.x = this.yPerm*sin(radians(this.angle)) + this.xPerm*cos(radians(this.angle));
    this.y = this.yPerm*cos(radians(this.angle)) - this.xPerm*sin(radians(this.angle));
    this.angle += this.speed;
  }

  void show() {
    fill(255, 255, 255, 0);
    strokeWeight(2);
    stroke(0,0,0);
    ellipse(x, y, this.radius, this.radius);
  }
}

Circle circle1;
Circle circle2;

void setup() {
  size(1280, 720);
  circle1 = new Circle(0, 0, 200, 1);
  circle2 = new Circle(0, 75, 50, 1.5);
}

float angle = 0;
float speed = 0.1;

void draw() {
  background(115, 230, 115);
  pushMatrix();
  translate(width/2, height/2);
  circle1.show();
  popMatrix();
  
  pushMatrix();
  translate(width/2, height/2);
  circle2.move();
  circle2.show();
  popMatrix();
  
  pushMatrix();
  translate(width/2+circle2.x, height/2+circle2.y);
  rotate(angle);
  strokeWeight(3);
  point(0, 26);
  popMatrix();
  angle += speed;
}
