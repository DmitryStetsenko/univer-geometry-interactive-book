settings.outformat="svg";
size(300);

// Define triangle coordinates
pair A = (0, 0);
pair B = (4, 0);
pair C = (0, 3);

// Draw the squares
// Square on side AC (length 3, left)
fill(A--(A+(-3,0))--(C+(-3,0))--C--cycle, rgb(255, 230, 230));
draw(A--(A+(-3,0))--(C+(-3,0))--C--cycle, rgb(220, 50, 50)+1.5bp);

// Square on side AB (length 4, bottom)
fill(A--(A+(0,-4))--(B+(0,-4))--B--cycle, rgb(230, 240, 255));
draw(A--(A+(0,-4))--(B+(0,-4))--B--cycle, rgb(50, 100, 220)+1.5bp);

// Square on hypotenuse BC (length 5)
// The vector BC is (4, -3). The perpendicular vector pointing outwards is (3, 4).
pair B_sq = B + (3, 4);
pair C_sq = C + (3, 4);
fill(B--B_sq--C_sq--C--cycle, rgb(230, 255, 230));
draw(B--B_sq--C_sq--C--cycle, rgb(50, 180, 50)+1.5bp);

// Draw the main triangle
filldraw(A--B--C--cycle, rgb(245, 245, 245), black+2bp);

// Mark the right angle at A
draw((0,0.3)--(0.3,0.3)--(0.3,0), black+1bp);

// Labels
label("$\mathbf{a = 3}$", (A+C)/2, E);
label("$\mathbf{b = 4}$", (A+B)/2, N);
label("$\mathbf{c = 5}$", (B+C)/2, align=NE);

label("\large$\mathbf{a^2 = 9}$", (A+(-1.5, 1.5)), rgb(160, 15, 15));
label("\large$\mathbf{b^2 = 16}$", (A+(2, -2)), rgb(15, 50, 150));
label("\large$\mathbf{c^2 = 25}$", (A+(3.5, 3.5)), rgb(15, 110, 15));
