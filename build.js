const fs = require('fs');

const files = [
    'app.js',
    'package.json',
    'public/index.html'
];

for (const file of files) {
    if (!fs.existsSync(file)) {
        console.error(`Build failed: ${file} not found`);
        process.exit(1);
    }
    console.log(`${file} found`);
}

console.log('Application files validated successfully.');
console.log('Build completed successfully.');