import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const partnersDir = path.join(process.cwd(), 'public', 'images', 'partners');
    
    // Check if directory exists
    if (!fs.existsSync(partnersDir)) {
      return new Response(JSON.stringify({ error: 'Partners directory not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const files = fs.readdirSync(partnersDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
    
    const partners = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => {
        // Clean filename for alt text
        const nameWithoutExt = path.parse(file).name;
        const cleanName = nameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(/Partner/gi, 'Partner')
          .replace(/Reseller/gi, 'Reseller')
          .trim();

        return {
          src: `/images/partners/${file}`,
          alt: `${cleanName} Partner`,
          filename: file,
          name: cleanName
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return new Response(JSON.stringify({ partners }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error loading partners:', error);
    return new Response(JSON.stringify({ error: 'Failed to load partners' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};