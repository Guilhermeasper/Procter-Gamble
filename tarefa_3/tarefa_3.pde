
  float angle = 0;
  float speed = 0.5;
  double lenSpeed = 0.2;
  float len = 0;
  float x = -20;
  float y = 0;


void setup() {
  size(1280, 720);
  background(255,255,255);
  //background(115, 230, 115);
  //line(0, height/2, width, height/2);
  //line(width/2, 0, width/2, height);
  frameRate(240);
}
float angle2 = 0;
void draw() {
  pushMatrix();
  translate(width/2, height/2);
  rotate(angle);
  strokeWeight(5);
  stroke(random(0,255), random(0,255), random(0,255));
  point(-5, len);
  popMatrix();
  //angle2 = map(mouseX, 0, width, 0, 2*PI);

  
  len += lenSpeed;
  angle += speed;
  
}
