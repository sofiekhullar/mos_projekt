function [ dz ] = funk1( t, z )
%UNTITLED4 Summary of this function goes here
%   Detailed explanation goes here
m = 5;
k = 0.5;
g = 9.82;

dz = [  z(2)
       (-k/m)*z(2)
       z(4)
       (-k/m)*z(4) - g ];
   
end

