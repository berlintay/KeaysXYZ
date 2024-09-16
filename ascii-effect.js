const cache = new Map();

// eslint-disable-next-line no-unused-vars
async function createAsciiEffect(renderer) {
  try {
    // Check if the AsciiEffect module is already cached
    if (!cache.has('AsciiEffect')) {
      const { AsciiEffect } = await import('path/to/AsciiEffect');
      cache.set('AsciiEffect', AsciiEffect);
    }

    const AsciiEffect = cache.get('AsciiEffect');
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });

    // Destructure the style properties for better readability
    const { style } = effect.domElement;
    style.color = 'white';
    style.backgroundColor = 'black';

    return effect;
  } catch (error) {
    // Throw a custom error for better error handling
    throw new Error(`Failed to create AsciiEffect: ${error.message}`);
  }
}
