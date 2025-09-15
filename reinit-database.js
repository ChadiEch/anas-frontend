// Script to reinitialize the database with correct credentials
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change to the backend directory and run the init-db script
const backendDir = path.join(__dirname, 'backend');

console.log('Reinitializing database with correct credentials...');
console.log('Running from directory:', backendDir);

exec('cd backend && npm run init-db', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  
  console.log(`stdout: ${stdout}`);
  console.log('Database reinitialized successfully!');
});