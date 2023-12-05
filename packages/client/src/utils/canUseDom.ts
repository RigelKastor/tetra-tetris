/**
 * Определялка окружения.
 * true — вы в браузере.
 * false — вы на сервере.
 */
export const canUseDOM =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
