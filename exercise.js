var Exercises = {"Squats": new Squats(), "Burpees": new Burpees()};
function Exercise()
{
	this.counter = 0;
	this.state = "inactive";
	this.pose = [];
	
	this.get_state = function()
	{
		return this.state
	}
	this.reset = function()
	{
		this.counter = 0;
		this.state = "inactive"
	}
	this.get_count = function()
	{
		return this.counter;
	}
	this.update_count = function()
	{
		this.counter += 1;
	}
	this.get_state = function()
	{
		return this.state;
	}
	this.set_state = function(next_state)
	{
		this.state = next_state;
	}
	this.display_count = function()
	{
		
		context = canvas.getContext("2d");
					context.fillStyle = fill("white")
			rect(canvas_width*0.90, canvas_height*0.90, canvas_width*0.1, canvas_height*0.1) 

		
		context.fillStyle = fill( "darkred");
		context.font = "30px Arial";
		text( this.counter, canvas_width*.90, canvas_height ); 
	}

	this.get_PositionInfo = function(body_part)
	{
		if( body_part in this.pose )
		{
			return [this.pose[body_part].confidence.toFixed(2)*100, this.pose[body_part].y.toFixed(2)];
		}
	
		
	}


	this.run = function()
	{
		
	}
	this.stop = function()
	{
		this.state = "inactive";
	}
}

function Burpees(){
	Exercise.call(this);
}
//Squats.prototype = Object.create(Exercise.prototype);


function Squats(){
	Exercise.call(this);
	
	this.confidence = 0.1;
	this.completion = 0.3;
	
	this.prev_state = 'inactive';
	this.hip_minus_knee = 100000000;
	
	this.score = 0;
	this.target = 0;


	this.run = function(){
		//collect pose data and record activity

		if( poses.length > 0 )
		{
			this.pose = poses[0].pose;
			this.completion = completion;
			//record activity
			if( this.state === 'inactive' )
				this.set_up()
			else
				this.record_activity()
		}
	}

	this.get_score = function(){
		if( poses.length > 0 ){
			return ((this.pose.leftHip.y + this.pose.rightHip.y ) - (this.pose.leftKnee.y + this.pose.rightKnee.y ) ) / 2
		}
	}

	this.get_target = function(){
		switch( this.get_state() )
		{
			case 'squat':
				return (1 - this.completion ) * this.hip_minus_knee
				break;
			case 'stand up':
				return this.hip_minus_knee + 15
				break;
			default:
		}
		
	}
	this.set_up = function()
	{
		//set to active and record the hip to knee length
		this.state = 'squat';
		this.hip_minus_knee = ( (this.pose.leftHip.y + this.pose.rightHip.y ) - (this.pose.leftKnee.y + this.pose.rightKnee.y ) ) / 2;
		this.reps += 1;
	
		

	}

	this.get_Completion = function()
	{
		return this.completion;
	}


	this.check_down = function()
	{
		if( this.get_score() >= this.get_target() )
			console.log("target achieved");
		if( ( this.get_score() >= this.get_target() ) 
				&& ( this.pose.leftHip.confidence > this.confidence ) && ( this.pose.rightHip.confidence > this.confidence ) 
				&& ( this.pose.leftKnee.confidence > this.confidence ) && ( this.pose.rightKnee.confidence > this.confidence ))
		{
			this.prev_state = this.state;
			this.state='stand up'
		}
	}
	this.check_up=function(){
		
		if( ( this.get_score() <= this.get_target() ) 
				&& ( this.pose.leftHip.confidence > this.confidence ) && ( this.pose.rightHip.confidence > this.confidence )
				&& ( this.pose.leftKnee.confidence > this.confidence ) && ( this.pose.rightKnee.confidence > this.confidence )
			)
		{
			this.prev_state = this.state;
			this.state='squat';
			this.record_squat();
		}
	}
	this.record_squat = function(){
		this.counter += 1;
	}
	
	this.record_activity = function()
	{
		switch( this.get_state() )
		{
			case 'squat':
				this.check_down();
				break;
			case 'stand up':
				this.check_up();
				break;
			default:
		}
	}

}
Squats.prototype = Object.create(Exercise.prototype);

