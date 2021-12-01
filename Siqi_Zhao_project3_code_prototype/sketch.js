
let imgStay = [];
let imgUp = [];
let imgDown = [];
let imgDrop = [];
let imgSnow;

let posY = 0;
let mode = 0;
let upIndex = 0;
let upFrame = 0;
let downIndex = 0;
let downFrame = 0;
let stayIndex = 0;
let stayFrame = 0;
let mic;
let snowY = 0;
function preload() {
  imgDrop[0] = loadImage("snowcover.png");
  imgDrop[1] = loadImage("afterdrop1.png");
  imgDrop[2] = loadImage("afterdrop2.png");
  imgSnow = loadImage("snowdrop.png");

  imgStay[0] = loadImage("stay1.png");
  imgStay[1] = loadImage("stay2.png");

  imgDown[0] = loadImage("down1.png");
  imgDown[1] = loadImage("down2.png");


  imgUp[0] = loadImage("up1.png");
  imgUp[1] = loadImage("up2.png");
  imgUp[2] = loadImage("up3.png");
  imgUp[3] = loadImage("up4.png");
}

function setup() {
  createCanvas(1024, 430);
  imgSnow.resize(width, height);
  for (let i = 0; i < imgDrop.length; i++) {
    imgDrop[i].resize(width, height);
  }

  for (let i = 0; i < imgStay.length; i++) {
    imgStay[i].resize(width, height);
  }

  for (let i = 0; i < imgDown.length; i++) {
    imgDown[i].resize(width, height);
  }

  for (let i = 0; i < imgUp.length; i++) {
    imgUp[i].resize(width, height);
  }

  mic = new p5.AudioIn();
  mic.start();
  frameRate(20);
}


function draw() {
  background(159, 218, 222);
  // if (frameCount % 20 < 10) {
  //   posY = frameCount % 20
  //   image(imgDrop[0], 0, frameCount % 20);
  // } else {
  //   posY = 20 - frameCount % 20
  //   image(imgDrop[1], 0, 20 - frameCount % 20);
  // }

  if (mode === 0) {
    image(imgDrop[0], 0, 0);
    switch (stayIndex) {
      case 0:
        image(imgStay[0],posY);
        break;
      case 1:
        image(imgStay[1], posY);
        break;
    }
    if (((frameCount - stayFrame) % 15 === 0)) {
      stayIndex++;
    }
    if (stayIndex >= 2) {
      stayIndex = 0;
    }
  }
  if (mode === 1) {
    image(imgDrop[0], 0, 0);
    switch (upIndex) {
      case 0:
        image(imgUp[0], 367 - 500, 5 - 100);
        break;
      case 1:
        image(imgUp[1], 302 - 500, 132 - 200);
        break;
      case 2:
        image(imgUp[2], 150 - 500, 119 - 200);
        break;
      case 3:
        image(imgUp[3], 234 - 500, 50 - 200);
        break;
    }

    if (((frameCount - upFrame) % 8 === 0)) {
      upIndex++;
    }

  }
  if (mode === 2) {
    // image(imgDrop[1], 0, 0);
    switch (downIndex) {
      case 0:
        image(imgDrop[0], 0, 0);
        image(imgDown[0], 500 - 500, 5 - 100);
        break;
      case 1:
        image(imgDrop[0], 0, 0);
        image(imgDown[1], 403 - 500, 158 - 100);
        break;
      case 2:
        image(imgDrop[2], 0, 0);
        image(imgStay[0], 328 - 500, 15);
        break;
      case 3:
        image(imgDrop[1], 0, 0);
        image(imgStay[0], 328 - 500+2, 13);
        snowY = 0;
        break;
      default:
        snowY = snowY + 2.5;
        image(imgDrop[2], 0, 0);
        image(imgStay[0], 328 - 500, 15);
        image(imgSnow, 0, snowY);
        break;
    }
    if (((frameCount - downFrame) % 8 === 0)) {
      downIndex++;
    }

    if (downIndex >= 20) {
      mode = 0;
      stayIndex = 0;
      stayFrame = 0;
    }
  }



  micLevel = mic.getLevel();
  micLevel = micLevel * 1000;
  console.log(micLevel);
  if (micLevel > 20 && mode === 0) {
    mode = 1;
    upFrame = frameCount;
    upIndex = 0;
  }

  if (micLevel < 5 && mode === 1 && upIndex > 5) {
    mode = 2;
    downFrame = frameCount;
    downIndex = 0;
  }

}



function mousePressed() {
  console.log(mouseX, mouseY)
  if (mode >= 2) {
    return
  }
  mode++;
  if (mode === 1) {
    upFrame = frameCount;
    upIndex = 0;
  }

  if (mode === 2) {
    downFrame = frameCount;
    downIndex = 0;
  }
}
