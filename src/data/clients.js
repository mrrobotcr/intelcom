// Función que carga dinámicamente todos los logos desde la API
export const getClientLogos = async () => {
  try {
    const response = await fetch('/api/clients');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Cargados ${data.count} logos de clientes dinámicamente`);
      return data.logos;
    } else {
      console.error('❌ Error al cargar logos:', data.error);
      return [];
    }
    
  } catch (error) {
    console.error('❌ Error conectando a la API de clientes:', error);
    
    // Fallback: retornar lista vacía en caso de error
    // En producción podrías retornar una lista de logos por defecto
    return [];
  }
};

// Configuración del carrusel
export const carouselConfig = {
  autoplaySpeed: 3000,
  pauseOnHover: true,
  showArrows: false,
  showDots: false,
  infinite: true,
  slidesToShow: {
    mobile: 2,
    tablet: 4,
    desktop: 6,
    large: 8
  }
};