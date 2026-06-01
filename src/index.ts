import { Elysia } from "elysia";
import { db } from "./db";
import { users, posts } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Elysia()
  .get("/health", () => {
    return {
      status: "ok",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    };
  })
  .get("/api/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .post("/api/users", async (context: any) => {
    try {
      const body = context.body as { name: string; email: string };
      const result = await db.insert(users).values({
        name: body.name,
        email: body.email,
      });
      return {
        success: true,
        message: "User created successfully",
        id: result[0].insertId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .get("/api/users/:id", async ({ params }: { params: { id: string } }) => {
    try {
      const userId = parseInt(params.id);
      const user = await db.select().from(users).where(eq(users.id, userId));
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .get("/api/posts", async () => {
    try {
      const allPosts = await db.select().from(posts);
      return {
        success: true,
        data: allPosts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });

const port = parseInt(process.env.PORT || "3000");
app.listen(port);
console.log(`Server running at http://localhost:${port}`);
