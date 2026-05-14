export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export function gtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', action, params);
  }
}
