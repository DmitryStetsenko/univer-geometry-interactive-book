settings.outformat="svg";
size(300);

real a = 3;
real b = 4;
real c = 5;
real s = a + b; // 7

// Large outer square outline
draw((0,0)--(s,0)--(s,s)--(0,s)--cycle, black+1bp);

// Draw the 4 triangles
// Triangle 1: Bottom-Left
filldraw((0,0)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);
// Triangle 2: Bottom-Right
filldraw((s,0)--(s,b)--(b,0)--cycle, rgb(245, 245, 245), black+1.5bp);
// Triangle 3: Top-Right
filldraw((s,s)--(a,s)--(s,b)--cycle, rgb(245, 245, 245), black+1.5bp);
// Triangle 4: Top-Left
filldraw((0,s)--(0,a)--(a,s)--cycle, rgb(245, 245, 245), black+1.5bp);

// Highlight the central square of area c^2
filldraw((b,0)--(s,b)--(a,s)--(0,a)--cycle, rgb(230, 255, 230), rgb(50, 180, 50)+1.5bp);

// Labels for sides on the outer border
// Bottom side
label("$\mathbf{b=4}$", (b/2, 0), S);
label("$\mathbf{a=3}$", (b + a/2, 0), S);

// Right side
label("$\mathbf{b=4}$", (s, b/2), E);
label("$\mathbf{a=3}$", (s, b + a/2), E);

// Top side
label("$\mathbf{b=4}$", (s - b/2, s), N);
label("$\mathbf{a=3}$", (s - b - a/2, s), N);

// Left side
label("$\mathbf{b=4}$", (0, s - b/2), W);
label("$\mathbf{a=3}$", (0, s - b - a/2), W);

// Labels for inner hypotenuses and area
label("$\mathbf{c=5}$", (b/2, a/2), align=NE);
label("$\mathbf{c=5}$", (b + a/2, b/2), align=NW);
label("$\mathbf{c=5}$", (s - b/2, s - a/2), align=SW);
label("$\mathbf{c=5}$", (a/2, s - b/2), align=SE);

label("\large$\mathbf{c^2 = 25}$", (s/2, s/2), rgb(15, 110, 15));
