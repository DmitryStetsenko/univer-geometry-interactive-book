settings.outformat="svg";
size(400);

// Recursively builds a Koch curve path between point A and B
path kochPath(pair A, pair B, int level) {
    if (level == 0) {
        return A--B;
    } else {
        pair C = A + (B - A) / 3;
        pair D = A + 2 * (B - A) / 3;
        pair E = C + rotate(60) * (D - C);
        
        return kochPath(A, C, level - 1) & 
               kochPath(C, E, level - 1) & 
               kochPath(E, D, level - 1) & 
               kochPath(D, B, level - 1);
    }
}

// Vertices of the base equilateral triangle
pair A = (0, 0);
pair B = (6, 0);
pair C = (3, 3 * sqrt(3));

// Create closed Koch Snowflake path
path snowflake = kochPath(B, A, 4) & kochPath(A, C, 4) & kochPath(C, B, 4) & cycle;

// Fill the interior with soft purple-indigo tone
fill(snowflake, rgb(99, 102, 241) + opacity(0.08));

// Draw the outline with a thick indigo pen
draw(snowflake, rgb(99, 102, 241) + 1.5bp);
