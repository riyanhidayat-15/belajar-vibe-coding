import { Elysia } from "elysia";
import dotenv from "dotenv";
import { initDb, pool } from "./db";

dotenv.config();

// Initialize minimal app
const app = new Elysia();

app.get("/health", () => ({ status: "ok" }));

// Users CRUD (uses raw SQL via pool for now)
app.get("/users", async () => {
	const [rows] = await pool.query('SELECT id, name, email FROM users');
	return rows;
});

app.get("/users/:id", async ({ params }) => {
	const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [params.id]);
	return (rows as any[])[0] || null;
});

app.post("/users", async ({ body }) => {
	const { name, email } = body as any;
	const [res] = await pool.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
	return { id: (res as any).insertId };
});

app.put("/users/:id", async ({ params, body }) => {
	const { name, email } = body as any;
	await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, params.id]);
	return { ok: true };
});

app.delete("/users/:id", async ({ params }) => {
	await pool.execute('DELETE FROM users WHERE id = ?', [params.id]);
	return { ok: true };
});

// Initialize DB (pool and ORM) before starting server
await initDb();

const server = await app.listen(3000);
console.log(`Server running at http://localhost:${server.port}`);
