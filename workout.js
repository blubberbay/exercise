function Workout(initial_state, confidence = 0.25 ){
	this.reps = -1;
	this.state = initial_state;
	this.pose = [];
	
	this.confidence = confidence;
	this.completion = 0.4;
	
	this.prev_state = 'inactive';
	this.hip_minus_knee = 100000000;
	
	this.score = 0;
	this.target = 0;

	this.get_PositionInfo = function(part)
	{
		if( part in this.pose )
		{
			return [this.pose[part].y.toFixed(2), this.pose[part].confidence.toFixed(2)];
		}
	
		
	}

	this.run = function(){
		//collect pose data and record activity
		if( poses.length > 0 )
		{
			this.pose = poses[0].pose;
			this.completion = completion;
			//record activity
			if( this.state === 'inactive' )
				this.set_state()
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
	this.set_state = function()
	{
		
		if( ( this.pose.rightWrist.y < this.pose.nose.y ) && ( this.pose.leftWrist.y < this.pose.nose.y ) 
			&& ( this.pose.leftWrist.confidence > this.confidence ) && ( this.pose.rightWrist.confidence > this.confidence ) && ( this.pose.nose.confidence > this.confidence ) )
		{
			//set to active and record the hip to knee length
			this.state = 'squat';
			this.hip_minus_knee = ( (this.pose.leftHip.y + this.pose.rightHip.y ) - (this.pose.leftKnee.y + this.pose.rightKnee.y ) ) / 2;
			this.reps += 1;
		}

	}

	this.get_Completion = function()
	{
		return this.completion;
	}


	this.check_down = function()
	{
		
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
		this.reps += 1;
	}
	
	this.get_reps = function()
	{
		return this.reps;
	}

	this.get_state = function()
	{
		return this.state;
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