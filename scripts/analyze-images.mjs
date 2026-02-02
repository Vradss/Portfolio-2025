#!/usr/bin/env node
/**
 * Script para analizar imágenes PNG que no tienen WebP
 * Muestra las más pesadas primero
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
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
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.png') {
      const webpPath = fullPath.replace(/\.png$/i, '.webp');
      
      try {
        // Verificar si existe el WebP
        await stat(webpPath);
        // Si existe, no hacer nada
      } catch {
        // Si no existe, agregar a la lista
        const pngSize = (await stat(fullPath)).size;
        results.push({
          path: fullPath,
          size: pngSize,
          relativePath: fullPath.replace(ASSETS_DIR + '/', '')
        });
      }
    }
  }

  return results;
}

/**
 * Main
 */
async function main() {
  console.log('🔍 Analizando imágenes PNG sin WebP...\n');
  console.log(`📁 Directorio: ${ASSETS_DIR}\n`);

  const startTime = Date.now();
  const results = await processDirectory(ASSETS_DIR);
  
  // Ordenar por tamaño (más grandes primero)
  results.sort((a, b) => b.size - a.size);

  const totalSize = results.reduce((sum, img) => sum + img.size, 0);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('='.repeat(80));
  console.log(`📊 Total de PNG sin WebP: ${results.length}`);
  console.log(`💾 Tamaño total: ${formatBytes(totalSize)}`);
  console.log('='.repeat(80));
  console.log('\n📋 Imágenes ordenadas por tamaño (más pesadas primero):\n');

  if (results.length === 0) {
    console.log('✨ ¡Todas las imágenes PNG ya tienen su versión WebP!');
  } else {
    results.forEach((img, index) => {
      const sizeFormatted = formatBytes(img.size);
      const padding = ' '.repeat(Math.max(0, 12 - sizeFormatted.length));
      console.log(`${(index + 1).toString().padStart(3)}. ${padding}${sizeFormatted} | ${img.relativePath}`);
    });

    console.log('\n💡 Recomendación:');
    console.log('   Las imágenes más pesadas deberían convertirse primero para maximizar el ahorro.');
    console.log('   Ejecuta: npm run optimize-images');
  }

  console.log(`\n⏱️  Tiempo de análisis: ${duration}s`);
}

main().catch(console.error);
