import React, { useState, useRef, useEffect } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Cpu,
  Contrast,
  Workflow,
  Box
} from 'lucide-react';
import styles from './ShowcasePage.module.css';

// Resolve SVG URLs
const kochUrl = new URL('../../shared/assets/asymptote/koch_snowflake.svg', import.meta.url).href;
const spiroUrl = new URL('../../shared/assets/asymptote/spirograph.svg', import.meta.url).href;
const lorenzUrl = new URL('../../shared/assets/asymptote/lorenz_attractor.svg', import.meta.url).href;

// Import raw code strings
import kochCode from '../../shared/assets/asymptote/koch_snowflake.asy?raw';
import spiroCode from '../../shared/assets/asymptote/spirograph.asy?raw';
import lorenzCode from '../../shared/assets/asymptote/lorenz_attractor.asy?raw';

// WebGL shader code to show in the code viewer drawer
const webglShaderCode = `// WebGL Vertex Shader (3D Rotation & Perspective Projection)
const vsSource = \`
  attribute vec3 position;
  attribute vec3 color;
  uniform vec2 uRotation;
  uniform float uAspect;
  varying vec3 vColor;

  void main() {
    vColor = color;
    
    // Rotate around Y-axis
    float cy = cos(uRotation.y);
    float sy = sin(uRotation.y);
    vec3 p1 = vec3(
      position.x * cy - position.z * sy,
      position.y,
      position.x * sy + position.z * cy
    );
    
    // Rotate around X-axis
    float cx = cos(uRotation.x);
    float sx = sin(uRotation.x);
    vec3 p2 = vec3(
      p1.x,
      p1.y * cx - p1.z * sx,
      p1.y * sx + p1.z * cx
    );
    
    // Perspective Projection projection (z-translate by 3.5)
    float fov = 1.3;
    float zDist = 3.5;
    float depth = p2.z + zDist;
    gl_Position = vec4(
      p2.x * fov,
      p2.y * fov * uAspect,
      p2.z * 0.1,
      depth
    );
  }
\`;

// WebGL Fragment Shader (Color Interpolation with Uniform Override)
const fsSource = \`
  precision mediump float;
  varying vec3 vColor;
  uniform vec4 uColorOverride;

  void main() {
    if (uColorOverride.a > 0.0) {
      gl_FragColor = uColorOverride;
    } else {
      gl_FragColor = vec4(vColor, 1.0);
    }
  }
\`;`;

/**
 * High-performance WebGL 3D rotating geometry component.
 * Renders a 3D Saddle Surface (Hyperbolic Paraboloid) with 3D coordinate axes.
 * Features auto-rotation and interactive mouse/touch drag controls.
 * Bypasses React state updates inside the animation loop for 60fps performance.
 */
const WebGLCrystalDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.6, y: 0.5 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationStartRef = useRef({ x: 0.6, y: 0.5 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec3 position;
      attribute vec3 color;
      uniform vec2 uRotation;
      uniform float uAspect;
      varying vec3 vColor;
      void main() {
        vColor = color;
        float cy = cos(uRotation.y);
        float sy = sin(uRotation.y);
        vec3 p1 = vec3(
          position.x * cy - position.z * sy,
          position.y,
          position.x * sy + position.z * cy
        );
        float cx = cos(uRotation.x);
        float sx = sin(uRotation.x);
        vec3 p2 = vec3(
          p1.x,
          p1.y * cx - p1.z * sx,
          p1.y * sx + p1.z * cx
        );
        float fov = 1.3;
        float zDist = 3.5;
        float depth = p2.z + zDist;
        gl_Position = vec4(
          p2.x * fov,
          p2.y * fov * uAspect,
          p2.z * 0.1,
          depth
        );
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      uniform vec4 uColorOverride;
      void main() {
        if (uColorOverride.a > 0.0) {
          gl_FragColor = uColorOverride;
        } else {
          gl_FragColor = vec4(vColor, 1.0);
        }
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Generate Surface Grid Vertices & Colors (Saddle surface: z = 0.4 * (x^2 - y^2))
    const numSegments = 30;
    const gridSize = numSegments + 1;
    const surfaceVertices = [];
    const surfaceColors = [];

    for (let i = 0; i < gridSize; ++i) {
      const x = -1.2 + 2.4 * (i / numSegments);
      for (let j = 0; j < gridSize; ++j) {
        const y = -1.2 + 2.4 * (j / numSegments);
        const z = 0.45 * (x * x - y * y);
        surfaceVertices.push(x, y, z);

        // Color based on height z (normalize z from [-0.648, 0.648] to [0, 1])
        const zNorm = (z + 0.65) / 1.3;
        const zClamped = Math.max(0, Math.min(1, zNorm));

        // Premium dynamic math gradient: Indigo (low) -> Teal (mid) -> Magenta (high)
        let r, g, b;
        if (zClamped < 0.5) {
          const t = zClamped * 2;
          r = 0.39 * (1 - t) + 0.08 * t;
          g = 0.40 * (1 - t) + 0.72 * t;
          b = 0.95 * (1 - t) + 0.65 * t;
        } else {
          const t = (zClamped - 0.5) * 2;
          r = 0.08 * (1 - t) + 0.93 * t;
          g = 0.72 * (1 - t) + 0.28 * t;
          b = 0.65 * (1 - t) + 0.60 * t;
        }
        surfaceColors.push(r, g, b);
      }
    }

    // Generate indices for surface triangles and grid lines
    const indicesTriangles = [];
    const indicesLines = [];

    for (let i = 0; i < numSegments; ++i) {
      for (let j = 0; j < numSegments; ++j) {
        const p0 = i * gridSize + j;
        const p1 = i * gridSize + (j + 1);
        const p2 = (i + 1) * gridSize + j;
        const p3 = (i + 1) * gridSize + (j + 1);

        indicesTriangles.push(p0, p1, p2);
        indicesTriangles.push(p2, p1, p3);

        indicesLines.push(p0, p1);
        indicesLines.push(p0, p2);
      }
    }

    // Add outer edges for the grid lines
    for (let i = 0; i < numSegments; ++i) {
      indicesLines.push(i * gridSize + numSegments, (i + 1) * gridSize + numSegments);
      indicesLines.push(numSegments * gridSize + i, numSegments * gridSize + (i + 1));
    }

    // Generate 3D Coordinate Axes (X = Red, Y = Green, Z = Blue) with tick lines
    const surfaceVertexCount = gridSize * gridSize;
    const axesVertices: number[] = [];
    const axesColors: number[] = [];
    const indicesAxes: number[] = [];

    const addAxisLineWithTicks = (
      axisIndex: number, // 0 for X, 1 for Y, 2 for Z
      minVal: number,
      maxVal: number,
      color: [number, number, number],
      ticks: number[]
    ) => {
      const getVertexIdx = () => surfaceVertexCount + axesVertices.length / 3;

      // Axis line
      const lineStartIdx = getVertexIdx();
      const startPos = [0, 0, 0];
      const endPos = [0, 0, 0];
      startPos[axisIndex] = minVal;
      endPos[axisIndex] = maxVal;
      axesVertices.push(...startPos, ...endPos);
      axesColors.push(...color, ...color);
      indicesAxes.push(lineStartIdx, lineStartIdx + 1);

      // Axis ticks
      ticks.forEach(val => {
        const tickStartIdx = getVertexIdx();
        const tStart = [0, 0, 0];
        const tEnd = [0, 0, 0];
        // Tick perpendicular offsets
        const offsetAxis = (axisIndex + 1) % 3;
        tStart[axisIndex] = val;
        tEnd[axisIndex] = val;
        tStart[offsetAxis] = -0.04;
        tEnd[offsetAxis] = 0.04;
        axesVertices.push(...tStart, ...tEnd);
        axesColors.push(...color, ...color);
        indicesAxes.push(tickStartIdx, tickStartIdx + 1);
      });
    };

    // Add X-axis (Red)
    addAxisLineWithTicks(0, -1.5, 1.5, [0.94, 0.27, 0.27], [-1.0, -0.5, 0.5, 1.0]);
    // Add Y-axis (Green)
    addAxisLineWithTicks(1, -1.5, 1.5, [0.13, 0.77, 0.37], [-1.0, -0.5, 0.5, 1.0]);
    // Add Z-axis (Blue)
    addAxisLineWithTicks(2, -1.2, 1.2, [0.23, 0.51, 0.96], [-1.0, -0.5, 0.5, 1.0]);

    // Combine surface & axes data
    const combinedVertices = new Float32Array([...surfaceVertices, ...axesVertices]);
    const combinedColors = new Float32Array([...surfaceColors, ...axesColors]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, combinedVertices, gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, combinedColors, gl.STATIC_DRAW);
    const colorLoc = gl.getAttribLocation(program, 'color');
    gl.enableVertexAttribArray(colorLoc);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

    // Element buffers
    const triBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesTriangles), gl.STATIC_DRAW);

    const lineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesLines), gl.STATIC_DRAW);

    const axesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, axesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesAxes), gl.STATIC_DRAW);

    const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
    const uAspectLoc = gl.getUniformLocation(program, 'uAspect');
    const uColorOverrideLoc = gl.getUniformLocation(program, 'uColorOverride');

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let lastTime = 0;
    const render = (time: number) => {
      if (!isDraggingRef.current) {
        if (lastTime !== 0) {
          const delta = (time - lastTime) * 0.001;
          rotationRef.current.y += delta * 0.15; // rotate vertically (Y-axis)
        }
      }
      lastTime = time;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.uniform2f(uRotationLoc, rotationRef.current.x, rotationRef.current.y);
      gl.uniform1f(uAspectLoc, width / height);

      // Check current page theme for grid contrast
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // 1. Draw Surface Triangles (shaded)
      gl.uniform4f(uColorOverrideLoc, 0.0, 0.0, 0.0, 0.0); // Use vertex colors
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
      gl.drawElements(gl.TRIANGLES, indicesTriangles.length, gl.UNSIGNED_SHORT, 0);

      // 2. Draw Wireframe Grid Lines (slightly offset to avoid z-fighting)
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(1.0, 1.0);
      
      if (isDark) {
        gl.uniform4f(uColorOverrideLoc, 1.0, 1.0, 1.0, 0.12); // subtle white in dark mode
      } else {
        gl.uniform4f(uColorOverrideLoc, 0.09, 0.12, 0.18, 0.22); // dark grey in light mode
      }
      
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
      gl.drawElements(gl.LINES, indicesLines.length, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);

      // 3. Draw Coordinate Axes (lit up with their vertex colors)
      gl.uniform4f(uColorOverrideLoc, 0.0, 0.0, 0.0, 0.0); // Use vertex colors
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, axesBuffer);
      gl.drawElements(gl.LINES, indicesAxes.length, gl.UNSIGNED_SHORT, 0);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { ...rotationRef.current };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    rotationRef.current.x = rotationStartRef.current.x + dy * 0.01;
    rotationRef.current.y = rotationStartRef.current.y + dx * 0.01;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    rotationStartRef.current = { ...rotationRef.current };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    rotationRef.current.x = rotationStartRef.current.x + dy * 0.015;
    rotationRef.current.y = rotationStartRef.current.y + dx * 0.015;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab'
      }}
    />
  );
};

