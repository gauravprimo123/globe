import { useEffect, useState, useRef } from 'react';

// Global singleton pattern to ensure Globe is only imported once across the entire app
let globeComponentPromise: Promise<any> | null = null;
let globeComponentCache: any = null;
let isImporting = false;

export function useGlobe() {
  const [GlobeComponent, setGlobeComponent] = useState<any>(() => globeComponentCache);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // If already cached, use it immediately
    if (globeComponentCache && !GlobeComponent) {
      setGlobeComponent(globeComponentCache);
      return;
    }

    // If already have component, no need to do anything
    if (GlobeComponent) {
      return;
    }

    // If import is in progress, wait for it
    if (globeComponentPromise && !isImporting) {
      globeComponentPromise.then((component) => {
        if (isMounted.current && component) {
          setGlobeComponent(component);
        }
      }).catch((error) => {
        console.error('Failed to load globe:', error);
      });
      return;
    }

    // Prevent multiple simultaneous imports
    if (isImporting) {
      return;
    }

    // Start new import only if not cached and not importing
    if (!globeComponentCache && !globeComponentPromise) {
      isImporting = true;
      
      globeComponentPromise = import('react-globe.gl')
        .then((module) => {
          globeComponentCache = module.default;
          isImporting = false;
          return module.default;
        })
        .catch((error) => {
          console.error('Error loading globe component:', error);
          isImporting = false;
          globeComponentPromise = null;
          throw error;
        });

      globeComponentPromise.then((component) => {
        if (isMounted.current && component) {
          setGlobeComponent(component);
        }
      }).catch((error) => {
        console.error('Failed to load globe:', error);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [GlobeComponent]);

  return GlobeComponent;
}