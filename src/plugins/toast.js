let toastInstance = null;

export function setToastInstance(toast) {
  toastInstance = toast;
}

export function showToast(message) {
  if (toastInstance) {
    toastInstance.success(message);
  }
}
