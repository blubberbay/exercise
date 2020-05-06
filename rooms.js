function Room(name, buttons = new Map() ){
	this.name = name;
	this.buttons = buttons;
	this.exercise =  new Exercise( name );
	
	this.display = function()
	{
		this.draw_buttons();
		this.show_name();
		this.show_activity();
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
		context.fillStyle = 'red'
		context.font = "20px Arial";
		context.fillText(name, width * .5, height * .05);
		
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
	
	this.buttons.set( "Home", new ChangeRoom( ButtonLocations[0][0] * width, ButtonLocations[0][1] * height, ButtonSize, ["blue","white"], "Home") );
	this.buttons.set( "Start Timer", new StartTimerButton( ButtonLocations[1][0] * width, ButtonLocations[1][1] * height, ButtonSize, ["blue","red"] ) );
	this.buttons.set( "Stop Timer", new StopTimerButton( ButtonLocations[2][0] * width, ButtonLocations[2][1] * height, ButtonSize, ["blue","red"] ) );
	this.buttons.set( "Reset Timer", new ResetTimerButton( ButtonLocations[3][0] * width, ButtonLocations[3][1] * height, ButtonSize, ["blue","red"] ) );
	
	this.start_timer = function( )
	{
		this.timer_running = true
	}

	this.stop_timer = function()
	{
		this.timer_running = false
	}
	
	this.reset_timer = function()
	{
		this.timer_running = false
		this.timer = 0;
	}
	
	this.show_activity = function()
	{
		if( this.timer_running )
			this.timer += 1;
		minutes = floor(this.timer/60);
		seconds = this.timer % 60;
		
		timer.html(minutes + ":" + seconds);		
	}
	
	
}
ExerciseRoom.prototype = Object.create(Room.prototype);

