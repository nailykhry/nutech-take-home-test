# API TAKE HOME TEST - NAILY KHAIRIYA

### **Deskripsi**
API take-home test yang mencakup modul Membership, Information dan Transaction dibangun menggunakan Express.js dan MySQL sebagai database.

---

## **Cara Menggunakan**

### **1. Clone Repository**
Clone repository ini ke komputer lokal Anda:
```bash
git clone "https://github.com/nailykhry/nutech-take-home-test.git"
cd nutech-take-home-test
```

### **2. Install Dependencies**
Setelah cloning selesai, jalankan perintah berikut untuk menginstal dependensi:
```bash
npm install
```

### **3. Setup Database**
Opsi 1: Menggunakan Database Migration
Proyek ini dilengkapi dengan fitur migration menggunakan Sequelize. Untuk menjalankan migrasi, gunakan perintah berikut:
```bash
npx sequelize db:migrate
npx sequelize-cli db:seed:all
```

Opsi 2: Import DDL yang Disediakan
Sebagai alternatif, Anda juga dapat mengimpor file DDL SQL yang telah disediakan secara manual ke database Anda. 

### **4. Menjalankan Aplikasi**
Menjalankan Aplikasi
Setelah selesai mengatur database, Anda dapat menjalankan aplikasi dengan perintah:

```bash
npm start
```
