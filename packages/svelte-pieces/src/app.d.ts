/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
}

// declare global {
//   interface Window {
//     onYouTubeIframeAPIReady: any;
//   }
// }

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:longpress'?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
    'on:shortpress'?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
    'on:clickoutside'?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}
