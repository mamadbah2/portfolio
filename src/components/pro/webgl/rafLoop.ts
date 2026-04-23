type Subscriber = (dt: number, t: number) => void;

const subscribers = new Set<Subscriber>();
let lastTime = 0;
let running = false;
let rafId = 0;
let visibilityBound = false;

function tick(now: number) {
  if (!running) return;
  const dt = lastTime === 0 ? 16 : Math.min(50, now - lastTime);
  lastTime = now;
  subscribers.forEach((cb) => cb(dt, now));
  rafId = requestAnimationFrame(tick);
}

function start() {
  if (running) return;
  running = true;
  lastTime = 0;
  rafId = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  cancelAnimationFrame(rafId);
}

function bindVisibility() {
  if (visibilityBound || typeof document === 'undefined') return;
  visibilityBound = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (subscribers.size > 0) start();
  });
}

export function subscribe(cb: Subscriber): () => void {
  bindVisibility();
  subscribers.add(cb);
  if (!running && typeof document !== 'undefined' && !document.hidden) start();
  return () => {
    subscribers.delete(cb);
    if (subscribers.size === 0) stop();
  };
}
