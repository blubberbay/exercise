function Button(x,y,radius,color,txt="" )
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.txt = txt;
	this.font = "10px Arial"
	this.state = "inactive"
	
	this.button_pressed = function()
	{
		this.state = "active"
	}
	
	this.button_depressed = function()
	{
		this.state = "inactive"
	}
	
	this.get_button_txt = function()
	{
		return this.txt;
	}
	
	this.get_button_dims = function()
	{
		return [this.x, this.y, this.radius]
	}
	
	this.get_color = function()
	{
		switch( this.state ){
			case "inactive" : return this.color[0]; break;
			case "active": return this.color[1]; break;
			default:
		}
	}
	
	this.display_button = function(){
        // disable drawing outline
		
		context = canvas.getContext("2d");
		context.fillStyle = this.get_color();
		noStroke();
		ellipse(this.x, this.y, this.radius, this.radius);
		context.font = "10px Arial";
		context.fillStyle = "white";
		text( this.txt, this.x - textWidth( this.txt) / 2, this.y ); 
		//context.fillText(this.x, this.y, this.txt);
		
		this.button_depressed() //after displaying a button make sure it's inactive
		
	}
}
function PatternButton(x, y, radius, color, txt, layers =3 ){
	Button.call(this, x,y,radius,color, txt );	
	this.layers = layers
	
	this.display_button = function()
	{
		context = canvas.getContext("2d");
		for( var i = 0; i<layers; i++ )
		{
			context.fillStyle = fill('rgb(0,0,200,0)')
			noStroke();
			radius = this.radius * (1 - (2*i) / (2*this.layers) ) 
			ellipse( this.x, this.y, radius, radius )

			context.fillStyle = this.get_color();
			noStroke();
			radius = this.radius * (1 - (2*i+1) / (2*this.layers) ) 
			ellipse( this.x, this.y, radius, radius )
		}
	}
}
PatternButton.prototype = Object.create(Button.prototype);


function StartTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Start Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().start_timer()
	}
}
StartTimerButton.prototype = Object.create(Button.prototype);

function StopTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Stop Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().stop_timer()
	}
}
StopTimerButton.prototype = Object.create(Button.prototype);

function ResetTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Reset Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().reset_timer()
	}
}
ResetTimerButton.prototype = Object.create(Button.prototype);


function ChangeRoom(x,y, radius, color, next_room ){
	Button.call(this, x,y,radius,color, next_room);
	this.args = next_room 
	
	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.set_room( this.args );		
	}
}
ChangeRoom.prototype = Object.create(Button.prototype);







