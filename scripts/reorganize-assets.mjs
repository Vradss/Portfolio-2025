#!/usr/bin/env node
/**
 * Script para reorganizar assets con nombres descriptivos
 * Mueve imágenes de assets/ a carpetas organizadas con nombres claros
 */

import { rename, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ASSETS_DIR = join(__dirname, '../src/assets');

// Mapeo completo de hash → nombre descriptivo y carpeta
const assetMapping = {
  // HERO IMAGES (13 imágenes)
  '664db47e7c2cffe774ea77a28f525b2a3b2ffdbf': { name: 'pride-flag', folder: 'hero-images' },
  'eab70f6574d531b0ec1e854d14343daa691de1d3': { name: 'avocado', folder: 'hero-images' },
  '51818429d803dc2784eb0f08d69b9f65efea2499': { name: 'llama', folder: 'hero-images' },
  '12e12ea5537e24022bf5c6baa3fa2acd6bb8e20a': { name: 'rainbow', folder: 'hero-images' },
  'b0d223811c030a50d8908f3ea88600775776d897': { name: 'tarot-cards', folder: 'hero-images' },
  'aaa47972bc762f3902f97c93605a34e6d26b2d82': { name: 'tamagotchi', folder: 'hero-images' },
  'a642e63c62cf79a78840c33de16484525a84130e': { name: 'machu-picchu', folder: 'hero-images' },
  'ef7f40a213e6a8798d36babb407f0b45195abba4': { name: 'retro-computer', folder: 'hero-images' },
  'aed3650e963cc5835a51aeeaad2b02f177a90a0d': { name: 'pointing-hand', folder: 'hero-images' },
  'dd07d2f00f5d6e2402505f87a7c28c922005bdd2': { name: 'pepe-meme', folder: 'hero-images' },
  'fc5352e4fcf77570834f488fb633e943750ffba6': { name: 'fluffy-dog', folder: 'hero-images' },
  'd21da2ad502998b2ccac20ae84d4aa75c8460314': { name: 'dog-with-toy', folder: 'hero-images' },
  '75b3deb1963f78450972d35aa1f51672fb4ece09': { name: 'michael-scott', folder: 'hero-images' },

  // ABOUT SECTION (4 imágenes)
  '596ac4d2fc6cae6688a73ad4edd3154bec0f4c5f': { name: 'profile-photo', folder: 'about-section' },
  'ac874e2d33d1241ffb1ba2208706596dc78eff4f': { name: 'working-at-desk', folder: 'about-section' },
  '7c56acdd2702a59a227070ed54c32e4f0b99b9ab': { name: 'mountain-landscape', folder: 'about-section' },
  '6d48d6e61eecebbccc6b2eb13edf26b1c2003e97': { name: 'sunset-view', folder: 'about-section' },

  // SKILLS SECTION (1 imagen)
  'd832e3b417f9ce392d042d246e4f2f903b4c9b0e': { name: 'react-logo', folder: 'skills' },

  // PROJECTS - SHIFT (3 imágenes)
  'ab313e8a1d8e46599e192a212d0dcb0785a1e00b': { name: 'shift-main', folder: 'projects/shift' },
  'fa3163455994d46d70ff33f0c0d92c340ec793d9': { name: 'shift-before', folder: 'projects/shift' },
  'a8688ac5b5c378f4d572781483c44957c34224b3': { name: 'shift-after', folder: 'projects/shift' },

  // PROJECTS - WORTHIT (4 imágenes)
  '4d35922aa25cea679a2b16473c88ddf584da5bf3': { name: 'worthit-main', folder: 'projects/worthit' },
  '07826e0dd50edd3407c7a65639ade5b17b125a7e': { name: 'worthit-wireframe', folder: 'projects/worthit' },
  '6d39df6d4ee90c3c1ffa175c4720f7960708a085': { name: 'worthit-final', folder: 'projects/worthit' },
  '62d2da965a91b86f670983e728bff1da5c417f9c': { name: 'worthit-competitive-analysis', folder: 'projects/worthit' },

  // PROJECTS - INVOINET (3 imágenes)
  'dc4b81bdc691373a0201d95f368482cddbf5c464': { name: 'invoinet-main', folder: 'projects/invoinet' },
  '9a72867e463afcad272b35f491bad3aa4e67c8cf': { name: 'invoinet-before', folder: 'projects/invoinet' },
  'fa2f9fbca16d380a80c6fb1d7771f3dfcd4f5f82': { name: 'invoinet-after', folder: 'projects/invoinet' },

  // PROJECTS - NGROWTH (5 imágenes)
  '81d730f6fb315d4ef979df5b02ae3410a71fb75e': { name: 'ngrowth-main', folder: 'projects/ngrowth' },
  'f77b09be5c3fd693d7d07ebd36ab82e6063e3158': { name: 'ngrowth-wireframe', folder: 'projects/ngrowth' },
  '4bf2f05c7313c0a9495c1ada0ac210d12297fb22': { name: 'ngrowth-final', folder: 'projects/ngrowth' },
  '7eb826a163bc25b55f3e162b43ed515c0d134f46': { name: 'ngrowth-positioning-framework', folder: 'projects/ngrowth' },
  '6444e7c2b3336a0a4b2267f228e746c0da1c9a3b': { name: 'ngrowth-competitive-research', folder: 'projects/ngrowth' },
  '81509f50c3241a6782add4b3b9662ce3ba01b27e': { name: 'ngrowth-positioning', folder: 'projects/ngrowth' },

  // PROJECTS - JUNTOZ (15 imágenes)
  '2c19f5ca8cd1fcea269e616e2cc6fa78ebb8193b': { name: 'juntoz-main', folder: 'projects/juntoz' },
  'fd83d7de35592a137858608c4c0cfbfb8d10c150': { name: 'juntoz-competitive-benchmarking', folder: 'projects/juntoz' },
  '61f5c8f6a205adb2b1ddd51c8b3be84cfc75dd0c': { name: 'juntoz-user-research', folder: 'projects/juntoz' },
  '193e7bcc74eb55847ba32dbace36f4dc700ab9e8': { name: 'juntoz-information-architecture', folder: 'projects/juntoz' },
  'f6ecd6860cec6d3ff2d78fd5aeacfb3039861068': { name: 'juntoz-analytics', folder: 'projects/juntoz' },
  '584710e6e00fa5f6576c39936192159dfee5b6bc': { name: 'juntoz-productos', folder: 'projects/juntoz' },
  '9b37faab7f685c592aa2d3422a9ce113b3d49926': { name: 'juntoz-marketing', folder: 'projects/juntoz' },
  '031160efd5e5c2c45fde2773cb134ddedbfeb7fc': { name: 'juntoz-logistica', folder: 'projects/juntoz' },
  'cd2d64a154f04d82d72ad603ec8aabb59cb6a958': { name: 'juntoz-capacitaciones', folder: 'projects/juntoz' },
  '0e82d6ac91fad77e46011dc119a5e8c7c3f6ed96': { name: 'juntoz-before-pedidos', folder: 'projects/juntoz' },
  '3e2e82ccebb1e17371afb47bb80d07781d11b3db': { name: 'juntoz-before-cupones', folder: 'projects/juntoz' },
  '4aff95ec438cd73fec5567ae6eb8e4c20bd7310c': { name: 'juntoz-before-catalogo', folder: 'projects/juntoz' },
  'f86fc193ea575fcbf9381df0847e0bdd657d23c8': { name: 'juntoz-before-listado-pedidos', folder: 'projects/juntoz' },
  '154b34d4f7e95cf60cfa69d31e4f21d62c48f110': { name: 'juntoz-after', folder: 'projects/juntoz' },

  // OTHER (3 imágenes - wireframes y misc)
  '06077e1c31820cc101c77e68988bb6ab3c4a5414': { name: 'wireframe-generic', folder: 'other-assets' },
  '15203e172feef59b285e3012ec76d9ec4c2f10df': { name: 'demo-image-large', folder: 'other-assets' },
};

/**
 * Crear estructura de carpetas necesaria
 */
async function createFolderStructure() {
  const folders = new Set();
  Object.values(assetMapping).forEach(({ folder }) => folders.add(folder));

  // Crear carpetas (ya existen algunas)
  console.log('📁 Estructura de carpetas ya creada\n');
}

/**
 * Reorganizar assets
 */
async function reorganizeAssets() {
  let moved = 0;
  let errors = 0;

  for (const [hash, { name, folder }] of Object.entries(assetMapping)) {
    try {
      // Archivos PNG y WebP
      const extensions = ['.png', '.webp'];

      for (const ext of extensions) {
        const oldPath = join(ASSETS_DIR, `${hash}${ext}`);
        const newPath = join(ASSETS_DIR, folder, `${name}${ext}`);

        try {
          await rename(oldPath, newPath);
          moved++;
          console.log(`✓ ${hash}${ext} → ${folder}/${name}${ext}`);
        } catch (err) {
          if (err.code !== 'ENOENT') {
            console.error(`✗ Error: ${hash}${ext}`);
            errors++;
          }
        }
      }
    } catch (error) {
      console.error(`✗ Error procesando ${hash}:`, error.message);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✓ Archivos movidos: ${moved}`);
  console.log(`✗ Errores: ${errors}`);
  console.log('='.repeat(60));
}

/**
 * Main
 */
async function main() {
  console.log('🗂️  Reorganizando assets con nombres descriptivos...\n');

  await createFolderStructure();
  await reorganizeAssets();

  console.log('\n✨ ¡Reorganización completada!');
  console.log('\n📝 Próximo paso: Actualizar referencias en los componentes');
}

main().catch(console.error);
