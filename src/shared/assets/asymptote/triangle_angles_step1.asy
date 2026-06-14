settings.outformat="svg";
size(300);
import grid_helper;

// Define triangle coordinates
pair A = (1, 1);
pair B = (7, 1);
pair C = (3, 5);

// Draw the coordinate grid
drawGrid(-1, 9, -1, 7);

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

// Draw the interior angles
// Angle A (alpha) - red
markAngle(A, B, C, 0.6, rgb(220, 50, 50)+1.5bp, rgb(255, 230, 230), "$\alpha$");

// Angle B (beta) - green
markAngle(B, C, A, 0.6, rgb(50, 180, 50)+1.5bp, rgb(230, 255, 230), "$\beta$");

// Angle C (gamma) - blue
markAngle(C, A, B, 0.6, rgb(50, 100, 220)+1.5bp, rgb(230, 240, 255), "$\gamma$");

// Fill inside the triangle with a very light background
fill(A--B--C--cycle, rgb(245, 245, 245)+opacity(0.4));

// Draw the main triangle sides
draw(A--B--C--cycle, black+2bp);

// Labels for vertices
label("$\mathbf{A}$", A, SW);
label("$\mathbf{B}$", B, SE);
label("$\mathbf{C}$", C, N);
