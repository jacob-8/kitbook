import type { UserConfig } from 'vite'

/** Modify server.fs.allow one level up from the project root for displaying README.md */
export function modifyViteConfigForKitbook(): UserConfig {
  return {
    server: {
      fs: {
        allow: ['..'],
      },
    },
  }
}
