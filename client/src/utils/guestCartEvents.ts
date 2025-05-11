const listeners: (() => void)[] = [];

export function subscribeToGuestCart(callback: () => void) {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
}

export function notifyGuestCartChanged() {
  listeners.forEach((cb) => cb());
}
