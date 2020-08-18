import pageRoutes from './router.config';
import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  title: 'Chart-Test',
  routes: pageRoutes,
  dva: {
    hmr: true,
    skipModelValidate: false
  },
  dynamicImport: {
    loading: '@/components/LoadingPage',
  },
  'dva-enhance': {},
  targets: {
    autoprefixer: false,
    ie: 11,
  },
  lessLoader: {
    disableCSSModules: true,
    javascriptEnabled: true,
  },
  history: { type: 'browser' },
  hash: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:6000',
      changeOrigin: true,
    },
  },
});
