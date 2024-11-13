//파일 이름을 index.js로 해두고 폴더 자체를 import 하면 자동으로 index.js가 로드됩니당
//즉 import {에러 이름} from './errors' 하시면 됩니다

import fs from 'fs';
import path from 'path';

const files = fs.readdirSync(__dirname);
const exports = {};

files.forEach(file => {
  if (file !== 'index.js' && file.endsWith('.js')) {
    // index.js 파일 제외
    const moduleName = file.replace('.js', ''); // 파일 이름에서 확장자를 제거해 모듈 이름 생성
    exports[moduleName] = require(path.join(__dirname, file)).default;
  }
});

export default exports;
