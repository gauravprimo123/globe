/// <reference types="vite/client" />

declare global {
  interface Window {
    THREE?: typeof import('three');
  }
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
