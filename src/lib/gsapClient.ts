type GsapCore = typeof import("gsap")["gsap"];
type ScrollTriggerType = typeof import("gsap/ScrollTrigger")["ScrollTrigger"];
type ScrollToPluginType = typeof import("gsap/ScrollToPlugin")["ScrollToPlugin"];
type FlipType = typeof import("gsap/Flip")["Flip"];

let gsapInstance: GsapCore | null = null;
let scrollTriggerInstance: ScrollTriggerType | null = null;
let scrollToInstance: ScrollToPluginType | null = null;
let flipInstance: FlipType | null = null;

interface EnsureOptions {
  scrollTrigger?: boolean;
  scrollTo?: boolean;
  flip?: boolean;
}

export interface GsapBundle {
  gsap?: GsapCore | null;
  ScrollTrigger?: ScrollTriggerType | null;
  ScrollToPlugin?: ScrollToPluginType | null;
  Flip?: FlipType | null;
}

const isBrowser = () => typeof window !== "undefined";

export const ensureGsapPlugins = async (options: EnsureOptions = {}): Promise<GsapBundle> => {
  if (!isBrowser()) {
    return {};
  }

  if (!gsapInstance) {
    const gsapModule = await import("gsap");
    gsapInstance = gsapModule.gsap;
  }

  const { scrollTrigger = false, scrollTo = false, flip = false } = options;

  if (scrollTrigger && !scrollTriggerInstance && gsapInstance) {
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    gsapInstance.registerPlugin(scrollTriggerModule.ScrollTrigger);
    scrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
  }

  if (scrollTo && !scrollToInstance && gsapInstance) {
    const scrollToModule = await import("gsap/ScrollToPlugin");
    gsapInstance.registerPlugin(scrollToModule.ScrollToPlugin);
    scrollToInstance = scrollToModule.ScrollToPlugin;
  }

  if (flip && !flipInstance && gsapInstance) {
    const flipModule = await import("gsap/Flip");
    gsapInstance.registerPlugin(flipModule.Flip);
    flipInstance = flipModule.Flip;
  }

  return {
    gsap: gsapInstance,
    ScrollTrigger: scrollTriggerInstance,
    ScrollToPlugin: scrollToInstance,
    Flip: flipInstance,
  };
};

export const resetGsapCacheForTests = () => {
  if (process.env.NODE_ENV !== "test") {
    return;
  }
  gsapInstance = null;
  scrollTriggerInstance = null;
  scrollToInstance = null;
  flipInstance = null;
};

