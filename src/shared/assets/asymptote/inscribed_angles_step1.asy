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

// Points on circle
pair B = pointOnCircle(O, R, -30);
pair C = pointOnCircle(O, R, 90);
pair A = pointOnCircle(O, R, 210);

// Draw the circle
draw(circle(O, R), black+1.5bp);

// Custom angle marking helper
void markAngle(pair vertex, pair p1, pair p2, real radius, pen drawPen, pen fillPen, string labelText="") {
  real a1 = angle(p1 - vertex) * 180 / pi;
  real a2 = angle(p2 - vertex) * 180 / pi;
  if (a2 < a1) a2 += 360;
  if (a2 - a1 > 180) {
    real temp = a1;
    a1 = a2;
    a2 = temp + 360;
  }
  path arcPath = arc(vertex, radius, a1, a2);
  fill(arcPath--vertex--cycle, fillPen);
  draw(arcPath, drawPen);
  if (labelText != "") {
    real midAngle = (a1 + a2) / 2 * pi / 180;
    pair labelPos = vertex + (radius + 0.35) * (cos(midAngle), sin(midAngle));
    label(labelText, labelPos);
  }
}

// Central angle BOC (yellow/orange)
markAngle(O, B, C, 0.7, rgb(230, 140, 10)+1.5bp, rgb(255, 240, 210), "$2\theta$");
draw(B--O--C, rgb(230, 140, 10)+1.5bp);

// Inscribed angle BAC (purple)
markAngle(A, B, C, 0.7, rgb(130, 50, 200)+1.5bp, rgb(240, 230, 255), "$\theta$");
draw(B--A--C, rgb(130, 50, 200)+1.5bp);

// Labels and points
dot("$\mathbf{O}$", O, SW, black);
dot("$\mathbf{A}$", A, A - O, black);
dot("$\mathbf{B}$", B, B - O, black);
dot("$\mathbf{C}$", C, C - O, black);

// Highlight the intercepted arc BC
draw(arc(O, R, -30, 90), rgb(220, 50, 50)+2.5bp);
label("arc $BC$", pointOnCircle(O, R + 0.35, 30), rgb(220, 50, 50));
