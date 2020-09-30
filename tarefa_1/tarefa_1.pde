class Ball {
  float x;
  float y;
  float radius;
  float yspeed;
  float xspeed;
  float grav;
  
  Ball() {
    x  = 30;
    y  = height/2 - 30;
    radius = 30;
    yspeed = 10;
    xspeed = 10;
    grav = 0.4;
  }

  void move() {
    y = y + yspeed;
    x = x + xspeed;
    yspeed = yspeed + grav;

    if (y > height/2-radius) {
      yspeed = -10;
    }
    if (x > width-radius){
      xspeed = -10;
    }
    if (x < radius){
      xspeed = 10;
    }
  }

  void show() {
    fill(0, 0, 255);
    ellipse(x, y, radius,radius);
  }
}

Ball ball;

void setup() {
  size(1280, 720);
  ball = new Ball(); 
}

void draw() {
  background(230, 230, 230);
  fill(255,0,0);
  rect(0, height/2, width, height/2);
  ball.move();
  ball.show();
}
