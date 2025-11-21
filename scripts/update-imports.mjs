#!/usr/bin/env node
/**
 * Script para actualizar todos los imports de figma:asset a rutas @/assets
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SRC_DIR = join(__dirname, '../src');

// Mapeo completo de hash → ruta nueva
const importMapping = {
  // Hero images
  '664db47e7c2cffe774ea77a28f525b2a3b2ffdbf': '@/assets/hero-images/pride-flag.png',
  'eab70f6574d531b0ec1e854d14343daa691de1d3': '@/assets/hero-images/avocado.png',
  '51818429d803dc2784eb0f08d69b9f65efea2499': '@/assets/hero-images/llama.png',
  '12e12ea5537e24022bf5c6baa3fa2acd6bb8e20a': '@/assets/hero-images/rainbow.png',
  'b0d223811c030a50d8908f3ea88600775776d897': '@/assets/hero-images/tarot-cards.png',
  'aaa47972bc762f3902f97c93605a34e6d26b2d82': '@/assets/hero-images/tamagotchi.png',
  'a642e63c62cf79a78840c33de16484525a84130e': '@/assets/hero-images/machu-picchu.png',
  'ef7f40a213e6a8798d36babb407f0b45195abba4': '@/assets/hero-images/retro-computer.png',
  'aed3650e963cc5835a51aeeaad2b02f177a90a0d': '@/assets/hero-images/pointing-hand.png',
  'dd07d2f00f5d6e2402505f87a7c28c922005bdd2': '@/assets/hero-images/pepe-meme.png',
  'fc5352e4fcf77570834f488fb633e943750ffba6': '@/assets/hero-images/fluffy-dog.png',
  'd21da2ad502998b2ccac20ae84d4aa75c8460314': '@/assets/hero-images/dog-with-toy.png',
  '75b3deb1963f78450972d35aa1f51672fb4ece09': '@/assets/hero-images/michael-scott.png',

  // About section
  '596ac4d2fc6cae6688a73ad4edd3154bec0f4c5f': '@/assets/about-section/profile-photo.png',
  'ac874e2d33d1241ffb1ba2208706596dc78eff4f': '@/assets/about-section/working-at-desk.png',
  '7c56acdd2702a59a227070ed54c32e4f0b99b9ab': '@/assets/about-section/mountain-landscape.png',
  '6d48d6e61eecebbccc6b2eb13edf26b1c2003e97': '@/assets/about-section/sunset-view.png',

  // Skills
  'd832e3b417f9ce392d042d246e4f2f903b4c9b0e': '@/assets/skills/react-logo.png',

  // Projects - Shift
  'ab313e8a1d8e46599e192a212d0dcb0785a1e00b': '@/assets/projects/shift/shift-main.png',
  'fa3163455994d46d70ff33f0c0d92c340ec793d9': '@/assets/projects/shift/shift-before.png',
  'a8688ac5b5c378f4d572781483c44957c34224b3': '@/assets/projects/shift/shift-after.png',

  // Projects - Worthit
  '4d35922aa25cea679a2b16473c88ddf584da5bf3': '@/assets/projects/worthit/worthit-main.png',
  '07826e0dd50edd3407c7a65639ade5b17b125a7e': '@/assets/projects/worthit/worthit-wireframe.png',
  '6d39df6d4ee90c3c1ffa175c4720f7960708a085': '@/assets/projects/worthit/worthit-final.png',
  '62d2da965a91b86f670983e728bff1da5c417f9c': '@/assets/projects/worthit/worthit-competitive-analysis.png',

  // Projects - Invoinet
  'dc4b81bdc691373a0201d95f368482cddbf5c464': '@/assets/projects/invoinet/invoinet-main.png',
  '9a72867e463afcad272b35f491bad3aa4e67c8cf': '@/assets/projects/invoinet/invoinet-before.png',
  'fa2f9fbca16d380a80c6fb1d7771f3dfcd4f5f82': '@/assets/projects/invoinet/invoinet-after.png',

  // Projects - nGrowth
  '81d730f6fb315d4ef979df5b02ae3410a71fb75e': '@/assets/projects/ngrowth/ngrowth-main.png',
  'f77b09be5c3fd693d7d07ebd36ab82e6063e3158': '@/assets/projects/ngrowth/ngrowth-wireframe.png',
  '4bf2f05c7313c0a9495c1ada0ac210d12297fb22': '@/assets/projects/ngrowth/ngrowth-final.png',
  '7eb826a163bc25b55f3e162b43ed515c0d134f46': '@/assets/projects/ngrowth/ngrowth-positioning-framework.png',
  '6444e7c2b3336a0a4b2267f228e746c0da1c9a3b': '@/assets/projects/ngrowth/ngrowth-competitive-research.png',
  '81509f50c3241a6782add4b3b9662ce3ba01b27e': '@/assets/projects/ngrowth/ngrowth-positioning.png',

  // Projects - Juntoz
  '2c19f5ca8cd1fcea269e616e2cc6fa78ebb8193b': '@/assets/projects/juntoz/juntoz-main.png',
  'fd83d7de35592a137858608c4c0cfbfb8d10c150': '@/assets/projects/juntoz/juntoz-competitive-benchmarking.png',
  '61f5c8f6a205adb2b1ddd51c8b3be84cfc75dd0c': '@/assets/projects/juntoz/juntoz-user-research.png',
  '193e7bcc74eb55847ba32dbace36f4dc700ab9e8': '@/assets/projects/juntoz/juntoz-information-architecture.png',
  'f6ecd6860cec6d3ff2d78fd5aeacfb3039861068': '@/assets/projects/juntoz/juntoz-analytics.png',
  '584710e6e00fa5f6576c39936192159dfee5b6bc': '@/assets/projects/juntoz/juntoz-productos.png',
  '9b37faab7f685c592aa2d3422a9ce113b3d49926': '@/assets/projects/juntoz/juntoz-marketing.png',
  '031160efd5e5c2c45fde2773cb134ddedbfeb7fc': '@/assets/projects/juntoz/juntoz-logistica.png',
  'cd2d64a154f04d82d72ad603ec8aabb59cb6a958': '@/assets/projects/juntoz/juntoz-capacitaciones.png',
  '0e82d6ac91fad77e46011dc119a5e8c7c3f6ed96': '@/assets/projects/juntoz/juntoz-before-pedidos.png',
  '3e2e82ccebb1e17371afb47bb80d07781d11b3db': '@/assets/projects/juntoz/juntoz-before-cupones.png',
  '4aff95ec438cd73fec5567ae6eb8e4c20bd7310c': '@/assets/projects/juntoz/juntoz-before-catalogo.png',
  'f86fc193ea575fcbf9381df0847e0bdd657d23c8': '@/assets/projects/juntoz/juntoz-before-listado-pedidos.png',
  '154b34d4f7e95cf60cfa69d31e4f21d62c48f110': '@/assets/projects/juntoz/juntoz-after.png',

  // Other
  '06077e1c31820cc101c77e68988bb6ab3c4a5414': '@/assets/other-assets/wireframe-generic.png',
  '15203e172feef59b285e3012ec76d9ec4c2f10df': '@/assets/other-assets/demo-image-large.png',
};

// Archivos a actualizar
const filesToUpdate = [
  'data/projects.ts',
  'components/SkillsSection.tsx',
  'components/ProjectDetailPage.tsx',
  'components/ImageOptimizationDemo.tsx',
];

async function updateFile(filePath) {
  try {
    const fullPath = join(SRC_DIR, filePath);
    let content = await readFile(fullPath, 'utf-8');
    let changes = 0;

    // Reemplazar cada import
    for (const [hash, newPath] of Object.entries(importMapping)) {
      const oldPattern = `figma:asset/${hash}.png`;
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(oldPattern, 'g'), newPath);
        changes++;
      }
    }

    if (changes > 0) {
      await writeFile(fullPath, content, 'utf-8');
      console.log(`✓ ${filePath} - ${changes} imports actualizados`);
      return changes;
    } else {
      console.log(`○ ${filePath} - Sin cambios`);
      return 0;
    }
  } catch (error) {
    console.error(`✗ Error en ${filePath}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🔄 Actualizando imports en archivos...\n');

  let totalChanges = 0;
  for (const file of filesToUpdate) {
    const changes = await updateFile(file);
    totalChanges += changes;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✓ Total de imports actualizados: ${totalChanges}`);
  console.log('='.repeat(60));
  console.log('\n✨ ¡Actualización completada!');
}

main().catch(console.error);
