import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Configuración de optimización con breakpoints responsive
      png: {
        quality: 80, // Calidad ajustable
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      webp: {
        quality: 85, // WebP con buena calidad
        lossless: false,
      },
      avif: {
        quality: 80, // AVIF para navegadores modernos
      },
      // Opciones generales
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              convertPathData: false,
            },
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Alias principales para imports limpios
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Code splitting para mejor performance
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-radix': Object.keys(require('./package.json').dependencies)
            .filter(key => key.startsWith('@radix-ui')),
          'vendor-animations': ['motion', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion', 'lenis'],
  },
});
