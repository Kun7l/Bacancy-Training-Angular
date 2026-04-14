
const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src/app/environments/environment.ts');

const content = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_ANON_KEY}',
};
`;

fs.writeFileSync(envFilePath, content);
console.log('environment.ts generated successfully');