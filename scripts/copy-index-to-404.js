import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const src = join(process.cwd(), 'dist', 'public', 'index.html');
const dest = join(process.cwd(), 'dist', 'public', '404.html');

if (!existsSync(src)) {
  console.error('Cannot find', src);
  process.exit(1);
}

copyFileSync(src, dest);
console.log('Copied index.html -> 404.html');
