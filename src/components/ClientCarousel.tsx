import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getClientLogos } from '../data/clients.js'

interface Logo {
  src: string;
  alt: string;
  filename: string;
}

const ClientCarousel: React.FC = () => {
  const [logos, setLogos] = useState<Logo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Todos los hooks deben estar ANTES de cualquier return condicional
  const [emblaRef1] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const [emblaRef2] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  useEffect(() => {
    const loadLogos = async () => {
      try {
        setLoading(true)
        const clientLogos = await getClientLogos()
        
        if (clientLogos.length === 0) {
          setError('No se encontraron logos de clientes')
          return
        }
        
        // Triplicar para efecto infinito suave
        setLogos([...clientLogos, ...clientLogos, ...clientLogos])
        setError(null)
      } catch (err) {
        console.error('Error cargando logos:', err)
        setError('Error al cargar los logos de clientes')
      } finally {
        setLoading(false)
      }
    }
    
    loadLogos()
  }, [])

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="text-white text-lg">Cargando logos de clientes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    )
  }

  if (logos.length === 0) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="text-gray-400 text-lg">No hay logos de clientes disponibles</div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Primera fila - movimiento suave hacia la derecha */}
      <div className="overflow-hidden mb-8" ref={emblaRef1}>
        <div className="flex" style={{ transform: 'translateZ(0)' }}>
          {logos.map((logo, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-4 group"
              style={{ minWidth: '192px' }}
            >
              <div className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary-silver/50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-sm">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-12 object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Segunda fila - movimiento suave hacia la izquierda */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex" style={{ transform: 'translateZ(0)' }}>
          {logos.slice().reverse().map((logo, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-4 group"
              style={{ minWidth: '192px' }}
            >
              <div className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary-silver/50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-sm">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-12 object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientCarousel