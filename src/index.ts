import { Elysia, t } from 'elysia';
import { db } from './db/index.ts';
import { users } from './db/schema.ts';

const app = new Elysia()
  .get('/', () => {
    return {
      message: 'Welcome to Elysia + Drizzle + MySQL API!',
      timestamp: new Date().toISOString(),
    };
  })
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { error: 'Failed to fetch users' };
    }
  })
  .post('/users', async ({ body }) => {
    try {
      const { name, email } = body;
      
      // Insert user to MySQL and get the insertId
      const [result] = await db.insert(users).values({ name, email });
      const insertId = result.insertId;
      
      return {
        success: true,
        message: 'User created successfully',
        data: {
          id: insertId,
          name,
          email,
        },
      };
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return { error: 'Email already exists' };
      }
      return { error: 'Failed to create user' };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
