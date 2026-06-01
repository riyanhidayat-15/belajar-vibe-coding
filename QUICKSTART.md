# 🚀 Quick Start Guide

## Prerequisites

- MySQL server installed and running
- Bun runtime installed

## Setup Steps (5 minutes)

### 1. Configure Database Connection

Edit `.env` file with your MySQL credentials:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=belajar_vibe
PORT=3000
NODE_ENV=development
```

### 2. Create Database

```bash
mysql -u root -p
CREATE DATABASE belajar_vibe;
EXIT;
```

### 3. Run Migration

```bash
bun run push
```

This will create the `users` and `posts` tables in your database.

### 4. Start Development Server

```bash
bun run dev
```

Server will be available at `http://localhost:3000`

## Available Scripts

```bash
# Development server with hot reload
bun run dev

# Build for production
bun run build

# Generate migration files from schema
bun run generate

# Run migrations (if using drizzle migrations folder)
bun run migrate

# Push schema directly to database
bun run push

# Open Drizzle Studio (visual database browser)
bun run studio
```

## Test the API

```bash
# Health check
curl http://localhost:3000/health

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Get all posts
curl http://localhost:3000/api/posts
```

## Project Files

- **`src/index.ts`** - Main Elysia server with routes
- **`src/db/index.ts`** - Database connection setup
- **`src/db/schema.ts`** - Database schema definitions
- **`drizzle.config.ts`** - Drizzle ORM configuration
- **`.env`** - Environment variables (DO NOT COMMIT)
- **`.env.example`** - Environment template (FOR DOCUMENTATION)
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration

## Useful Resources

- [Elysia Documentation](https://elysiajs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Bun Documentation](https://bun.sh/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## Troubleshooting

### "Cannot connect to database"

- Check MySQL server is running
- Verify `.env` credentials are correct
- Check database exists: `SHOW DATABASES;`

### "Port 3000 already in use"

- Change `PORT` in `.env` file
- Or kill the process: `pkill -f "bun run dev"`

### "Migration failed"

- Ensure database exists
- Check `.env` credentials
- Run: `bun run generate` to regenerate migrations

## Next Steps

1. Explore the schema in [PROJECT_README.md](PROJECT_README.md)
2. Read implementation details in [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
3. Modify schema in `src/db/schema.ts` as needed
4. Add more routes in `src/index.ts` or create modules in `src/routes/`
5. Generate new migrations: `bun run generate`

---

**Happy coding! 🎉**
