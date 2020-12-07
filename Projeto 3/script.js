var imgBase;
var imgNormal;
var imgSpecular;
let arrayOfBase;
let arrayOfNormal;
let arrayOfSpecular;

function preload() {
  imgBase = loadImage("./Texturas/char2_d.png");
  imgNormal = loadImage("./Texturas/char2_n.png");
  imgSpecular = loadImage("./Texturas/char2_s.png");
  arrayOfBase = pixelsToArray(imgBase);
  arrayOfNormal = pixelsToArray(imgNormal);
  arrayOfSpecular = pixelsToArray(imgSpecular);
}

function setup() {
  createCanvas(410, 736);

  arrayOfImage = pixelsToArray();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const element = arrayOfImage[x][y];
      set(x, y, element);
    }
  }
  updatePixels();
}

function pixelsToArray(img) {
  let newMatrix = [];
  for (let x = 0; x < width; x++) {
    let temp = []
    for (let y = 0; y < height; y++) {
      temp.push(img.get(x, y));
    }
    newMatrix.push(temp);
  }
  return newMatrix;


  // let arrayOfPixels = [];
  // let x = 0;
  // let tempArray = [];
  // for (let i = 0; i < pixels.length; i += 4) {
  //   if (x == width) {
  //     arrayOfPixels.push(tempArray);
  //     tempArray = [];
  //     x = 0;
  //   }
  //   r = pixels[i];
  //   g = pixels[i + 1];
  //   b = pixels[i + 2];
  //   a = pixels[i + 3];
  //   let newArray = [r, g, b, a];
  //   tempArray.push(newArray);
  //   x++;
  // }
  // return transformMatrix(arrayOfPixels);
}

function transformMatrix(matrix) {
  let newMatrix = new Array(matrix[0].length).fill([]);
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      newMatrix[i][j] = matrix[j][i];
    }
  }
  return newMatrix;
}

function draw() {
  // background(0);
  // image(img1s, 0, 0)
  // image(img1d, 0, 0)
  // loadPixels();
  // let d = pixelDensity();
  // let halfImage = 4 * (width * d) * ((height) * d);
  // for (let i = 0; i < halfImage; i += 4) {
  //   pixels[i] = red(0);
  //   pixels[i + 1] = green(0);
  //   pixels[i + 2] = blue(0);
  //   pixels[i + 3] = alpha(0);
  // }
  // updatePixels();
}

function mouseClicked() {
  print(mouseX, mouseY);
  //print(arrayOfImage[0]);
  print(arrayOfImage[mouseX][mouseY]);
}

function normalizeColor(color) {
  let r = color[0];
  let g = color[1];
  let b = color[2];
  let a = color[3];

  r = r / 255;
  g = g / 255;
  b = b / 255;
  a = a / 255;

  return [r, g, b, a];
}
