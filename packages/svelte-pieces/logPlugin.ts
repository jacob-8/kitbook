import type { Plugin } from 'vite';

export const logPlugin: Plugin = () => {
  let config;

  return {
    name: 'log-file',
    enforce: "pre",
    configResolved(resolvedConfig) {
      config = resolvedConfig; // save locally to use in other hooks
    },

    transform(code: string, id: string) {
      if (id && id.endsWith('.svelte')) {
        console.log(id);
        console.log(code);
      }
      // config.logger.info("test2")

      // if (config.command === "serve") {
      // dev: plugin invoked by dev server
      // } else {
      // build: plugin invoked by Rollup
      // }
    },
  };
};
