float fov;
 float cameraZ;
   

void setup() {
  size(1280, 720, P3D);
  
}
float X;
float Y;

void draw() {
  if (keyPressed) {
    if (keyCode == UP) {
      X++;
    }
    if (keyCode == DOWN) {
      X--;
    }
    if (keyCode == RIGHT) {
      Y++;
    }
    if (keyCode == LEFT) {
      Y--;
    }
    
  }
  rect(25, 25, 50, 50);
  background(230, 230, 230);
  translate(width/2, height/2);
  stroke(126);
  fov = PI/3;
  cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(fov, float(width)/float(height), cameraZ/10.0, cameraZ*10.0);
  camera(X, Y, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0.0, 0.0, 1.0, 0.0);
  rotateX(map(mouseX, 0, 1280, -2*PI, 2*PI));
  rotateZ(map(mouseY, 0, 720, -2*PI, 2*PI));
  strokeWeight(3);
  stroke(255, 0, 0);
  line(0, 0, 0, 0, 0, 720);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, -720, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 720, 0, 0);
  fill(0, 0, 0);
  push();
  noFill();
  rotateX(radians(-60));
  stroke(0, 0, 0);
  rect(0, 0, 200, -200);
  pop();
}
