var ButtonLocations = [];
ButtonLocations[0] = [.05, .05];
ButtonLocations[1] = [.05, .5];
ButtonLocations[2] = [.05, .95];
ButtonLocations[3] = [.95, .05];
ButtonLocations[4] = [.95, .5];
ButtonLocations[5] = [.95, .95];

var ButtonSize = 50;

function Gym(){
	this.rooms = new Map();
	this.rooms.set( "Home", new Room("Home") );
	
	this.current_room = "Home";
	
	this.show_location = function()
	{
		this.rooms.get( this.current_room ).display();
	}

	this.add_room = function(room_name, room = new Room(room_name) )
	{
		this.rooms.set( room_name, room )
		this.rooms.get( "Home" ).add_button( room_name, ButtonLocations[ this.rooms.size - 1 ], "red", room_name  ); 
	}
	
	this.set_room = function( room )
	{
		this.current_room = room;
	}
}


function Room(name, buttons = new Map() ){
	this.name = name;
	this.buttons = buttons;
	this.buttons.set( "Home", new Button( ButtonLocations[0][0] * width, ButtonLocations[0][1] * height, ButtonSize, "red", "Home" ) );
	
	this.display = function()
	{
		console.log(this.buttons.entries() )
		this.draw_buttons();
		this.show_name();
		//this.show_activity();
	}
	
	this.get_name = function()
	{
		return this.name;
	}
	this.add_button = function(name, position, color, txt )
	{
		console.log(name, position, color, txt);
		this.buttons.set( name, new Button( position[0] * width, position[1] * height, ButtonSize, color, txt ) ); 
	}
	
	this.draw_buttons = function()
	{
		
		for( const [button_name, button_value] of this.buttons.entries() )
		{
			//console.log(this.get_name());
			console.log(button_name);
			button_value.display_button();
		}
		
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
}

function Button(x,y,radius,color,txt)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.txt = txt;
	this.font = "10px Arial"
	
	this.get_button_txt = function()
	{
		return this.txt;
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
}