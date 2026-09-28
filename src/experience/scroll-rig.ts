/**
 * scroll-rig — reusable primitives for scroll-driven three.js chapters.
 *
 * Four small tools, one contract: everything in the scene is a function of a
 * single smoothed progress scalar in [0, 1].
 */
import * as THREE from "three";

/** Clamp a number to [0, 1]. */
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Hermite smoothstep between edges `a` and `b`. */
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Cubic ease-out: fast start, soft landing. */
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll → progress for a tall sticky section.
 *
 * `raw` is read in a passive scroll listener (0 when the section top hits the
 * viewport top, 1 when its bottom leaves). Call `update(dt)` once per frame to
 * advance `value`, a framerate-independent exponential smoothing of `raw`:
 *
 *     s += (want - s) * (1 - Math.exp(-dt * rate))
 *
 * `rate` 3.6 gives a ~0.28 s time constant: enough lag to feel liquid, not
 * enough to feel detached from the scrollbar.
 */
export class SmoothProgress {
  /** Raw progress straight from the scrollbar (quantized, jumpy). */
  raw = 0;
  /** Smoothed progress. Drive the scene with this, never with `raw`. */
  value = 0;
  private readonly onScroll: () => void;

  constructor(
    private readonly section: HTMLElement,
    private readonly rate = 3.6,
  ) {
    this.onScroll = () => this.measure();
    addEventListener("scroll", this.onScroll, { passive: true });
    addEventListener("resize", this.onScroll, { passive: true });
    this.measure();
    this.value = this.raw;
  }

  private measure() {
    const span = this.section.offsetHeight - innerHeight;
    const scrollTop = document.scrollingElement?.scrollTop ?? scrollY;
    this.raw = span > 0 ? clamp01((scrollTop - this.section.offsetTop) / span) : 0;
  }

  /** Advance the filter by `dt` seconds; returns the smoothed value. */
  update(dt: number) {
    this.measure();
    this.value += (this.raw - this.value) * (1 - Math.exp(-dt * this.rate));
    return this.value;
  }

  dispose() {
    removeEventListener("scroll", this.onScroll);
    removeEventListener("resize", this.onScroll);
  }
}

/** A named camera keyframe that becomes fully active at progress `at`. */
export type CameraBeat = {
  /** Progress (0..1) where this beat is reached. Must be ascending. */
  at: number;
  pos: [number, number, number];
  look: [number, number, number];
  /** Easing applied to the segment that arrives at this beat. Default: smoothstep. */
  ease?: (t: number) => number;
};

/**
 * Lerps camera position and look-target between beats across progress windows.
 * Declarative choreography: tuning a shot means editing three numbers, not
 * rewriting a timeline.
 */
export class CameraBeats {
  private readonly pos = new THREE.Vector3();
  private readonly look = new THREE.Vector3();
  private readonly a = new THREE.Vector3();
  private readonly b = new THREE.Vector3();

  constructor(private readonly beats: CameraBeat[]) {}

  /** Place `camera` for the given progress. */
  apply(camera: THREE.PerspectiveCamera, progress: number) {
    const bs = this.beats;
    let i = 0;
    while (i < bs.length - 2 && progress > bs[i + 1].at) i++;
    const from = bs[i];
    const to = bs[Math.min(i + 1, bs.length - 1)];
    const span = to.at - from.at;
    const raw = span > 0 ? clamp01((progress - from.at) / span) : 1;
    const t = to.ease ? to.ease(raw) : smoothstep(0, 1, raw);
    this.pos.lerpVectors(this.a.fromArray(from.pos), this.b.fromArray(to.pos), t);
    this.look.lerpVectors(this.a.fromArray(from.look), this.b.fromArray(to.look), t);
    camera.position.copy(this.pos);
    camera.lookAt(this.look);
  }
}

/**
 * Adaptive quality governor.
 *
 * Keeps an exponential moving average of frame time. If the average stays over
 * `budgetMs` after a cooldown, it steps the device pixel ratio DOWN one notch.
 * It never steps back up: recovering quality re-triggers the same overload and
 * the resulting oscillation is far more visible than staying at the lower
 * ratio. The EMA (not the instantaneous frame) keeps one GC hiccup or a tab
 * switch from tanking quality permanently.
 */
export class QualityGovernor {
  /** Exponential moving average of frame time in ms. */
  ema = 16.7;
  /** Current device pixel ratio. */
  px: number;
  private nextAt = -1;
  private readonly floor: number;
  private readonly step: number;
  private readonly budgetMs: number;
  private readonly cooldownMs: number;

  constructor(opts: { px: number; floor?: number; step?: number; budgetMs?: number; cooldownMs?: number }) {
    this.px = opts.px;
    this.floor = opts.floor ?? 1;
    this.step = opts.step ?? 0.15;
    this.budgetMs = opts.budgetMs ?? 26;
    this.cooldownMs = opts.cooldownMs ?? 1400;
  }

  /**
   * Feed one frame's raw duration in ms. Returns the new pixel ratio when the
   * governor decides to degrade, otherwise `null`.
   */
  sample(now: number, rawMs: number): number | null {
    if (this.nextAt < 0) this.nextAt = now + this.cooldownMs; // warm-up window
    this.ema = this.ema * 0.94 + Math.min(rawMs, 100) * 0.06;
    if (now < this.nextAt || this.ema <= this.budgetMs) return null;
    if (this.px <= this.floor + 1e-3) return null;
    this.px = Math.max(this.floor, this.px - this.step);
    this.nextAt = now + this.cooldownMs;
    return this.px;
  }
}

/**
 * Visibility gate: pause all work while `el` is offscreen.
 *
 * `requestAnimationFrame` throttles for background tabs, not for sections
 * scrolled out of view; without this gate a chapter below the fold keeps
 * burning GPU. Fires `onChange(visible)` on every flip (including once on
 * observe). Returns a dispose function.
 */
export function visibilityGate(el: Element, onChange: (visible: boolean) => void, threshold = 0.02) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => onChange(e.isIntersecting)), { threshold });
  io.observe(el);
  return () => io.disconnect();
}
