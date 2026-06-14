settings.outformat="svg";
size(400);

// Draws a mathematical spirograph (hypotrochoid)
void drawSpiro(real R, real r, real d, pen p) {
    path spiro;
    int steps = 1000;
    real maxTheta = 10 * pi;
    
    for (int i = 0; i <= steps; ++i) {
        real theta = i * maxTheta / steps;
        real x = (R - r) * cos(theta) + d * cos((R - r) * theta / r);
        real y = (R - r) * sin(theta) - d * sin((R - r) * theta / r);
        
        if (i == 0) {
            spiro = (x, y);
        } else {
            spiro = spiro--(x, y);
        }
    }
    
    draw(spiro, p);
}

// Draw boundary circle for mathematical context
draw(circle((0,0), 5.0), rgb(226, 232, 240) + 1.2bp);

// Draw three interlocking spirographs of different parameters and colors
drawSpiro(5.0, 3.0, 2.5, rgb(99, 102, 241) + 1.5bp);   // Indigo
drawSpiro(5.0, 3.0, 1.8, rgb(236, 72, 153) + 1.2bp);   // Rose
drawSpiro(5.0, 3.2, 2.2, rgb(16, 185, 129) + 1.0bp);   // Emerald
