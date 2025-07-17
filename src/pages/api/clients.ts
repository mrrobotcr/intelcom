import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    // Ruta a la carpeta de logos de clientes
    const customersDir = path.join(process.cwd(), 'public', 'images', 'customers');
    
    // Leer todos los archivos de la carpeta
    const files = fs.readdirSync(customersDir);
    
    // Filtrar solo archivos de imagen y crear objetos con metadata
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
    
    const logos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => {
        // Crear nombre limpio para alt text
        const nameWithoutExt = path.parse(file).name;
        const cleanName = nameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase())
          .replace(/\s+/g, ' ')
          .trim();
        
        return {
          src: `/images/customers/${file}`,
          alt: cleanName,
          filename: file
        };
      })
      .sort((a, b) => a.alt.localeCompare(b.alt)); // Ordenar alfabéticamente
    
    return new Response(JSON.stringify({
      success: true,
      count: logos.length,
      logos
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache por 1 hora
      }
    });
    
  } catch (error) {
    console.error('Error reading customer logos:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to load customer logos',
      logos: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};