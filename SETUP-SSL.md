# Guía de configuración SSL con Let's Encrypt

## Paso 1: Levantar nginx sin SSL

La configuración actual permite que nginx arranque **sin certificados SSL**. El sitio funcionará temporalmente en HTTP.

```bash
docker-compose up -d
```

Verifica que nginx esté funcionando:
```bash
docker-compose logs nginx
```

## Paso 2: Obtener certificados con certbot

Una vez que nginx esté corriendo, ejecuta certbot para obtener los certificados:

```bash
docker-compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email tu-email@ejemplo.com \
  --agree-tos \
  --no-eff-email \
  -d intelcomint.com \
  -d www.intelcomint.com
```

**Importante**: Reemplaza `tu-email@ejemplo.com` con tu email real.

## Paso 3: Activar HTTPS en nginx

Después de obtener los certificados exitosamente:

1. Edita `nginx/default.conf`
2. **Descomenta** todo el bloque HTTPS (líneas 23-77 aproximadamente)
3. En el bloque HTTP (línea 12), **reemplaza** el `proxy_pass` con:
   ```nginx
   return 301 https://$host$request_uri;
   ```

## Paso 4: Reiniciar nginx

```bash
docker-compose restart nginx
```

Verifica que no haya errores:
```bash
docker-compose logs nginx
```

## Paso 5: Configurar renovación automática

Los certificados de Let's Encrypt expiran cada 90 días. Configura un cron job:

```bash
# Agrega esto al crontab del servidor
0 0 * * * cd /ruta/a/tu/proyecto && docker-compose run --rm certbot renew && docker-compose restart nginx
```

## Verificación

Visita tu sitio en:
- https://intelcomint.com

Deberías ver el candado verde de SSL en tu navegador.

---

## Notas importantes

- **Advertencia corregida**: Cambié `listen 443 ssl http2;` a la sintaxis moderna con `http2 on;`
- **DNS**: Asegúrate de que tu dominio `intelcomint.com` apunte a la IP de tu servidor antes de ejecutar certbot
- **Firewall**: Verifica que los puertos 80 y 443 estén abiertos en tu servidor
