clear all;
V0 = 0; % initial speed
m = 0.005; % mass in kg
g = 9.81; % gravity acceleration kg/m3
rho = 1.2; % Air density
A = 4.4e-3; % Object area
cw = 0.4; % Numerical drag coefficient
k = 0.5*cw*rho*A; % Coefficient
N = 100; % Time step
V = zeros(1,N); % Speed
V(1)=V0;
deltat=0.2;
pos(1) = 10; % Start height

t=(0:N-1)*deltat; %Tiden

%%

%Slumpar fram en vinkel alpha mellan 0 och 90 grader
alpha=0+(pi/2)*rand(1,1);

%x �r fallytan. https://sv.wikipedia.org/wiki/Trigonometri#.C3.96versikt
x=A*cos(alpha);

%%

%G�r att ers�tta med arean x om man vill. 

%Case 1 Faller med vinkeln mellan 0-45 grader
if(cos(0)<alpha && alpha<cos(pi/4))
       
end

%Case 2 Faller med vinkeln mellan 45-90 grader
if(cos(pi/4)<alpha && alpha<cos(pi/2))
     
end

%Case 3 Faller med en vinkel st�rre �n 90 grader
if(alpha>cos(pi/2))
      
end


%%
%R = 0.1e-3+4.41e-3*rand(1,1) % Random nr mellan max och min

for i=1:N-1
V(i+1)=V(i)+deltat*(g-(k/m)*V(i)^2); %c calculate the velocity
pos(i+1) = pos(i) + V(i)*t(i+1); % calculate the position
end


plot(t,pos);
xlabel('time in sec');
ylabel('Position m');
legend ('Euler Method','location','south');
