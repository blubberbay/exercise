function Athlete( name )
{
	this.name = name;
	this.current_room = gym.get_current_room();
	this.counter = 0;
	this.max_counter = 10;
	this.current_activation = "";
	this.min_confidence = 0.2;
	
	this.pose = [];
	
	this.run = function()
	{
		//check if hand 
		if( poses.length > 0 )
			this.pose = poses[0].pose;
		
		if( Object.keys(this.pose).length > 0 ) //WARNING, this assumes poses can carry over from one frame to another
		{	
			this.check_activation()
		}
		//set room state based on pose
		
	}
	
	this.check_activation = function()
	{
		var notFound = true

		
		for( const [button_name, button] of gym.get_current_room_buttons() )
		{
			button_dims = button.get_button_dims();
			left_distance = Math.pow( (width - this.pose.leftWrist.x )  - button_dims[0], 2) + Math.pow( this.pose.leftWrist.y - button_dims[1], 2)
			right_distance = Math.pow( (width - this.pose.rightWrist.x) - button_dims[0], 2) + Math.pow(this.pose.rightWrist.y - button_dims[1], 2) 
			left_confidence = this.pose.leftWrist.confidence;
			right_confidence = this.pose.rightWrist.confidence;
			
			nose_distance = Math.pow( (width - this.pose.nose.x )  - button_dims[0], 2) + Math.pow( this.pose.nose.y - button_dims[1], 2)
			nose_confidence = this.pose.nose.confidence;

			
			if( ( left_distance <= Math.pow( button_dims[2], 2 ) & left_confidence >= this.min_confidence ) 
				| ( right_distance <= Math.pow( button_dims[2], 2 ) & right_confidence >= this.min_confidence )
				| ( nose_distance <= Math.pow( button_dims[2], 2 ) & nose_confidence >= this.min_confidence ) )
			{
				if( this.current_activation == button_name )
				{
					console.log(button_name, this.counter );
					this.counter += 1;
					if( this.counter >= this.max_counter)
					{
						console.log("ACTIVATE");
						gym.activate_button( button_name );
						this.counter = 0;
						this.current_activation = "";
						
					}
					else
						this.counter += 1;
				}
				else
				{
					this.current_activation = button_name;
					this.counter = 0;
				}
			}				
			
		}
		
	}
	
}