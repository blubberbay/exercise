// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/*
 Human pose detection using machine learning.
 This code uses: 
    ML5.js: giving us easy to use poseNet ML model.
    P5.js: for drawing and creating video output in the browser.
*/

// the output of our webcam
let webcam_output;
// to store the ML model
let poseNet;
// output of our ML model is stores in this
let poses = [];

let canvas_height = 400
let canvas_width = 400

var room_num = 0;

let workout; 

var completion = 0.40;
var show_diagnostics = 0;

var timer;



function setup() {

  /* create a box in browser to show our output. Canvas having:
  */

  createCanvas(canvas_height, canvas_width);

  // get webcam input
  webcam_output = createCapture(VIDEO);
  // set webcam video to the same height and width of our canvas
  webcam_output.size(canvas_width, canvas_height);

  /* Create a new poseNet model. Input:
      1) give our present webcam output
      2) a function "modelReady" when the model is loaded and ready to use
  */
  poseNet = ml5.poseNet(webcam_output, modelReady);
	
	room_slider = createSlider(0,3,room_num,1);
  
  
  timer = createP("timer");
  /*
    An event or trigger.
    Whenever webcam gives a new image, it is given to the poseNet model.
    The moment pose is detected and output is ready it calls:
    function(result): where result is the models output.
    store this in poses variable for furthur use.
  */
  poseNet.on('pose', function(results) {
    poses = results;
  });
  	
	gym = new Gym();
   gym.add_room("squats");
   gym.add_room("burpees");
	
	kevin = new Athlete( "Kevin" );
	


  /* Hide the webcam output for now.
     We will modify the images and show with points and lines of the 
     poses detected later on.
  */
  webcam_output.hide();
}


/* function called when the model is ready to use.
   set the #status field to Model Loaded for the
  user to know we are ready to rock!
 */
 
function modelReady() {
  //select('#status').html('Model Loaded');
}


/* function draw() is by P5.js:
      This function is called on repeat forever (unless you plan on closing the browser
      and/or pressing the power button)
*/
function draw() {


	//scale(-1.0,1.0);
//translate(width,0);	
  // show the image we currently have of the webcam output.
  scale(-1.0,1.0);
  translate(-width,0);
  image(webcam_output, 0, 0, width, height);
  
  // draw the points we have got from the poseNet model
  drawKeypoints();
  drawSkeleton();
  
  scale(-1.0,1.0);
  translate(-width,0);
  
  room_num = room_slider.value();
  
  switch( room_num ){
	  case 0: 
		gym.set_room("Home");
		break;
	case 1:
		gym.set_room("squats");
		break;
	case 2:
		gym.set_room("burpees");
		break;
	default: gym.set_room("Home");
  }
  
  gym.show_location();
  kevin.run();
  
 // printInfo();
}

function printInfo(){
	let canvas = document.getElementById("defaultCanvas0");
	let context = canvas.getContext("2d");

	context.fillStyle = "red";
	context.font = "40px Arial";
	

	var x = canvas_width*.05;
	var y = canvas_height*.05;
	var lineheight = 40;
	
}


// A function to draw detected points on the image.
function drawKeypoints(){
  /*
    Remember we saved all the result from the poseNet output in "poses" array.
    Loop through every pose and draw keypoints
   */
   let context = canvas.getContext("2d");
   context.fillStyle = "blue";
  //for (let i = 0; i < poses.length; i++) {
	  if( poses.length > 0 ){
		  let i=0;
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        // choosing colour. RGB where each colour ranges from 0 255
        fill(0, 0, 255);
        // disable drawing outline
        noStroke();
        /* draw a small ellipse. Which being so small looks like a dot. Purpose complete.
            input: X position of the point in the 2D image
                   Y position as well
                   width in px of the ellipse. 10 given
                   height in px of the ellipse. 10 given
        */
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
    /*
    Remember we saved all the result from the poseNet output in "poses" array.
    Loop through every pose and draw skeleton lines.
   */
  // Loop through all the skeletons detected
  //for (let i = 0; i < 1; i++){//poses.length; i++) {
    if( poses.length > 0 ){
		let i = 0;
	let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      // line start point
      let startPoint = skeleton[j][0];
      // line end point
      let endPoint = skeleton[j][1];
      // Sets the color used to draw lines and borders around shapes
      stroke(0, 255, 0);
      /* draw a line:
            input: X position of start point of line in this 2D image
                   Y position as well
                   X position of end point of line in this 2D image
                   Y position as well
          */
      line(startPoint.position.x, startPoint.position.y, endPoint.position.x, endPoint.position.y);
    }
  }
}