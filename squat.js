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

let canvas_height = 720
let canvas_width = 600

let workout; 

var completion = 0.40;
var show_diagnostics = 0;
//Indices for body parts in pose keypoints
/*
let left_hip_index = 11
let right_hip_index = 12
let left_knee_index = 13
let right_knee_index = 14
*/


function setup() {

  /* create a box in browser to show our output. Canvas having:
         width: 640 pixels and
         height: 480 pixels
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
	
  completionSlider = createSlider(0,1,completion, 0.0001 );
  completionSlider.position(10,canvas_height -5 );
  
  diagSlider = createSlider(0,1,show_diagnostics,1);
  diagSlider.position(10,canvas_height + 15);
  
  
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
  	
	workout = new Workout('inactive', confidence = .2);

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
  select('#status').html('Model Loaded');
}


/* function draw() is by P5.js:
      This function is called on repeat forever (unless you plan on closing the browser
      and/or pressing the power button)
*/
function draw() {

  // show the image we currently have of the webcam output.
  image(webcam_output, 0, 0, width, height);

  completion = completionSlider.value();
  
  // draw the points we have got from the poseNet model
  drawKeypoints();

  //drawSkeleton();
  workout.run();
  printInfo();
}

function printInfo(){
	let canvas = document.getElementById("defaultCanvas0");
	let context = canvas.getContext("2d");

	context.fillStyle = "red";
	context.font = "40px Arial";
		

	var x = canvas_width*.05;
	var y = canvas_height*.05;
	var lineheight = 40;

	if( workout.get_state() === 'inactive' )
		context.fillText("Raise both hands above your nose", x, y + 0 * lineheight );
	else
	{
		context.fillText("Current state: " + workout.get_state(), x, y + 0 * lineheight );
		context.fillText("Reps: " + workout.get_reps(), x, y + 1 * lineheight );
		
	}
	
	if( diagSlider.value() ){
	
		context.fillText("Target: "+ workout.get_target(), x,y + 2 * lineheight );
		context.fillText("Score: "+ workout.get_score(), x,y + 3 * lineheight );
		
		context.fillText("Difficulty: " + workout.get_Completion(), x, y + 4 * lineheight );
		
		array_positions = ["leftHip", "rightHip", "leftKnee", "rightKnee" ];
		for(var i =0; i<array_positions.length; i++){
			context.fillText(array_positions[i] +": "+workout.get_PositionInfo(array_positions[i]),x,y+(5+i)*lineheight);
		
		}
	}
	
}


// A function to draw detected points on the image.
function drawKeypoints(){
  /*
    Remember we saved all the result from the poseNet output in "poses" array.
    Loop through every pose and draw keypoints
   */
   let context = canvas.getContext("2d");
   context.fillStyle = "blue";
  for (let i = 0; i < poses.length; i++) {
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
  for (let i = 0; i < poses.length; i++) {
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
