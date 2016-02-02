clear all;
V0 = 0; % initial speed
m = 0.05; % mass in kg
g = 9.81; % gravity acceleration kg/m3
rho = 1.2; % Air density
A = 0.009; % Object area
cw = 0.4; % Numerical drag coefficient
k = 0.5*cw*rho*A; % Coefficient
N = 100; % Time step
V = zeros(1,N); % Speed
V(1)=V0;
deltat=0.2;
pos(1) = 1000; % Start height

t=(0:N-1)*deltat;

for i=1:N-1
V(i+1)=V(i)+deltat*(g-(k/m)*V(i)^2); %c calculate the velocity
pos(i+1) = pos(i) + V(i)*t(i+1); % calculate the position
end


plot(t,pos);
xlabel('time in sec');
ylabel('Position m');
legend ('Euler Method','location','south');
