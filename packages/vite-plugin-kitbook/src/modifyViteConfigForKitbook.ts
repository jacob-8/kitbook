import { UserConfig } from 'vite';
import { immutableDeepMerge } from './utils/immutableDeepMerge';

export function modifyViteConfigForKitbook(userSpecifiedViteConfigAdjustments: UserConfig): UserConfig {
  const kitbookDefaultViteAdjustments: UserConfig = {
    cacheDir: 'node_modules/.vite-kitbook',
    server: {
      port: 4321,
      fs: {
        allow: ['..'], // one level up from the project root for displaying README.md
      }
    },
  };
  return immutableDeepMerge(kitbookDefaultViteAdjustments, userSpecifiedViteConfigAdjustments);
}
