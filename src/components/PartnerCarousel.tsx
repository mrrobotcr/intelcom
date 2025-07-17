import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getPartnerLogos } from '../data/partners.js'

interface Partner {
  src: string;
  alt: string;
  filename: string;
  name: string;
}

const PartnerCarousel: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // All hooks must be BEFORE any conditional returns
  const [emblaRef1] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const [emblaRef2] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  useEffect(() => {
    const loadPartners = async () => {
      try {
        setLoading(true)
        const partnerLogos = await getPartnerLogos()
        
        if (partnerLogos.length === 0) {
          setError('No se encontraron logos de partners')
          return
        }
        
        // Triple for smooth infinite effect
        setPartners([...partnerLogos, ...partnerLogos, ...partnerLogos])
        setError(null)
      } catch (err) {
        console.error('Error loading partners:', err)
        setError('Error al cargar los logos de partners')
      } finally {
        setLoading(false)
      }
    }
    
    loadPartners()
  }, [])

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="text-white text-lg">Cargando partners...</div>
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

  if (partners.length === 0) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="text-gray-400 text-lg">No hay partners disponibles</div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* First row - smooth movement to the right */}
      <div className="overflow-hidden mb-8" ref={emblaRef1}>
        <div className="flex" style={{ transform: 'translateZ(0)' }}>
          {partners.map((partner, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-4 group"
              style={{ minWidth: '192px' }}
            >
              <div className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary-gold/50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-sm">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="w-full h-12 object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - smooth movement to the left */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex" style={{ transform: 'translateZ(0)' }}>
          {partners.slice().reverse().map((partner, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-4 group"
              style={{ minWidth: '192px' }}
            >
              <div className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary-gold/50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-sm">
                <img
                  src={partner.src}
                  alt={partner.alt}
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

export default PartnerCarousel