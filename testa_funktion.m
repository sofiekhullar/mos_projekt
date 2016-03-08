clear all;

V0 = 0; % initial speed
m = 0.005; % mass in kg
g = 9.81; % gravity acceleration kg/m3
rho = 1.2; % Air density
Amax = 4.4e-3; % Object maxarea
Amin = 1e-4; % Object minarea
cw = 0.4; % Numerical drag coefficient
N = 100; % Time step
%V = zeros(1,N); % Speed
%V(1)=V0;


deltat=0.2;

t=0;
posy0= 100; %start höjd
posx = 1;

Arand = Amin+Amax*rand(1,1) % Random nr mellan max och min

%if( Arand < Amax && Arand > Amax/2) %Horrisontellt
%    Arand = Amax;
%else   %Vertikalt
%    Arand = Amin;
%end
Arand = Amax;
 
k = 0.5*cw*rho*Arand; % Coefficient
 
h=plot(0,0,'marker','square');
set(h,'markersize', 20);
set(h,'markerfacecolor','b');


while (t<60)
    
    V = V0 - deltat*(g-(k/m)*V0^2);
    posy = posy0 + V*t;
    
 if (posy<=0)
        V = 0;
 end
    
    %Rita
    set(h,'ydata',posy);
    set(h,'xdata',posx);

    drawnow;
    
     t = t+deltat;
     
end



%%
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


