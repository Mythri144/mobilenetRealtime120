previous_result = 0;

function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw(){
  image(video, 0, 0, 250, 250);
  classifier.classify(video, gotResult);
}

function modelLoaded(){
  console.log('Model Loaded! ');
}

function gotResult(error, results){
  if(error){  
  console.error(error);
} else{
  if((results[0].confidence > 0.5) && (previous_result !=results[0].label)){
  console.log(results);
  document.getElementById("objectv").innerHTML = results[0].label;
  document.getElementById("accuracyv").innerHTML = results[0].confidence.toFixed(3);
  previous_result = results[0].label;
  var declare = window.speechSynthesis;
  speak_data = "The object detected is, "+results[0].label;
  var speakout = new SpeechSynthesisUtterance(speak_data);
  declare.speak(speakout);
  }
  }
}