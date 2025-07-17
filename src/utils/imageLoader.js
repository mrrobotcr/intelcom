// Utilidad para manejar carga de imágenes con lazy loading y fallbacks
export const createImageLoader = () => {
  const loadedImages = new Set();
  
  return {
    // Precargar imagen crítica
    preloadImage: (src) => {
      return new Promise((resolve, reject) => {
        if (loadedImages.has(src)) {
          resolve(src);
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          loadedImages.add(src);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    },
    
    // Optimizar nombre para alt text
    generateAltText: (filename) => {
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      return nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
        .replace(/\s+/g, ' ')
        .trim();
    },
    
    // Verificar si es formato de imagen válido
    isValidImageFormat: (filename) => {
      const validExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
      const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
      return validExtensions.includes(ext);
    }
  };
};