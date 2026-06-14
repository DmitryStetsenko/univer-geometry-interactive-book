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

// Draw the circle (Thicker and darker)
draw(circle(O, R), black+2.2bp);

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
    pair labelPos = vertex + (radius + 0.45) * (cos(midAngle), sin(midAngle));
    label(labelText, labelPos);
  }
}

// Central angle BOC (vibrant orange/red, thicker lines)
markAngle(O, B, C, 0.8, rgb(240, 100, 0)+2.2bp, rgb(255, 235, 220), "$\mathbf{2\theta}$");
draw(B--O--C, rgb(240, 100, 0)+2.2bp);

// Inscribed angle BAC (vibrant purple, thicker lines)
markAngle(A, B, C, 0.8, rgb(130, 20, 210)+2.2bp, rgb(245, 225, 255), "$\mathbf{\theta}$");
draw(B--A--C, rgb(130, 20, 210)+2.2bp);

// Labels and points (larger, bold labels)
dot("$\mathbf{O}$", O, SW, black);
dot("$\mathbf{A}$", A, A - O, black);
dot("$\mathbf{B}$", B, B - O, black);
dot("$\mathbf{C}$", C, C - O, black);

// Highlight the intercepted arc BC (Thicker and brighter red)
draw(arc(O, R, -30, 90), rgb(230, 30, 30)+3.2bp);
label("$\mathbf{arc\ BC}$", pointOnCircle(O, R + 0.45, 30), rgb(230, 30, 30));
