export const cursorBlobFrag = /* glsl */ `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uIntensity;
uniform float uRadius;
uniform float uTime;
uniform vec3 uInk;
uniform vec3 uAccent;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec2 uv = vUv;
  vec2 frag = vec2(uv.x, 1.0 - uv.y) * uResolution;

  float dist = distance(frag, uMouse);
  float radius = uRadius;

  float lens = smoothstep(radius, 0.0, dist);
  lens = pow(lens, 1.7);

  float shimmer = hash(floor(frag / 6.0) + floor(uTime * 4.0));
  lens *= 0.9 + shimmer * 0.1;

  float tint = smoothstep(radius * 0.6, 0.0, dist);
  vec3 col = mix(uInk, uAccent, tint);

  float alpha = lens * (0.35 + uIntensity * 0.4);

  gl_FragColor = vec4(col, alpha);
}
`;
