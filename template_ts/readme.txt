# Install dependencies untuk production
npm install express cors dotenv mysql2

# Install devDependencies (TypeScript & type definitions)
npm install --save-dev tsx ts-node-dev typescript @types/express @types/cors @types/dotenv

Penjelasan
typescript adalah compiler-nya.
@types/* adalah file deklarasi tipe agar TypeScript mengenali modul-modul yang kita pakai.


npm run build:frontend
buat compiler ts jadi js dihtml

npm run dev 
meng run projeck
