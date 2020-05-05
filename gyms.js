var canvas_pct = 0.1;
var ButtonLocations = [];
ButtonLocations[0] = [canvas_pct, canvas_pct];
ButtonLocations[1] = [canvas_pct, .5];
ButtonLocations[2] = [canvas_pct, 1.0 - canvas_pct];
ButtonLocations[3] = [1.0-canvas_pct, canvas_pct];
ButtonLocations[4] = [1.0 - canvas_pct, .5];
ButtonLocations[5] = [1.0 - canvas_pct, 1.0 - canvas_pct];

var ButtonSize = 100;

function Gym(){
	this.rooms = new Map();
	this.rooms.set( "Home", new Room("Home") );
	
	this.current_room = "Home";
	
	this.show_location = function()
	{
		this.rooms.get( this.current_room ).display();
	}

	this.add_room = function(room_name, room = new ExerciseRoom(room_name) )
	{
		this.rooms.set( room_name, room )
		this.rooms.get( "Home" ).add_button( room_name, ButtonLocations[ this.rooms.size - 1 ], "blue", room_name,  this.name = room_name ); 
	}
	
	this.activate_button = function( button_name )
	{
		//Get the room, activate the button for that room
		console.log("Gym activate button", this.rooms )
		this.rooms.get( this.current_room );
	}
	
	this.set_room = function( room )
	{
		this.current_room = room;
	}
	
	this.get_current_room = function()
	{
		return this.rooms.get( this.current_room );
	}
	
	this.get_current_room_buttons = function()
	{
		room = this.get_current_room()
		return room.get_buttons();
		
	}
}


function Room(name, buttons = new Map() ){
	this.name = name;
	this.buttons = buttons;
	this.counter = 0;
	
	
	this.display = function()
	{
		this.draw_buttons();
		this.show_name();
		//this.show_activity();
	}
	
	this.get_name = function()
	{
		return this.name;
	}
	
	this.add_button = function(name, position, color, txt, action )
	{
		console.log("room add button", name, txt, action );
		this.buttons.set( name, new Button( position[0] * width, position[1] * height, ButtonSize, color, txt, action ) ); 
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
		return this.buttons.entries()
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
		console.log( "room activate button", button_name, this.buttons.get( button_name) );
		return this.buttons.get( button_name ).get( action );//activate_button();
	}
}


function ExerciseRoom( name, buttons = new Map() )
{
	Room.call(this, name, buttons );
	
	this.buttons.set( "Home", new Button( ButtonLocations[0][0] * width, ButtonLocations[0][1] * height, ButtonSize, "red", "Home", this.name = "New Name" ) );
	this.buttons.set( "Start Timer", new Button( ButtonLocations[1][0] * width, ButtonLocations[1][1] * height, ButtonSize, "red", "Start Timer", this.name = "Start TImer" ) );
	this.buttons.set( "Stop Timer", new Button( ButtonLocations[2][0] * width, ButtonLocations[2][1] * height, ButtonSize, "red", "Stop Timer", this.name = "Stop TImer" ) );
	this.buttons.set( "Reset Timer", new Button( ButtonLocations[3][0] * width, ButtonLocations[3][1] * height, ButtonSize, "red", "Reset Timer", this.name = "Start TImer" ) );
	
}
ExerciseRoom.prototype = Object.create(Room.prototype);


function Button(x,y,radius,color,txt, action )
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.txt = txt;
	this.font = "10px Arial"
	this.action = function(){ action };
	
	console.log("In BUtton", x,y,radius,color,txt, action );
	
	this.get_button_txt = function()
	{
		return this.txt;
	}
	
	this.get_button_dims = function()
	{
		return [this.x, this.y, this.radius]
	}
	
	this.display_button = function(){
        // disable drawing outline
        context = canvas.getContext("2d");
		context.fillStyle = this.color;
		noStroke();
		ellipse(this.x, this.y, this.radius, this.radius);
		context.font = "10px Arial";
		context.fillStyle = "white";
		text( this.txt, this.x - textWidth( this.txt) / 2, this.y ); 
		//context.fillText(this.x, this.y, this.txt);
	}
	
		this.start_timer = function( )
	{
		this.get_current_room().counter++;
		minutes = floor(this.get_current_room().counter/60);
		seconds = this.get_current_room().counter % 60;
		
		timer.html(minutes + ":" + seconds);		
	}

	this.stop_timer = function()
	{
		minutes = floor(this.get_current_room().counter/60);
		seconds = this.get_current_room().counter % 60;
		
		timer.html(minutes + ":" + seconds);		
	}

	this.reset_timer = function()
	{
		this.get_current_room().counter=0;
		minutes = floor(this.get_current_room().counter/60);
		seconds = this.get_current_room().counter % 60;
		
		return timer.html(minutes + ":" + seconds);		
	}

	this.set_room = function( room )
	{
		this.set_room( room );
	}
}