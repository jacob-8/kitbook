import type { KitbookSettings } from ".";

export function defineConfig(config: Omit<KitbookSettings, 'viewports'> & Partial<Pick<KitbookSettings, 'viewports'>>): KitbookSettings {
  return {
    viewports: [
      {name: 'mobile', width: 320, height: 568},
      // {name: 'tablet', width: 768, height: 1024},
      {name: 'desktop', width: 1024, height: 768},
    ],
    ...config
  }
}