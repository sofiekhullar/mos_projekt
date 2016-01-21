%% Euler's metod
clear all;
v0 = 20;
theta = pi/6;

tspan = [0,10];

z0 = [0; v0*cos(theta) ; 0; v0*sin(theta)];
n = 100;

[ t1, y1 ] = odeSolverEuler(@funk1, tspan, z0, n );

plot(y1(1,:),y1(3,:))