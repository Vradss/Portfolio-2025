#!/usr/bin/env node
/**
 * Script para analizar el tamaño de todas las imágenes
 * Muestra PNG y WebP ordenados por tamaño
 */

import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '../src/assets');

/**
 * Formatear bytes a unidades legibles
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Procesar directorio recursivamente
 */
async function processDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) {
        try {
          const fileSize = (await stat(fullPath)).size;
          const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          let hasWebP = false;
          let webpSize = 0;
          
          try {
            webpSize = (await stat(webpPath)).size;
            hasWebP = true;
          } catch {
            // No tiene WebP
          }

          results.push({
            path: fullPath,
            relativePath: fullPath.replace(ASSETS_DIR + '/', ''),
            size: fileSize,
            ext: ext,
            hasWebP: hasWebP,
            webpSize: hasWebP ? webpSize : null,
            savings: hasWebP ? fileSize - webpSize : null
          });
        } catch (error) {
          // Ignorar errores de stat
        }
      }
    }
  }

  return results;
}

/**
 * Main
 */
async function main() {
  console.log('📊 Analizando tamaños de imágenes...\n');
  console.log(`📁 Directorio: ${ASSETS_DIR}\n`);

  const startTime = Date.now();
  const results = await processDirectory(ASSETS_DIR);
  
  // Separar PNG y WebP
  const pngImages = results.filter(img => img.ext === '.png');
  const webpImages = results.filter(img => img.ext === '.webp');
  
  // Ordenar PNG por tamaño (más grandes primero)
  pngImages.sort((a, b) => b.size - a.size);
  
  // Calcular estadísticas
  const totalPngSize = pngImages.reduce((sum, img) => sum + img.size, 0);
  const totalWebpSize = webpImages.reduce((sum, img) => sum + img.size, 0);
  const totalSavings = totalPngSize - totalWebpSize;
  const savingsPercentage = totalPngSize > 0 ? ((totalSavings / totalPngSize) * 100).toFixed(1) : 0;

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('='.repeat(80));
  console.log('📈 ESTADÍSTICAS GENERALES');
  console.log('='.repeat(80));
  console.log(`Total de imágenes PNG: ${pngImages.length}`);
  console.log(`Total de imágenes WebP: ${webpImages.length}`);
  console.log(`Tamaño total PNG: ${formatBytes(totalPngSize)}`);
  console.log(`Tamaño total WebP: ${formatBytes(totalWebpSize)}`);
  console.log(`💾 Ahorro total: ${formatBytes(totalSavings)} (${savingsPercentage}%)`);
  console.log('='.repeat(80));

  if (pngImages.length > 0) {
    console.log('\n📋 TOP 20 IMÁGENES PNG MÁS PESADAS:\n');
    pngImages.slice(0, 20).forEach((img, index) => {
      const sizeFormatted = formatBytes(img.size);
      const padding = ' '.repeat(Math.max(0, 12 - sizeFormatted.length));
      const webpInfo = img.hasWebP 
        ? `✓ WebP: ${formatBytes(img.webpSize)} (ahorro: ${formatBytes(img.savings)})`
        : '✗ Sin WebP';
      console.log(`${(index + 1).toString().padStart(3)}. ${padding}${sizeFormatted} | ${img.relativePath}`);
      console.log(`     ${webpInfo}`);
    });
  }

  // Mostrar PNG sin WebP
  const pngWithoutWebp = pngImages.filter(img => !img.hasWebP);
  if (pngWithoutWebp.length > 0) {
    console.log('\n⚠️  PNG SIN WEBP (prioridad para convertir):\n');
    pngWithoutWebp.forEach((img, index) => {
      const sizeFormatted = formatBytes(img.size);
      const padding = ' '.repeat(Math.max(0, 12 - sizeFormatted.length));
      console.log(`${(index + 1).toString().padStart(3)}. ${padding}${sizeFormatted} | ${img.relativePath}`);
    });
  } else {
    console.log('\n✨ ¡Todas las imágenes PNG tienen su versión WebP!');
  }

  console.log(`\n⏱️  Tiempo de análisis: ${duration}s`);
}

main().catch(console.error);
