# Belajar Vibe Coding - Bun + Elysia + Drizzle + MySQL

Project initialization untuk learning environment dengan Bun runtime, Elysia web framework, Drizzle ORM, dan MySQL database.

## Struktur Folder

```
.
├── src/
│   ├── db/
│   │   ├── index.ts      # Koneksi & inisialisasi Drizzle
│   │   └── schema.ts     # Definisi skema tabel MySQL
│   ├── routes/           # Routing Elysia (opsional, jika modul bertambah)
│   └── index.ts          # Entrypoint server Elysia
├── drizzle/              # Folder output hasil migrasi sql (dibuat otomatis)
├── .env                  # Environment variables (lokal)
├── .env.example          # Template environment variables
├── drizzle.config.ts     # Konfigurasi Drizzle ORM
├── tsconfig.json         # Konfigurasi TypeScript
└── package.json          # Dependency & script definition
```

## Instalasi & Setup

### 1. Install Dependencies

Semua dependencies sudah terinstall, tapi jika diperlukan:

```bash
bun install
```

### 2. Konfigurasi Database

Edit file `.env` dengan konfigurasi MySQL Anda:

```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=belajar_vibe
PORT=3000
```

### 3. Generate & Migrate Database

```bash
# Generate file migrasi berdasarkan schema
bun run generate

# Jalankan migrasi ke MySQL
bun run push
# atau
bun run migrate
```

### 4. Menjalankan Server

**Mode Development (dengan hot reload):**

```bash
bun run dev
```

**Mode Production:**

```bash
bun run build
bun dist/index.js
```

## API Endpoints

- **GET /health** - Health check server
- **GET /api/users** - Ambil semua users
- **POST /api/users** - Buat user baru
  - Body: `{ "name": "string", "email": "string" }`
- **GET /api/users/:id** - Ambil user by ID
- **GET /api/posts** - Ambil semua posts

## Database Schema

### Users Table

- `id` (INT, PK, AUTO_INCREMENT)
- `name` (VARCHAR 100, NOT NULL)
- `email` (VARCHAR 255, NOT NULL, UNIQUE)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP)

### Posts Table

- `id` (INT, PK, AUTO_INCREMENT)
- `title` (VARCHAR 255, NOT NULL)
- `content` (TEXT, NOT NULL)
- `user_id` (INT, FK to users.id)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP)

## Useful Scripts

```bash
# Lihat schema di Drizzle Studio
bun run studio

# Build untuk production
bun run build

# Generate migrasi SQL
bun run generate

# Jalankan migrasi
bun run migrate

# Push schema langsung ke DB
bun run push

# Development mode
bun run dev
```

## Teknologi yang Digunakan

- **Bun** - JavaScript runtime, package manager, dan bundler
- **Elysia** - Web framework yang super cepat untuk Bun
- **Drizzle ORM** - Type-safe ORM untuk database operations
- **MySQL2** - Driver MySQL dengan promise support
- **Drizzle Kit** - CLI untuk migrasi dan schema management

## Notes

- Pastikan MySQL server sudah berjalan sebelum menjalankan server
- File `.env` sudah ter-exclude di `.gitignore`
- Server berjalan di port 3000 secara default (bisa diubah di `.env`)
