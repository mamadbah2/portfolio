export const fullscreenVert = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const heroFieldFrag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScroll;
uniform vec3 uInk;
uniform vec3 uBg;
uniform vec3 uAccent;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  vec2 mouseOffset = (uMouse - 0.5) * 0.45;
  float t = uTime * 0.07;

  float n1 = fbm(p * 1.4 + mouseOffset + vec2(t, -t * 0.6));
  float n2 = fbm(p * 2.2 - vec2(t * 0.5, t) + vec2(n1 * 0.6));

  float scrollFade = 1.0 - smoothstep(0.05, 0.75, uScroll);

  vec3 col = uBg;

  float accentMask = smoothstep(0.38, 0.88, n2);
  col = mix(col, uAccent, accentMask * 0.14 * scrollFade);

  float inkMask = smoothstep(0.55, 0.96, n1);
  col = mix(col, uInk, inkMask * 0.08 * scrollFade);

  vec2 c = uv - 0.5;
  float vig = smoothstep(0.15, 0.85, length(c));
  col = mix(col, col * 0.94, vig * 0.35);

  gl_FragColor = vec4(col, 1.0);
}
`;
