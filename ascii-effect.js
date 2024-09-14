const CAMERA_FOV = 70;
const CAMERA_DISTANCE = 500;
const SPHERE_RADIUS = 200;

try {
  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
} catch (error) {
  console.error('Failed to create AsciiEffect:', error);
  // Fallback or user notification
}

effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';
