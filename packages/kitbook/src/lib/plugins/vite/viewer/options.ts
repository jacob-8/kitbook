import type { ViewerOptions } from 'kitbook'

export const DEFAULT_VIEWER_OPTIONS: ViewerOptions = {
  toggleKeyCombo: 'alt-shift',
  navKeys: { parent: 'ArrowUp', child: 'ArrowDown', next: 'ArrowRight', prev: 'ArrowLeft' },
  openKey: 'Enter',
  holdMode: true,
  showToggleButton: 'active',
  toggleButtonPos: 'bottom-right',
}
