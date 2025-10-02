export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertextPosition: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
};
