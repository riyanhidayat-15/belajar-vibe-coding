import { Elysia } from "elysia";
import { db } from "./db";
import { users, posts } from "./db/schema";
import { eq } from "drizzle-orm";
import { createUser } from "./services/users-service";

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
      const body = context.body as {
        name?: string;
        email?: string;
        password?: string;
      };

      // Validasi input - cek field kosong
      if (!body.name || body.name.trim() === "") {
        return {
          error: "validasi gagal: name tidak boleh kosong",
        };
      }

      if (!body.email || body.email.trim() === "") {
        return {
          error: "validasi gagal: email tidak boleh kosong",
        };
      }

      if (!body.password || body.password.trim() === "") {
        return {
          error: "validasi gagal: password tidak boleh kosong",
        };
      }

      // Panggil service untuk create user
      await createUser({
        name: body.name.trim(),
        email: body.email.trim(),
        password: body.password,
      });

      // Return success response
      return {
        data: "OK",
      };
    } catch (error) {
      // Handle error
      if (error instanceof Error) {
        const errorMessage = error.message;

        // Cek apakah error adalah email sudah terdaftar
        if (errorMessage === "email sudah terdaftar") {
          return {
            error: "email sudah terdaftar",
          };
        }

        // Return error message lainnya
        return {
          error: errorMessage,
        };
      }

      // Generic error
      return {
        error: "Gagal membuat user",
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
