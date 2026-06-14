// Coordinate Grid Helper for Asymptote
// Renders coordinate plane with grid lines, axes, and labels using specific colors for CSS targeting.

void drawGrid(real xmin, real xmax, real ymin, real ymax) {
  // Use specific pens for CSS targeting via color selectors
  // Grid lines: rgb(161, 161, 162) -> hex #a1a1a2
  pen gridPen = rgb(161/255, 161/255, 162/255) + 0.4bp;
  
  // Axes: rgb(101, 102, 103) -> hex #656667
  pen axisPen = rgb(101/255, 102/255, 103/255) + 1.2bp;
  
  // Text labels: rgb(101, 102, 103) -> hex #656667
  pen labelPen = rgb(101/255, 102/255, 103/255);
  
  // Draw grid lines
  for (int x = floor(xmin); x <= ceil(xmax); ++x) {
    if (x != 0) {
      draw((x, ymin)--(x, ymax), gridPen);
    }
  }
  for (int y = floor(ymin); y <= ceil(ymax); ++y) {
    if (y != 0) {
      draw((xmin, y)--(xmax, y), gridPen);
    }
  }
  
  // Draw axes
  // X axis
  draw((xmin, 0)--(xmax, 0), axisPen, Arrow(SimpleHead, size=4));
  // Y axis
  draw((0, ymin)--(0, ymax), axisPen, Arrow(SimpleHead, size=4));
  
  // Axis labels
  label("$x$", (xmax - 0.2, 0), NE, labelPen);
  label("$y$", (0, ymax - 0.2), NE, labelPen);
  
  // Tick marks and numbers
  // X ticks
  for (int x = floor(xmin) + 1; x < ceil(xmax); ++x) {
    if (x != 0) {
      draw((x, -0.1)--(x, 0.1), axisPen);
      label((string)x, (x, -0.1), S, labelPen);
    }
  }
  // Y ticks
  for (int y = floor(ymin) + 1; y < ceil(ymax); ++y) {
    if (y != 0) {
      draw((-0.1, y)--(0.1, y), axisPen);
      label((string)y, (-0.1, y), W, labelPen);
    }
  }
  // Origin label "0"
  label("0", (-0.15, -0.15), SW, labelPen);
}
