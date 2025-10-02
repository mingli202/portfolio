import type { ProgramInfo } from "./types";

function main() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Vertex shader program
  const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  const shaderProgram = initShaders(gl, vsSource, fsSource);
  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertextPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix",
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };
}

function initShaders(
  gl: WebGLRenderingContext,
  vertextShaderSource: string,
  fragmentShaderSource: string,
): WebGLProgram {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertextShaderSource);
  const fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(
      `unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`,
    );
  }

  return shaderProgram;
}

function loadShader(
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("error creating shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // check if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shader ${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    throw new Error("error compiling shader");
  }

  return shader;
}

main();
