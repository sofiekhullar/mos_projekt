function [t1, y1] = odeSolverEuler(fun, tspan, z0, n)

h = (tspan(2) - tspan(1)) / n;
y1(:,1) = z0;
t1(1) = tspan(1);

for k = 1:n
     y1(:,k+1) = y1(:,k) + h * fun(t1(k),  y1(:,k));
     t1(k + 1) = tspan(1) + h * k;
end

end


