let model;
let targetLabel;
let canClassify = false;
let outputLabel = "";

function setup() {
  createCanvas(600, 400);

  const options = {
    task: "classification",
    inputs: 1,
    outputs: 2
  };

  model = ml5.neuralNetwork(options);

  background(255);
}

function keyPressed() {
  if (key === "r") {
    targetLabel = "Right";
    drawInput("green");
    getData(targetLabel, mouseX);
  } else if (key === "l") {
    targetLabel = "Left";
    drawInput("red");
    getData(targetLabel, mouseX);
  } else if (key === "Enter") {
    doTraining();
  }

  console.log(key);
}

function doTraining() {
  model.data.normalize();   
  model.train(finishedTraining);
}

function finishedTraining() {
  console.log(`I'm ready!!!`);

  canClassify = true;
}

function getData(xLabel, xValue) {
  console.log(xLabel, xValue);

  const input = {
    x: xValue
  };

  const target = {
    label: xLabel
  };

  model.addData(input, target);
}

function drawInput(color) {
  stroke(0);

  fill(color);

  ellipse(mouseX, mouseY, 50);

  fill(255);

  noStroke();

  textAlign(CENTER, CENTER);

  text(targetLabel, mouseX, mouseY);
}

function draw() {
  line(300, 0, 300, 400);

  if (canClassify) {
    background(200);
    const input = {
      x: mouseX
    };

    model.classify(input, gotResult);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 50);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(outputLabel, mouseX, mouseY);
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  outputLabel = results[0].label + " " + results[0].confidence;
}
