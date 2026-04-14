const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv');
const envFilePath = path.join(__dirname, "src/app/environments/environment.ts");
dotenv.config();
const content = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_ANON_KEY}',
};
`;

fs.writeFileSync(envFilePath, content);
console.log("environment.ts generated successfully");
