settings.outformat="svg";
size(400);

// Parameters for the chaotic Lorenz system
real sigma = 10.0;
real rho = 28.0;
real beta = 8.0/3.0;

// Integration step size and total steps
real dt = 0.008;
int steps = 4000;

// Initial point coordinates in 3D
real x = 0.1;
real y = 0.0;
real z = 0.0;

// Angle to rotate the 3D model for dynamic visualization
real angle = 45 * pi / 180;

// Function to project a 3D coordinate (X, Y, Z) to 2D vector space
pair project(real X, real Y, real Z) {
    // 3D rotation around the Z-axis
    real rotX = X * cos(angle) - Y * sin(angle);
    real rotY = X * sin(angle) + Y * cos(angle);
    
    // Orthographic projection with tilt
    real x2d = rotX;
    real y2d = Z * 0.8 - rotY * 0.4;
    return (x2d * 5.0, y2d * 5.0); // Scale up to center in 400x400 area
}

pair prev = project(x, y, z);

// Generate Lorenz Attractor using Euler integration
for (int i = 0; i < steps; ++i) {
    // Standard Lorenz system ordinary differential equations (ODEs)
    real dx = sigma * (y - x) * dt;
    real dy = (x * (rho - z) - y) * dt;
    real dz = (x * y - beta * z) * dt;
    
    x += dx;
    y += dy;
    z += dz;
    
    pair curr = project(x, y, z);
    
    // Dynamic color gradient interpolation along the trajectory:
    // Indigo (#6366f1) -> Emerald (#10b981) -> Rose (#f43f5e)
    real t = i / (real)steps;
    real r, g, b;
    if (t < 0.5) {
        real factor = t * 2.0;
        r = (1.0 - factor) * 0.38 + factor * 0.06;
        g = (1.0 - factor) * 0.40 + factor * 0.72;
        b = (1.0 - factor) * 0.95 + factor * 0.50;
    } else {
        real factor = (t - 0.5) * 2.0;
        r = (1.0 - factor) * 0.06 + factor * 0.95;
        g = (1.0 - factor) * 0.72 + factor * 0.25;
        b = (1.0 - factor) * 0.50 + factor * 0.37;
    }
    
    // Draw segment with dynamic color gradient
    pen p = rgb(r, g, b) + 0.85bp;
    draw(prev--curr, p);
    prev = curr;
}
