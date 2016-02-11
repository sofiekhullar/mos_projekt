function calculate () {

var V0 = 0; // initial speed
var m = 0.005; // mass in kg
var g = 9.81; // gravity acceleration kg/m3
var rho = 1.2; // Air density
var Amax = 0.0044; // Object maxarea
var Amin = 0.0001; // Object minarea
var cw = 0.4; // Numerical drag coefficient
var N = 100; // Time step
var V = new Array(N); // Speed
var posY = new Array(N); //Height
V[0]=V0; //Start velocity
var deltat=0.2;
posY[0] = 10; // Start height

var t = new Array(N); //Tide 
for(i = 0; i < N; i++)
{
	t[i] = i *deltat;
}

var Arand = (Math.random() * Amax + Amin); // Random nr mellan max och min

if( Arand < Amax && Arand > Amax/2) //Horrisontellt
{
	Arand = Amax;
}   
else   //Vertikalt
{
	Arand = Amin;
}

var k = 0.5*cw*rho*Arand; //Coefficient
 
   
for(i=0; i < N; i++)
{
	V[i+1] = V[i] + deltat * (g-(k/m)*Math.pow(V[i], 2));
	posY[i+1] = posY[i] + V[i]*t[i+1];
}
 console.log(posY);


return posY;

}

 

