export interface KitbookSettings {
  title: string;
  description: string;
  viewports: Viewport[];
  languages?: Language[];
  expandTree?: boolean;
  githubURL?: string;
  /**
   * An array of Vite glob patterns for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns. Defaults to ['/src/**_/*.{md,svx,svelte,variants.ts}', '/README.md']. Adjust this to be able to incrementally adopt Kitbook into your project. << ignore the underscore in the glob pattern, it's just there to make the JSDoc comment work.
   * @param {boolean} [options.isKitbookItself] - Don't Use - Only for internal use in the original Kitbook package
   */
  importModuleGlobs?: string[];
  /**
  * Don't Use - Only for internal use in the original Kitbook package
  */
  isKitbookItself?: boolean;
}

export type Viewport = {
  name?: string;
  width: number;
  height: number;
}

export type Language = {
  name: string;
  code: string;
}