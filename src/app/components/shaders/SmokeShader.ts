export const SmokeShader = {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      
      varying vec2 vUv;
      uniform float time;
      uniform vec2 mouse;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 uv = vUv;
        
        float dist = length(uv - mouse);
        float smoke = smoothstep(0.3, 0.0, dist) * random(uv + time * 0.05);
        
        vec3 color = vec3(0.9, 0.9, 0.9) * smoke; // White smoke
        
        gl_FragColor = vec4(color, smoke * 0.7); // Add transparency
      }
    `,
  };
  