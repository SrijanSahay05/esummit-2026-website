declare module 'animejs' {
  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    began: boolean;
    paused: boolean;
    completed: boolean;
    finished: Promise<void>;
    autoplay: boolean;
    currentTime: number;
    duration: number;
    progress: number;
  }

  interface AnimeTimelineInstance extends AnimeInstance {
    add(params: AnimeParams, offset?: string | number): AnimeTimelineInstance;
  }

  interface AnimeParams {
    targets?: string | object | HTMLElement | SVGElement | NodeList | null;
    duration?: number;
    delay?: number | ((el: HTMLElement, i: number, l: number) => number);
    easing?: string;
    round?: number;
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: number | boolean;
    autoplay?: boolean;
    begin?: (anim: AnimeInstance) => void;
    update?: (anim: AnimeInstance) => void;
    complete?: (anim: AnimeInstance) => void;
    [property: string]: unknown;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    timeline(params?: AnimeParams & { targets?: never }): AnimeTimelineInstance;
    set(targets: AnimeParams['targets'], properties: Record<string, unknown>): void;
    remove(targets: AnimeParams['targets']): void;
    stagger(value: number | string, options?: object): (el: HTMLElement, i: number) => number;
    random(min: number, max: number): number;
  }

  const anime: AnimeStatic;
  export default anime;
}
