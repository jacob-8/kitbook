import replace from 'replace-in-file';

const options = {
  files: 'package/package.json',
  from: 'src/lib/index.ts',
  to: 'index.js',
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}
