function Exercise(type)
{
	this.type = type
	this.counter = 0;
	this.state = "off";
	this.get_state = function()
	{
		return this.state
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
		this.state;
	}
	this.set_state = function(next_state)
	{
		this.state = next_state;
	}
}
function TimerExercise()
{
	Exercise.call(this);
}
TimerExercise.prototype = Object.create(Exercise.prototype);

TimerExercise.prototype.display = function()
{
	minutes = floor(this.counter/60);
	seconds = this.counter % 60;
		
	timer.html(minutes + ":" + seconds);
}



function RepExercise()
{
	Exercise.call(this);
}
RepExercise.prototype = Object.create(Exercise.prototype);

RepExercise.prototype.display = function()
{
	minutes = floor(this.counter/60);
	seconds = this.counter % 60;
		
	tex(this.counter);
}
