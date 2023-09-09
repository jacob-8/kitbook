import { UserConfig } from 'vite';

export function modifyViteConfigForKitbook(): UserConfig {
  return {
    server: {
      fs: {
        allow: ['..'], // one level up from the project root for displaying README.md
      }
    },
  };
}
