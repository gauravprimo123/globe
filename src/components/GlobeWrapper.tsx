import { useEffect, useState } from 'react';

let globePromise: Promise<typeof import('react-globe.gl')['default']> | null = null;
let globeCache: typeof import('react-globe.gl')['default'] | null = null;

// Pre-initialize THREE in module scope to ensure it's available BEFORE any imports
if (typeof window !== 'undefined' && !(window as any).THREE) {
  import('three').then((ThreeModule) => {
    const THREE = (ThreeModule as any).default || ThreeModule;
    (window as any).THREE = THREE;
    
    // Ensure BufferAttribute is fully loaded
    if (THREE.BufferAttribute) {
      // Force initialization
      new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3);
    }
  });
}

export function useGlobe() {
  const [Globe, setGlobe] =
    useState<typeof import('react-globe.gl')['default'] | null>(globeCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (globeCache) {
      setGlobe(globeCache);
      return;
    }

    if (!globePromise) {
      globePromise = (async () => {
        try {
          // CRITICAL: Import three FIRST and wait for it to be in module cache
          const ThreeModule = await import('three');
          const THREE = (ThreeModule as any).default || ThreeModule;

          // Ensure window.THREE is set
          if (typeof window !== 'undefined') {
            (window as any).THREE = THREE;
          }

          // Wait longer to ensure Three.js is fully processed by Vite/browser
          await new Promise(resolve => setTimeout(resolve, 300));

          // Verify THREE is available
          if (!THREE.BufferAttribute) {
            throw new Error('THREE.BufferAttribute not available');
          }

          console.log('[GlobeWrapper] Importing react-globe.gl...');
          
          // Import react-globe.gl - it should now reuse the cached Three.js module
          const globeModule = await import('react-globe.gl');
          globeCache = globeModule.default;
          
          console.log('[GlobeWrapper] react-globe.gl loaded successfully');
          return globeModule.default;
        } catch (e) {
          globePromise = null;
          console.error('[GlobeWrapper] Load error:', e);
          
          // Debug info
          if (typeof window !== 'undefined') {
            console.error('[GlobeWrapper] Debug:', {
              hasWindowTHREE: !!(window as any).THREE,
              hasBufferAttribute: !!(window as any).THREE?.BufferAttribute,
              errorStack: (e as Error).stack
            });
          }
          
          throw e;
        }
      })();
    }

    globePromise
      .then((G) => mounted && setGlobe(G))
      .catch((e) => mounted && setError(e.message || 'Failed to load globe'));

    return () => {
      mounted = false;
    };
  }, []);

  return { GlobeComponent: Globe, loadError: error };
}