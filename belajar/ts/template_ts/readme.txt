# Install dependencies untuk production
npm install express cors dotenv mysql2

# Install devDependencies (TypeScript & type definitions)
npm install --save-dev tsx ts-node-dev typescript @types/express @types/cors @types/dotenv

Penjelasan
typescript adalah compiler-nya.
@types/* adalah file deklarasi tipe agar TypeScript mengenali modul-modul yang kita pakai.


ubah bagian script di package.json jadi seperti ini.
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "tsx watch index.ts"
},


npm run build:frontend
buat compiler ts jadi js dihtml

npm run dev 
meng run projeck
