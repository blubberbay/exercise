function Room(name, buttons = new Map() ){
	this.name = name;
	this.buttons = buttons;
	this.exercise =  Exercises[ name ];
	this.show_body_parts = true
	this.room_type = "base";
	
	this.display = function()
	{
		this.draw_buttons();
		this.show_name();
		
		
		this.show_activity( this.show_body_parts );
	}
	
	this.get_name = function()
	{
		return this.name;
	}
	
	this.add_change_room_button = function(name, position, color )
	{
		this.buttons.set( name, new ChangeRoom( position[0] * width, position[1] * height, ButtonSize, color, name )  ); 
	}
	
	this.draw_buttons = function()
	{
				
		for( const [button_name, button_value] of this.buttons.entries() )
		{
			button_value.display_button();
		}
		
	}
	
	this.get_buttons = function()
	{
		return this.buttons
	}
	
	this.show_activity = function()
	{
	}
	
	this.show_name = function()
	{
		context = canvas.getContext("2d");
		context.fillStyle = fill( "#bb0000");
		context.font = "30px Arial";
		context.fillText(name, width * .5 - 20, height * .10);
		
	}
	
	this.activate_button = function(button_name) 
	{
		return this.buttons.get( button_name ).get( action );//activate_button();
	}
}


function ExerciseRoom( name, buttons = new Map() )
{
	Room.call(this, name, buttons );
	this.timer_running = false
	this.timer = 0;
	this.room_type = "exercise";
	//this.exercise = new Exercise( name );
	
	this.buttons.set( "Home", new ChangeRoom( ButtonLocations[0][0] * width, ButtonLocations[0][1] * height, ButtonSize, RoomButtonColor, "Home") );
	this.buttons.set( "Start Timer", new StartTimerButton( ButtonLocations[1][0] * width, ButtonLocations[1][1] * height, ButtonSize, ["darkblue","darkred"] ) );
	this.buttons.set( "Stop Timer", new StopTimerButton( ButtonLocations[3][0] * width, ButtonLocations[3][1] * height, ButtonSize, ["darkblue","darkred"] ) );
	this.buttons.set( "Reset Timer", new ResetTimerButton( ButtonLocations[4][0] * width, ButtonLocations[4][1] * height, ButtonSize, ["darkblue","darkred"] ) );
	
	this.start_timer = function( )
	{
		this.timer_running = true
		//this.exercise.set_state("active")
		//console.log("In start timer", this.exercise);
	}

	this.stop_timer = function()
	{
		this.timer_running = false
		this.exercise.stop()
		this.exercise =  Exercises[ this.name ];

	}
	
	this.reset_timer = function()
	{
		this.timer_running = false
		this.timer = 0;
		this.exercise.stop()
		this.exercise.reset()
	}
	
	this.show_activity = function(show_positions)
	{
		if( this.timer_running )
			this.timer += 1;
		minutes = floor(this.timer/60);
		seconds = this.timer % 60;
		
		timer.html(minutes + ":" + seconds);	

		this.exercise.display_count()
		
			var x = canvas_width*.05;
			var y = canvas_height*.05;
			var lineheight = 40;
		
		if( show_positions )
		{
		
			array_positions = ["leftHip", "rightHip", "leftKnee", "rightKnee" ];
			for(var i =0; i<array_positions.length; i++)
			{
				context.font = "bold 20px Arial"
				context.fillStyle = fill("darkred");

				context.fillText(array_positions[i] +": "+ this.exercise.get_PositionInfo(array_positions[i]),x,y+(5+i)*lineheight);
		
			//console.log("In ExerciseRoom, this.exercise:",this.exercise);
			
			}
		}
				context.font = "bold 30px Arial"
				context.fillStyle = fill("darkred");
			context.fillText(this.exercise.get_state(), x, canvas_height*0.95 )
		
	}
	
	
}
ExerciseRoom.prototype = Object.create(Room.prototype);

