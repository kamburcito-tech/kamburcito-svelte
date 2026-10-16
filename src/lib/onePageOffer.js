// The One-Page Launch offer is valid through December 15, 2026 (UTC).
export const offerExpiresAt = Date.UTC(2026, 11, 16);

// setTimeout clamps delays above 2^31 - 1 ms; the offer is months away.
export function scheduleOfferExpiry(onExpire) {
  let timer;

  function check() {
    const remaining = offerExpiresAt - Date.now();
    if (remaining <= 0) {
      onExpire();
    } else {
      timer = setTimeout(check, Math.min(remaining, 2 ** 31 - 1));
    }
  }

  check();
  return () => clearTimeout(timer);
}
