import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exports = {};

const loadModules = async () => {
  const files = await fs.readdir(__dirname);

  await Promise.all(
    files.map(async (file) => {
      if (file !== 'index.js' && file.endsWith('.js')) {
        const moduleName = file.replace('.js', '');
        const filePath = new URL(file, `file://${__dirname}/`); 
        const module = await import(filePath.href);
        exports[moduleName] = module.default;
      }
    })
  );
};

await loadModules();

export default exports;
