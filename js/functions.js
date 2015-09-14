
//global variables
var context;
var wi=$(window).width();
var he=$(window).height();

var ctx;

var x0 = 0;
var y0 = he/2;

var dx = 5;
var dy=0;
var radius = 100;
var color = "#000";
var position = "lp"; //left parallel - default
var boundries_logic = "ok"; //initial value the circle is inside the boundries 
var new_position = ""; // a variable to keep the value of latest starting position - related to position

/* defining a JSON object with all the possible starting positions: 4 corners and 4 middle points */
var start = {"startingPoint": [
	{"pos":"1","x":0, "y":0}, //first diagonal, upper corner
	{"pos":"2","x":0, "y":he}, //first diagona, lower corner
	{"pos":"3","x":0, "y":he/2}, //middle left side
	{"pos":"4","x":wi, "y":0}, //second diagonal, upper corner
	{"pos":"5","x":wi, "y":he}, //second diagonal, lower corner
	{"pos":"6","x":wi, "y":he/2},//middle right side
	{"pos":"7","x":wi/2, "y":0}, //up-down, vertical
	{"pos":"8","x":wi/2, "y":he} //down-up vertical
]};


//instead of $(document).ready() function - executes when the document loads

$(function() {
	
// increments on horizontal & vertical

	console.log(wi);
	console.log(he);
	console.log()
	context = $('#myCanvas').get(0).getContext('2d');
	ctx = $('#myCanvas').get(0).getContext('2d');
	
	context.canvas.width = wi;
	context.canvas.height = he;

	ctx.canvas.width = wi;
	ctx.canvas.height = he;

	setInterval(draw,0);

});



//drawing function
function draw() {
	//clearing all the canvas to also clear the circle in the previous position
	context.clearRect(0, 0, wi, he);
	//ctx.clearRect(0, 0, wi, he);
	

	context.beginPath();
	
	//Draw vertical line
	context.moveTo(wi/2,0);
	context.lineTo(wi/2,he);
	context.strokeStyle="#FF0000";
	context.setLineDash([5, 15]);
	context.stroke();

	//Draw horizontal line
	context.moveTo(0,he/2);
	context.lineTo(wi,he/2);
	context.strokeStyle="#FF0000";
	context.setLineDash([5, 15]);
	context.stroke();

	//Draw diagonal line 1
	context.moveTo(0,0);
	context.lineTo(wi,he);
	context.strokeStyle="#FF0000";
	context.setLineDash([5, 15]);
	context.stroke();

	//Draw diagonal line 2
	context.moveTo(wi,0);
	context.lineTo(0,he);
	context.strokeStyle="#FF0000";
	context.setLineDash([5, 15]);
	context.stroke();

	context.closePath();




	//return random starting position
	//returnStartingPosition(); //setting up x0 and y0


	
	
	boundriesLogic(x0,y0,position);


	
	if (boundries_logic === 'stop'){
		returnStartingPosition();
		boundries_logic="ok";
	}
	

	
	returnRandomSpeed(); //changing the speed

	ctx.fillStyle="#000";	
	ctx.arc(x0,y0,radius,0, Math.PI*2, true);
	//ctx.lineWidth = 2;
	//ctx.strokeStyle = 'black';
	//ctx.stroke();
	ctx.closePath();
	ctx.fill();


	switch(new_position){

		case 0:
			position = "lp";
			x0 = x0+dx;
			y0 = he/2;
			break;

		case 1:
			position = "l";
			x0 = x0+dx;
			y0 = y0+dy;
			break;

		case 2:
			position = "l";
			x0 = x0+dx;
			y0 = y0-dy;
			break;

		case 3:
			position = "lp";
			x0 = x0+dx;
			y0 = he/2;
			break;

		case 4:
			position = "r";
			x0 = x0-dx;
			y0 = y0+dy;	
			break;

		case 5:
			position = "r";
			x0 = x0-dx;
			y0 = y0-dy;	
			
			break;

		case 6:
			position = "rp";
			x0 = x0-dx;
			y0 = he/2;
			break;

		case 7:
			position = "u";
			x0=wi/2;
			y0 = y0+dy;	

			break;

		case 8:
			position = "d";
			x0=wi/2;
			y0 = y0-dy;	
			
			break;

		default:
			x0=x0+dx;
			y0 = he/2;
			break;

	}





}




/* vector with speeds */
var speeds = [0.1,5,15]; //actually the distance that we add to dx, and dy
var accelerations =[1,1,1];


//Function to generate a random int between two values

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


//Function that returns the speed (based on randomIntFromInterval)
function returnRandomSpeed() {
	var sp = randomIntFromInterval(1,3); // speeds
	var ac = randomIntFromInterval(1,3); //accelerations
	//will calculate speed on velocity formula in version 2
	var div_to = wi/he;
	switch(sp){
		case 1:
			dx = speeds[0];
			dy = speeds[0]/div_to;
			return speeds[0];
			break;

		case 2:
			dx = speeds[1];
			dy = speeds[1]/div_to;
			return speeds[1];
			break;

		case 3:
			dx = speeds[2];
			dy = speeds[2]/div_to;
			return speeds[2];
			break;

		default:
			dx = speeds[0];
			dy = speeds[0]/div_to;
			return speeds[0];
	}
	

}


//Function that returns the starting position (based on randomIntFromInterval
function returnStartingPosition() {
	var ps = randomIntFromInterval(1,8); 
	//will calculate speed on velocity formula in version 2
	switch(ps){
		case 1:
			x0=start.startingPoint[0].x;
			y0=start.startingPoint[0].y;
			new_position = 1;
			break;

		case 2:
			x0=start.startingPoint[1].x;
			y0=start.startingPoint[1].y;
			new_position = 2;
			break;

		case 3:
			x0=start.startingPoint[2].x;
			y0=start.startingPoint[2].y;
			new_position = 3;
			break;

		case 4:
			x0=start.startingPoint[3].x;
			y0=start.startingPoint[3].y;
			new_position = 4;
			break;

		case 5:
			x0=start.startingPoint[4].x;
			y0=start.startingPoint[4].y;
			new_position = 5;
			break;

		case 6:
			x0=start.startingPoint[5].x;
			y0=start.startingPoint[5].y;
			new_position = 6;
			break;

		case 7:
			x0=start.startingPoint[6].x;
			y0=start.startingPoint[6].y;
			new_position = 7;
			break;

		case 8:
			x0=start.startingPoint[7].x;
			y0=start.startingPoint[7].y;
			new_position = 8;
			break;

		default:
			x0=start[0].x;
			y0=start[0].y;
			new_position = 1;
			break;

	}


}



function boundriesLogic(a,b, pos) {

//a and b are the coordinates and position is left, right, left_parallel, right_parallel, up or down ('l', 'r', 'lp', 'rp', u' or 'd')

	switch(position) {
		case 'l':
			if (x0>wi){
				boundries_logic="stop";
			}
			break;

		case 'r':
			if (x0<0) {
				boundries_logic="stop";
			}
			break;

		case 'lp':
			//Control Prod - prea mare
			if (x0>wi){
				boundries_logic="stop";
			}
			break;

		case 'rp':
			if (x0<0) {
				boundries_logic="stop";
			}
			break;

		case 'u':
			
			if (y0>he) {
				boundries_logic="stop";
			}
			break;
		
		case 'd':
			
			if (y0<0) {
				boundries_logic="stop";
			}
			break;


	}







}


