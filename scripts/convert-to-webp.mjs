#!/usr/bin/env node
/**
 * Script para convertir imágenes PNG a WebP
 * Mantiene los PNG originales como fallback
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '../src/assets');
const WEBP_QUALITY = 85;
const PNG_EXTENSIONS = ['.png', '.PNG'];

// Estadísticas
let stats = {
  total: 0,
  converted: 0,
  skipped: 0, // WebP ya existentes
  errors: 0,
  savedBytes: 0,
};

/**
 * Convertir un archivo PNG a WebP
 */
async function convertToWebP(filePath) {
  try {
    const ext = extname(filePath);
    if (!PNG_EXTENSIONS.includes(ext)) return;

    stats.total++;

    const outputPath = filePath.replace(/\.png$/i, '.webp');
    const originalSize = (await stat(filePath)).size;

    // Verificar si el WebP ya existe
    try {
      const webpStat = await stat(outputPath);
      const pngStat = await stat(filePath);
      
      // Si el WebP existe y es más reciente que el PNG, saltar conversión
      if (webpStat.mtime >= pngStat.mtime) {
        stats.skipped++; // Contar como "ya existe"
        return; // Saltar, ya existe y está actualizado
      }
    } catch {
      // Si no existe el WebP, continuar con la conversión
    }

    // Convertir con sharp (reducir effort de 6 a 4 para velocidad)
    await sharp(filePath)
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(outputPath);

    const newSize = (await stat(outputPath)).size;
    const saved = originalSize - newSize;
    const percentage = ((saved / originalSize) * 100).toFixed(1);

    stats.savedBytes += saved;
    stats.converted++;

    console.log(
      `✓ ${basename(filePath)} → ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${percentage}% reducción)`
    );
  } catch (error) {
    stats.errors++;
    console.error(`✗ Error convirtiendo ${filePath}:`, error.message);
  }
}

/**
 * Procesar directorio recursivamente
 */
async function processDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await convertToWebP(fullPath);
    }
  }
}

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
 * Main
 */
async function main() {
  console.log('🖼️  Iniciando conversión de imágenes PNG → WebP...\n');
  console.log(`📁 Directorio: ${ASSETS_DIR}\n`);
  console.log(`⚙️  Calidad WebP: ${WEBP_QUALITY}\n`);

  const startTime = Date.now();

  await processDirectory(ASSETS_DIR);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('📊 Resumen:');
  console.log('='.repeat(60));
  console.log(`Total de imágenes procesadas: ${stats.total}`);
  console.log(`✓ Convertidas exitosamente: ${stats.converted}`);
  console.log(`⏭️  Omitidas (WebP ya existe): ${stats.skipped}`);
  console.log(`✗ Errores: ${stats.errors}`);
  console.log(`💾 Espacio ahorrado: ${formatBytes(stats.savedBytes)}`);
  console.log(`⏱️  Tiempo: ${duration}s`);
  console.log('='.repeat(60));

  if (stats.converted > 0) {
    const avgReduction = (stats.savedBytes / stats.total / 1024 / 1024).toFixed(2);
    console.log(`\n✨ Reducción promedio: ${avgReduction} MB por imagen`);
    console.log('\n📝 Los archivos PNG originales se mantienen como fallback');
    console.log('📝 Usa el componente <OptimizedImage> para servir WebP con fallback PNG');
  }
}

main().catch(console.error);
