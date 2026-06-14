settings.outformat="svg";
size(300);
import grid_helper;

// Draw the coordinate grid
drawGrid(0, 8, 0, 8);

// Circle center and radius
pair O = (4, 4);
real R = 3;

// Helper to find point on circle by angle in degrees
pair pointOnCircle(pair center, real radius, real angleDegrees) {
  real rad = angleDegrees * pi / 180;
  return center + radius * (cos(rad), sin(rad));
}

// Points on circle (BC is a diameter)
pair B = (1, 4); // 180 degrees
pair C = (7, 4); // 0 degrees
pair A = pointOnCircle(O, R, 60);

// Draw the circle (Thicker and darker)
draw(circle(O, R), black+2.2bp);

// Draw diameter BC (High-contrast solid teal line)
draw(B--C, rgb(0, 150, 136)+2.2bp);

// Draw inscribed angle BAC (Thicker purple lines)
draw(B--A--C, rgb(130, 20, 210)+2.2bp);

// Draw right angle mark at A (Larger and clearer)
real size = 0.35;
pair dir1 = unit(B - A);
pair dir2 = unit(C - A);
pair pt1 = A + size * dir1;
pair pt2 = A + size * dir2;
pair pt3 = A + size * dir1 + size * dir2;
fill(A--pt1--pt3--pt2--cycle, rgb(245, 225, 255));
draw(pt1--pt3--pt2, rgb(130, 20, 210)+2bp);

// Labels and points (Bold)
dot("$\mathbf{O}$", O, S, black);
dot("$\mathbf{A}$", A, A - O, black);
dot("$\mathbf{B}$", B, W, black);
dot("$\mathbf{C}$", C, E, black);

label("$\mathbf{90^\circ}$", A - (0.1, 0.55), rgb(130, 20, 210));
label("$\mathbf{d = 2R}$", O + (0, 0.4), rgb(0, 150, 136));
