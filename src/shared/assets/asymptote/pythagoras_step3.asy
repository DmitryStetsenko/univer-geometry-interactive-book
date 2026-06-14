settings.outformat="svg";
size(300);

real a = 3;
real b = 4;
real s = a + b; // 7

// Large outer square outline
draw((0,0)--(s,0)--(s,s)--(0,s)--cycle, black+1bp);

// Draw the 4 rearranged triangles (forming two ab rectangles)
// Rectangle 1 (Bottom-Left, 4x3)
// Divided into Triangle 1 and Triangle 2
filldraw((0,0)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((b,a)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);

// Rectangle 2 (Top-Right, 3x4)
// Divided into Triangle 3 and Triangle 4
filldraw((b,a)--(s,a)--(s,s)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((b,s)--(b,a)--(s,s)--cycle, rgb(245, 245, 245), black+1.5bp);

// Highlight the remaining squares: a^2 and b^2
// Square a^2 (Bottom-Right, 3x3)
filldraw((b,0)--(s,0)--(s,a)--(b,a)--cycle, rgb(255, 230, 230), rgb(220, 50, 50)+1.5bp);

// Square b^2 (Top-Left, 4x4)
filldraw((0,a)--(b,a)--(b,s)--(0,s)--cycle, rgb(230, 240, 255), rgb(50, 100, 220)+1.5bp);

// Labels for outer sides
// Bottom side
label("$b=4$", (b/2, 0), S);
label("$a=3$", (b + a/2, 0), S);

// Right side
label("$a=3$", (s, a/2), E);
label("$b=4$", (s, a + b/2), E);

// Top side
label("$b=4$", (b/2, s), N);
label("$a=3$", (b + a/2, s), N);

// Left side
label("$a=3$", (0, a/2), W);
label("$b=4$", (0, a + b/2), W);

// Labels for inner areas
label("$a^2$", (b + a/2, a/2), rgb(220, 50, 50));
label("Area = 9", (b + a/2, a/2 - 0.4), rgb(220, 50, 50));

label("$b^2$", (b/2, a + b/2), rgb(50, 100, 220));
label("Area = 16", (b/2, a + b/2 - 0.4), rgb(50, 100, 220));
