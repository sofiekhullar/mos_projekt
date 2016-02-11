clear all;
V0 = 0; % initial speed
m = 0.005; % mass in kg
g = 9.81; % gravity acceleration kg/m3
rho = 1.2; % Air density
Amax = 4.4e-3; % Object maxarea
Amin = 1e-4; % Object minarea
cw = 0.4; % Numerical drag coefficient
N = 100; % Time step
V = zeros(1,N); % Speed
V(1)=V0;
deltat=0.2;
pos(1) = 10; % Start height

%% Räkna fram vinklar

%Slumpar fram en vinkel alpha mellan 0 och 90 grader
alpha=0+(pi/2)*rand(1,1);

%x är fallytan. https://sv.wikipedia.org/wiki/Trigonometri#.C3.96versikt
x=A*cos(alpha);

%Går att ersätta med arean x om man vill. 

%Case 1 Faller med vinkeln mellan 0-45 grader
if(cos(0)<alpha && alpha<cos(pi/4))
       
end

%Case 2 Faller med vinkeln mellan 45-90 grader
if(cos(pi/4)<alpha && alpha<cos(pi/2))
     
end

%Case 3 Faller med en vinkel större än 90 grader
if(alpha>cos(pi/2))
      
end

%%
t=(0:N-1)*deltat; %Tiden
Arand = Amin+Amax*rand(1,1) % Random nr mellan max och min

if( Arand < Amax && Arand > Amax/2) %Horrisontellt
    Arand = Amax;
else   %Vertikalt
    Arand = Amin;
end

k = 0.5*cw*rho*Arand; % Coefficient
   
for i=1:N-1
V(i+1)=V(i)+deltat*(g-(k/m)*V(i)^2); %c calculate the velocity
pos(i+1) = pos(i) + V(i)*t(i+1); % calculate the position
end


plot(t,pos);
xlabel('time in sec');
ylabel('Position in m');
legend ('Euler Method','location','south');
