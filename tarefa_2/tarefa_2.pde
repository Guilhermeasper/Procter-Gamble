class Bone {
  float x1;
  float y1;
  float x2;
  float y2;
  float len;
  float angle;
  float xPerm;
  float yPerm;
  float speed;
  
  Bone(float x, float y, float len, float speed){
    this.x1  = x;
    this.y1  = y;
    this.x2 = x;
    this.y2 = y+len;
    this.xPerm = this.x2;
    this.yPerm = this.y2;
    this.len = len;
    this.angle = 0;
    this.speed = speed;
  }
  
  void move() {
    this.x2 = this.yPerm*sin(radians(this.angle)) + this.xPerm*cos(radians(this.angle));
    this.y2 = this.yPerm*cos(radians(this.angle)) - this.xPerm*sin(radians(this.angle));
    this.angle += this.speed;
  }

  void show() {
    fill(255, 255, 255);
    strokeWeight(3);
    line(x1, y1, x2, y2);
    fill(0, 0, 255);
    strokeWeight(0);
    ellipse(x1, y1, 15, 15);
    fill(0, 0, 255);
    ellipse(x2, y2, 15, 15);
  }
}

Bone bone1;
Bone bone2;

void setup() {
  size(1280, 720);
  bone1 = new Bone(0, 0, 40, 1);
  bone2 = new Bone(0, 0, 60, 2);
  frameRate(83);
}
float angle = 5;

void draw() {
  background(115, 230, 115);
  pushMatrix();
  translate(width/2, height/2);
  bone1.move();
  bone1.show();
  popMatrix();
  
  pushMatrix();
  translate(width/2+bone1.x2, height/2+bone1.y2);
  bone2.move();
  bone2.show();
  popMatrix();
  if(bone2.angle == 90){
    bone1.speed = 0;
    bone2.speed = 0;
  }
}

void mouseClicked() {
  bone1.angle = 0;
  bone2.angle = 0;
  bone1.speed = 1;
  bone2.speed = 2;
}
