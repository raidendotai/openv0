const AdmZip = require('adm-zip');
const fs = require('fs');

// Specify the path to the JSON file you want to include in the archive
const jsonFilePath = 'index.json';

// Create a new instance of AdmZip
const zip = new AdmZip();

// Add the JSON file to the archive
zip.addLocalFile(jsonFilePath);

// Specify the name for the archive (e.g., index.zip)
const zipFileName = 'index.zip';

// Write the ZIP archive to the current directory
zip.writeZip(zipFileName);

console.log(`Created ${zipFileName} from ${jsonFilePath}`);
