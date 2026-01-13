import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// GeoJSON type definitions
interface GeoJSONFeature {
  type: "Feature";
  properties: {
    name?: string;
    [key: string]: any;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Country data type (matching the structure from polygonData)
interface CountryData {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  size?: number;
  color?: string;
  description?: string;
  image?: string;
  targetAudience?: string;
  language?: string;
  subtitle?: string;
  faculty?: string;
  creditHours?: string;
  nextStep?: string;
  [key: string]: any;
}

// Polygon data item type (for polygonData array)
interface PolygonDataItem {
  countryData?: CountryData;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  properties: Record<string, any>;
  id?: string;
}

// Polygon data type (for callbacks and userData)
interface PolygonData {
  name: string;
  properties: Record<string, any>;
  feature?: GeoJSONFeature;
  countryData?: CountryData;
  geometry?: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  id?: string;
}

// Selected country type
interface SelectedCountry {
  lat?: number;
  lon?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  name?: string;
}

// Camera position type
interface CameraPosition {
  x?: number;
  y?: number;
  z?: number;
}

// OrbitControls configuration type
interface OrbitControlsConfig {
  enableZoom?: boolean;
  enablePan?: boolean;
  rotateSpeed?: number;
  enableDamping?: boolean;
  dampingFactor?: number;
}

// Polygons configuration type
interface PolygonsConfig {
  data: string[];
  color: (params: { name: string }) => string | number | null;
}

// Callback function types
type PolygonClickCallback = (polygon: PolygonData | null, event: MouseEvent) => void;
type PolygonHoverCallback = (currentPolygon: PolygonData | null, prevPolygon: PolygonData | null, event: MouseEvent) => void;
type GlobeClickCallback = (event: MouseEvent) => void;

// Animation function type
type AnimateGlobeToFunction = (lat: number, lon: number, duration?: number) => void;

// Update marker function type
type UpdateMarkerFunction = (lat: number, lon: number) => void;

// Triangulation result type
interface TriangulationResult {
  vertices: number[];
  indices: number[];
}

// Globe ref interface - methods exposed via ref
export interface GlobeRef {
  camera: () => THREE.PerspectiveCamera | null;
  controls: () => OrbitControls | null;
  pointOfView: (options: { lat: number; lng: number; altitude?: number }, duration?: number) => void;
}

// Props interface
interface GlobeComponentProps {
  globeImageUrl?: string;
  backgroundImageUrl?: string;
  bumpImageUrl?: string;
  bumpScale?: number;
  showAtmosphere?: boolean;
  atmosphereColor?: string | number;
  atmosphereAltitude?: number;
  showGraticules?: boolean;
  graticuleColor?: string | number;
  polygonData?: PolygonDataItem[] | null;
  polygonsConfig?: PolygonsConfig | null;
  geoJsonData?: GeoJSONData | null;
  capColor?: string | number | null;
  showPolygonFills?: boolean;
  polygonOffset?: number;
  onPolygonClick?: PolygonClickCallback | null;
  onPolygonHover?: PolygonHoverCallback | null;
  onGlobeClick?: GlobeClickCallback | null;
  transitionDuration?: number;
  autoCenterOnClick?: boolean;
  selectedCountry?: SelectedCountry | string | null;
  enablePointerInteraction?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  cameraDistance?: number;
  cameraPosition?: CameraPosition | null;
  minZoom?: number;
  maxZoom?: number;
  width?: string | number;
  height?: string | number;
  controls?: OrbitControlsConfig;
}

/**
 * GlobeComponent - A reusable 3D globe component similar to react-globe.gl
 */
const SimpleGlobeComponent = forwardRef<GlobeRef, GlobeComponentProps>(({
  globeImageUrl = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  backgroundImageUrl = "https://unpkg.com/three-globe/example/img/night-sky.png",
  bumpImageUrl = "https://unpkg.com/three-globe/example/img/earth-topology.png",
  bumpScale = 0.05,
  showAtmosphere = false,
  atmosphereColor = "lightskyblue",
  atmosphereAltitude = 0.15,
  showGraticules = false,
  graticuleColor = "#ffffff",
  polygonData = null,
  polygonsConfig = null,
  geoJsonData = null,
  capColor = null,
  showPolygonFills = false,
  polygonOffset = 0.0001,
  onPolygonClick = null,
  onPolygonHover = null,
  onGlobeClick = null,
  transitionDuration = 1000,
  autoCenterOnClick = true,
  selectedCountry = null,
  enablePointerInteraction = true,
  autoRotate = true,
  autoRotateSpeed = 0.1,
  cameraDistance = 3,
  cameraPosition = null,
  minZoom = 1.5,
  maxZoom = 10,
  width = "100%",
  height = "100vh",
  controls = {},
}, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  
  // Store callbacks in refs to prevent scene recreation when they change
  const onPolygonClickRef = useRef<PolygonClickCallback | null>(onPolygonClick);
  const onPolygonHoverRef = useRef<PolygonHoverCallback | null>(onPolygonHover);
  const onGlobeClickRef = useRef<GlobeClickCallback | null>(onGlobeClick);
  
  // Store polygonData, polygonsConfig and controls in refs to prevent scene recreation
  const polygonDataRef = useRef<PolygonDataItem[] | null>(polygonData);
  const polygonsConfigRef = useRef<PolygonsConfig | null>(polygonsConfig);
  const controlsRef = useRef<OrbitControlsConfig>(controls);
  
  // Store globe and controls refs for selectedCountry animation
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const orbitControlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animateGlobeToRef = useRef<AnimateGlobeToFunction | null>(null);
  const markerRef = useRef<THREE.Group | null>(null); // Store marker object
  const sceneRef = useRef<THREE.Scene | null>(null); // Store scene reference for marker updates
  const updateMarkerRef = useRef<UpdateMarkerFunction | null>(null); // Store updateMarker function
  const backgroundSphereRef = useRef<THREE.Mesh | null>(null); // Store background sphere reference

  // Expose methods via ref (similar to react-globe.gl API)
  useImperativeHandle(ref, () => ({
    camera: () => cameraRef.current,
    controls: () => orbitControlsRef.current,
    pointOfView: (options: { lat: number; lng: number; altitude?: number }, duration: number = 1000) => {
      if (animateGlobeToRef.current) {
        animateGlobeToRef.current(options.lat, options.lng, duration);
      }
    },
  }), []);

  
  // Track auto-rotate state (can be toggled by clicking globe)
  const autoRotateStateRef = useRef<boolean>(autoRotate);
  
  // Update refs when they change (without triggering scene recreation)
  useEffect(() => {
    onPolygonClickRef.current = onPolygonClick;
    onPolygonHoverRef.current = onPolygonHover;
    onGlobeClickRef.current = onGlobeClick;
    polygonDataRef.current = polygonData;
    polygonsConfigRef.current = polygonsConfig;
    controlsRef.current = controls;
  }, [onPolygonClick, onPolygonHover, onGlobeClick, polygonData, polygonsConfig, controls]);
  
  // Update auto-rotate state when prop changes
  useEffect(() => {
    autoRotateStateRef.current = autoRotate;
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = autoRotate;
      orbitControlsRef.current.autoRotateSpeed = autoRotateSpeed;
    }
  }, [autoRotate, autoRotateSpeed]);

  // Watch for selectedCountry changes and animate globe to it
  useEffect(() => {
    if (!selectedCountry || !globeMeshRef.current || !animateGlobeToRef.current) {
      return;
    }
    
    // Stop auto-rotate first when selectedCountry changes
    autoRotateStateRef.current = false;
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = false;
    }
    
    // Extract lat/lon from selectedCountry
    let lat: number | null = null;
    let lon: number | null = null;
    
    if (typeof selectedCountry === 'object' && selectedCountry !== null) {
      // Check for lat/lon or lng
      lat = (selectedCountry as SelectedCountry).lat || (selectedCountry as SelectedCountry).latitude || null;
      lon = (selectedCountry as SelectedCountry).lon || (selectedCountry as SelectedCountry).lng || (selectedCountry as SelectedCountry).longitude || null;
    }
    
    // If we have valid coordinates, animate globe to them
    if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
      // Validate coordinates
      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        console.warn('Invalid coordinates:', { lat, lon });
        return;
      }
      
      console.log('Rotating globe to location:', { 
        lat, 
        lon, 
        name: typeof selectedCountry === 'object' && selectedCountry !== null ? (selectedCountry as SelectedCountry).name : undefined
      });
      
      // Add marker at the location
      if (updateMarkerRef.current) {
        updateMarkerRef.current(lat, lon);
      }
      
      // Use a small delay to ensure scene is ready
      const timeoutId = setTimeout(() => {
        if (animateGlobeToRef.current) {
          // Ensure coordinates are in correct range and format
          const clampedLat = Math.max(-90, Math.min(90, lat));
          const clampedLon = Math.max(-180, Math.min(180, lon));
          // Rotate globe (no distance parameter needed)
          animateGlobeToRef.current(clampedLat, clampedLon, transitionDuration);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCountry, transitionDuration]);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Declare variables outside try-catch so cleanup can access them
    let scene: THREE.Scene | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let orbitControls: OrbitControls | null = null;
    let globeMesh: THREE.Mesh | null = null;
    let atmosphereMesh: THREE.Mesh | null = null;
    let backgroundTexture: THREE.Texture | null = null;
    let globeTexture: THREE.Texture | null = null;
    let bumpTexture: THREE.Texture | null = null;
    let backgroundSphere: THREE.Mesh | null = null;
    let graticuleLines: THREE.Line[] = [];
    let polygonMeshes: THREE.Mesh[] = [];
    let polygonLines: THREE.Line[] = [];
    let mainAnimationFrameId: number | null = null;
    let animationFrameId: number | null = null;
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    let handleClick: ((event: MouseEvent) => void) | null = null;
    let handleWheel: ((event: WheelEvent) => void) | null = null;

    // Declare dimensions outside try block for scope
    let finalWidth: number;
    let finalHeight: number;
    
    try {
      // Get container dimensions, ensuring we have valid values
      const containerWidth = mountRef.current.clientWidth || 
        (typeof width === 'number' ? width : mountRef.current.offsetWidth || window.innerWidth);
      const containerHeight = mountRef.current.clientHeight || 
        (typeof height === 'number' ? height : mountRef.current.offsetHeight || window.innerHeight);
      
      // Ensure minimum dimensions to prevent rendering issues
      finalWidth = Math.max(containerWidth, 100);
      finalHeight = Math.max(containerHeight, 100);

      // Scene
      scene = new THREE.Scene();
    sceneRef.current = scene; // Store scene reference for marker updates

      // Background - store texture references for proper cleanup
      const textureLoader = new THREE.TextureLoader();
    
    // Note: We no longer wait for all textures to load before showing the globe
    // Textures will load progressively and the globe will be visible immediately
    // The loading state is now controlled by the first render frame
    
    if (backgroundImageUrl) {
      backgroundTexture = textureLoader.load(backgroundImageUrl);
      if (backgroundTexture) {
        backgroundTexture.wrapS = THREE.RepeatWrapping;
        backgroundTexture.wrapT = THREE.RepeatWrapping;
        backgroundTexture.repeat.set(0.5, 0.5);
      }
        
      // Create a large background sphere for interactive parallax effect
      // Much larger than the globe so it appears as distant stars
      const backgroundGeometry = new THREE.SphereGeometry(500, 32, 32);
      const backgroundMaterial = new THREE.MeshBasicMaterial({
        map: backgroundTexture,
        side: THREE.BackSide, // Render inside the sphere
      });
      backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
      scene.add(backgroundSphere);
      
      // Store reference for rotation updates
      backgroundSphereRef.current = backgroundSphere;
    }

      // Camera
      camera = new THREE.PerspectiveCamera(
      50,
      finalWidth / finalHeight,
      0.1,
      1000
    );
    if (cameraPosition) {
      camera.position.set(
        cameraPosition.x || 0,
        cameraPosition.y || 0,
        cameraPosition.z || cameraDistance
      );
    } else {
      camera.position.z = cameraDistance;
    }
    cameraRef.current = camera;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(finalWidth, finalHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      mountRef.current.appendChild(renderer.domElement);
      
      // Handle window resize
      const handleResize = () => {
        if (!mountRef.current || !camera || !renderer) return;
        const newWidth = mountRef.current.clientWidth || 
          (typeof width === 'number' ? width : mountRef.current.offsetWidth || window.innerWidth);
        const newHeight = mountRef.current.clientHeight || 
          (typeof height === 'number' ? height : mountRef.current.offsetHeight || window.innerHeight);
        const newFinalWidth = Math.max(newWidth, 100);
        const newFinalHeight = Math.max(newHeight, 100);
        
        // Update final dimensions
        finalWidth = newFinalWidth;
        finalHeight = newFinalHeight;
        
        camera.aspect = newFinalWidth / newFinalHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newFinalWidth, newFinalHeight);
      };
      
      window.addEventListener('resize', handleResize);

      // OrbitControls - use ref to get latest controls
      orbitControls = new OrbitControls(camera, renderer.domElement);
    const currentControls = controlsRef.current;
    // Disable default zoom - we'll handle it manually with Ctrl + scroll
    orbitControls.enableZoom = false;
    orbitControls.enablePan = currentControls.enablePan || false;
    orbitControls.rotateSpeed = currentControls.rotateSpeed || 0.5;
    orbitControls.enableDamping = currentControls.enableDamping || false;
    orbitControls.dampingFactor = currentControls.dampingFactor || 0.05;
    
    // Set zoom limits (minDistance = closest/most zoomed in, maxDistance = farthest/most zoomed out)
    orbitControls.minDistance = minZoom;
    orbitControls.maxDistance = maxZoom;

    orbitControls.autoRotate = autoRotateStateRef.current;
    orbitControls.autoRotateSpeed = autoRotateSpeed;

    orbitControls.target.set(0, 0, 0);
    orbitControls.update();
    
    // Store reference for selectedCountry animation
    orbitControlsRef.current = orbitControls;

      // Custom zoom handler: only zoom with Ctrl + scroll wheel
      handleWheel = (event: WheelEvent): void => {
      // Only zoom if Ctrl key is pressed
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        
        // Normalize delta - wheel events can have different scales
        // Use a smaller, smoother zoom factor
        const delta = event.deltaY;
        // Normalize to a consistent scale (typically deltaY is -100 to 100 per scroll)
        // Use a much smaller multiplier for smooth zooming
        const normalizedDelta = delta > 0 ? 1 : -1;
        const zoomSpeed = 0.02; // Much smaller for smooth zooming
        
        if (!camera || !orbitControls) return;
        
        // Get current distance from camera to target
        const currentDistance = camera.position.distanceTo(orbitControls.target);
        
        // Calculate zoom factor (exponential for smoother feel)
        // Scale the zoom based on current distance for consistent feel
        const zoomFactor = 1 + (normalizedDelta * zoomSpeed);
        const newDistance = currentDistance * zoomFactor;
        
        // Clamp to zoom limits
        const clampedDistance = Math.max(minZoom, Math.min(maxZoom, newDistance));
        
        // Apply zoom by moving camera along the line from target to camera
        const direction = camera.position.clone().sub(orbitControls.target).normalize();
        camera.position.copy(orbitControls.target.clone().add(direction.multiplyScalar(clampedDistance)));
        
        orbitControls.update();
      }
      // If Ctrl is not pressed, do nothing (prevent default scroll behavior)
    };
    
    // Add wheel event listener
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

      // Globe (Earth)
      const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
      
      globeTexture = textureLoader.load(globeImageUrl);
      if (bumpImageUrl) {
        bumpTexture = textureLoader.load(bumpImageUrl);
      }
      const globeMaterial = new THREE.MeshStandardMaterial({
        map: globeTexture,
        bumpMap: bumpTexture,
        bumpScale: bumpScale,
      });
      globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);
    globeRef.current = globeMesh;
    globeMeshRef.current = globeMesh; // Store for animation

      // Atmosphere
      if (showAtmosphere) { 
        // Slightly larger than globe — tune this value (0.015–0.08 range works best)
        const atmosphereRadius = 1 + (atmosphereAltitude || 0.018); // Recommended: 0.028 for subtle look
      
        const atmosphereGeometry = new THREE.SphereGeometry(atmosphereRadius, 64, 64);
      
        // ─── Vertex Shader ───────────────────────────────────────────────
        const vertexShader = `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;
      
        // ─── Fragment Shader ─────────────────────────────────────────────
        const fragmentShader = `
          uniform vec3 glowColor;
          uniform float coefficient;   // base brightness
          uniform float power;         // controls rim sharpness (higher = thinner glow)
      
          varying vec3 vNormal;
      
          void main() {
            // Fresnel: 1 at edges (grazing angle), near 0 facing camera
            float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), power) * coefficient;
      
            // Final color + alpha — additive blending makes it glow nicely
            gl_FragColor = vec4(glowColor, intensity);
          }
        `;
      
        // Convert atmosphereColor prop to Three.js Color
        const glowColorValue = typeof atmosphereColor === "string"
          ? new THREE.Color(atmosphereColor) 
          : new THREE.Color(atmosphereColor || "#a0d8ff");
      
        const atmosphereMaterial = new THREE.ShaderMaterial({
          uniforms: {
            glowColor: { value: glowColorValue }, // Use prop color or default light blue-cyan
            coefficient: { value: 0.04},  // Recommended: 0.32 for subtle & modern look
            power: { value: 6.0 },         // Recommended: 6.0 for sharper/thinner rim
          },
          vertexShader,
          fragmentShader,
          // Key settings for glow:
          blending: THREE.AdditiveBlending,   // makes it bright & glowy
          side: THREE.BackSide,               // render inside → halo around globe
          transparent: true,
          depthWrite: false,                  // prevents z-fighting with globe
        });
      
        atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      
        // Very important for natural feel: attach to globe so it rotates together
        globeMesh.add(atmosphereMesh);
        // Do NOT scene.add(atmosphereMesh) — otherwise it won't rotate with Earth
      }
      // Graticules (latitude/longitude grid)
      if (showGraticules) {
      const graticuleMaterial = new THREE.LineBasicMaterial({
        color:
          typeof graticuleColor === "string"
            ? new THREE.Color(graticuleColor).getHex()
            : graticuleColor,
        transparent: true,
        opacity: 0.3,
      });

      // Latitude lines
      for (let lat = -90; lat <= 90; lat += 30) {
        const points: THREE.Vector3[] = [];
        for (let lon = -180; lon <= 180; lon += 5) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          points.push(
            new THREE.Vector3(
              -Math.sin(phi) * Math.cos(theta),
              Math.cos(phi),
              Math.sin(phi) * Math.sin(theta)
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, graticuleMaterial);
        graticuleLines.push(line);
        globeMesh.add(line);
      }

      // Longitude lines
      for (let lon = -180; lon <= 180; lon += 30) {
        const points: THREE.Vector3[] = [];
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          points.push(
            new THREE.Vector3(
              -Math.sin(phi) * Math.cos(theta),
              Math.cos(phi),
              Math.sin(phi) * Math.sin(theta)
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, graticuleMaterial);
        graticuleLines.push(line);
        globeMesh.add(line);
      }
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Helper function to convert lat/lng to 3D coordinates on sphere
    // This matches the coordinate system used by the globe texture
    const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      // Convert to radians
      // lat: -90 (south) to 90 (north)
      // lon: -180 (west) to 180 (east)
      const phi = (90 - lat) * (Math.PI / 180); // Colatitude: 0 at north pole, π at south pole
      const theta = (lon + 180) * (Math.PI / 180); // Longitude: shifted by 180 for correct orientation
      
      // Spherical to Cartesian conversion (matching globe texture coordinate system)
      // Standard formula with Three.js Y-up coordinate system
      // x: negative for correct texture alignment
      // y: cos(phi) gives north-south position (up/down)
      // z: sin(phi) * sin(theta) gives east-west position
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return new THREE.Vector3(x, y, z);
    };

    // Function to add/update marker at lat/lon
    const updateMarker: UpdateMarkerFunction = (lat: number, lon: number): void => {
      // Remove existing marker if any
      if (markerRef.current) {
        // Remove from parent (could be globeMesh or scene)
        if (markerRef.current.parent) {
          markerRef.current.parent.remove(markerRef.current);
        }
        // Dispose of geometries and materials
        markerRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
        markerRef.current = null;
      }

      // Create new marker
      if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
        // Marker position slightly above globe surface (radius 1.0 + small offset)
        const markerRadius = 1.02;
        const markerPosition = latLonToVector3(lat, lon, markerRadius);
        
        // Create a sphere marker
        const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000, // Red color
          transparent: true,
          opacity: 0.9,
        });
        
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(markerPosition);
        
        // Add a small glow effect with a larger transparent sphere
        const glowGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.3,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(markerPosition);
        
        // Group marker and glow
        const markerGroup = new THREE.Group();
        markerGroup.add(marker);
        markerGroup.add(glow);
        
        // Add marker to globe mesh so it rotates with the globe
        if (globeMeshRef.current) {
          globeMeshRef.current.add(markerGroup);
        } else {
          // Fallback: add to scene if globe not ready
          if (sceneRef.current) {
            sceneRef.current.add(markerGroup);
          }
        }
        markerRef.current = markerGroup;
      }
    };
    
    // Store updateMarker function in ref for external access
    updateMarkerRef.current = updateMarker;

    // Smooth camera animation
    let isAnimating: boolean = false;
    let animationFrameId: number | null = null;
    
    const animateGlobeTo: AnimateGlobeToFunction = (lat: number, lon: number, duration: number = transitionDuration): void => {
      if (!cameraRef.current || !orbitControlsRef.current || !globeMeshRef.current) return;
    
      if (isAnimating && animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    
      isAnimating = true;
      const startTime = performance.now();
    
      const controls = orbitControlsRef.current;
      const camera = cameraRef.current;
    
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone(); // usually (0,0,0)
    
      // Target point on globe surface
      const targetPoint = latLonToVector3(lat, lon, 1.0);
    
      // Keep current zoom distance
      const currentDistance = startPos.distanceTo(startTarget);
      const targetCameraPos = targetPoint.clone().normalize().multiplyScalar(currentDistance);
    
      // Remember original settings
      const wasAutoRotate = autoRotateStateRef.current;
      autoRotateStateRef.current = false;
      controls.autoRotate = false;
    
        const animate = (time: number): void => {
        const elapsed = time - startTime;
        let t = elapsed / duration;
        if (t > 1) t = 1;
    
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    
        // Interpolate camera position
        camera.position.lerpVectors(startPos, targetCameraPos, eased);
    
        // IMPORTANT: Keep target at globe center (0,0,0) - don't move it to targetPoint
        // This ensures normal interaction after animation
        controls.target.set(0, 0, 0);
    
        controls.update();
    
        if (t < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Final snap + full sync
          camera.position.copy(targetCameraPos);
          controls.target.set(0, 0, 0); // Ensure target stays at center
          
          // Very important: re-synchronize internal spherical coordinates
          const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
          // Access internal spherical coordinates (private property, but needed for proper sync)
          (controls as any).spherical.setFromVector3(offset);
          (controls as any).spherical.makeSafe(); // prevents NaN/invalid states
          
          controls.update();
    
          // Restore original auto-rotate setting
          autoRotateStateRef.current = wasAutoRotate;
          controls.autoRotate = wasAutoRotate;
    
          isAnimating = false;
          animationFrameId = null;
        }
      };
    
      requestAnimationFrame(animate);
    };
    
    // Store animation function reference
    animateGlobeToRef.current = animateGlobeTo;

      // Polygons - Separate layers: Meshes (for interaction) and Lines (visual borders)
      // For raycasting and interaction
      // Visual borders only

    // Get polygon data - prefer polygonData array, fallback to old method
    const currentPolygonData = polygonDataRef.current;
    const currentPolygonsConfig = polygonsConfigRef.current;
    const currentGeoJsonData = geoJsonData;

    // Helper function to get color from countryData or fallback
    const getPolygonColor = (countryData: CountryData | undefined, countryName: string): string | number => {
      // If we have countryData with color, use it
      if (countryData && countryData.color) {
        return countryData.color;
      }
      
      // Fallback to old method if using polygonsConfig
      if (currentPolygonsConfig?.color && typeof currentPolygonsConfig.color === "function") {
        const result = currentPolygonsConfig.color({ name: countryName });
        if (result) {
          return result;
        }
      }
      
      // Default green color
      return '#00ff00';
    };

    // Helper function to triangulate polygon using fan triangulation
    const triangulatePolygon = (points: THREE.Vector3[]): TriangulationResult => {
      if (points.length < 3) return { vertices: [], indices: [] };
      
      // Create vertices array from all polygon points
      const vertices: number[] = [];
      points.forEach(point => {
        vertices.push(point.x, point.y, point.z);
      });
      
      // Fan triangulation: connect all vertices to the first vertex
      const indices: number[] = [];
      for (let i = 1; i < points.length - 1; i++) {
        indices.push(0, i, i + 1);
      }
      
      return { vertices, indices };
    };

    // Helper function to render a single polygon
    const renderPolygon = (
      geom: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] },
      polygonDataObj: PolygonData,
      countryName: string
    ): void => {
      // Get color for this country
      const color = getPolygonColor(polygonDataObj.countryData, countryName);
      const fillColor = capColor !== null ? capColor : color;
      const colorHex = typeof fillColor === "string"
        ? new THREE.Color(fillColor).getHex()
        : fillColor;
      const borderColorHex = typeof color === "string"
        ? new THREE.Color(color).getHex()
        : color;

      // Handle both Polygon and MultiPolygon
      let polygons: number[][][] | number[][][][] = [];
      if (geom.type === "MultiPolygon") {
        polygons = geom.coordinates as number[][][][];
      } else if (geom.type === "Polygon") {
        polygons = [geom.coordinates as number[][][]];
      }

      polygons.forEach((polygon: number[][] | number[][][]) => {
          const outerRing: number[][] = Array.isArray(polygon[0]) && Array.isArray(polygon[0][0]) 
            ? (polygon as number[][][])[0] 
            : (polygon as number[][]);
          if (!outerRing || outerRing.length === 0) return;

          // Convert to 3D points - use same base points for both fill and border
          const basePoints: THREE.Vector3[] = (outerRing as number[][]).map((coord: number[]) => {
            const [lon, lat] = coord;
            return latLonToVector3(lat, lon, 1.0); // Base radius for calculations
          });
          
          // Remove duplicate last point if it matches first (GeoJSON often closes the ring)
          let cleanPoints: THREE.Vector3[] = [...basePoints];
          if (cleanPoints.length > 0) {
            const first = cleanPoints[0];
            const last = cleanPoints[cleanPoints.length - 1];
            if (first.distanceTo(last) < 0.0001) {
              cleanPoints.pop();
            }
          }

          // Need at least 3 points to form a polygon
          if (cleanPoints.length < 3) return;

          // Clamp polygonOffset to reasonable range (0 to 0.01)
          const clampedOffset = Math.max(0, Math.min(0.01, polygonOffset));
          
          // Globe radius is 1.0, so borders should be at 1.0 + offset
          // For borders to align with globe, use very small offset (default 0.0001)
          const borderRadius = 1.0 + clampedOffset;
          const fillRadius = showPolygonFills ? 1.0 + clampedOffset * 0.9 : borderRadius;

          // Create points for fills and borders
          // Points from latLonToVector3 are already at radius 1.0
          // We scale them by the ratio to get the desired radius
          const fillPoints: THREE.Vector3[] = cleanPoints.map((p: THREE.Vector3) => {
            // Scale directly from current radius (1.0) to desired radius
            return p.clone().multiplyScalar(fillRadius);
          });

          const borderPoints: THREE.Vector3[] = cleanPoints.map((p: THREE.Vector3) => {
            // Scale directly from current radius (1.0) to desired radius
            return p.clone().multiplyScalar(borderRadius);
          });

          // Create MESH for interaction (raycasting) - only if fills are enabled or for interaction
          if (showPolygonFills) {
            const { vertices, indices } = triangulatePolygon(fillPoints);
            
            if (vertices.length > 0 && indices.length > 0) {
              const fillGeometry = new THREE.BufferGeometry();
              fillGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              fillGeometry.setIndex(indices);
              fillGeometry.computeVertexNormals();
              
              const fillMaterial = new THREE.MeshBasicMaterial({
                color: colorHex,
                transparent: true,
                opacity: 0.5,
                side: THREE.FrontSide,
                depthWrite: false,
                depthTest: true,
                polygonOffset: true,
                polygonOffsetFactor: -1,
                polygonOffsetUnits: -clampedOffset * 800,
              });
              
              const fillMesh = new THREE.Mesh(fillGeometry, fillMaterial);
              fillMesh.userData.polygonData = polygonDataObj;
              fillMesh.userData.countryName = countryName;
              polygonMeshes.push(fillMesh);
              if (globeMesh) globeMesh.add(fillMesh);
            }
          } else {
            // If not showing fills, create an invisible mesh for raycasting only
            const { vertices, indices } = triangulatePolygon(borderPoints);
            
            if (vertices.length > 0 && indices.length > 0) {
              const invisibleGeometry = new THREE.BufferGeometry();
              invisibleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              invisibleGeometry.setIndex(indices);
              
              const invisibleMaterial = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                visible: false, // Completely invisible but still raycastable
                side: THREE.DoubleSide,
              });
              
              const invisibleMesh = new THREE.Mesh(invisibleGeometry, invisibleMaterial);
              invisibleMesh.userData.polygonData = polygonDataObj;
              invisibleMesh.userData.countryName = countryName;
              polygonMeshes.push(invisibleMesh);
              if (globeMesh) globeMesh.add(invisibleMesh);
            }
          }
          
          // Close the line loop
          borderPoints.push(borderPoints[0].clone());
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(borderPoints);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: borderColorHex,
            linewidth: 1.5,
            depthTest: true,
            depthWrite: false,
          });

          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData.isBorder = true; // Mark as border, not for raycasting
          polygonLines.push(line);
          if (globeMesh) globeMesh.add(line);
        });
    };

    // Render country polygons - use polygonData array if available, otherwise fallback to old method
    if (currentPolygonData && currentPolygonData.length > 0) {
      // New method: use polygonData array directly
      currentPolygonData.forEach((polygonItem: PolygonDataItem) => {
        const countryData = polygonItem.countryData;
        const geom = polygonItem.geometry;
        const properties = polygonItem.properties;
        const countryName = countryData?.name || properties?.name || 'Unknown';

        // Create polygon data object for callbacks
        const polygonDataObj: PolygonData = {
          countryData: countryData,
          name: countryName,
          properties: properties,
          geometry: geom,
          id: polygonItem.id || countryData?.id,
        };

        renderPolygon(geom, polygonDataObj, countryName);
      });
    } else if (currentGeoJsonData && currentPolygonsConfig?.data && currentPolygonsConfig.data.length > 0) {
      // Fallback to old method: match geoJsonData with polygonsConfig
      const polygonsData = currentPolygonsConfig.data;
      const polygonColor = currentPolygonsConfig.color || null;

      // Normalize country names for matching
      const normalizeCountryName = (name: string | undefined): string => {
        if (!name) return "";
        return name.toLowerCase().trim();
      };

      // Check if a country name matches any in polygonsData
      const isTargetCountry = (countryName: string | undefined): boolean => {
        if (!polygonsData || polygonsData.length === 0) return false;
        const normalized = normalizeCountryName(countryName);
        return polygonsData.some((target) => {
          const normalizedTarget = normalizeCountryName(target);
          return (
            normalized.includes(normalizedTarget) ||
            normalizedTarget.includes(normalized) ||
            (normalizedTarget === "usa" &&
              (normalized.includes("united states") ||
                normalized.includes("usa"))) ||
            (normalized.includes("united states") && normalizedTarget === "usa")
          );
        });
      };

      // Get color for polygon (old method)
      const getPolygonColorOld = (countryName: string): string | number => {
        if (polygonColor && typeof polygonColor === "function") {
          const result = polygonColor({ name: countryName });
          if (result) {
            return result;
          }
        }
        return 0x00ff00;
      };

      currentGeoJsonData.features.forEach((feature) => {
        const countryName = feature.properties?.name;
        if (!isTargetCountry(countryName)) return;

        const geom = feature.geometry;
        const polygonDataObj: PolygonData = {
          name: countryName || '',
          properties: feature.properties,
          feature: feature,
        };

        // Get color for this country
        const color = getPolygonColorOld(countryName || '');
        const fillColor = capColor !== null ? capColor : color;
        const colorHex = typeof fillColor === "string"
          ? new THREE.Color(fillColor).getHex()
          : fillColor;
        const borderColorHex = typeof color === "string"
          ? new THREE.Color(color).getHex()
          : color;

        // Handle both Polygon and MultiPolygon
        let polygons: number[][][] | number[][][][] = [];
        if (geom.type === "MultiPolygon") {
          polygons = geom.coordinates as number[][][][];
        } else if (geom.type === "Polygon") {
          polygons = [geom.coordinates as number[][][]];
        }

        polygons.forEach((polygon: number[][] | number[][][]) => {
          const outerRing: number[][] = Array.isArray(polygon[0]) && Array.isArray(polygon[0][0]) 
            ? (polygon as number[][][])[0] 
            : (polygon as number[][]);
          if (!outerRing || outerRing.length === 0) return;

          // Convert to 3D points
          const basePoints: THREE.Vector3[] = (outerRing as number[][]).map((coord: number[]) => {
            const [lon, lat] = coord;
            return latLonToVector3(lat, lon, 1.0);
          });
          
          let cleanPoints: THREE.Vector3[] = [...basePoints];
          if (cleanPoints.length > 0) {
            const first = cleanPoints[0];
            const last = cleanPoints[cleanPoints.length - 1];
            if (first.distanceTo(last) < 0.0001) {
              cleanPoints.pop();
            }
          }

          if (cleanPoints.length < 3) return;

          const clampedOffset = Math.max(0, Math.min(0.01, polygonOffset));
          const borderRadius = 1.0 + clampedOffset;
          const fillRadius = showPolygonFills ? 1.0 + clampedOffset * 0.9 : borderRadius;

          const fillPoints: THREE.Vector3[] = cleanPoints.map((p: THREE.Vector3) => p.clone().multiplyScalar(fillRadius));
          const borderPoints: THREE.Vector3[] = cleanPoints.map((p: THREE.Vector3) => p.clone().multiplyScalar(borderRadius));

          // Create MESH for interaction
          if (showPolygonFills) {
            const { vertices, indices } = triangulatePolygon(fillPoints);
            
            if (vertices.length > 0 && indices.length > 0) {
              const fillGeometry = new THREE.BufferGeometry();
              fillGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              fillGeometry.setIndex(indices);
              fillGeometry.computeVertexNormals();
              
              const fillMaterial = new THREE.MeshBasicMaterial({
                color: colorHex,
                transparent: true,
                opacity: 0.5,
                side: THREE.FrontSide,
                depthWrite: false,
                depthTest: true,
                polygonOffset: true,
                polygonOffsetFactor: -1,
                polygonOffsetUnits: -clampedOffset * 800,
              });
              
              const fillMesh = new THREE.Mesh(fillGeometry, fillMaterial);
              fillMesh.userData.polygonData = polygonDataObj;
              fillMesh.userData.countryName = countryName;
              polygonMeshes.push(fillMesh);
              if (globeMesh) globeMesh.add(fillMesh);
            }
          } else {
            const { vertices, indices } = triangulatePolygon(borderPoints);
            
            if (vertices.length > 0 && indices.length > 0) {
              const invisibleGeometry = new THREE.BufferGeometry();
              invisibleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              invisibleGeometry.setIndex(indices);
              
              const invisibleMaterial = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                visible: false,
                side: THREE.DoubleSide,
              });
              
              const invisibleMesh = new THREE.Mesh(invisibleGeometry, invisibleMaterial);
              invisibleMesh.userData.polygonData = polygonDataObj;
              invisibleMesh.userData.countryName = countryName;
              polygonMeshes.push(invisibleMesh);
              if (globeMesh) globeMesh.add(invisibleMesh);
            }
          }
          
          borderPoints.push(borderPoints[0].clone());
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(borderPoints);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: borderColorHex,
            linewidth: 1.5,
            depthTest: true,
            depthWrite: false,
          });

          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData.isBorder = true;
          polygonLines.push(line);
          if (globeMesh) globeMesh.add(line);
        });
      });
    }

      // Raycasting for hover and click interactions
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let hoveredPolygonMesh: THREE.Mesh | null = null;

      handleMouseMove = (event: MouseEvent): void => {
      if (!enablePointerInteraction || !renderer || !camera) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Raycast ONLY against polygon meshes (not lines, not globe)
      let currentMesh: THREE.Mesh | null = null;
      if (polygonMeshes.length > 0) {
        const intersects = raycaster.intersectObjects(polygonMeshes, false);
        
        // Filter to only front-facing intersections (facing the camera)
        if (intersects.length > 0) {
          const cameraPosition = camera.position.clone();
          
          // Find the closest intersection that is on the front-facing side
          // Check each intersection to see if it's facing the camera
          for (const intersect of intersects) {
            const intersectionPoint = intersect.point;
            
            // Get the normal at the intersection point (pointing outward from sphere center)
            const pointNormal = intersectionPoint.clone().normalize();
            
            // Vector from intersection point to camera
            const toCamera = cameraPosition.clone().sub(intersectionPoint).normalize();
            
            // Dot product: if positive, the point is facing the camera
            const dotProduct = pointNormal.dot(toCamera);
            
            // Only use intersections where the normal faces the camera
            if (dotProduct > 0 && intersect.object instanceof THREE.Mesh) {
              currentMesh = intersect.object;
              break; // Use the first (closest) front-facing intersection
            }
          }
        }
      }
      
      // Only trigger callback if hovered polygon changed
      if (currentMesh !== hoveredPolygonMesh) {
        const prevPolygonData = hoveredPolygonMesh
          ? hoveredPolygonMesh.userData.polygonData
          : null;
        const currentPolygonData = currentMesh
          ? currentMesh.userData.polygonData
          : null;
        
        // Call hover callback with current and previous polygon data
        if (onPolygonHoverRef.current) {
          onPolygonHoverRef.current(currentPolygonData, prevPolygonData, event);
        }
        hoveredPolygonMesh = currentMesh;
      }
    };

      handleClick = (event: MouseEvent): void => {
      if (!enablePointerInteraction || !renderer || !camera) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check polygon click (raycast against meshes only)
      if (onPolygonClickRef.current && polygonMeshes.length > 0) {
        const intersects = raycaster.intersectObjects(polygonMeshes, false);
        
        // Filter to only front-facing intersections (facing the camera)
        if (intersects.length > 0) {
          const cameraPosition = camera.position.clone();
          
          // Find the closest intersection that is on the front-facing side
          for (const intersect of intersects) {
            const intersectionPoint = intersect.point;
            
            // Get the normal at the intersection point (pointing outward from sphere center)
            const pointNormal = intersectionPoint.clone().normalize();
            
            // Vector from intersection point to camera
            const toCamera = cameraPosition.clone().sub(intersectionPoint).normalize();
            
            // Dot product: if positive, the point is facing the camera
            const dotProduct = pointNormal.dot(toCamera);
            
            // Only use intersections where the normal faces the camera
            if (dotProduct > 0) {
              const clickedMesh = intersect.object;
              const polygonData = clickedMesh.userData.polygonData;
              
              // Stop auto-rotate when clicking on a country
              autoRotateStateRef.current = false;
              if (orbitControlsRef.current) {
                orbitControlsRef.current.autoRotate = false;
              }
              
              // Call the click callback
              if (onPolygonClickRef.current) {
                onPolygonClickRef.current(polygonData, event);
              }
              
              // Auto-center camera on clicked country if enabled
              if (autoCenterOnClick && polygonData) {
                // Try to get lat/lon from countryData first (preferred), then properties
                let lat: number | null = null;
                let lon: number | null = null;
                
                // Check countryData first (from polygonData array)
                if (polygonData.countryData) {
                  lat = polygonData.countryData.lat || polygonData.countryData.latitude || null;
                  lon = polygonData.countryData.lng || polygonData.countryData.lon || polygonData.countryData.longitude || null;
                }
                
                // Fallback to properties if countryData doesn't have coordinates
                if ((typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) && polygonData.properties) {
                  lat = polygonData.properties.lat || 
                        polygonData.properties.latitude ||
                        (polygonData.properties.coordinates && polygonData.properties.coordinates[1]) ||
                        null;
                  lon = polygonData.properties.lng || 
                        polygonData.properties.lon || 
                        polygonData.properties.longitude ||
                        (polygonData.properties.coordinates && polygonData.properties.coordinates[0]) ||
                        null;
                }
                
                if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) {
                  // Calculate center from geometry if no explicit coordinates
                  const geometry = clickedMesh instanceof THREE.Mesh ? clickedMesh.geometry : null;
                  if (geometry && geometry.attributes && geometry.attributes.position) {
                    const positions = geometry.attributes.position;
                    const sumVector = new THREE.Vector3(0, 0, 0);
                    let count = 0;
                    
                    // Sample ~20 points from the polygon to find center
                    const step = Math.max(1, Math.floor(positions.count / 20));
                    for (let i = 0; i < positions.count; i += step) {
                      const x = positions.getX(i);
                      const y = positions.getY(i);
                      const z = positions.getZ(i);
                      sumVector.add(new THREE.Vector3(x, y, z));
                      count++;
                    }
                    
                    if (count > 0) {
                      sumVector.divideScalar(count).normalize();
                      // Convert back to lat/lon
                      lat = 90 - Math.acos(sumVector.y) * (180 / Math.PI);
                      lon = Math.atan2(sumVector.z, -sumVector.x) * (180 / Math.PI) - 180;
                    }
                  } else {
                    // Fallback: try to get center from feature geometry
                    const feature = polygonData.feature;
                    if (feature && feature.geometry) {
                      const geom = feature.geometry;
                      const sumVec = new THREE.Vector3(0, 0, 0);
                      let count = 0;
                      
                      const extractCoords = (coords: number[] | number[][]): void => {
                        if (Array.isArray(coords[0]) && typeof coords[0] !== 'number') {
                          (coords as number[][]).forEach(extractCoords);
                        } else if (Array.isArray(coords) && coords.length >= 2 && typeof coords[0] === 'number') {
                          const vec = latLonToVector3(coords[1] as number, coords[0] as number, 1);
                          sumVec.add(vec);
                          count++;
                        }
                      };
                      
                      if (geom.type === 'Polygon' && geom.coordinates) {
                        geom.coordinates.forEach(extractCoords);
                      } else if (geom.type === 'MultiPolygon' && geom.coordinates) {
                        (geom.coordinates as number[][][][]).forEach((poly: number[][][]) => poly.forEach(extractCoords));
                      }
                      
                      if (count > 0) {
                        sumVec.divideScalar(count).normalize();
                        lat = 90 - Math.acos(sumVec.y) * (180 / Math.PI);
                        lon = Math.atan2(sumVec.z, -sumVec.x) * (180 / Math.PI) - 180;
                      }
                    }
                  }
                }
                
                // If we have valid coordinates, animate and add marker
                if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
                  // Add marker at the location
                  if (updateMarkerRef.current) {
                    updateMarkerRef.current(lat, lon);
                  }
                  if (animateGlobeToRef.current) {
                    animateGlobeToRef.current(lat, lon, transitionDuration);
                  }
                }
              }
              
              return;
            }
          }
        }
      }

      // Globe click (only if no polygon was clicked)
      if (event.button === 0) {
        // Toggle auto-rotate on globe click
        autoRotateStateRef.current = !autoRotateStateRef.current;
        if (orbitControlsRef.current) {
          orbitControlsRef.current.autoRotate = autoRotateStateRef.current;
        }
        
        // Call user's callback if provided
        if (onGlobeClickRef.current) {
          onGlobeClickRef.current(event);
        }
      }
    };

      // Add event listeners
      if (enablePointerInteraction && renderer) {
        renderer.domElement.addEventListener("mousemove", handleMouseMove, { passive: true });
        renderer.domElement.addEventListener("click", handleClick);
        if (onPolygonClickRef.current || onPolygonHoverRef.current) {
          renderer.domElement.style.cursor = "pointer";
        }
      }

      // Animation loop
      const animate = (): void => {
      mainAnimationFrameId = requestAnimationFrame(animate);

        
      // Update background sphere rotation based on globe rotation for parallax effect
      // Rotate background in opposite direction with a factor for realistic parallax
      if (backgroundSphereRef.current && globeMeshRef.current) {
        // Parallax factor: background rotates slower than globe for depth effect
        const parallaxFactor = 0.3; // Adjust this value (0-1) to control parallax intensity
        backgroundSphereRef.current.rotation.y = -globeMeshRef.current.rotation.y * parallaxFactor;
        backgroundSphereRef.current.rotation.x = -globeMeshRef.current.rotation.x * parallaxFactor;
      }
      
      if (autoRotateStateRef.current && globeMeshRef.current) {
        globeMeshRef.current.rotation.y += (autoRotateSpeed * Math.PI) / 180;
      }

        if (orbitControls) orbitControls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      animate();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize globe';
      console.error('[SimpleGlobe] Initialization error:', error);
    }

    // Cleanup
    return () => {
      // Stop animation loops first
      if (mainAnimationFrameId !== null) {
        cancelAnimationFrame(mainAnimationFrameId);
        mainAnimationFrameId = null;
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      
      if (mountRef.current && renderer && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup marker
      if (markerRef.current) {
        // Remove from parent (could be globeMesh or scene)
        if (markerRef.current.parent) {
          markerRef.current.parent.remove(markerRef.current);
        }
        markerRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
        markerRef.current = null;
      }
      
      // Cleanup background sphere
      if (backgroundSphereRef.current) {
        backgroundSphereRef.current.geometry.dispose();
        if (Array.isArray(backgroundSphereRef.current.material)) {
          backgroundSphereRef.current.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          backgroundSphereRef.current.material.dispose();
        }
      }
      
      // Cleanup globe mesh (use ref for safety)
      if (globeMeshRef.current) {
        globeMeshRef.current.geometry.dispose();
        if (Array.isArray(globeMeshRef.current.material)) {
          globeMeshRef.current.material.forEach(mat => mat.dispose());
        } else {
          globeMeshRef.current.material.dispose();
        }
      }
      
      if (atmosphereMesh) {
        atmosphereMesh.geometry.dispose();
        if (Array.isArray(atmosphereMesh.material)) {
          atmosphereMesh.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          atmosphereMesh.material.dispose();
        }
      }
      graticuleLines.forEach((line: THREE.Line) => {
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          line.material.dispose();
        }
      });
      polygonLines.forEach((line: THREE.Line) => {
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          line.material.dispose();
        }
        if (globeMeshRef.current) {
          globeMeshRef.current.remove(line);
        }
      });
      polygonMeshes.forEach((mesh: THREE.Mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
        if (globeMeshRef.current) {
          globeMeshRef.current.remove(mesh);
        }
      });
      
      // Dispose OrbitControls properly
      if (orbitControlsRef.current) {
        orbitControlsRef.current.dispose();
      }
      
      // Clear refs after cleanup
      globeMeshRef.current = null;
      orbitControlsRef.current = null;
      cameraRef.current = null;
      animateGlobeToRef.current = null;
      updateMarkerRef.current = null;
      sceneRef.current = null;
      if (enablePointerInteraction && renderer) {
        if (handleMouseMove) {
          renderer.domElement.removeEventListener("mousemove", handleMouseMove);
        }
        if (handleClick) {
          renderer.domElement.removeEventListener("click", handleClick);
        }
      }
      // Remove wheel event listener
      if (renderer && handleWheel) {
        renderer.domElement.removeEventListener("wheel", handleWheel);
      }
      
      // Dispose textures properly
      if (globeTexture) {
        globeTexture.dispose();
      }
      if (bumpTexture) {
        bumpTexture.dispose();
      }
      if (backgroundTexture) {
        backgroundTexture.dispose();
      }
      if (scene && scene.background && typeof scene.background === 'object' && 'dispose' in scene.background && scene.background !== backgroundTexture) {
        (scene.background as THREE.Texture).dispose();
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [
    globeImageUrl,
    backgroundImageUrl,
    bumpImageUrl,
    bumpScale,
    showAtmosphere,
    atmosphereColor,
    atmosphereAltitude,
    showGraticules,
    graticuleColor,
    // Only include props that should trigger scene recreation
    // polygonData is memoized in App.jsx, so it's stable unless geoJsonData changes
    // polygonsConfig and controls are handled via refs to prevent unnecessary recreations
    // Callbacks are handled via refs
    polygonData,
    geoJsonData,
    capColor,
    showPolygonFills,
    polygonOffset,
    transitionDuration,
    autoCenterOnClick,
    enablePointerInteraction,
    autoRotate,
    autoRotateSpeed,
    cameraDistance,
    cameraPosition,
    minZoom,
    maxZoom,
    // Note: polygonsConfig and controls are accessed via refs, so they don't need to be in dependencies
    // The scene will only recreate when geoJsonData or other actual config values change
  ]);

  return (
    <div
      ref={mountRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    />
  );
});

SimpleGlobeComponent.displayName = 'SimpleGlobeComponent';

export default SimpleGlobeComponent;