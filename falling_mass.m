clear all;
V0 = 0; % initial speed
m = 0.003; % mass in kg
g = 9.81; % gravity acceleration kg/m3
rho = 1.2; % Air density
%Amax = 4.4e-3; % Object maxarea
Amax = 0.06237;
Amin = 1e-4; % Object minarea
cw = 0.4; % Numerical drag coefficient
N = 200; % Time step
V = zeros(1,N); % Speed
V(1)=V0; % initial speed
deltat=0.002;

pos(1) = 102; % Start height m

t=(0:N-1)*deltat; %Tiden
Arand = Amin+Amax*rand(1,1) % Random nr mellan max och min

if( Arand < Amax && Arand > Amax/2) %Horrisontellt
    Arand = Amax;
else   %Vertikalt
    Arand = Amin;
end
Arand = Amin;

k = 0.5*cw*rho*Arand; % Coefficient
   
for i=1:N-1
V(i+1)=V(i)- deltat*(g-(k/m)*V(i)^2); %c calculate the velocity
pos(i+1) = pos(i) + V(i)*t(i+1); % calculate the position
end


plot(t,pos);
xlabel('time (s)');
ylabel('Position (m)');
legend ('Euler Method','location','south');