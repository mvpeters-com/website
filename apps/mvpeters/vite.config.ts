import { fileURLToPath } from 'node:url';
import { siteConfig } from '@website/config/vite';

export default siteConfig({ port: 4300, srcDir: fileURLToPath(new URL('./src', import.meta.url)) });
