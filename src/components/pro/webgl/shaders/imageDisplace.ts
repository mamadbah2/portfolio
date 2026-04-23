export const imageDisplaceFrag = /* glsl */ `
precision highp float;
uniform sampler2D uImage;
uniform float uHover;
uniform float uTime;
uniform vec2 uResolution;
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

void main(){
  vec2 uv = vUv;

  float t = uTime * 0.18;
  vec2 field = vec2(
    noise(uv * 2.4 + vec2(t, t * 0.3)),
    noise(uv * 2.4 + vec2(-t * 0.4, t * 0.6) + 17.0)
  );

  float r = distance(uv, vec2(0.5));
  float falloff = smoothstep(0.9, 0.15, r);

  vec2 displace = (field - 0.5) * 0.022 * uHover * (0.5 + falloff * 0.5);

  float split = 0.0015 + uHover * 0.006;

  float cr = texture2D(uImage, uv + displace + vec2(split, 0.0)).r;
  float cg = texture2D(uImage, uv + displace).g;
  float cb = texture2D(uImage, uv + displace - vec2(split, 0.0)).b;

  vec3 col = vec3(cr, cg, cb);

  gl_FragColor = vec4(col, 1.0);
}
`;