interface ShowcaseItemProps {
  title: string;
  subtitle: string;
  description: string;
  mathNotes: string;
  svgPath?: string;
  asyCode: string;
  icon: React.ReactNode;
  webglDemo?: React.ReactNode;
}

const ShowcaseCard: React.FC<ShowcaseItemProps> = ({
  title,
  subtitle,
  description,
  mathNotes,
  svgPath,
  asyCode,
  icon,
  webglDemo
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Zoom & Pan states for static SVGs
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageBg, setImageBg] = useState<'theme' | 'white' | 'dark'>('theme');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(asyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleArea}>
          <div className={styles.iconBox}>{icon}</div>
          <div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <span className={styles.cardSubtitle}>{subtitle}</span>
          </div>
        </div>
        <button 
          className={`${styles.codeToggleBtn} ${showCode ? styles.activeToggle : ''}`}
          onClick={() => setShowCode(!showCode)}
        >
          <Code2 size={16} />
          <span>{showCode ? 'Сховати код' : 'Вихідний код'}</span>
        </button>
      </div>

      {!webglDemo && (
        <div className={styles.mobileBgControls}>
          <span className={styles.bgLabel}>Фон:</span>
          <button 
            className={`${styles.mobileBgBtn} ${imageBg === 'theme' ? styles.activeBgBtn : ''}`} 
            onClick={() => setImageBg('theme')}
            title="Колір теми"
          >
            <Contrast size={14} />
            <span>Тема</span>
          </button>
          <button 
            className={`${styles.mobileBgBtn} ${imageBg === 'white' ? styles.activeBgBtn : ''}`} 
            onClick={() => setImageBg('white')}
            title="Білий"
          >
            <div className={`${styles.circlePreview} ${styles.circleWhite}`} />
            <span>Білий</span>
          </button>
          <button 
            className={`${styles.mobileBgBtn} ${imageBg === 'dark' ? styles.activeBgBtn : ''}`} 
            onClick={() => setImageBg('dark')}
            title="Темний"
          >
            <div className={`${styles.circlePreview} ${styles.circleDark}`} />
            <span>Темний</span>
          </button>
        </div>
      )}

      <div className={`${styles.cardBody} ${showCode ? styles.withCode : ''}`}>
        {/* Graphical Section */}
        <div className={styles.visualColumn}>
          <div 
            className={`${styles.imageContainer} ${
              imageBg === 'white' ? styles.bgWhite : 
              imageBg === 'dark' ? styles.bgDark : 
              styles.bgTheme
            }`}
            onMouseDown={webglDemo ? undefined : handleMouseDown}
            onMouseMove={webglDemo ? undefined : handleMouseMove}
            onMouseUp={webglDemo ? undefined : handleMouseUp}
            onMouseLeave={webglDemo ? undefined : handleMouseUp}
            style={{ 
              cursor: webglDemo ? 'default' : (zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'),
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {webglDemo ? (
              webglDemo
            ) : (
              <img 
                src={svgPath} 
                alt={title} 
                className={styles.svgImage} 
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  transformOrigin: 'center center'
                }}
                draggable={false}
              />
            )}

            {!webglDemo && (
              <>
                {/* Backing settings overlay */}
                <div className={styles.bgControls} onMouseDown={(e) => e.stopPropagation()}>
                  <button 
                    className={imageBg === 'theme' ? styles.activeBgBtn : ''} 
                    onClick={() => setImageBg('theme')}
                    title="Колір теми"
                  >
                    <Contrast size={14} />
                  </button>
                  <button 
                    className={imageBg === 'white' ? styles.activeBgBtn : ''} 
                    onClick={() => setImageBg('white')}
                    title="Білий"
                  >
                    <div className={`${styles.circlePreview} ${styles.circleWhite}`} />
                  </button>
                  <button 
                    className={imageBg === 'dark' ? styles.activeBgBtn : ''} 
                    onClick={() => setImageBg('dark')}
                    title="Темний"
                  >
                    <div className={`${styles.circlePreview} ${styles.circleDark}`} />
                  </button>
                </div>

                {/* Zoom overlay controls */}
                <div className={styles.zoomControls} onMouseDown={(e) => e.stopPropagation()}>
                  <button onClick={handleZoomOut} disabled={zoom <= 1} title="Зменшити">
                    <ZoomOut size={14} />
                  </button>
                  <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
                  <button onClick={handleZoomIn} disabled={zoom >= 4} title="Збільшити">
                    <ZoomIn size={14} />
                  </button>
                  <button onClick={handleResetZoom} disabled={zoom === 1 && pan.x === 0 && pan.y === 0} title="Скинути">
                    <RotateCcw size={14} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className={styles.detailsBox}>
            <p className={styles.descriptionText}>{description}</p>
            <div className={styles.mathNotes}>
              <strong>Математичний зміст:</strong> {mathNotes}
            </div>
          </div>
        </div>

        {/* Code Viewer Section */}
        {showCode && (
          <div className={styles.codeColumn}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>{webglDemo ? 'WebGL Shader & JS Code' : 'Asymptote Source Code'}</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <Check size={14} className={styles.copySuccess} /> : <Copy size={14} />}
                <span>{copied ? 'Скопійовано!' : 'Копіювати'}</span>
              </button>
            </div>
            <div className={styles.codeBody}>
              <pre><code>{asyCode}</code></pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ShowcasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | '2d' | '3d' | 'webgl'>('all');

  const items = [
    {
      id: 'koch',
      category: '2d',
      title: 'Сніжинка Коха',
      subtitle: 'Рекурсивний геометричний фрактал',
      description: 'Фрактал побудований шляхом рекурсивного поділу відрізків трикутника. На кожному кроці середня частина відрізка замінюється рівностороннім трикутником без основи. Цей процес повторюється нескінченно, утворюючи фрактальну структуру з нескінченним периметром та скінченною площею.',
      mathNotes: 'Для генерації цього малюнку в Asymptote написана рекурсивна функція з глибиною N=4. Обчислення координат вершин та побудова єдиного замкнутого шляху (path) виконуються автоматично на етапі компіляції.',
      svgPath: kochUrl,
      asyCode: kochCode,
      icon: <Cpu className={styles.headerIcon} size={24} />
    },
    {
      id: 'spiro',
      category: '2d',
      title: 'Інтерактивний спірограф',
      subtitle: 'Параметрична крива гіпотрохоїди',
      description: 'Крива, яка утворюється точкою, закріпленою на колі, що котиться всередині іншого кола. Змінюючи радіуси кіл та відстань до точки, можна отримати безліч різноманітних геометричних візерунків гармонійної форми.',
      mathNotes: 'Програма використовує параметричні рівняння для обчислення масиву з 1000 точок у циклі. Візуалізація складається з трьох накладених кривих з різними геометричними параметрами та контрастними фірмовими кольорами.',
      svgPath: spiroUrl,
      asyCode: spiroCode,
      icon: <Sparkles className={styles.headerIcon} size={24} />
    },
    {
      id: 'lorenz',
      category: '3d',
      title: 'Атрактор Лоренца',
      subtitle: 'Хаотична тривимірна траєкторія (3D проєкція)',
      description: 'Знаменита нелінійна динамічна система з детермінованим хаосом (так званий «ефект метелика»). Траєкторія руху точки в тривимірному просторі ніколи не повторює себе, утворюючи красиву нескінченно складну двокрилу фрактальну структуру.',
      mathNotes: 'Програма моделює систему трьох диференціальних рівнянь Лоренца шляхом чисельного інтегрування (4000 кроків циклу). Координати 3D обертаються навколо вертикальної осі на 45 градусів і проектуються на двовимірну площину, а колір лінії плавно перетікає від індиго до рожевого залежно від кроку інтегрування.',
      svgPath: lorenzUrl,
      asyCode: lorenzCode,
      icon: <Workflow className={styles.headerIcon} size={24} />
    },
    {
      id: 'webgl-crystal',
      category: 'webgl',
      title: 'WebGL 3D Графік поверхні',
      subtitle: 'Гіперболічний параболоїд z = x² - y²',
      description: 'Інтерактивний тривимірний графік сідлової поверхні (гіперболічний параболоїд), що відображає тривимірні координатні осі (червона - X, зелена - Y, синя - Z) з поділками, а також колірну карту висоти та делікатну сітку. Обертається за допомогою мишки чи сенсорних жестів.',
      mathNotes: 'Рендериться з використанням GPU-прискорення через чистий WebGL. Усі 3D обертання, перспективна проєкція, інтерполяція кольорів за висотою та відображення системи координат прораховуються безпосередньо у вершинному шейдері.',
      asyCode: webglShaderCode,
      icon: <Box className={styles.headerIcon} size={24} />,
      webglDemo: <WebGLCrystalDemo />
    }
  ];

  const filteredItems = items.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <div className={styles.showcaseContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Демонстрація можливостей</h1>
        <p className={styles.pageSubtitle}>
          Приклади складного алгоритмічного малювання, 3D проєкцій та веб-графіки. Відкрийте вихідний код кожної ілюстрації, щоб побачити алгоритм її створення.
        </p>
      </div>

      {/* Tabs Filter Bar */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Всі
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === '2d' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('2d')}
        >
          2D Графіка
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === '3d' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('3d')}
        >
          3D Графіка
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'webgl' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('webgl')}
        >
          WebGL / Інтерактив
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {filteredItems.map(item => (
          <ShowcaseCard 
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            mathNotes={item.mathNotes}
            svgPath={item.svgPath}
            asyCode={item.asyCode}
            icon={item.icon}
            webglDemo={item.webglDemo}
          />
        ))}
        {filteredItems.length === 0 && (
          <div className={styles.noItems}>
            <p>У цій категорії поки що немає елементів.</p>
          </div>
        )}
      </div>
    </div>
  );
};
